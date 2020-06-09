package io.github.edmm.tosca.lightning.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

  private final LoggingConfig.GetRequestInterceptor getRequestInterceptor;

  public WebConfig(LoggingConfig.GetRequestInterceptor getRequestInterceptor) {
    this.getRequestInterceptor = getRequestInterceptor;
  }

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedOrigins(CorsConfiguration.ALL)
      .allowedMethods(CorsConfiguration.ALL)
      .allowedHeaders(CorsConfiguration.ALL)
      .exposedHeaders("Location")
      .allowCredentials(true);
  }

  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(getRequestInterceptor);
  }
}
