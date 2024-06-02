# React Video Progress

> React component to show video progress at the video frame border build in Typescript

[![NPM](https://img.shields.io/npm/v/react-video-progress.svg)](https://www.npmjs.com/package/react-video-progress) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Build Status](https://travis-ci.org/asashay/react-video-progress.svg?branch=master)](https://travis-ci.org/asashay/react-video-progress) [![Coverage Status](https://coveralls.io/repos/github/asashay/react-video-progress/badge.svg?branch=master)](https://coveralls.io/github/asashay/react-video-progress?branch=master)

## Demo
![Video Progressbar Demo](demo/demo.gif)

[Live samples](https://asashay.github.io/react-video-progress/)

## Installation

```bash
npm install --save react-video-progress

yarn add react-video-progress
```


## Usage

```tsx
import React, { Component } from 'react'

import { VideoProgress } from 'react-video-progress'

class Example extends Component {
  render() {
    return <VideoProgress
      progressStart="BottomLeft"
      type="OneLine"
      pathColor="red"
      pathWidth="4px"
      pathBorderRadius="2px"
      src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      height="200px"
      controls
      />
  }
}

// or in the functional component
const FunctionalComponentExample = () => {
  return <VideoProgress
    progressStart="BottomLeft"
    type="OneLine"
    pathColor="red"
    pathWidth="4px"
    pathBorderRadius="2px"
    src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    height="200px"
    controls
  />
}
```

Also it takes in all the `<video>` props and passes them down to the underlying video element.


## Props
All props are **optional**.

* `pathColor`: String, default `red`
  * Any valid color string (e.g. `#ffffff, rgb(0,0,0)` )

* `pathWidth`: String, default `3px`
  * Any valid width value (e.g. `2em, .5rem`)

* `pathBorderRadius`: String, default `0`
  * Any valid border radius value (e.g. `2px, 5%`)

* `progressStart`: String, default `BottomLeft`
  * One of `BottomLeft, TopLeft, TopRight, BottomRight`

* `type`: String, default `OneLine`
  * One of `OneLine, TwoLines, BottomLine`

* `wrapperStyle`: Object, default `{ display: 'inline-block', position: 'relative'}`
  * inline styles for wrapper `div`

* `wrapperClassName`: String, default `''`
  * Class assigned to wrapper

* ...rest: any of [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) props
  * Any of `<video>` attributes (e.g. `autoPlay, width, className` etc)

## License

MIT © [asashay](https://github.com/asashay)

