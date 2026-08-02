#!/usr/bin/env node

import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

// REMOTION_CLI_ENTRY is the local Remotion JS CLI entry used by every video command.
const REMOTION_CLI_ENTRY = path.join(
  process.cwd(),
  "node_modules",
  "@remotion",
  "cli",
  "remotion-cli.js",
);

// USAGE_TEXT explains the expected command shape.
const USAGE_TEXT = [
  "Usage:",
  "  pnpm video:dev <VideoId>",
  "  pnpm video:build <VideoId>",
].join("\n");

// ACTION_ARG is the command mode passed by the package script.
const ACTION_ARG = process.argv[2];

// VIDEO_ID_ARG is the Remotion composition id to open or render.
const VIDEO_ID_ARG = process.argv[3];

/** Builds the Remotion CLI arguments for the selected action. */
const getRemotionArgs = (action, videoId) => {
  // actionArgs maps each supported action to its Remotion CLI arguments.
  const actionArgs = {
    dev: ["studio", "src/index.ts"],
    build: ["render", "src/index.ts", videoId, path.join("out", `${videoId}.mp4`)],
  };

  return actionArgs[action];
};

/** Prints usage information and exits with a failure status. */
const exitWithUsage = () => {
  console.error(USAGE_TEXT);
  process.exit(1);
};

if (!ACTION_ARG || !VIDEO_ID_ARG) {
  exitWithUsage();
}

// remotionArgs is the final argument list passed to the Remotion CLI.
const remotionArgs = getRemotionArgs(ACTION_ARG, VIDEO_ID_ARG);

if (!remotionArgs) {
  exitWithUsage();
}

if (ACTION_ARG === "build") {
  mkdirSync("out", { recursive: true });
}

// childProcess runs the local Remotion command with the selected video id injected.
const childProcess = spawn(process.execPath, [REMOTION_CLI_ENTRY, ...remotionArgs], {
  env: {
    ...process.env,
    REMOTION_VIDEO_ID: VIDEO_ID_ARG,
  },
  stdio: "inherit",
});

childProcess.on("exit", (code) => {
  process.exit(code ?? 1);
});
