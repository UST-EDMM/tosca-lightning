package io.github.edmm.tosca.lightning.controller;

import java.util.List;

import io.github.edmm.tosca.lightning.model.Plugin;
import io.github.edmm.tosca.lightning.service.TransformationManager;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/plugins")
@Tag(name = "plugin", description = "The plugin API")
public class PluginController {

  private TransformationManager transformationManager;

  public PluginController(TransformationManager transformationManager) {
    this.transformationManager = transformationManager;
  }

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  @Operation(summary = "Returns a list of supported plugins.")
  public List<Plugin> getPlugins() {
    return transformationManager.getPlugins();
  }
}
