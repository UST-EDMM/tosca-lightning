package io.github.edmm.tosca.lightning.model.support;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class TransformRequest {

  private String target;
  private String input;
}
