package com.supermarket.gateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRoutes(RouteLocatorBuilder builder) {
        return builder.routes()

                // Product Service (Updated)
                .route("product-service", r -> r.path("/product/**")
                        .filters(f -> f.stripPrefix(1)) 
                        .uri("lb://product-service"))

                // Inventory Service (Updated)
                .route("inventory-service", r -> r.path("/inventory/**")
                        .filters(f -> f.stripPrefix(1)) 
                        .uri("lb://inventory-service"))

                // Customer Service
                .route("customer-service", r -> r.path("/customer/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://customer-service"))

                // Order Service 
                .route("order-service", r -> r.path("/orders/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://ORDER-SERVICE"))

                // Payment Service
                .route("payment-service", r -> r.path("/payment/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://payment-service"))

                .build();
    }
}