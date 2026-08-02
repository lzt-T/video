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

## 当前视频

- `TweetHypeVideo`
