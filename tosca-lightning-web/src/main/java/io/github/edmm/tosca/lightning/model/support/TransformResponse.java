package io.github.edmm.tosca.lightning.model.support;

import com.fasterxml.jackson.annotation.JsonCreator;
import io.github.edmm.tosca.lightning.utils.Enums;
import lombok.Data;

@Data
public class TransformResponse {

  private String id;
  private String target;
  private State state;

  private String downloadUrl;

  public enum State {
    READY,
    TRANSFORMING,
    DONE,
    ERROR;

    @JsonCreator
    public static State forValue(String value) {
      return Enums.valueOf(State.class, value);
    }
  }

  public static class TransformResponseNotReadyException extends RuntimeException {

  }
}
