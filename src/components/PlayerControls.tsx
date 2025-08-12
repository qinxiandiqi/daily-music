import React from 'react';

interface PlayerControlsProps {
  isPlaying: boolean;
  onNext: () => void;
  onDelete: (songId: string) => void;
  onLike: (songId: string) => void;
  onPlayPause: () => void;
  currentSongId?: string;
  isLiked?: boolean;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  isPlaying,
  onNext,
  onDelete,
  onLike,
  onPlayPause,
  currentSongId,
  isLiked = false
}) => {
  const handlePlayPause = () => {
    onPlayPause();
  };

  const handleNext = () => {
    onNext();
  };

  const handleDelete = () => {
    if (currentSongId) {
      onDelete(currentSongId);
    }
  };

  const handleLike = () => {
    if (currentSongId) {
      onLike(currentSongId);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-6 py-4">
      {/* 播放/暂停按钮 */}
      <button
        onClick={handlePlayPause}
        className="w-14 h-14 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm"
        aria-label={isPlaying ? "暂停" : "播放"}
      >
        {isPlaying ? (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* 下一曲按钮 */}
      <button
        onClick={handleNext}
        className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm"
        aria-label="下一曲"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
        </svg>
      </button>

      {/* 删除按钮 */}
      <button
        onClick={handleDelete}
        className="w-12 h-12 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm"
        aria-label="删除歌曲"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      </button>

      {/* 喜欢按钮 */}
      <button
        onClick={handleLike}
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm ${
          isLiked 
            ? 'bg-pink-500 hover:bg-pink-600' 
            : 'bg-white bg-opacity-20 hover:bg-opacity-30'
        }`}
        aria-label={isLiked ? "取消喜欢" : "喜欢歌曲"}
      >
        <svg className={`w-5 h-5 ${isLiked ? 'text-white' : 'text-white'}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};