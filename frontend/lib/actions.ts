"use server";

import { authOptions } from "@/auth";
import {
  Content,
  LoginRequest,
  LoginResponse,
  MovieDetails,
  MovieResult,
  RegisterRequest,
  Show,
  ShowDetails,
} from "./types";
import { getServerSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { number } from "zod";
import { pages } from "next/dist/build/templates/app-page";
import { UUID } from "crypto";

const API_URL = "http://localhost:8080/api";

export async function login({ email, password }: LoginRequest) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const result: LoginResponse = await response.json();

    return result;
  } catch (error) {
    console.error(`An error occurred while fetching user: ${error}`);
  }
}

export async function register({ email, password, username }: RegisterRequest) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });

    const result: LoginResponse = await response.json();

    return result;
  } catch (error) {
    console.error(`An error occurred while registering user: ${error}`);
  }
}

export async function refreshAccessToken(token: JWT) {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      headers: {
        authorization: `Bearer ${token.refreshToken}`,
      },
      method: "POST",
    });

    if (!response.ok) throw new Error("Refresh error");

    const data: LoginResponse = await response.json();

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + data.accessExpiresIn * 1000,
      refreshToken: data.refreshToken ?? token.refreshToken,
    };
  } catch (err) {
    console.error("Unable to refresh:", err);
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
}

export async function getTrendingMovies() {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/movies/trending`, {
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
      },
      next: { revalidate: 86_400 },
    });

    const result: MovieResult[] = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch trending movies: ${error}`);
  }
}

export async function getMovieById(id: string) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/movies/movie-details`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
        "content-type": "application/json",
      },
      next: { revalidate: 86_400 },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      throw new Error("Error fetching movie details");
    }
    const result: MovieDetails = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch movie by id: ${error}`);
  }
}

export async function getMoviesById(ids: string[]) {
  try {
    const response = await Promise.all(ids.map((id) => getMovieById(id)));
    const movies = response.filter(
      (movie): movie is MovieDetails => movie !== undefined
    );
    return movies;
  } catch (error) {
    console.error(`Failed to fetch movies by id: ${error}`);
  }
}

export async function getTopRatedMovies() {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/movies/top-rated`, {
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
      },
      next: { revalidate: 86_400 },
    });

    if (!response.ok) {
      throw new Error("Error fetching top rated movies");
    }

    const result: MovieResult[] = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch top rated movies: ${error}`);
  }
}

export async function getTrendingShows() {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/tv/trending`, {
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
      },
      next: { revalidate: 86_400 },
    });

    const result: Show[] = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch trending movies: ${error}`);
  }
}

export async function getTopRatedShows() {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/tv/top-rated`, {
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
      },
      next: { revalidate: 86_400 },
    });

    if (!response.ok) {
      throw new Error("Error fetching top rated shows");
    }

    const result: Show[] = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch top rated shows: ${error}`);
  }
}

export async function getShowById(id: string) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/tv/show-details`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
        "content-type": "application/json",
      },
      next: { revalidate: 86_400 },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      throw new Error("Error fetching show details");
    }
    const result: ShowDetails = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch movie by id: ${error}`);
  }
}

