package io.github.edmm.tosca.lightning.service;

import java.util.Collection;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.github.edmm.tosca.lightning.utils.Consts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class RequestResponseLogger {

  private final ObjectMapper objectMapper;

  public RequestResponseLogger(ObjectMapper objectMapper) {
    this.objectMapper = objectMapper;
  }

  public void logRequest(HttpServletRequest request, Object body) {
    Map<String, String> parameters = getParameters(request);
    Map<String, String> headers = getHeaders(request);
    String details = createDetailedMessage(body, headers);
    log.info("{} {} [parameters={}]{} {}", request.getMethod(), request.getRequestURI(), parameters, Consts.NL, details);
  }

  public void logResponse(HttpServletResponse response, Object body) {
    Map<String, String> headers = getHeaders(response);
    HttpStatus status = HttpStatus.valueOf(response.getStatus());
    String details = createDetailedMessage(body, headers);
    log.info("Completed {} {}{} {}", status.value(), status.getReasonPhrase(), Consts.NL, details);
  }

  private String createDetailedMessage(Object body, Map<String, String> headers) {
    StringBuilder message = new StringBuilder();
    message.append(Consts.TAB).append(String.format("headers=%s", headers));
    if (body != null) {
      try {
        message
          .append(Consts.NL)
          .append(Consts.TAB)
          .append(String.format("body=%s", objectMapper.writeValueAsString(body)));
      } catch (Exception e) {
        log.error("Error creating log message", e);
      }
    }
    return message.toString();
  }

  private Map<String, String> getParameters(HttpServletRequest request) {
    Map<String, String> parameters = new HashMap<>();
    Enumeration<String> names = request.getParameterNames();
    while (names.hasMoreElements()) {
      String key = names.nextElement();
      String value = request.getParameter(key);
      parameters.put(key, value);
    }
    return parameters;
  }

  private Map<String, String> getHeaders(HttpServletRequest request) {
    Map<String, String> headers = new HashMap<>();
    Enumeration<String> headerNames = request.getHeaderNames();
    while (headerNames.hasMoreElements()) {
      String key = headerNames.nextElement();
      String value = request.getHeader(key);
      headers.put(key, value);
    }
    return headers;
  }

  private Map<String, String> getHeaders(HttpServletResponse response) {
    Map<String, String> headers = new HashMap<>();
    Collection<String> headerNames = response.getHeaderNames();
    for (String header : headerNames) {
      headers.put(header, response.getHeader(header));
    }
    return headers;
  }
}
