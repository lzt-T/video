declare namespace NodeJS {
  type ProcessEnv = {
    REMOTION_VIDEO_ID?: string;
  } & Record<string, string | undefined>;
}

declare const process: {
  env: NodeJS.ProcessEnv;
};
