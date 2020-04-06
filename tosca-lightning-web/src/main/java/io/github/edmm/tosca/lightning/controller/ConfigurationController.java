package io.github.edmm.tosca.lightning.controller;

import io.github.edmm.tosca.lightning.config.IntegrationProperties;
import io.github.edmm.tosca.lightning.model.support.Configuration;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/config")
@Tag(name = "config", description = "The config API")
public class ConfigurationController {

  private IntegrationProperties integrationProps;

  public ConfigurationController(IntegrationProperties integrationProps) {
    this.integrationProps = integrationProps;
  }

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Returns the current configuration.")
  public Configuration getConfiguration() {
    return Configuration.of(integrationProps);
  }
}
