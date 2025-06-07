package com.example.film_findr.user.repository;

import com.example.film_findr.user.dto.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface ContentRepository extends JpaRepository<Content, String> {
    @Query("""
           select  c
           from    Content   c
           join    Watchlist w
                 on w.id.contentId = c.id
           where   w.id.userId   = :userId
           order by w.createdAt  desc
           """)
    List<Content> findWatchlistContentsByUserId(@Param("userId") UUID userId);
}
