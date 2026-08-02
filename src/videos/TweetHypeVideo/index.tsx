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

// BLUE_GLOW_COLOR is the shared accent for the future-facing visual language.
const BLUE_GLOW_COLOR = "#4ab8ff";

// WHITE_GLOW_COLOR is used for readable high-contrast headline glow.
const WHITE_GLOW_COLOR = "#f6fbff";

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

  // introOpacity fades the opening hook out before the tweet becomes primary.
  const introOpacity = interpolate(frame, [0, 0.45 * fps, 1.75 * fps], [0, 1, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // introLift moves the headline like a restrained launch signal.
  const introLift = interpolate(frame, [0, 1.75 * fps], [42, -20], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // tweetOpacity brings the social proof into the center of the story.
  const tweetOpacity = interpolate(frame, [1.85 * fps, 2.45 * fps, 8.7 * fps], [0, 1, 0.28], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // tweetScale gives the screenshot a slow push-in without sacrificing readability.
  const tweetScale = interpolate(frame, [2 * fps, 5.1 * fps, 8.6 * fps], [1.02, 1.18, 1.08], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // tweetY keeps the card visually centered while the camera move progresses.
  const tweetY = interpolate(frame, [2 * fps, 5.2 * fps], [120, -18], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // scanY moves a cold light pass over the tweet card.
  const scanY = interpolate(frame, [2.05 * fps, 5.8 * fps], [-260, 340], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // keywordOpacity opens the middle beat after the screenshot is established.
  const keywordOpacity = interpolate(frame, [4.8 * fps, 5.35 * fps, 7.4 * fps], [0, 1, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // closingOpacity gives the final expectation line time to land.
  const closingOpacity = interpolate(frame, [7.4 * fps, 8.15 * fps, 9.8 * fps], [0, 1, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // closingScale adds a subtle last-frame confidence push.
  const closingScale = interpolate(frame, [7.4 * fps, 9.8 * fps], [0.94, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // tweetCardStyle combines the screenshot camera move and reveal.
  const tweetCardStyle: CSSProperties = {
    opacity: tweetOpacity,
    transform: `translateY(${tweetY}px) scale(${tweetScale})`,
    boxShadow: `0 0 70px rgba(74, 184, 255, ${0.2 + tweetOpacity * 0.18})`,
  };

  // introStyle applies the headline reveal motion.
  const introStyle: CSSProperties = {
    opacity: introOpacity,
    transform: `translateY(${introLift}px)`,
    textShadow: `0 0 26px ${WHITE_GLOW_COLOR}, 0 0 58px rgba(74, 184, 255, 0.4)`,
  };

  // scanStyle positions the animated scan band above the tweet.
  const scanStyle: CSSProperties = {
    opacity: tweetOpacity,
    transform: `translateY(${scanY}px)`,
  };

  // closingStyle controls the final message reveal.
  const closingStyle: CSSProperties = {
    opacity: closingOpacity,
    transform: `scale(${closingScale})`,
    textShadow: `0 0 30px rgba(74, 184, 255, ${0.35 + closingOpacity * 0.35})`,
  };

  return (
    <AbsoluteFill className="tweet-hype-video">
      <Audio src={staticFile(narrationAudioName)} volume={1} />
      <div className="tweet-hype-video__stars" />
      <div className="tweet-hype-video__beam tweet-hype-video__beam--left" />
      <div className="tweet-hype-video__beam tweet-hype-video__beam--right" />
      <div className="tweet-hype-video__grid" />

      <section className="tweet-hype-video__intro" style={introStyle}>
        <p className="tweet-hype-video__eyebrow">SOUL ULTRA SIGNAL</p>
        <h1 className="tweet-hype-video__headline">{headline}</h1>
        <p className="tweet-hype-video__subcopy">{EXPECTATION_COPY}</p>
      </section>

      <section className="tweet-hype-video__tweet-wrap" style={tweetCardStyle}>
        <div className="tweet-hype-video__tweet-frame">
          <Img
            className="tweet-hype-video__tweet-image"
            src={staticFile(tweetImageName)}
          />
          <div className="tweet-hype-video__scan" style={scanStyle} />
        </div>
      </section>

      <section className="tweet-hype-video__keywords" style={{ opacity: keywordOpacity }}>
        {KEYWORDS.map((keyword, index) => {
          // keywordDelay staggers the three expectation labels.
          const keywordDelay = 4.8 * fps + index * 0.42 * fps;
          // keywordProgress reveals each label in its own short window.
          const keywordProgress = interpolate(frame, [keywordDelay, keywordDelay + 0.55 * fps], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          // keywordStyle adds per-label scale and offset.
          const keywordStyle: CSSProperties = {
            opacity: keywordProgress,
            transform: `translateY(${(1 - keywordProgress) * 34}px) scale(${
              0.92 + keywordProgress * 0.08
            })`,
            borderColor: `rgba(74, 184, 255, ${0.22 + keywordProgress * 0.38})`,
            color: index === 2 ? WHITE_GLOW_COLOR : BLUE_GLOW_COLOR,
          };

          return (
            <span className="tweet-hype-video__keyword" key={keyword} style={keywordStyle}>
              {keyword}
            </span>
          );
        })}
      </section>

      <section className="tweet-hype-video__closing" style={closingStyle}>
        <p className="tweet-hype-video__closing-kicker">NEXT LEAP</p>
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
