import "./index.css";
import { Composition } from "remotion";
import {
  DEFAULT_VIDEO_FPS,
  DEFAULT_VIDEO_SIZE,
  type VideoDefinition,
} from "./video-base";
import { VIDEO_DEFINITIONS } from "./videos";

/** Returns the videos that should be registered for the current command. */
const getVisibleVideoDefinitions = () => {
  // selectedVideoId narrows Studio and render commands to one composition.
  const selectedVideoId = process.env.REMOTION_VIDEO_ID;

  if (!selectedVideoId) {
    return VIDEO_DEFINITIONS;
  }

  // selectedVideoDefinitions contains the matching video when a command names one.
  const selectedVideoDefinitions = VIDEO_DEFINITIONS.filter((videoDefinition) => {
    return videoDefinition.id === selectedVideoId;
  });

  if (selectedVideoDefinitions.length > 0) {
    return selectedVideoDefinitions;
  }

  // availableVideoIds gives a helpful error for typos in command arguments.
  const availableVideoIds = VIDEO_DEFINITIONS.map((videoDefinition) => {
    return videoDefinition.id;
  }).join(", ");

  throw new Error(
    `Cannot find video "${selectedVideoId}". Available videos: ${availableVideoIds}`,
  );
};

/** Renders one Remotion composition from the shared video definition. */
const renderVideoComposition = <Props extends Record<string, unknown>>(
  videoDefinition: VideoDefinition<Props>,
) => {
  // videoSize applies shared landscape defaults unless a video overrides them.
  const videoSize = {
    width: videoDefinition.width ?? DEFAULT_VIDEO_SIZE.width,
    height: videoDefinition.height ?? DEFAULT_VIDEO_SIZE.height,
  };

  return (
    <Composition
      id={videoDefinition.id}
      component={videoDefinition.component}
      durationInFrames={videoDefinition.durationInFrames}
      fps={videoDefinition.fps ?? DEFAULT_VIDEO_FPS}
      width={videoSize.width}
      height={videoSize.height}
      defaultProps={videoDefinition.defaultProps}
      key={videoDefinition.id}
    />
  );
};

/** Registers the available Remotion compositions. */
export const RemotionRoot: React.FC = () => {
  // visibleVideoDefinitions is filtered by REMOTION_VIDEO_ID when present.
  const visibleVideoDefinitions = getVisibleVideoDefinitions();

  return (
    <>
      {visibleVideoDefinitions.map(renderVideoComposition)}
    </>
  );
};
