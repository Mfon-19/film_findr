package com.example.film_findr.Film.Findr;

import com.example.film_findr.Film.Findr.gateway.dto.Greeting;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HelloController {
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(value = "/hello", produces = "application/json")
    public Greeting hello(){
        return new Greeting("Hello World");
    }
}