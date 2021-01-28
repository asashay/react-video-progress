import React from 'react'

import { VideoProgress } from 'react-video-progress'

const App = () => {
  const testRef = React.useRef(null);
  return <div>
    <h1 style={{textAlign: 'center'}}>Usage examples</h1>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginRight: '20px'
      }}>
        <h2>With one line:</h2>
        <VideoProgress
          progressStart={'BottomLeft'}
          type={'OneLine'}
          pathColor="#e63946"
          pathWidth="4px"
          controls
          src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          height="200px"
          ref={testRef}
        />
        <h2>With only bottom line:</h2>
        <VideoProgress
          type={'BottomLine'}
          pathColor="#06d6a0"
          pathWidth="4px"
          pathBorderRadius="2px"
          controls
          src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          height="200px"
          ref={testRef}
        />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <h2>With two lines:</h2>
        <VideoProgress
          progressStart={'BottomLeft'}
          type={'TwoLines'}
          pathColor="#3a86ff"
          pathWidth="4px"
          controls
          src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          height="200px"
          ref={testRef}
        />
      </div>
    </div>
  </div>
}

export default App
