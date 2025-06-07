package com.example.film_findr.user.service;

import com.example.film_findr.auth.repository.UserRepository;
import com.example.film_findr.tmdb.service.TmdbService;
import com.example.film_findr.user.dto.Content;
import com.example.film_findr.user.dto.Watchlist;
import com.example.film_findr.user.dto.WatchlistId;
import com.example.film_findr.user.repository.ContentRepository;
import com.example.film_findr.user.repository.WatchlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class WatchlistService {
    private final WatchlistRepository watchlistRepository;
    private final ContentRepository contentRepository;

    public WatchlistService(WatchlistRepository watchlistRepository, ContentRepository contentRepository) {
        this.watchlistRepository = watchlistRepository;
        this.contentRepository = contentRepository;
    }

    @Transactional
    public void addToWatchlist(UUID userId, Content content) {
        Content con = contentRepository.findById(content.getId())
                .orElseGet(() -> contentRepository.save(content));

        WatchlistId key = new WatchlistId(userId, con.getId());

        if (watchlistRepository.existsById(key)) {
            return;
        }

        watchlistRepository.save(new Watchlist(key, Instant.now()));
    }

    @Transactional
    public void removeFromWatchlist(UUID userId, String contentId) {
        watchlistRepository.removeWatchlistById(new WatchlistId(userId, contentId));
    }

    @Transactional(readOnly = true)
    public List<Content> getWatchlist(UUID userId) {
        List<Content> watchlist = contentRepository.findWatchlistContentsByUserId(userId);
        watchlist.forEach((watchlistContent) -> watchlistContent.setId(watchlistContent.getId().substring(3)));
        return watchlist;
    }
}
