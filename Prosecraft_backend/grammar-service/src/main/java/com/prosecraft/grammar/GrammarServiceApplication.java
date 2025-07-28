package com.prosecraft.grammar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class GrammarServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(GrammarServiceApplication.class, args);
    }
}
