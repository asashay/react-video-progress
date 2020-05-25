import * as React from 'react'

// import styles from './styles.module.css'

enum StartOptions {
  BottomLeft = 'BottomLeft',
  TopLeft = 'TopLeft',
  TopRight = 'TopRight',
  BottomRight = 'BottomRight'
}

enum ProgressTypes {
  OneLine = 'OneLine',
  TwoLines = 'TwoLines'
}

export function getLengthes({
  path,
  width,
  height,
  progressStart,
  type
}: {
  path: number
  width: number
  height: number
  progressStart: StartOptions
  type: ProgressTypes
}) {
  let top = 0
  let right = 0
  let bottom = 0
  let left = 0

  if (type === ProgressTypes.OneLine) {
    switch (progressStart) {
      case StartOptions.BottomLeft:
        left = path > height ? height : path
        top = path > height + width ? width : path - height
        right = path > height * 2 + width ? height : path - height - width
        bottom =
          path > height * 2 + width * 2 ? width : path - height * 2 - width
        break
      case StartOptions.TopLeft:
        top = path > width ? width : path
        right = path > height + width ? height : path - width
        bottom = path > width * 2 + height ? width : path - height - width
        left =
          path > height * 2 + width * 2 ? height : path - height * 2 - width
        break
      case StartOptions.TopRight:
        right = path > height ? height : path
        bottom = path > height + width ? width : path - height
        left = path > height * 2 + width ? height : path - height - width
        top = path > height * 2 + width * 2 ? width : path - height * 2 - width
        break
      case StartOptions.BottomRight:
        bottom = path > width ? width : path
        left = path > height + width ? height : path - width
        top = path > width * 2 + height ? width : path - height - width
        right =
          path > height * 2 + width * 2 ? height : path - width * 2 - height
        break
      default:
        break
    }
  } else if (type === ProgressTypes.TwoLines) {
    switch (progressStart) {
      case StartOptions.BottomLeft:
        left = path > height ? height : path
        bottom = path > width ? width : path
        top = path > height + width ? width : path - height
        right = path > height + width ? height : path - width
        break
      case StartOptions.TopLeft:
        left = path > height ? height : path
        top = path > width ? width : path
        bottom = path > height + width ? width : path - height
        right = path > height + width ? height : path - width
        break
      case StartOptions.TopRight:
        right = path > height ? height : path
        top = path > width ? width : path
        bottom = path > height + width ? width : path - height
        left = path > height + width ? height : path - width
        break
      case StartOptions.BottomRight:
        right = path > height ? height : path
        bottom = path > width ? width : path
        top = path > height + width ? width : path - height
        left = path > height + width ? height : path - width
        break
      default:
        break
    }
  }

  return {
    top: top > 0 ? top : 0,
    right: right > 0 ? right : 0,
    bottom: bottom > 0 ? bottom : 0,
    left: left > 0 ? left : 0
  }
}

export function getBarsPositions(
  progressStart: StartOptions,
  progressType: ProgressTypes
) {
  const leftBar: React.CSSProperties = { left: 0 }
  const topBar: React.CSSProperties = { top: 0 }
  const rightBar: React.CSSProperties = { right: 0 }
  const bottomBar: React.CSSProperties = { bottom: 0 }
  if (progressType === ProgressTypes.OneLine) {
    switch (progressStart) {
      case StartOptions.BottomLeft:
      case StartOptions.TopLeft:
      case StartOptions.TopRight:
      case StartOptions.BottomRight:
        leftBar.bottom = 0
        topBar.left = 0
        rightBar.top = 0
        bottomBar.right = 0
        break
      default:
        break
    }
  } else if (progressType === ProgressTypes.TwoLines) {
    switch (progressStart) {
      case StartOptions.BottomLeft:
        leftBar.bottom = 0
        bottomBar.left = 0
        topBar.left = 0
        rightBar.bottom = 0
        break
      case StartOptions.TopLeft:
        leftBar.top = 0
        bottomBar.left = 0
        topBar.left = 0
        rightBar.top = 0
        break
      case StartOptions.TopRight:
        leftBar.top = 0
        bottomBar.right = 0
        topBar.right = 0
        rightBar.top = 0
        break
      case StartOptions.BottomRight:
        leftBar.bottom = 0
        topBar.right = 0
        rightBar.bottom = 0
        bottomBar.right = 0
        break
      default:
        break
    }
  }

  return {
    leftBar,
    topBar,
    rightBar,
    bottomBar
  }
}

interface VideoProps extends React.ComponentPropsWithoutRef<'video'> {
  pathColor?: string
  pathWidth?: string
  progressStart?: StartOptions
  type?: ProgressTypes
  wrapperStyle?: React.CSSProperties
  wrapperClassName?: string
  onLoadedMetadata?(e: React.SyntheticEvent<HTMLVideoElement>): void
  onTimeUpdate?(e: React.SyntheticEvent<HTMLVideoElement>): void
}

type Ref = HTMLVideoElement | null

export const VideoProgress = React.forwardRef<Ref, VideoProps>(
  (
    {
      pathColor = 'red',
      pathWidth = '5px',
      progressStart = StartOptions.BottomLeft,
      type = ProgressTypes.OneLine,
      wrapperStyle = {},
      wrapperClassName = '',
      onLoadedMetadata = () => {},
      onTimeUpdate = () => {},
      ...videoProps
    },
    ref?
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const [duration, setDuration] = React.useState(0)
    const [currentTime, setCurrentTime] = React.useState(0)

    const {
      width,
      height
    } = containerRef?.current?.getBoundingClientRect() ?? {
      width: 0,
      height: 0
    }
    const totalLength =
      (width + height) * (type === ProgressTypes.TwoLines ? 1 : 2)
    const step = totalLength / duration
    const path = currentTime * step

    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type
    })

    const commonStyles: React.CSSProperties = {
      position: 'absolute',
      zIndex: 2,
      backgroundColor: pathColor,
      animation: '1s linear'
    }

    const { leftBar, topBar, rightBar, bottomBar } = getBarsPositions(
      progressStart,
      type
    )

    return (
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
          ...wrapperStyle
        }}
        className={wrapperClassName}
        ref={containerRef}
      >
        <div
          data-testid='left'
          style={{
            ...commonStyles,
            width: `${pathWidth}`,
            height: `${left}px`,
            ...leftBar
          }}
        />
        <div
          style={{
            ...commonStyles,
            width: `${top}px`,
            height: `${pathWidth}`,
            ...topBar
          }}
        />
        <div
          style={{
            ...commonStyles,
            width: `${pathWidth}`,
            height: `${right}px`,
            ...rightBar
          }}
        />
        <div
          style={{
            ...commonStyles,
            width: `${bottom}px`,
            height: `${pathWidth}`,
            ...bottomBar
          }}
        />
        <video
          ref={ref}
          onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement>) => {
            console.log('onLoadedMetadata', e.currentTarget.duration)
            setDuration(e.currentTarget.duration)
            onLoadedMetadata(e)
          }}
          onTimeUpdate={(e: React.SyntheticEvent<HTMLVideoElement>) => {
            console.log('onTimeUpdate', e.currentTarget.duration)
            setCurrentTime(e.currentTarget.currentTime)
            onTimeUpdate(e)
          }}
          {...videoProps}
        />
      </div>
    )
  }
)
