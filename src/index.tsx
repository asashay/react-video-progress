import * as React from 'react'
import styles from './styles.module.css'

export const VideoProgress = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [duration, setDuration] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(0)

  const dimensions = containerRef?.current?.getBoundingClientRect()
  const totalLength = dimensions
    ? (dimensions?.width + dimensions?.height) * 2
    : 0
  const step = totalLength / duration
  const path = currentTime * step

  const top = dimensions && path > dimensions?.width ? dimensions?.width : path
  const right =
    dimensions && path > dimensions?.width + dimensions?.height
      ? dimensions?.height
      : dimensions?.width
      ? path - dimensions?.width
      : 0
  const bottom =
    dimensions && path > dimensions?.width * 2 + dimensions?.height
      ? dimensions?.width
      : dimensions?.width && dimensions?.height
      ? path - dimensions?.width - dimensions?.height
      : 0
  const left =
    dimensions && path > dimensions?.width * 2 + dimensions?.height * 2
      ? dimensions?.height
      : dimensions?.width && dimensions?.height
      ? path - dimensions?.width * 2 - dimensions?.height
      : 0

  console.log('dur', step, path, currentTime, duration)

  return (
    <div className={styles.videoContainer} ref={containerRef}>
      <div
        className={styles.top}
        style={{
          width: `${top}px`,
          height: '5px'
        }}
      />
      <div
        className={styles.right}
        style={{
          width: `5px`,
          height: `${right}px`
        }}
      />
      <div
        className={styles.bottom}
        style={{
          width: `${bottom}px`,
          height: '5px'
        }}
      />
      <div
        className={styles.left}
        style={{
          width: `5px`,
          height: `${left}px`
        }}
      />
      <video
        ref={videoRef}
        style={{ zIndex: 0, position: 'relative' }}
        onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement>) => {
          setDuration(e.currentTarget.duration)
        }}
        onTimeUpdate={(e: React.SyntheticEvent<HTMLVideoElement>) => {
          // console.log('play', e.currentTarget.currentTime)
          setCurrentTime(e.currentTarget.currentTime)
        }}
        controls
        src='https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
      />
    </div>
  )
}
