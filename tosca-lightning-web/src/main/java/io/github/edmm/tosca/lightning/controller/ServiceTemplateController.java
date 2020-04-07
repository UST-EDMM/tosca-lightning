package io.github.edmm.tosca.lightning.controller;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import io.github.edmm.tosca.lightning.model.ServiceTemplate;
import io.github.edmm.tosca.lightning.model.support.TransformResponse;
import io.github.edmm.tosca.lightning.service.TransformationManager;
import io.github.edmm.tosca.lightning.service.WineryManager;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@RestController
@RequestMapping("/service-templates")
@Tag(name = "plugin", description = "The service template API")
public class ServiceTemplateController {

  private WineryManager wineryManager;
  private TransformationManager transformationManager;

  public ServiceTemplateController(WineryManager wineryManager, TransformationManager transformationManager) {
    this.wineryManager = wineryManager;
    this.transformationManager = transformationManager;
  }

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public List<ServiceTemplate> getServiceTemplates() {
    return wineryManager.getModels().stream()
      .peek(st -> {
        st.setLogoUrl(wineryManager.getLogoUrl(st));
        st.setTopologyModelerUrl(wineryManager.getTopologyModelerUrl(st));
      })
      .collect(Collectors.toList());
  }

  @PostMapping("/{id}/transform/{target}")
  public TransformResponse transformServiceTemplate(@PathVariable String id, @PathVariable String target) {
    ServiceTemplate serviceTemplate = wineryManager.getModelsAsMap().get(id);
    if (serviceTemplate == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    URI location = transformationManager.doTransform(id, target);
    return transformationManager.getTransformResponse(location);
  }
}
