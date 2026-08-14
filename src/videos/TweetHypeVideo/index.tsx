import type { CSSProperties } from "react";
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { VideoDefinition } from "../../video-base";
import "./styles.css";

// KEYWORDS lists the expectation beats shown after the tweet reveal.
const KEYWORDS = ["GPT-5.6", "Soul Ultra", "What will people build?"];

// EXPECTATION_COPY keeps the secondary copy close to the composition.
const EXPECTATION_COPY = "发布前夜的想象力，正在升温";

export type TweetHypeVideoProps = {
  headline: string;
  closingText: string;
  tweetImageName: string;
  narrationAudioName: string;
};

// TWEET_HYPE_VIDEO_DEFAULT_PROPS defines the editable copy and source asset.
const TWEET_HYPE_VIDEO_DEFAULT_PROPS = {
  headline: "GPT-5.6，要来了？",
  closingText: "所有人都在等下一次跃迁",
  tweetImageName: "tweet.png",
  narrationAudioName: "audio/TweetHypeVideo-narration.wav",
} satisfies TweetHypeVideoProps;

/** Renders the GPT-5.6 expectation teaser video. */
export const TweetHypeVideo = ({
  headline,
  closingText,
  tweetImageName,
  narrationAudioName,
}: TweetHypeVideoProps) => {
  // frame is the current render frame used by all motion.
  const frame = useCurrentFrame();
  // fps converts second-based timing into frame ranges.
  const { fps } = useVideoConfig();

  // introOpacity fades the opening hook out before the evidence layout appears.
  const introOpacity = interpolate(frame, [0, 0.4 * fps, 1.15 * fps, 1.85 * fps], [0, 1, 1, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // introLift keeps the opening motion within the restrained editorial range.
  const introLift = interpolate(frame, [0, 0.7 * fps], [20, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // evidenceOpacity gives the source and supporting points one shared scene rhythm.
  const evidenceOpacity = interpolate(frame, [1.6 * fps, 2.2 * fps, 6.9 * fps, 7.55 * fps], [0, 1, 1, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // evidenceScale adds a subtle camera move without competing with readability.
  const evidenceScale = interpolate(frame, [1.6 * fps, 6.9 * fps], [1, 1.025], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // evidenceY settles the horizontal evidence layout into the safe area.
  const evidenceY = interpolate(frame, [1.6 * fps, 2.3 * fps], [16, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // closingOpacity gives the final expectation line time to land.
  const closingOpacity = interpolate(frame, [7.25 * fps, 8 * fps], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // closingY lets the closing copy settle before the narration ends.
  const closingY = interpolate(frame, [7.25 * fps, 8 * fps], [20, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // evidenceStyle keeps the screenshot and keywords on one composed plane.
  const evidenceStyle: CSSProperties = {
    opacity: evidenceOpacity,
    transform: `translateY(${evidenceY}px) scale(${evidenceScale})`,
  };

  // introStyle applies the headline reveal motion.
  const introStyle: CSSProperties = {
    opacity: introOpacity,
    transform: `translateY(${introLift}px)`,
  };

  // closingStyle controls the final message reveal.
  const closingStyle: CSSProperties = {
    opacity: closingOpacity,
    transform: `translateY(${closingY}px)`,
  };

  return (
    <AbsoluteFill className="tweet-hype-video">
      <Audio src={staticFile(narrationAudioName)} volume={1} />

      <section className="tweet-hype-video__intro" style={introStyle}>
        <p className="tweet-hype-video__eyebrow">AI 前沿观察</p>
        <h1 className="tweet-hype-video__headline">{headline}</h1>
        <p className="tweet-hype-video__subcopy">{EXPECTATION_COPY}</p>
      </section>

      <section className="tweet-hype-video__evidence" style={evidenceStyle}>
        <div className="tweet-hype-video__tweet-frame">
          <Img
            className="tweet-hype-video__tweet-image"
            src={staticFile(tweetImageName)}
          />
        </div>
        <div className="tweet-hype-video__keywords">
          {KEYWORDS.map((keyword, index) => {
            // keywordDelay staggers each supporting point after the source appears.
            const keywordDelay = 2.35 * fps + index * 0.5 * fps;
            // keywordProgress reveals one point with a short restrained lift.
            const keywordProgress = interpolate(frame, [keywordDelay, keywordDelay + 0.45 * fps], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            // keywordStyle applies only opacity and a small vertical offset.
            const keywordStyle: CSSProperties = {
              opacity: keywordProgress,
              transform: `translateY(${(1 - keywordProgress) * 18}px)`,
            };

            return (
              <p className="tweet-hype-video__keyword" key={keyword} style={keywordStyle}>
                {keyword}
              </p>
            );
          })}
        </div>
      </section>

      <section className="tweet-hype-video__closing" style={closingStyle}>
        <p className="tweet-hype-video__closing-kicker">下一次跃迁</p>
        <h2 className="tweet-hype-video__closing-title">{closingText}</h2>
      </section>
    </AbsoluteFill>
  );
};

// tweetHypeVideoDefinition registers the current teaser with the shared base.
export const tweetHypeVideoDefinition: VideoDefinition<TweetHypeVideoProps> = {
  id: "TweetHypeVideo",
  component: TweetHypeVideo,
  durationInFrames: 600,
  defaultProps: TWEET_HYPE_VIDEO_DEFAULT_PROPS,
};
