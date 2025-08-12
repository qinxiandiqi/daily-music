# 跨平台网络音乐播放器技术规格

## 技术栈

### 前端技术
- **框架**：React 18+
- **UI 库**：可考虑使用 Material-UI、Ant Design 或 Tailwind CSS
- **状态管理**：React Context API 或 Redux Toolkit
- **动画**：Framer Motion 或 CSS Animations
- **样式**：CSS Modules 或 Styled Components

### 后端技术（Tauri）
- **框架**：Tauri 2.x
- **语言**：Rust
- **通信**：基于 HTTP 的 API 通信

## 项目结构

```
daily-music/
├── src/                         # React 源代码
│   ├── components/              # 组件
│   │   ├── VinylPlayer.tsx     # 黑胶唱片机组件
│   │   ├── LyricsDisplay.tsx   # 歌词显示组件
│   │   └── PlayerControls.tsx   # 播放控制组件
│   ├── hooks/                  # 自定义 Hooks
│   │   ├── useMusicPlayer.ts   # 音乐播放逻辑
│   │   └── useLyricsScroll.ts   # 歌词滚动逻辑
│   ├── services/               # API 服务
│   │   └── musicService.ts     # 音乐相关 API
│   ├── store/                  # 状态管理
│   │   └── musicStore.ts       # 音乐播放状态
│   ├── utils/                  # 工具函数
│   │   ├── audioUtils.ts       # 音频处理工具
│   │   └── imageUtils.ts       # 图片处理工具
│   ├── styles/                 # 样式文件
│   │   ├── globals.css         # 全局样式
│   │   └── components/         # 组件样式
│   ├── App.tsx                 # 主应用组件
│   ├── main.tsx                # 应用入口
│   ├── index.css               # 全局样式
│   └── vite.config.ts          # Vite 配置
├── src-tauri/                  # Tauri 后端代码
│   ├── src/                    # Rust 源代码
│   │   ├── main.rs             # 主程序
│   │   └── commands.rs         # 命令处理
│   ├── Cargo.toml              # Rust 依赖
│   ├── tauri.conf.json         # Tauri 配置文件
│   ├── tauri.windows.conf.json # Windows 特定配置
│   ├── tauri.macos.conf.json  # macOS 特定配置
│   └── tauri.linux.conf.json   # Linux 特定配置
├── public/                     # 静态资源
│   ├── icons/                  # 应用图标
│   │   ├── 32x32.png
│   │   ├── 128x128.png
│   │   ├── 128x128@2x.png
│   │   ├── icon.icns
│   │   └── icon.ico
│   └── favicon.ico
├── package.json                # Node.js 依赖
├── tsconfig.json               # TypeScript 配置
├── tailwind.config.js          # Tailwind CSS 配置
├── .gitignore                  # Git 忽略文件
├── index.html                  # HTML 入口文件
├── vite.config.ts              # Vite 构建配置
├── tsconfig.node.json          # Node TypeScript 配置
└── README.md                   # 项目说明
```

## 核心组件设计

### 1. VinylPlayer 组件
```typescript
interface VinylPlayerProps {
  albumCover: string;
  isPlaying: boolean;
  size?: number; // 唱片机尺寸
}

// 功能：黑胶唱片机显示和旋转动画
```

**实现要点**：
- 使用 CSS3 动画实现唱片旋转效果
- 圆形封面图片裁剪
- 响应式尺寸设计

### 2. LyricsDisplay 组件
```typescript
interface LyricsDisplayProps {
  lyrics: string[];
  currentLineIndex: number;
  totalLines: number;
}

// 功能：歌词滚动显示
```

**实现要点**：
- 最多显示3行歌词
- 根据播放进度自动滚动
- 平滑的滚动动画效果

### 3. PlayerControls 组件
```typescript
interface PlayerControlsProps {
  isPlaying: boolean;
  onNext: () => void;
  onDelete: () => void;
  onLike: () => void;
  onPlayPause: () => void;
}

// 功能：播放控制按钮
```

**实现要点**：
- SVG 图标实现按钮样式
- 支持按钮点击和悬停效果
- 响应式布局

## 状态管理架构

### MusicStore 结构
```typescript
interface MusicState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  likedSongs: Song[];
  playlist: Song[];
}

interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  lyrics: string[];
  audioUrl: string;
}
```

## 音频播放实现

### 使用 HTML5 Audio API
```typescript
class AudioPlayer {
  private audio: HTMLAudioElement;
  private onTimeUpdate: (currentTime: number) => void;
  private onEnded: () => void;

  constructor() {
    this.audio = new Audio();
    this.setupEventListeners();
  }

  play(): void { /* ... */ }
  pause(): void { /* ... */ }
  seek(time: number): void { /* ... */ }
  setVolume(volume: number): void { /* ... */ }
}
```

## API 设计

### 前端到 Tauri 通信
```typescript
// Tauri 命令定义
#[tauri::command]
async fn get_music_list() -> Result<Vec<Song>, String>

#[tauri::command]
async fn play_music(song_id: String) -> Result<(), String>

#[tauri::command]
async fn delete_song(song_id: String) -> Result<(), String>

#[tauri::command]
async fn like_song(song_id: String, liked: bool) -> Result<(), String>
```

### 音乐数据结构
```typescript
interface MusicApiResponse {
  songs: Song[];
  total: number;
  page: number;
  pageSize: number;
}
```

## 动画实现

### 黑胶唱片旋转动画
```css
.vinyl-player {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, #1a1a1a 30%, #333 31%, #333 35%, #666 36%);
  position: relative;
  animation: rotate 3s linear infinite paused;
}

.vinyl-player.playing {
  animation-play-state: running;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### 歌词滚动动画
```css
.lyrics-container {
  transition: transform 0.5s ease-in-out;
  height: 60px; /* 3行歌词高度 */
  overflow: hidden;
}
```

## 跨平台实现

### Tauri 配置
```json
{
  "tauri": {
    "bundle": {
      "targets": ["msi", "dmg", "deb", "appimage"],
      "identifier": "com.daily-music.player",
      "icon": ["icons/32x32.png", "icons/128x128.png", "icons/128x128@2x.png", "icons/icon.icns", "icons/icon.ico"]
    }
  }
}
```

### 系统集成
- **Windows**: MSI 安装包，系统托盘支持
- **macOS**: DMG 安装包，Dock 集成
- **Linux**: DEB 和 AppImage 包

## 性能优化

### 资源加载
- 图片懒加载
- 音频流式加载
- 组件懒加载

### 内存管理
- 音频资源及时释放
- 歌词数据缓存策略
- 图片资源压缩

## 安全考虑

- 输入验证和清理
- API 通信加密
- 本地数据存储安全
- 权限控制

## 测试策略

### 单元测试
- React 组件测试
- 工具函数测试
- AudioPlayer 类测试

### 集成测试
- Tauri 命令测试
- 端到端测试
- 跨平台兼容性测试