package com.logsik.taman;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class SpringbootJwtApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootJwtApplication.class, args);
	}
}
