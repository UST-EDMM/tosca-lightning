package io.github.edmm.tosca.lightning.model.support;

import lombok.Data;

@Data
public class Version {

  private String componentVersion;
  private Integer wineryVersion;
  private Integer workInProgressVersion;
  private Boolean currentVersion;
  private Boolean latestVersion;
  private Boolean releasable;
  private Boolean editable;
}
