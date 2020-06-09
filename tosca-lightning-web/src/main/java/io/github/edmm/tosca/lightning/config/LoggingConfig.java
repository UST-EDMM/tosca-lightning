package io.github.edmm.tosca.lightning.config;

import java.lang.reflect.Type;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import io.github.edmm.tosca.lightning.service.RequestResponseLogger;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdviceAdapter;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import static org.springframework.boot.web.servlet.DispatcherType.REQUEST;
import static org.springframework.http.HttpMethod.GET;

@Configuration
public class LoggingConfig {

  @Component
  public static class GetRequestInterceptor implements HandlerInterceptor {

    private final RequestResponseLogger logger;

    public GetRequestInterceptor(RequestResponseLogger logger) {
      this.logger = logger;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
      if (REQUEST.name().equals(request.getDispatcherType().name()) && GET.name().equals(request.getMethod())) {
        logger.logRequest(request, null);
      }
      return true;
    }
  }

  @ControllerAdvice
  public static class CustomRequestBodyAdviceAdapter extends RequestBodyAdviceAdapter {

    private final RequestResponseLogger logger;
    private final HttpServletRequest request;

    public CustomRequestBodyAdviceAdapter(RequestResponseLogger logger, HttpServletRequest request) {
      this.logger = logger;
      this.request = request;
    }

    @Override
    public boolean supports(MethodParameter methodParameter, Type targetType,
                            Class<? extends HttpMessageConverter<?>> converterType) {
      return true;
    }

    @Override
    public Object afterBodyRead(Object body, HttpInputMessage inputMessage, MethodParameter parameter,
                                Type targetType, Class<? extends HttpMessageConverter<?>> converterType) {
      logger.logRequest(request, body);
      return super.afterBodyRead(body, inputMessage, parameter, targetType, converterType);
    }
  }

  @ControllerAdvice
  public static class CustomResponseBodyAdvice implements ResponseBodyAdvice<Object> {

    private final RequestResponseLogger logger;

    public CustomResponseBodyAdvice(RequestResponseLogger logger) {
      this.logger = logger;
    }

    @Override
    public boolean supports(MethodParameter returnType, Class<? extends HttpMessageConverter<?>> converterType) {
      return true;
    }

    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType, MediaType selectedContentType,
                                  Class<? extends HttpMessageConverter<?>> selectedConverterType,
                                  ServerHttpRequest request, ServerHttpResponse response) {
      if (response instanceof ServletServerHttpResponse) {
        logger.logResponse(((ServletServerHttpResponse) response).getServletResponse(), body);
      }
      return body;
    }
  }
}
