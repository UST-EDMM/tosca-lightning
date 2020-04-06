package io.github.edmm.tosca.lightning.model.support;

import io.github.edmm.tosca.lightning.config.IntegrationProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Configuration {

  @Schema(description = "Configured base of URL of Eclipse Winery", required = true)
  private String wineryUrl;

  public static Configuration of(IntegrationProperties props) {
    return Configuration.builder()
      .wineryUrl(String.format("http://%s:%s", props.getWineryHostname(), props.getWineryPort()))
      .build();
  }
}
