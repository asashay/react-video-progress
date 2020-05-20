import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { VideoProgress } from './.'

// pathColor
// pathWidth
// progressStart
// type
// wrapperStyle
// wrapperClassName

describe('VideoProgress', () => {
  it('{ VideoProgress } is truthy', () => {
    expect(VideoProgress).toBeTruthy()
  })

  it('renders without crashing and no props', () => {
    const { container } = render(<VideoProgress />)
    const video = container.querySelector('video')
    expect(video).toBeInTheDocument()
  })

  it('passes down ref to video element', () => {
    let testRef = { current: null }
    const Fc = () => {
      testRef = React.useRef(null)
      return <VideoProgress ref={testRef} />
    }

    const { container } = render(<Fc />)
    const video = container.querySelector('video')

    expect(testRef.current).toContainElement(video)
  })

  it('has all 4 bars present', () => {
    const { container } = render(<VideoProgress />)
    const bars = container.querySelectorAll('div')

    // 1 outer div and 4 bars
    expect(bars.length).toEqual(5)
  })

  it('Changes left bar heights when timeupdate event happens', () => {
    const { container } = render(<VideoProgress />)
    const video = container.querySelector('video')

    fireEvent.loadedMetadata(video, { currentTarget: { duration: 500 } })
    fireEvent.timeUpdate(video, { currentTarget: { duration: 50 } })
    const left = container.querySelector('div > div:nth-child(1)')
    console.log('left', left)
    expect(left).toHaveStyle({ height: 0 })

    // 1 outer div and 4 bars
    // expect(bars.length).toEqual(5)
  })
})
