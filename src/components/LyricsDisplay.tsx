import React from 'react';
import { useLyricsScroll } from '../hooks/useLyricsScroll';

interface LyricsDisplayProps {
  lyrics: string[];
  currentLineIndex: number;
  totalLines: number;
}

export const LyricsDisplay: React.FC<LyricsDisplayProps> = ({ 
  lyrics, 
  currentLineIndex, 
  totalLines 
}) => {
  const lyricsContainerRef = useLyricsScroll(currentLineIndex, totalLines);

  return (
    <div className="w-full h-16 overflow-hidden relative">
      <div 
        ref={lyricsContainerRef}
        className="transition-transform duration-500 ease-in-out h-full flex flex-col justify-center"
        style={{ minHeight: '4rem' }}
      >
        {lyrics.map((line, index) => (
          <div
            key={index}
            className={`text-center px-4 py-1 transition-all duration-300 chinese-font-stack ${
              index === currentLineIndex
                ? 'text-lg font-bold text-white drop-shadow-lg scale-105'
                : index >= Math.max(0, currentLineIndex - 1) && index <= Math.min(totalLines - 1, currentLineIndex + 1)
                ? 'text-sm text-gray-300'
                : 'text-sm text-gray-500 opacity-50'
            }`}
          >
            {line}
          </div>
        ))}
        
        {/* 当歌词不足3行时的占位符 */}
        {lyrics.length < 3 && Array.from({ length: 3 - lyrics.length }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="text-center px-4 py-1 text-sm text-transparent"
          >
            {'\u00A0'}
          </div>
        ))}
      </div>
      
      {/* 当前行指示器 */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-pink-500 rounded-full opacity-70 transition-all duration-300"></div>
    </div>
  );
};