package com.example.film_findr.user.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.security.Timestamp;
import java.time.Instant;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Content {
    @Id
    private String id;
    @Column(name = "item_type", nullable = false)
    private String itemType;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private Double rating;
    @Column(name = "poster_path", nullable = false)
    private String posterPath;
    @Column(nullable = false)
    private String overview;
    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private Instant createdAt;
}
