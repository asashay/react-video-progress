import React from 'react'

import { VideoProgress } from 'react-video-progress'
import 'react-video-progress/dist/index.css'

const App = () => {
  const testRef = React.useRef(null);
  return <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <VideoProgress
      progressStart="BottomLeft"
      pathColor="red"
      pathWidth="7px"
      type="TwoLines"
      controls
      src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      height="200px"
      ref={testRef}
    />
  </div>
}

export default App
