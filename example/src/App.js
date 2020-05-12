import React from 'react'

import { VideoProgress } from 'react-video-progress'
import 'react-video-progress/dist/index.css'

const App = () => {
  const containerRef = React.useRef(null)
  return <VideoProgress
  ref={containerRef}
  pathColor="blue"
  pathWidth="10px"
  controls
  src='https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
  />
}

export default App
