package io.github.edmm.tosca.lightning.controller;

import java.util.List;
import java.util.stream.Collectors;

import io.github.edmm.tosca.lightning.model.ServiceTemplate;
import io.github.edmm.tosca.lightning.service.WineryManager;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/service-templates")
@Tag(name = "plugin", description = "The service template API")
public class ServiceTemplateController {

  private WineryManager wineryManager;

  public ServiceTemplateController(WineryManager wineryManager) {
    this.wineryManager = wineryManager;
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
}
