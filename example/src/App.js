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
      src='http://techslides.com/demos/sample-videos/small.mp4'
      height="200px"
      wrapperStyle={{ marginTop: '20px'}}
      ref={testRef}
    />
  </div>
}

export default App
