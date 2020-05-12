import * as React from 'react'
// import styles from './styles.module.css'

enum StartOptions {
  BottomLeft = 'BottomLeft',
  TopLeft = 'TopLeft',
  TopRight = 'TopRight',
  BottomRight = 'BottomRight'
}

interface VideoProps extends React.HTMLProps<HTMLVideoElement> {
  pathColor?: string
  pathWidth?: string
  progressStart?: StartOptions
  onLoadedMetadata?(e: React.SyntheticEvent<HTMLVideoElement>): void
  onTimeUpdate?(e: React.SyntheticEvent<HTMLVideoElement>): void
}

function getLengthes({
  path,
  width,
  height,
  progressStart
}: {
  path: number
  width: number
  height: number
  progressStart: StartOptions
}) {
  let top = 0
  let right = 0
  let bottom = 0
  let left = 0
  switch (progressStart) {
    case StartOptions.BottomLeft:
      left = path > height ? height : path
      top = path > height + width ? width : path - height
      right = path > height * 2 + width ? height : path - height - width
      bottom = path > height * 2 + width * 2 ? width : path - height * 2 - width
      break
    case StartOptions.TopLeft:
      top = path > width ? width : path
      right = path > height + width ? height : path - width
      bottom = path > width * 2 + height ? width : path - height - width
      left = path > height * 2 + width * 2 ? height : path - height * 2 - width
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
      right = path > height * 2 + width * 2 ? height : path - height * 2 - width
      break
    default:
      break
  }
  return {
    top,
    right,
    bottom,
    left
  }
}

export const VideoProgress = ({
  pathColor = 'red',
  pathWidth = '5px',
  progressStart = StartOptions.TopLeft,
  onLoadedMetadata = () => {},
  onTimeUpdate = () => {},
  ...videoProps
}: VideoProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [duration, setDuration] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(0)

  const { width, height } = containerRef?.current?.getBoundingClientRect() ?? {
    width: 0,
    height: 0
  }
  const totalLength = (width + height) * 2
  const step = totalLength / duration
  const path = currentTime * step

  const { top, right, bottom, left } = getLengthes({
    path,
    width,
    height,
    progressStart
  })

  const commonStyles: React.CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: pathColor
  }

  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
        margin: '20px'
      }}
      ref={containerRef}
    >
      <div
        style={{
          ...commonStyles,
          width: `${top}px`,
          height: `${pathWidth}`,
          top: 0
        }}
      />
      <div
        style={{
          ...commonStyles,
          width: `${pathWidth}`,
          height: `${right}px`,
          right: 0
        }}
      />
      <div
        style={{
          ...commonStyles,
          width: `${bottom}px`,
          height: `${pathWidth}`,
          bottom: 0,
          right: 0
        }}
      />
      <div
        style={{
          ...commonStyles,
          width: `${pathWidth}`,
          height: `${left}px`,
          left: 0,
          bottom: 0
        }}
      />
      <video
        onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement>) => {
          setDuration(e.currentTarget.duration)
          onLoadedMetadata(e)
        }}
        onTimeUpdate={(e: React.SyntheticEvent<HTMLVideoElement>) => {
          setCurrentTime(e.currentTarget.currentTime)
          onTimeUpdate(e)
        }}
        {...videoProps}
      />
    </div>
  )
}
