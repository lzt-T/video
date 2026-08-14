# Video

基于 Remotion 的视频项目。所有视频统一放在 `src/videos/` 下，每个视频一个独立文件夹。

## 环境

项目使用 `pnpm` 管理依赖。

```console
pnpm install
```

## 命令

启动 Remotion Studio，显示全部视频：

```console
pnpm dev
```

启动指定视频：

```console
pnpm video:dev TweetHypeVideo
```

导出指定视频到 `out/<VideoId>.mp4`：

```console
pnpm video:build TweetHypeVideo
```

保留 Remotion bundle 命令：

```console
pnpm build
```

## 新增视频

1. 在 `src/videos/` 下新建一个 PascalCase 文件夹，例如 `src/videos/NewVideo/`。
2. 在新文件夹里创建视频组件和样式文件，例如 `index.tsx`、`styles.css`。
3. 在视频文件夹里导出一个 definition，例如 `newVideoDefinition`。
4. 在 `src/videos/index.ts` 中导入并加入 `VIDEO_DEFINITIONS` 数组。

视频默认使用公共底座配置：

- `fps`: `60`
- `width`: `1920`
- `height`: `1080`

如果某个视频需要覆盖默认值，可以在自己的 definition 中声明 `fps`、`width` 或 `height`。

## 视觉规范

视频统一使用适合 16:9 横屏观看的舒适科技编辑风：

- 使用深色背景、低饱和冷蓝强调色和清晰的中文无衬线字体。
- 默认保留 `120px` 横向安全区和 `80px` 纵向安全区。
- 媒体容器统一使用 `16px` 圆角和低对比边框。
- 动效以透明度和小幅位移为主，位移不超过 `24px`，缩放不超过 `1.04`。
- 避免强辉光、舞台光束、扫描线和高密度装饰，让内容保持主要视觉层级。

公共颜色、字体、圆角和安全区变量定义在 `src/index.css`。当前只有一个视频，不提前抽象场景组件；出现真实复用需求后再提取。

## 当前视频

- `TweetHypeVideo`

## 本地生成语音

项目使用 `Qwen3-TTS-12Hz-0.6B-CustomVoice` 在本地生成中文语音。模型权重会在首次运行时下载到 Hugging Face 本机缓存，不会写入仓库。

先进入项目使用的 Conda 环境，并安装支持 RTX 5060 的 CUDA 13 PyTorch 和语音依赖：

```console
conda activate myenv
python -m pip install --upgrade torch==2.11.0+cu130 torchaudio==2.11.0+cu130 torchvision==0.26.0+cu130 --index-url https://download.pytorch.org/whl/cu130
python -m pip install -r requirements-tts.txt
```

生成或重新生成 `TweetHypeVideo` 的温暖柔和女声旁白：

```console
python scripts/generate_speech.py --text "GPT 五点六，要来了？发布前夜的想象力，正在升温。所有人都在等待，下一次跃迁。" --output "public/audio/TweetHypeVideo-narration.wav" --speaker Serena --language Chinese
```

生成脚本要求 CUDA 可用，输出目录不存在时会自动创建。可通过 `--text`、`--output`、`--speaker` 和 `--language` 为其他视频生成语音。
