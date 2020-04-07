package io.github.edmm.tosca.lightning.service;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;

import io.github.edmm.tosca.lightning.config.IntegrationProperties;
import io.github.edmm.tosca.lightning.model.Plugin;
import io.github.edmm.tosca.lightning.model.support.TransformRequest;
import io.github.edmm.tosca.lightning.model.support.TransformResponse;
import io.github.edmm.tosca.lightning.model.support.TransformResponse.TransformResponseNotReadyException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import static io.github.edmm.tosca.lightning.model.support.TransformResponse.State.DONE;
import static io.github.edmm.tosca.lightning.model.support.TransformResponse.State.ERROR;

@Slf4j
@Service
public class TransformationManager {

  private static final String PLUGINS_PATH = "/plugins";
  private static final String TRANSFORM_PATH = "/transform";
  private static final String DOWNLOAD_URL_TEMPLATE = "/transform/tasks/%s/download";

  private final WineryManager wineryManager;
  private final RestTemplate restTemplate;
  private final String restBasePath;
  private final String publicBasePath;

  public TransformationManager(WineryManager wineryManager, IntegrationProperties props) {
    this.wineryManager = wineryManager;
    this.restTemplate = new RestTemplate();
    this.restBasePath = String.format("http://%s:%s", props.getTransformationHostname(), props.getTransformationPort());
    this.publicBasePath = String.format("http://%s:%s", props.getTransformationPublicHostname(), props.getTransformationPort());
  }

  public List<Plugin> getPlugins() {
    log.info("Retrieve plugins from EDMM transformation framework");
    Plugin[] response = restTemplate.getForObject(restBasePath + PLUGINS_PATH, Plugin[].class);
    if (response == null) {
      return new ArrayList<>();
    }
    log.info("Got <{}> plugin(s)", response.length);
    return Arrays.asList(response);
  }

  public URI doTransform(String id, String target) {
    log.info("Get EDMM model from Eclipse Winery");
    String yaml = wineryManager.getModelAsYaml(id).orElseThrow(IllegalStateException::new);
    String model = Base64.getEncoder().encodeToString(yaml.getBytes());
    log.info("Transform model using EDMM transformation framework");
    URI location = restTemplate.postForLocation(restBasePath + TRANSFORM_PATH, new TransformRequest(target, model));
    log.info("Result available at: {}", location);
    return location;
  }

  @Retryable(value = {TransformResponseNotReadyException.class}, maxAttempts = 100, backoff = @Backoff(delay = 1000))
  public TransformResponse getTransformResponse(URI location) {
    log.info("Check for transformation result");
    TransformResponse response;
    try {
      response = restTemplate.getForObject(location, TransformResponse.class);
    } catch (Exception e) {
      log.info("Could not fetch response, trigger retry");
      throw new TransformResponseNotReadyException();
    }
    if (response != null) {
      if (ERROR.equals(response.getState())) {
        log.error("Error transforming model");
        return response;
      }
      if (DONE.equals(response.getState())) {
        response.setDownloadUrl(publicBasePath + String.format(DOWNLOAD_URL_TEMPLATE, response.getId()));
        log.info("Transformation result ready, download URL is: {}", response.getDownloadUrl());
        return response;
      }
    }
    log.info("Transformation result not ready, trigger retry");
    throw new TransformResponseNotReadyException();
  }
}
