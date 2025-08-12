import React from 'react';
import { useMusicPlayer } from './hooks/useMusicPlayer';
import { VinylPlayer } from './components/VinylPlayer';
import { LyricsDisplay } from './components/LyricsDisplay';
import { PlayerControls } from './components/PlayerControls';
import { musicService } from './services/musicService';
import type { Song } from './types/music';

// 示例歌词数据（用于演示）
const sampleLyrics: string[] = [
  '在音乐的海洋里遨游',
  '感受每个音符的跳动',
  '让心灵随着旋律飞翔',
  '找到属于自己的宁静',
  '音乐是灵魂的语言',
  '它能治愈所有的伤痛',
  '在旋律中找到力量',
  '继续前行不回头'
];

export const App: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    likedSongs,
    playlist,
    audioRef,
    togglePlayPause,
    nextSong,
    deleteSong,
    toggleLike,
    addSongToPlaylist,
    setSong
  } = useMusicPlayer();

  // 初始化播放列表
  React.useEffect(() => {
    const loadSongs = async () => {
      try {
        const songs = await musicService.getAllSongs();
        // 转换数据格式以匹配现有组件
        const convertedSongs = songs.map(song => ({
          ...song,
          id: song.id.toString(),
          coverUrl: song.cover,
          lyrics: sampleLyrics,
          audioUrl: song.url
        }));
        
        convertedSongs.forEach(song => addSongToPlaylist(song));
        if (convertedSongs.length > 0 && !currentSong) {
          setSong(convertedSongs[0]);
        }
      } catch (error) {
        console.error('Failed to load songs:', error);
        // 如果加载失败，使用备用数据
        const fallbackSongs: Song[] = [
          {
            id: '1',
            title: '备用音乐1',
            artist: '系统默认',
            album: '默认专辑',
            duration: '3:00',
            genre: '音乐',
            cover: '/images/covers/default.jpg',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            description: '备用音乐',
            playCount: 0,
            likeCount: 0,
            tags: ['备用'],
            uploadDate: new Date().toISOString(),
            fileSize: '3MB',
            lyrics: sampleLyrics,
            audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
          }
        ];
        
        fallbackSongs.forEach(song => addSongToPlaylist(song));
        if (fallbackSongs.length > 0 && !currentSong) {
          setSong(fallbackSongs[0]);
        }
      }
    };
    
    loadSongs();
  }, [addSongToPlaylist, setSong, currentSong]);

  const currentLyricsLine = currentSong?.lyrics && currentSong.lyrics.length ? 0 : 0;
  const isCurrentSongLiked = currentSong ? likedSongs.some(song => song.id === currentSong.id) : false;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-4 text-white">
      {/* 隐藏的音频元素 */}
      <audio 
        ref={audioRef} 
        preload="metadata"
        onPlay={() => console.log('Audio started playing')}
        onPause={() => console.log('Audio paused')}
      />

      {/* 主容器 - 响应式设计 */}
      <div className="w-full max-w-sm flex flex-col items-center space-y-6">
        
        {/* 黑胶唱片机区域 */}
        <div className="flex-shrink-0">
          {currentSong ? (
            <VinylPlayer 
              albumCover={currentSong.coverUrl} 
              isPlaying={isPlaying}
              size={280}
            />
          ) : (
            <div className="w-70 h-70 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-gray-400 text-lg">暂无歌曲</span>
            </div>
          )}
        </div>

        {/* 歌曲信息区域 */}
        <div className="text-center w-full px-4">
          {currentSong ? (
            <>
              <h1 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                {currentSong.title}
              </h1>
              <p className="text-lg text-gray-300 font-medium">
                {currentSong.artist}
              </p>
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-400 mb-1">
                选择一首歌曲
              </h1>
              <p className="text-lg text-gray-500">
                开始你的音乐之旅
              </p>
            </div>
          )}
        </div>

        {/* 进度条 */}
        {currentSong && duration > 0 && (
          <div className="w-full px-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-gray-400 min-w-[35px]">
                {formatTime(currentTime)}
              </span>
              <div className="flex-1 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 min-w-[35px]">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        )}

        {/* 歌词区域 */}
        <div className="w-full px-4 flex-1 flex items-center justify-center">
          {currentSong ? (
            <LyricsDisplay 
              lyrics={currentSong.lyrics || []}
              currentLineIndex={currentLyricsLine}
              totalLines={currentSong.lyrics?.length || 0}
            />
          ) : (
            <div className="text-center text-gray-400 text-sm py-8">
              播放歌曲查看歌词
            </div>
          )}
        </div>

        {/* 播放控制区域 */}
        <div className="w-full px-4 pb-4">
          {currentSong ? (
            <PlayerControls
              isPlaying={isPlaying}
              onNext={nextSong}
              onDelete={(songId) => deleteSong(songId)}
              onLike={(songId) => toggleLike(songId)}
              onPlayPause={togglePlayPause}
              currentSongId={currentSong.id}
              isLiked={isCurrentSongLiked}
            />
          ) : (
            <div className="flex justify-center py-8">
              <div className="text-gray-500 text-sm">
                请先添加歌曲到播放列表
              </div>
            </div>
          )}
        </div>

        {/* 播放列表信息 */}
        {playlist.length > 0 && (
          <div className="text-xs text-gray-400 text-center">
            播放列表: {playlist.length} 首歌曲
          </div>
        )}
      </div>

      {/* 全局样式已通过 index.css 处理 */}
    </div>
  );
};