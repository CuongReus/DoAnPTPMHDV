package com.logsik.taman.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationProperties {
    @Value("${spring.profiles.active}")
    private String productionMode;

    public ProductionMode getProductionMode() {
        return ProductionMode.valueOf(productionMode);
    }
}
