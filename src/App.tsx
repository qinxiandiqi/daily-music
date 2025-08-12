import React from 'react';
import { useMusicPlayer } from './hooks/useMusicPlayer';
import { VinylPlayer } from './components/VinylPlayer';
import { LyricsDisplay } from './components/LyricsDisplay';
import { PlayerControls } from './components/PlayerControls';
import type { Song } from './types/music';

// 示例歌曲数据
const sampleSongs: Song[] = [
  {
    id: '1',
    title: '夜的钢琴曲',
    artist: '石进',
    coverUrl: 'https://via.placeholder.com/400/6366f1/ffffff?text=Album+1',
    lyrics: [
      '夜的钢琴曲五',
      '安静的夜晚',
      '只有钢琴的声音',
      '陪伴着孤独的心',
      '在黑暗中',
      '寻找光明',
      '在音乐中',
      '找到自己'
    ],
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    id: '2', 
    title: '梦中的婚礼',
    artist: '理查德·克莱德曼',
    coverUrl: 'https://via.placeholder.com/400/ec4899/ffffff?text=Album+2',
    lyrics: [
      '梦中的婚礼',
      '白色的婚纱',
      '美丽的誓言',
      '永远的爱恋',
      '在教堂里',
      '音乐响起',
      '幸福的泪水',
      '流淌在心底'
    ],
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
  },
  {
    id: '3',
    title: 'River Flows in You',
    artist: 'Yiruma',
    coverUrl: 'https://via.placeholder.com/400/10b981/ffffff?text=Album+3',
    lyrics: [
      '河流在你心中流淌',
      '温柔而清澈',
      '如同思念一般',
      '永不停息',
      '穿过山川',
      '越过海洋',
      '最终回到你的身边'
    ],
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
  }
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
    sampleSongs.forEach(song => addSongToPlaylist(song));
    if (sampleSongs.length > 0 && !currentSong) {
      setSong(sampleSongs[0]);
    }
  }, [addSongToPlaylist, setSong, currentSong]);

  const currentLyricsLine = currentSong?.lyrics.length ? 0 : 0;
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
              lyrics={currentSong.lyrics}
              currentLineIndex={currentLyricsLine}
              totalLines={currentSong.lyrics.length}
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
              onDelete={deleteSong}
              onLike={toggleLike}
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