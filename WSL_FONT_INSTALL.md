# WSL Ubuntu 系统中文字体安装指南

## 问题分析
当前WSL Ubuntu环境中缺少中文字体支持，导致应用中的中文无法正确显示。

## 解决方案

### 方案一：本地字体文件（已实现）
✅ **当前已采用此方案**

已在项目中集成了Noto Sans SC字体文件，无需系统级安装。

**已完成的操作：**
1. ✅ 下载了Noto Sans SC字体文件（Regular, Bold, Light, Medium）
2. ✅ 创建了字体加载CSS文件 (`/public/fonts/fonts.css`)
3. ✅ 在HTML中预加载字体文件
4. ✅ 配置了字体栈，优先使用本地Noto Sans SC字体

### 方案二：系统级字体安装（可选）
如果希望获得更好的字体支持，可以执行以下命令安装系统级中文字体：

```bash
# 更新包管理器
sudo apt update

# 安装中文字体包
sudo apt install -y fonts-noto-cjk fonts-wqy-zenhei fonts-wqy-microhei

# 或者安装完整的中文字体集合
sudo apt install -y fonts-arphic-ukai fonts-arphic-uming
```

### 方案三：用户级字体安装
如果没有sudo权限，可以安装到用户目录：

```bash
# 创建用户字体目录
mkdir -p ~/.local/share/fonts

# 下载字体到用户目录
curl -L -o ~/.local/share/fonts/NotoSansSC-Regular.ttf "https://fonts.gstatic.com/s/notosanssc/v36/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_z7GZj.woff2"

# 刷新字体缓存
fc-cache -fv
```

## 验证字体安装

检查系统中文字体：

```bash
# 查看已安装的中文字体
fc-list :lang=zh

# 查看具体字体路径
fc-list :lang=zh family | head -10
```

## 当前字体配置

项目已配置以下字体栈（按优先级排序）：
1. `Noto Sans SC` - 本地Google Fonts中文
2. `PingFang SC` - macOS系统中文
3. `Hiragino Sans GB` - macOS系统中文
4. `Microsoft YaHei` - Windows系统中文
5. `Source Han Sans SC` - Adobe中文字体
6. `WenQuanYi Micro Hei` - Linux开源中文字体
7. 系统默认中文字体

## 字体文件详情

- **Noto Sans SC Regular** - 400字重
- **Noto Sans SC Medium** - 500字重
- **Noto Sans SC Bold** - 700字重
- **Noto Sans SC Light** - 300字重

Unicode范围覆盖：
- 基本汉字 (U+4E00-U+9FFF)
- 扩展A区汉字 (U+3400-U+4DBF)
- 兼容汉字 (U+F900-U+FAFF)

## 跨平台兼容性

此方案在以下环境中都能正常工作：
- ✅ WSL Ubuntu（已实现）
- ✅ Windows
- ✅ macOS
- ✅ 其他Linux发行版
- ✅ 浏览器环境

## 注意事项

1. **字体加载性能**：本地字体文件首次加载可能需要额外时间
2. **文件大小**：字体文件约几MB，已使用woff2格式压缩
3. **缓存策略**：浏览器会缓存字体文件，重复访问无需重新加载
4. **字体回退**：如果本地字体加载失败，会回退到系统默认字体

## 故障排除

如果中文仍然显示不正常，请检查：

1. **网络连接**：确保能访问Google Fonts CDN
2. **浏览器缓存**：清除浏览器缓存并刷新页面
3. **字体文件**：检查`/public/fonts/`目录下的文件是否完整
4. **CSS加载**：确保浏览器加载了`/fonts/fonts.css`文件

---
*此文档为WSL Ubuntu环境中文字体问题的完整解决方案*