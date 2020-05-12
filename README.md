# react-video-progress

> Video component to show video progress at frame border

[![NPM](https://img.shields.io/npm/v/react-video-progress.svg)](https://www.npmjs.com/package/react-video-progress) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-video-progress
```

## Usage

It takes in all the `<video>` props and passes them down to the underlying video tag.

```tsx
import React, { Component } from 'react'

import VideoProgress from 'react-video-progress'

class Example extends Component {
  render() {
    return <VideoProgress
      src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      controls
      />
  }
}
```

## Props
| Prop | Type | Default | Required |
|---|---|---|---|
| pathColor | string | `red` | No |
| pathWidth | string | `5px` | No |
| progressStart | one of ['BottomLeft', 'TopLeft', 'TopRight', 'BottomRight'] | `TopLeft` | No |


TO-DO:
- add ref forwarding to underlying video

## License

MIT © [asashay](https://github.com/asashay)
