import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { VideoProgress, getLengthes, getBarsPositions } from './.'

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

describe('Test getLengthes', () => {
  it(`checks bars lenghtes when progressBar
  starts at BottomLeft is of OneLine type (only 1st bar visible)`, () => {
    const path = 190
    const width = 300
    const height = 200
    const progressStart = 'BottomLeft'
    const type = 'OneLine'
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type
    })
    expect(left).toEqual(path)
    expect(top).toEqual(0)
    expect(right).toEqual(0)
    expect(bottom).toEqual(0)
  })

  it(`checks bars lenghtes when progressBar
  starts at TopLeft is of OneLine type (2 bars visible)`, () => {
    const path = 350
    const width = 300
    const height = 200
    const progressStart = 'TopLeft'
    const type = 'OneLine'
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type
    })
    expect(left).toEqual(0)
    expect(top).toEqual(width)
    expect(right).toEqual(path - width)
    expect(bottom).toEqual(0)
  })

  it(`checks bars lenghtes when progressBar
  starts at TopRight is of OneLine type (3 bars visible)`, () => {
    const path = 650
    const width = 300
    const height = 200
    const progressStart = 'TopRight'
    const type = 'OneLine'
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type
    })
    expect(left).toEqual(path - height - width)
    expect(top).toEqual(0)
    expect(right).toEqual(height)
    expect(bottom).toEqual(width)
  })

  it(`checks bars lenghtes when progressBar
  starts at BottomRight is of OneLine type (4 bars visible)`, () => {
    const path = 850
    const width = 300
    const height = 200
    const progressStart = 'BottomRight'
    const type = 'OneLine'
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type
    })
    expect(left).toEqual(height)
    expect(top).toEqual(width)
    expect(right).toEqual(path - 2 * width - height)
    expect(bottom).toEqual(width)
  })

  it(`checks bars lenghtes when progressBar starts at
  BottomLeft and is of TwoLines type (4 bars visible)`, () => {
    const path = 450
    const width = 300
    const height = 200
    const progressStart = 'BottomLeft'
    const type = 'TwoLines'
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type
    })
    expect(left).toEqual(height)
    expect(top).toEqual(path - height)
    expect(right).toEqual(path - width)
    expect(bottom).toEqual(width)
  })

  it(`checks bars lenghtes when progressBar starts at
  TopLeft is of TwoLines type (2 bars visible)`, () => {
    const path = 150
    const width = 300
    const height = 200
    const progressStart = 'TopLeft'
    const type = 'TwoLines'
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type
    })
    expect(left).toEqual(path)
    expect(top).toEqual(path)
    expect(right).toEqual(0)
    expect(bottom).toEqual(0)
  })

  it(`checks bars lenghtes when progressBar starts at
  TopRight is of TwoLines type (2 bars visible)`, () => {
    const path = 150
    const width = 300
    const height = 200
    const progressStart = 'TopRight'
    const type = 'TwoLines'
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type
    })
    expect(left).toEqual(0)
    expect(top).toEqual(path)
    expect(right).toEqual(path)
    expect(bottom).toEqual(0)
  })

  it(`checks bars lenghtes when progressBar starts at
  BottomRight is of TwoLines type (2 bars visible)`, () => {
    const path = 150
    const width = 300
    const height = 200
    const progressStart = 'BottomRight'
    const type = 'TwoLines'
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type
    })
    expect(left).toEqual(0)
    expect(top).toEqual(0)
    expect(right).toEqual(path)
    expect(bottom).toEqual(path)
  })
})

describe('Test getBarsPositions', () => {
  it(`checks getBarsPositions to calculate bars
        bars positions properly when progressBar starts at
        BottomLeft is of OneLine type`, () => {
    const { topBar, rightBar, bottomBar, leftBar } = getBarsPositions(
      'BottomLeft',
      'OneLine'
    )
    expect(topBar).toEqual({ left: 0, top: 0 })
    expect(rightBar).toEqual({ right: 0, top: 0 })
    expect(bottomBar).toEqual({ right: 0, bottom: 0 })
    expect(leftBar).toEqual({ left: 0, bottom: 0 })
  })

  it(`checks getBarsPositions to calculate bars
        bars positions properly when progressBar starts at
        TopLeft is of TwoLines type`, () => {
    const { topBar, rightBar, bottomBar, leftBar } = getBarsPositions(
      'TopLeft',
      'TwoLines'
    )
    expect(topBar).toEqual({ left: 0, top: 0 })
    expect(rightBar).toEqual({ right: 0, top: 0 })
    expect(bottomBar).toEqual({ left: 0, bottom: 0 })
    expect(leftBar).toEqual({ left: 0, top: 0 })
  })

  it(`checks getBarsPositions to calculate bars
        bars positions properly when progressBar starts at
        TopRight is of TwoLines type`, () => {
    const { topBar, rightBar, bottomBar, leftBar } = getBarsPositions(
      'TopRight',
      'TwoLines'
    )
    expect(topBar).toEqual({ right: 0, top: 0 })
    expect(rightBar).toEqual({ right: 0, top: 0 })
    expect(bottomBar).toEqual({ right: 0, bottom: 0 })
    expect(leftBar).toEqual({ left: 0, top: 0 })
  })

  it(`checks getBarsPositions to calculate bars
        bars positions properly when progressBar starts at
        BottomRight is of TwoLines type`, () => {
    const { topBar, rightBar, bottomBar, leftBar } = getBarsPositions(
      'BottomRight',
      'TwoLines'
    )
    expect(topBar).toEqual({ right: 0, top: 0 })
    expect(rightBar).toEqual({ right: 0, bottom: 0 })
    expect(bottomBar).toEqual({ right: 0, bottom: 0 })
    expect(leftBar).toEqual({ left: 0, bottom: 0 })
  })
})
