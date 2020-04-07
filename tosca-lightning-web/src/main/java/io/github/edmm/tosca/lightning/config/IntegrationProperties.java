package io.github.edmm.tosca.lightning.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "integration")
public class IntegrationProperties {

  private String wineryHostname;
  private String wineryPublicHostname;
  private Integer wineryPort;
  private String transformationHostname;
  private Integer transformationPort;
}
