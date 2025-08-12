export interface Song {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  duration?: string;
  genre?: string;
  cover?: string;
  coverUrl?: string;
  url?: string;
  audioUrl?: string;
  description?: string;
  playCount?: number;
  likeCount?: number;
  tags?: string[];
  uploadDate?: string;
  fileSize?: string;
  lyrics?: string[];
}

export interface MusicState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  likedSongs: Song[];
  playlist: Song[];
  repeatMode: 'none' | 'one' | 'all';
  shuffleMode: boolean;
}

export interface Playlist {
  id: number;
  name: string;
  description: string;
  songs: Song[];
  cover: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchFilters {
  genre?: string;
  artist?: string;
  album?: string;
  tags?: string[];
  duration?: {
    min: number;
    max: number;
  };
  uploadDate?: {
    start: string;
    end: string;
  };
}

export interface SearchResult {
  songs: Song[];
  total: number;
  page: number;
  limit: number;
}