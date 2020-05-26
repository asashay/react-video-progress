import React from 'react'

import { VideoProgress, START, LINE_TYPE } from 'react-video-progress'
import 'react-video-progress/dist/index.css'

const App = () => {
  const testRef = React.useRef(null);
  return <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }}>
    <h1>Usage examples</h1>
    <h2>With one line:</h2>
    <VideoProgress
      progressStart={START.BottomLeft}
      type={LINE_TYPE.OneLine}
      pathColor="#e63946"
      pathWidth="4px"
      controls
      src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      height="200px"
      ref={testRef}
    />
    <h2>With two lines:</h2>
    <VideoProgress
      progressStart={START.BottomLeft}
      type={LINE_TYPE.TwoLines}
      pathColor="#3a86ff"
      pathWidth="4px"
      controls
      src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      height="200px"
      ref={testRef}
    />
  </div>
}

export default App
