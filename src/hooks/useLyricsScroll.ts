import { useEffect, useRef } from 'react';

export function useLyricsScroll(
  currentLineIndex: number, 
  totalLines: number,
  containerHeight: number = 60
) {
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = lyricsContainerRef.current;
    if (!container) return;

    // 计算滚动位置，让当前行居中显示
    const linesToShow = 3;
    const itemHeight = containerHeight / linesToShow;
    const targetScrollPosition = (currentLineIndex - Math.floor(linesToShow / 2)) * itemHeight;

    // 平滑滚动到目标位置
    container.scrollTo({
      top: targetScrollPosition,
      behavior: 'smooth'
    });

  }, [currentLineIndex, totalLines, containerHeight]);

  return lyricsContainerRef;
}