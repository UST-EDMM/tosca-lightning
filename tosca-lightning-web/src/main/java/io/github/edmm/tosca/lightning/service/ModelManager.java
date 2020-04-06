package io.github.edmm.tosca.lightning.service;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import io.github.edmm.tosca.lightning.config.IntegrationProperties;
import io.github.edmm.tosca.lightning.model.ServiceTemplate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

@Slf4j
@Service
public class ModelManager {

  private static final String MODELS_PATH = "/toscaLightModels";
  private static final String EXPORT_PATH_TEMPLATE = "/servicetemplates/%s/%s/?edmm&edmmUseAbsolutePaths";
  private static final String LOGO_URL_TEMPLATE = "/servicetemplates/%s/%s/selfserviceportal/icon.jpg";

  private final RestTemplate restTemplate;
  private final String basePath;

  public ModelManager(IntegrationProperties props) {
    this.restTemplate = new RestTemplate();
    this.basePath = String.format("http://%s:%s/winery", props.getWineryHostname(), props.getWineryPort());
  }

  public List<ServiceTemplate> getModels() {
    log.info("Retrieve model data from Eclipse Winery...");
    ServiceTemplate[] response = restTemplate.getForObject(basePath + MODELS_PATH, ServiceTemplate[].class);
    if (response == null) {
      return new ArrayList<>();
    }
    log.info("Got <{}> model(s)", response.length);
    return Arrays.asList(response);
  }

  public Map<String, ServiceTemplate> getModelsAsMap() {
    return getModels().stream().collect(Collectors.toMap(ServiceTemplate::getId, (st) -> st));
  }

  public Optional<String> getModelAsYaml(String id) {
    log.info("Request EDMM YAML model for Service Template \"{}\"...", id);
    Map<String, ServiceTemplate> models = getModelsAsMap();
    ServiceTemplate serviceTemplate = models.get(id);
    if (serviceTemplate == null) {
      log.error("Service template could not be found");
      return Optional.empty();
    }

    if (log.isDebugEnabled()) {
      String debugValue = String.format(EXPORT_PATH_TEMPLATE,
        UriUtils.encode(UriUtils.encode(serviceTemplate.getNamespace(), "UTF-8"), "UTF-8"),
        serviceTemplate.getId());
      log.debug("Export Path: {}", basePath + debugValue);
    }

    String exportUrl = basePath + String.format(EXPORT_PATH_TEMPLATE,
      UriUtils.encode(serviceTemplate.getNamespace(), "UTF-8"), serviceTemplate.getId());

    HttpHeaders headers = new HttpHeaders();
    headers.setAccept(Collections.singletonList(MediaType.TEXT_XML));
    HttpEntity<String> entity = new HttpEntity<>(headers);
    ResponseEntity<String> response = restTemplate.exchange(exportUrl, HttpMethod.GET, entity, String.class);
    HttpStatus status = response.getStatusCode();

    if (status.isError()) {
      log.error("Could not download EDMM YAML model: {}", status);
    }

    return Optional.ofNullable(response.getBody());
  }

  public String getLogoUrl(ServiceTemplate serviceTemplate) {
    String logoUrl = basePath + String.format(LOGO_URL_TEMPLATE,
      UriUtils.encode(UriUtils.encode(serviceTemplate.getNamespace(), "UTF-8"), "UTF-8"),
      serviceTemplate.getId());
    try {
      URL url = new URL(logoUrl);
      HttpURLConnection huc = (HttpURLConnection) url.openConnection();
      int responseCode = huc.getResponseCode();
      if (responseCode >= 200 && responseCode < 400) {
        return logoUrl;
      } else {
        log.warn("Logo not available at URL: {}", logoUrl);
      }
    } catch (Exception e) {
      log.error("Error checking logo URL: {}", e.getMessage(), e);
    }
    return null;
  }
}
