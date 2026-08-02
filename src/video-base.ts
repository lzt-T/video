import type { ComponentType } from "react";

// DEFAULT_VIDEO_SIZE defines the shared landscape output dimensions.
export const DEFAULT_VIDEO_SIZE = {
  width: 1920,
  height: 1080,
} as const;

// DEFAULT_VIDEO_FPS keeps all videos on the shared 60fps timeline.
export const DEFAULT_VIDEO_FPS = 60;

export type VideoDefinition<Props extends Record<string, unknown>> = {
  id: string;
  component: ComponentType<Props>;
  durationInFrames: number;
  defaultProps: Props;
  fps?: number;
  width?: number;
  height?: number;
};
