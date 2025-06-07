package com.example.film_findr.user.repository;

import com.example.film_findr.user.dto.Watchlist;
import com.example.film_findr.user.dto.WatchlistId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface WatchlistRepository extends JpaRepository<Watchlist, WatchlistId> {
    void removeWatchlistById(WatchlistId watchlistId);
    List<Watchlist> findByIdUserIdOrderByCreatedAtDesc(UUID userId);
}
