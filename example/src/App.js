import React from 'react'

import { VideoProgress } from 'react-video-progress'
import 'react-video-progress/dist/index.css'

const App = () => {
  return <VideoProgress
  progressStart="BottomLeft"
  pathColor="blue"
  pathWidth="10px"
  controls
  src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  />
}

export default App
