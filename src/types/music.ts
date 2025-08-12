export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  lyrics: string[];
  audioUrl: string;
}

export interface MusicState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  likedSongs: Song[];
  playlist: Song[];
}