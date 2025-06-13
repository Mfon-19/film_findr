import { UUID } from "crypto";
import "next-auth";

export interface Movie {
  id: number;
  title: string;
  alt: string;
  imgSrc: string;
  overview: string;
}

export interface MovieResult extends Movie {
  posterPath: string;
  releaseDate: string;
  voteAverage: number;
  genreIds: string[];
}

export interface MovieDetails extends MovieResult {
  adult: boolean;
  runtime: number;
  backdropPath: string;
  genres: string[];
  language: string;
}

export interface User {
  id: UUID;
  username: string;
  email: string;
  roles: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  accessExpiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
  user: User;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    accessTokenExpires?: string;
    refreshToken?: string;
    user: {
      id: string;
      email: string;
      username?: string;
    };
  }

  interface User {
    accessToken?: string;
    accessTokenExpires?: string;
    refreshToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
  }
}

export interface Show {
  id: number;
  name: string;
  adult: boolean;
  overview: string;
  originalLanguage: string;
  posterPath: string;
  backdropPath: string;
  alt?: string;
  genres: string[];
  voteAverage: number;
}

export interface ShowDetails extends Show {
  createdBy: CreatedBy[];
  firstAirDate: string;
  lastAirDate: string;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  status: string;
  seasons: SeasonDetails[];
}
export interface SeasonDetails {
  id: number;
  episodes: EpisodeDetails[];
  posterPath: string;
  seasonNumber: number;
  voteAverage: number;
  airDate: string;
}

export interface EpisodeDetails {
  id: number;
  name: string;
  overview: string;
  runtime: number;
  episodeNumber: number;
  seasonNumber: number;
  stillPath: string;
}

interface CreatedBy {
  name: string;
}

export type MediaType = "movies" | "tv";

export interface MediaCardProps {
  type: MediaType;
  id?: number;
  src: string;
  title: string;
  rating: number;
  description?: string;
  year?: number;
  alt?: string;
  firstAirDate?: string;
  releaseDate?: string;
}

export interface MediaCardContentProps extends MediaCardProps {
  displayYear: number | undefined;
  imageSrc: string;
}

export interface BasicInfoProps {
  title: string;
  displayYear: number | undefined;
  rating: number;
}

export interface ActionButtonsProps {
  onPlayClick?: (e: React.MouseEvent) => void;
  onAddClick?: (e: React.MouseEvent) => void;
}

export interface PosterImageProps {
  src: string;
  alt: string;
  aspectRatio?: "poster" | "landscape";
  className?: string;
}

export interface HoverDetailPanelProps {
  imageSrc: string;
  alt: string;
  title: string;
  rating: number;
  displayYear: number | undefined;
  description: string;
  type: MediaType;
  onPlayClick?: (e: React.MouseEvent) => void;
  onAddClick?: (e: React.MouseEvent) => void;
}

export interface Content {
  id: string;
  itemType: string;
  title: string;
  rating: number;
  posterPath: string;
  overview: string;
  createdAt: string;
}

export interface Watchlist {
  id: WatchlistId;
  createdAt: string;
}

export interface WatchlistId {
  userId: string;
  contentId: string;
}
