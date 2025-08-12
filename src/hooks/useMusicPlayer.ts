import { useState, useRef, useEffect } from 'react';
import type { Song, MusicState } from '../types/music';

export function useMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<MusicState>({
    currentSong: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    likedSongs: [],
    playlist: []
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleLoadedMetadata = () => {
      setState(prev => ({ ...prev, duration: audio.duration }));
    };

    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false }));
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setState(prev => ({ ...prev, isPlaying: true }));
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setState(prev => ({ ...prev, isPlaying: false }));
    }
  };

  const setSong = (song: Song) => {
    if (audioRef.current) {
      audioRef.current.src = song.audioUrl;
      audioRef.current.load();
      setState(prev => ({ 
        ...prev, 
        currentSong: song,
        currentTime: 0,
        isPlaying: false 
      }));
    }
  };

  const togglePlayPause = () => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const nextSong = () => {
    if (state.playlist.length === 0 || !state.currentSong) return;
    
    const currentIndex = state.playlist.findIndex(song => song.id === state.currentSong?.id);
    const nextIndex = (currentIndex + 1) % state.playlist.length;
    setSong(state.playlist[nextIndex]);
  };

  const deleteSong = (songId: string) => {
    const newPlaylist = state.playlist.filter(song => song.id !== songId);
    const newLikedSongs = state.likedSongs.filter(song => song.id !== songId);
    
    setState(prev => ({ 
      ...prev, 
      playlist: newPlaylist,
      likedSongs: newLikedSongs
    }));

    if (state.currentSong?.id === songId) {
      if (newPlaylist.length > 0) {
        const currentIndex = state.playlist.findIndex(song => song.id === songId);
        const nextIndex = currentIndex < newPlaylist.length ? currentIndex : 0;
        setSong(newPlaylist[nextIndex]);
      } else {
        setState(prev => ({ ...prev, currentSong: null, isPlaying: false }));
      }
    }
  };

  const toggleLike = (songId: string) => {
    const song = state.playlist.find(s => s.id === songId);
    if (!song) return;

    setState(prev => {
      const isLiked = prev.likedSongs.some(s => s.id === songId);
      let newLikedSongs;
      
      if (isLiked) {
        newLikedSongs = prev.likedSongs.filter(s => s.id !== songId);
      } else {
        newLikedSongs = [...prev.likedSongs, song];
      }

      return { ...prev, likedSongs: newLikedSongs };
    });
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setState(prev => ({ ...prev, volume }));
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState(prev => ({ ...prev, currentTime: time }));
    }
  };

  const addSongToPlaylist = (song: Song) => {
    setState(prev => {
      const isAlreadyInPlaylist = prev.playlist.some(s => s.id === song.id);
      if (!isAlreadyInPlaylist) {
        return { ...prev, playlist: [...prev.playlist, song] };
      }
      return prev;
    });
  };

  return {
    ...state,
    audioRef,
    play,
    pause,
    setSong,
    togglePlayPause,
    nextSong,
    deleteSong,
    toggleLike,
    setVolume,
    seek,
    addSongToPlaylist
  };
}