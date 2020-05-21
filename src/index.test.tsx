import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { VideoProgress } from './.'

// TODO: add unit tests for functions calculating position, height ...
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
})
