package com.example.film_findr.Film.Findr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(
		exclude = {DataSourceAutoConfiguration.class, SecurityAutoConfiguration.class}
)
public class FilmFindrApplication {

	public static void main(String[] args) {
		SpringApplication.run(FilmFindrApplication.class, args);
	}

}
