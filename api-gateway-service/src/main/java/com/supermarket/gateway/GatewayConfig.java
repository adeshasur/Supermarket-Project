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

                // Product Service
                .route("product-service", r -> r.path("/product/**")
                        .uri("lb://product-service"))

                // Inventory Service
                .route("inventory-service", r -> r.path("/inventory/**")
                        .uri("lb://inventory-service"))

                // Customer Service
                .route("customer-service", r -> r.path("/customer/**")
                        .uri("lb://customer-service"))

                // Order Service
                .route("order-service", r -> r.path("/orders/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://ORDER-SERVICE"))


                // Payment Service
                .route("payment-service", r -> r.path("/payment/**")
                        .uri("lb://payment-service"))

                .build();
    }
}
