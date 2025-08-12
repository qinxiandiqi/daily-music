import React from 'react';

interface VinylPlayerProps {
  albumCover?: string;
  isPlaying: boolean;
  size?: number;
}

export const VinylPlayer: React.FC<VinylPlayerProps> = ({ 
  albumCover, 
  isPlaying, 
  size = 280 
}) => {
  const vinylSize = size;
  const coverSize = size * 0.6; // 封面图片大小为唱片直径的60%
  const centerHoleSize = size * 0.1; // 中心孔大小为唱片直径的10%

  return (
    <div 
      className="flex items-center justify-center relative"
      style={{ width: vinylSize, height: vinylSize }}
    >
      {/* 黑胶唱片主体 */}
      <div 
        className={`absolute rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-4 border-gray-700 ${
          isPlaying ? 'animate-spin' : ''
        }`}
        style={{ 
          width: vinylSize, 
          height: vinylSize,
          animationDuration: '3s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: isPlaying ? 'running' : 'paused'
        }}
      >
        {/* 黑胶唱片纹路 */}
        <div className="absolute inset-0 rounded-full">
          {/* 外圈纹路 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border border-gray-600 opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border border-gray-600 opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full border border-gray-600 opacity-15"></div>
          
          {/* 中圈纹路 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full border border-gray-500 opacity-40"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full border border-gray-500 opacity-30"></div>
          
          {/* 中心标签 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25%] h-[25%] bg-red-600 rounded-full flex items-center justify-center">
            <div className="w-[20%] h-[20%] bg-black rounded-full"></div>
          </div>
        </div>
      </div>

      {/* 封面图片 */}
      <div 
        className="absolute rounded-full overflow-hidden border-4 border-white shadow-lg"
        style={{ 
          width: coverSize, 
          height: coverSize,
          top: `calc(50% - ${coverSize / 2}px)`,
          left: `calc(50% - ${coverSize / 2}px)`
        }}
      >
        <img 
          src={albumCover} 
          alt="Album Cover" 
          className="w-full h-full object-cover"
          onError={(e) => {
            // 如果图片加载失败，显示默认占位符
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const placeholder = target.parentElement?.querySelector('.placeholder');
            if (placeholder) {
              (placeholder as HTMLElement).style.display = 'flex';
            }
          }}
        />
        <div className="placeholder absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-bold" style={{ display: 'none' }}>
          MUSIC
        </div>
      </div>

      {/* 中心孔 */}
      <div 
        className="absolute bg-black rounded-full border border-gray-600"
        style={{ 
          width: centerHoleSize, 
          height: centerHoleSize,
          top: `calc(50% - ${centerHoleSize / 2}px)`,
          left: `calc(50% - ${centerHoleSize / 2}px)`
        }}
      ></div>
    </div>
  );
};