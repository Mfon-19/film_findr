package com.example.film_findr.user.dto;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.Instant;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Watchlist {
    @EmbeddedId
    private WatchlistId id;
    @Column(name = "created_at", nullable = false,
            updatable = false, insertable = false)
    @CreationTimestamp
    private Instant createdAt;
}
