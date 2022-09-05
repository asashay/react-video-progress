import * as React from 'react';
import { Ref, VideoProps } from './types';
import { getBarsPositions, getLengthes, getTotalLength } from './helpers';

// import styles from './styles.module.css'

export const VideoProgress = React.forwardRef<Ref, VideoProps>(
  (
    {
      pathColor = 'red',
      pathWidth = '3px',
      pathBorderRadius = '3px',
      progressStart = 'BottomLeft',
      type = 'BottomLine',
      wrapperStyle = {},
      wrapperClassName = '',
      onLoadedMetadata = () => {},
      onTimeUpdate = () => {},
      ...videoProps
    },
    ref?
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const [duration, setDuration] = React.useState(0);
    const [currentTime, setCurrentTime] = React.useState(0);

    const {
      width,
      height,
    } = containerRef?.current?.getBoundingClientRect() ?? {
      width: 0,
      height: 0,
    };
    const totalLength = getTotalLength({ width, height, progressStart: type });
    const step = totalLength / duration;
    const path = currentTime * step;

    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type,
    });

    const commonStyles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 2,
      backgroundColor: pathColor,
      borderRadius: pathBorderRadius,
    };

    const { leftBar, topBar, rightBar, bottomBar } = getBarsPositions(
      progressStart,
      type
    );

    return (
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          ...wrapperStyle,
        }}
        className={wrapperClassName}
        ref={containerRef}
      >
        <div
          data-testid="left"
          style={{
            ...commonStyles,
            width: `${pathWidth}`,
            height: `${left}px`,
            ...leftBar,
          }}
        />
        <div
          style={{
            ...commonStyles,
            width: `${top}px`,
            height: `${pathWidth}`,
            ...topBar,
          }}
        />
        <div
          style={{
            ...commonStyles,
            width: `${pathWidth}`,
            height: `${right}px`,
            ...rightBar,
          }}
        />
        <div
          style={{
            ...commonStyles,
            width: `${bottom}px`,
            height: `${pathWidth}`,
            ...bottomBar,
          }}
        />
        <video
          style={{ display: 'block' }}
          ref={ref}
          onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement>) => {
            setDuration(e.currentTarget.duration);
            onLoadedMetadata(e);
          }}
          onTimeUpdate={(e: React.SyntheticEvent<HTMLVideoElement>) => {
            setCurrentTime(e.currentTarget.currentTime);
            onTimeUpdate(e);
          }}
          {...videoProps}
        />
      </div>
    );
  }
);

export * from './types';
