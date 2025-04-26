package com.example.film_findr.Film.Findr;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class WebMvcConfigurer {
    @Bean
    public WebMvcConfigurer corsConfigurer(){
        return new WebMvcConfigurer(){
            public void addCorsMappings(CorsRegistry corsRegistry){
                corsRegistry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedHeaders("GET", "POST", "DELETE", "PUT");
            }
        };
    }
}
