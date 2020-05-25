import React from 'react'

import { VideoProgress } from 'react-video-progress'
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
      progressStart="BottomLeft"
      pathColor="red"
      pathWidth="7px"
      type="OneLine"
      controls
      src='http://techslides.com/demos/sample-videos/small.mp4'
      height="200px"
      ref={testRef}
    />
    <h2>With two lines:</h2>
    <VideoProgress
      progressStart="BottomLeft"
      pathColor="blue"
      pathWidth="7px"
      type="TwoLines"
      controls
      src='http://techslides.com/demos/sample-videos/small.mp4'
      height="200px"
      ref={testRef}
    />
  </div>
}

export default App
