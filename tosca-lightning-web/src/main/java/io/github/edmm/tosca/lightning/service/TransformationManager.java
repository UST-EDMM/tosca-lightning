package io.github.edmm.tosca.lightning.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import io.github.edmm.tosca.lightning.config.IntegrationProperties;
import io.github.edmm.tosca.lightning.model.Plugin;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class TransformationManager {

  private static final String PLUGINS_PATH = "/plugins";

  private final RestTemplate restTemplate;
  private final String basePath;

  public TransformationManager(IntegrationProperties props) {
    this.restTemplate = new RestTemplate();
    this.basePath = String.format("http://%s:%s", props.getTransformationHostname(), props.getTransformationPort());
  }

  public List<Plugin> getPlugins() {
    log.info("Retrieve plugins from EDMM transformation framework...");
    Plugin[] response = restTemplate.getForObject(basePath + PLUGINS_PATH, Plugin[].class);
    if (response == null) {
      return new ArrayList<>();
    }
    log.info("Got <{}> plugin(s)", response.length);
    return Arrays.asList(response);
  }
}
