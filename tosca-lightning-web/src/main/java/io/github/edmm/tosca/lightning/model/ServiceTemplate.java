package io.github.edmm.tosca.lightning.model;

import javax.xml.namespace.QName;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.github.edmm.tosca.lightning.model.support.Version;
import lombok.Data;

@Data
public class ServiceTemplate {

  private String id;
  private String name;
  private String namespace;
  private QName qName;
  private Version version;

  private String logoUrl;

  @JsonProperty("qName")
  public QName getQName() {
    return qName;
  }

  @JsonProperty("qName")
  public void setQName(QName qName) {
    this.qName = qName;
  }
}