export async function getMovies(filters?: {
  sortBy?: string;
  genres?: string[];
  rating?: number;
  year?: number;
  language?: string;
  page?: number;
}) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/movies/discover`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ page: filters?.page || 1 }),
      next: { revalidate: 86_400 },
    });

    if (!response.ok) {
      throw new Error("Error fetching movies");
    }

    let result: MovieResult[] = await response.json();

    if (filters) {
      if (filters.genres && filters.genres.length > 0) {
        result = result.filter((movie) =>
          movie.genreIds?.some((genreId) => filters.genres!.includes(genreId))
        );
      }

      if (filters.rating && filters.rating > 0) {
        result = result.filter((movie) => movie.voteAverage >= filters.rating!);
      }

      if (filters.year && filters.year !== 2025) {
        result = result.filter((movie) => {
          const movieYear = new Date(movie.releaseDate).getFullYear();
          return movieYear === filters.year;
        });
      }

      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "vote_average.desc":
            result.sort((a, b) => b.voteAverage - a.voteAverage);
            break;
          case "primary_release_date.desc":
            result.sort(
              (a, b) =>
                new Date(b.releaseDate).getTime() -
                new Date(a.releaseDate).getTime()
            );
            break;
          case "popularity.desc":
          default:
            break;
        }
      }
    }

    return result;
  } catch (error) {
    console.error(`Failed to fetch movies: ${error}`);
  }
}

export async function getShows(filters?: {
  sortBy?: string;
  genres?: string[];
  rating?: number;
  year?: number;
  language?: string;
  page?: number;
}) {
  const session = await getServerSession(authOptions);
  try {
    console.log("page: ", filters?.page);
    const response = await fetch(`${API_URL}/tv/discover`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ page: filters?.page || 1 }),
      next: { revalidate: 86_400 },
    });

    if (!response.ok) {
      throw new Error("Error fetching shows");
    }

    let result: Show[] = await response.json();

    if (filters) {
      if (filters.genres && filters.genres.length > 0) {
        result = result.filter((show) =>
          show.genres?.some((genre) => filters.genres!.includes(genre))
        );
      }

      if (filters.rating && filters.rating > 0) {
        result = result.filter((show) => show.voteAverage >= filters.rating!);
      }

      if (filters.language && filters.language !== "en") {
        result = result.filter(
          (show) => show.originalLanguage === filters.language
        );
      }

      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "vote_average.desc":
            result.sort((a, b) => b.voteAverage - a.voteAverage);
            break;
          case "primary_release_date.desc":
            break;
          case "popularity.desc":
          default:
            break;
        }
      }
    }

    return result;
  } catch (error) {
    console.error(`Failed to fetch shows: ${error}`);
  }
}

export async function getSimilarMovies(id: string) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/movies/similar`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
      next: { revalidate: 86_400 },
    });

    if (!response.ok) {
      throw new Error("Error fetching similar movies");
    }

    const result: MovieResult[] = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch movies: ${error}`);
  }
}

export async function getSimilarShows(id: string) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/tv/similar`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
      next: { revalidate: 86_400 },
    });

    if (!response.ok) {
      throw new Error("Error fetching similar shows");
    }

    const result: Show[] = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch similar shows: ${error}`);
  }
}

export async function searchMovies(query: string) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/movies/search`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ query: query }),
      next: { revalidate: 86_400 },
    });

    if (!response.ok) {
      throw new Error("Error searching movies");
    }

    const result: MovieResult[] = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch movies: ${error}`);
  }
}

export async function searchShows(query: string) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/tv/search`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ query: query }),
      next: { revalidate: 86_400 },
    });

    if (!response.ok) {
      throw new Error("Error searching shows");
    }

    const result: Show[] = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch shows: ${error}`);
  }
}

export async function getWatchlist() {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/user/get-watchlist`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user.id as UUID}),
    });

    if (!response.ok) {
      throw new Error("Error fetching watchlist");
    }

    const result: Content[] = await response.json();
    return result;
  } catch (error) {
    console.error(`Failed to fetch watchlist: ${error}`);
  }
}

export async function addToWatchlist(content: Content) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/user/add-to-watchlist`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user.id as UUID, content: content }),
    });

    if (!response.ok) {
      console.log("The response is: ", response)
      throw new Error("Error adding to watchlist");
    }
  } catch (error) {
    console.error(`Failed to add to watchlist: ${error}`);
  }
}

export async function removeFromWatchlist(contentId: string) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${API_URL}/user/remove-from-watchlist`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${session?.accessToken?.toString()}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ userId: session?.user.id, contentId: contentId }),
    });

    if (!response.ok) {
      throw new Error("Error deleting from watchlist");
    }
  } catch (error) {
    console.error(`Failed to fetch shows: ${error}`);
  }
}
