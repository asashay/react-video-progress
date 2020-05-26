# React Video Progress

> React component to show video progress at the video frame border build in Typescript

[![NPM](https://img.shields.io/npm/v/react-video-progress.svg)](https://www.npmjs.com/package/react-video-progress) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/asashay/react-video-progress.svg?branch=master)](https://travis-ci.org/asashay/react-video-progress) [![Coverage Status](https://coveralls.io/repos/github/asashay/react-video-progress/badge.svg?branch=master)](https://coveralls.io/github/asashay/react-video-progress?branch=master)

## Demo
![Video Progressbar Demo](demo/demo.gif)

[More samples](https://asashay.github.io/react-video-progress/)

## Installation

```bash
npm install --save react-video-progress

yarn add react-video-progress
```


## Usage

```tsx
import React, { Component } from 'react'

import { VideoProgress, START, LINE_TYPE} from 'react-video-progress'

class Example extends Component {
  render() {
    return <VideoProgress
      progressStart={START.BottomLeft}
      type={LINE_TYPE.OneLine}
      pathColor="red"
      pathWidth="4px"
      src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      height="200px"
      controls
      />
  }
}
```

Also it takes in all the `<video>` props and passes them down to the underlying video element.


## Props
| Prop | Type | Default | Description |
|---|---|---|---|
| pathColor | string | `red` |
| pathWidth | string | `3px` |
| progressStart | `START` | `BottomLeft` | One of `BottomLeft`, `TopLeft`, `TopRight`, `BottomRight`
| type | `LINE_TYPE` | `OneLine` | One of `OneLine`, `TwoLines`
| wrapperStyle | object | `{}` | inline styles for wrapper (e.g. `{ color: 'black', width: '30px' }`)
| wrapperClassName | string | `''` | Class assigned to wrapper
| ...rest | any of [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) props | | Any of `<video>` attributes (e.g. `autoplay, width, className` etc) |

## License

MIT © [asashay](https://github.com/asashay)
