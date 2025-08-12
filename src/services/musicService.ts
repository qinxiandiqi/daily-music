import { Song, SearchFilters, SearchResult } from '../types/music';

// 模拟歌曲数据 - 动态导入JSON文件
let mockSongs: Song[] = [];

// 初始化函数，加载JSON数据
async function initializeMockSongs() {
  if (mockSongs.length === 0) {
    const songData = await import('../data/mock-songs.json');
    mockSongs = JSON.parse(JSON.stringify(songData.default || songData));
  }
}

class MusicService {
  // 获取所有歌曲
  async getAllSongs(): Promise<Song[]> {
    await initializeMockSongs();
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockSongs), 500); // 模拟网络延迟
    });
  }

  // 根据ID获取歌曲
  async getSongById(id: number): Promise<Song | null> {
    await initializeMockSongs();
    return new Promise((resolve) => {
      setTimeout(() => {
        const song = mockSongs.find(song => song.id === id);
        resolve(song || null);
      }, 300);
    });
  }

  // 搜索歌曲
  async searchSongs(query: string, filters?: SearchFilters, page: number = 1, limit: number = 10): Promise<SearchResult> {
    await initializeMockSongs();
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredSongs = [...mockSongs];

        // 文本搜索
        if (query.trim()) {
          const searchQuery = query.toLowerCase();
          filteredSongs = filteredSongs.filter(song =>
            song.title.toLowerCase().includes(searchQuery) ||
            song.artist.toLowerCase().includes(searchQuery) ||
            (song.album && song.album.toLowerCase().includes(searchQuery)) ||
            (song.tags && song.tags.some(tag => tag.toLowerCase().includes(searchQuery)))
          );
        }

        // 过滤器应用
        if (filters) {
          if (filters.genre) {
            filteredSongs = filteredSongs.filter(song => song.genre === filters.genre);
          }
          if (filters.artist) {
            filteredSongs = filteredSongs.filter(song => 
              song.artist.toLowerCase().includes(filters.artist!.toLowerCase())
            );
          }
          if (filters.album) {
            filteredSongs = filteredSongs.filter(song => 
              song.album && song.album.toLowerCase().includes(filters.album!.toLowerCase())
            );
          }
          if (filters.tags && filters.tags.length > 0) {
            filteredSongs = filteredSongs.filter(song =>
              song.tags && filters.tags!.some(tag => song.tags!.includes(tag))
            );
          }
        }

        // 分页
        const total = filteredSongs.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedSongs = filteredSongs.slice(startIndex, endIndex);

        resolve({
          songs: paginatedSongs,
          total,
          page,
          limit
        });
      }, 800);
    });
  }

  // 获取热门歌曲
  async getPopularSongs(limit: number = 10): Promise<Song[]> {
    await initializeMockSongs();
    return new Promise((resolve) => {
      setTimeout(() => {
        const sortedSongs = [...mockSongs].sort((a, b) => (b.playCount || 0) - (a.playCount || 0));
        resolve(sortedSongs.slice(0, limit));
      }, 400);
    });
  }

  // 获取推荐歌曲
  async getRecommendedSongs(): Promise<Song[]> {
    await initializeMockSongs();
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟推荐算法，返回一些随机但高质量的歌曲
        const recommended = [...mockSongs]
          .sort(() => Math.random() - 0.5)
          .filter(song => (song.likeCount || 0) > 200)
          .slice(0, 8);
        resolve(recommended);
      }, 600);
    });
  }

  // 获取按流派分类的歌曲
  async getSongsByGenre(genre: string): Promise<Song[]> {
    await initializeMockSongs();
    return new Promise((resolve) => {
      setTimeout(() => {
        const genreSongs = mockSongs.filter(song => song.genre === genre);
        resolve(genreSongs);
      }, 350);
    });
  }

  // 获取所有可用流派
  async getGenres(): Promise<string[]> {
    await initializeMockSongs();
    return new Promise((resolve) => {
      setTimeout(() => {
        const genres = [...new Set(mockSongs.map(song => song.genre).filter((genre): genre is string => Boolean(genre)))];
        resolve(genres);
      }, 200);
    });
  }

  // 获取所有标签
  async getAllTags(): Promise<string[]> {
    await initializeMockSongs();
    return new Promise((resolve) => {
      setTimeout(() => {
        const allTags = mockSongs.flatMap(song => song.tags || []).filter((tag): tag is string => Boolean(tag));
        const uniqueTags = [...new Set(allTags)];
        resolve(uniqueTags.sort());
      }, 300);
    });
  }

  // 模拟获取歌曲播放次数
  async incrementPlayCount(songId: number): Promise<void> {
    await initializeMockSongs();
    return new Promise((resolve) => {
      setTimeout(() => {
        const songIndex = mockSongs.findIndex(song => song.id === songId);
        if (songIndex !== -1) {
          mockSongs[songIndex].playCount = (mockSongs[songIndex].playCount || 0) + 1;
        }
        resolve();
      }, 100);
    });
  }
}

export const musicService = new MusicService();
export default musicService;