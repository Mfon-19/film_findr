package com.example.film_findr.auth.repository;

import com.example.film_findr.auth.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, String> {
    boolean existsByEmail(String email);
    Optional<User> findByEmailIgnoreCase(String email);
}
