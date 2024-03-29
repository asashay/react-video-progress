import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { VideoProgress, LINE_TYPE, START } from '../src';
import { getLengthes, getBarsPositions, getTotalLength, getBorderRadiuses } from '../src/helpers';

describe('VideoProgress', () => {
  it('{ VideoProgress } is truthy', () => {
    expect(VideoProgress).toBeTruthy();
  });

  it('renders without crashing and no props', () => {
    const { container } = render(<VideoProgress />);
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
  });

  it('passes down ref to video element', () => {
    let testRef = { current: null };
    const Fc = () => {
      testRef = React.useRef(null);
      return <VideoProgress ref={testRef} />;
    };

    const { container } = render(<Fc />);
    const video = container.querySelector('video');

    expect(testRef.current).toContainElement(video);
  });

  it('has all 4 bars present', () => {
    const { container } = render(<VideoProgress />);
    const bars = container.querySelectorAll('div');

    // 1 outer div and 4 bars
    expect(bars.length).toEqual(5);
  });

  it('calls passed onLoadedMetadata function', () => {
    const onLoadedMetadata = jest.fn();
    const { container } = render(
      <VideoProgress onLoadedMetadata={onLoadedMetadata} />
    );
    const video = container.querySelector('video');

    if (video == null) throw new Error();

    fireEvent.loadedMetadata(video);
    expect(onLoadedMetadata).toHaveBeenCalled();
  });

  it('calls passed onTimeUpdate function', () => {
    const onTimeUpdate = jest.fn();
    const { container } = render(<VideoProgress onTimeUpdate={onTimeUpdate} />);
    const video = container.querySelector('video');

    if (video == null) throw new Error();

    fireEvent.timeUpdate(video);
    expect(onTimeUpdate).toHaveBeenCalled();
  });
});

describe('Test getLengthes function', () => {
  it(`checks bars lenghtes when progressBar
  starts at BottomLeft is of OneLine type (only 1st bar visible)`, () => {
    const path = 190;
    const width = 300;
    const height = 200;
    const progressStart = 'BottomLeft';
    const type = LINE_TYPE.OneLine;
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type,
    });
    expect(left).toEqual(path);
    expect(top).toEqual(0);
    expect(right).toEqual(0);
    expect(bottom).toEqual(0);
  });

  it(`checks bars lenghtes when progressBar
  starts at TopLeft is of OneLine type (2 bars visible)`, () => {
    const path = 350;
    const width = 300;
    const height = 200;
    const progressStart = 'TopLeft';
    const type = 'OneLine';
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type,
    });
    expect(left).toEqual(0);
    expect(top).toEqual(width);
    expect(right).toEqual(path - width);
    expect(bottom).toEqual(0);
  });

  it(`checks bars lenghtes when progressBar
  starts at TopRight is of OneLine type (3 bars visible)`, () => {
    const path = 650;
    const width = 300;
    const height = 200;
    const progressStart = 'TopRight';
    const type = 'OneLine';
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type,
    });
    expect(left).toEqual(path - height - width);
    expect(top).toEqual(0);
    expect(right).toEqual(height);
    expect(bottom).toEqual(width);
  });

  it(`checks bars lenghtes when progressBar
  starts at BottomRight is of OneLine type (4 bars visible)`, () => {
    const path = 850;
    const width = 300;
    const height = 200;
    const progressStart = 'BottomRight';
    const type = 'OneLine';
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type,
    });
    expect(left).toEqual(height);
    expect(top).toEqual(width);
    expect(right).toEqual(path - 2 * width - height);
    expect(bottom).toEqual(width);
  });

  it(`checks bars lenghtes when progressBar starts at
  BottomLeft and is of TwoLines type (4 bars visible)`, () => {
    const path = 450;
    const width = 300;
    const height = 200;
    const progressStart = 'BottomLeft';
    const type = 'TwoLines';
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type,
    });
    expect(left).toEqual(height);
    expect(top).toEqual(path - height);
    expect(right).toEqual(path - width);
    expect(bottom).toEqual(width);
  });

  it(`checks bars lenghtes when progressBar starts at
  TopLeft is of TwoLines type (2 bars visible)`, () => {
    const path = 150;
    const width = 300;
    const height = 200;
    const progressStart = 'TopLeft';
    const type = 'TwoLines';
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type,
    });
    expect(left).toEqual(path);
    expect(top).toEqual(path);
    expect(right).toEqual(0);
    expect(bottom).toEqual(0);
  });

  it(`checks bars lenghtes when progressBar starts at
  TopRight is of TwoLines type (2 bars visible)`, () => {
    const path = 150;
    const width = 300;
    const height = 200;
    const progressStart = 'TopRight';
    const type = 'TwoLines';
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type,
    });
    expect(left).toEqual(0);
    expect(top).toEqual(path);
    expect(right).toEqual(path);
    expect(bottom).toEqual(0);
  });

  it(`checks bars lenghtes when progressBar starts at
  BottomRight is of TwoLines type (4 bars visible)`, () => {
    const path = 450;
    const width = 300;
    const height = 200;
    const progressStart = 'BottomRight';
    const type = 'TwoLines';
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type,
    });
    expect(left).toEqual(path - width);
    expect(top).toEqual(path - height);
    expect(right).toEqual(height);
    expect(bottom).toEqual(width);
  });

  it(`checks bars lenghtes when progressBar starts at
  BottomLeft and is of BottomLine type`, () => {
    const path = 200;
    const width = 300;
    const height = 200;
    const progressStart = 'BottomLeft';
    const type = 'BottomLine';
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type,
    });
    expect(left).toEqual(0);
    expect(top).toEqual(0);
    expect(right).toEqual(0);
    expect(bottom).toEqual(path);
  });

  it(`checks bars lenghtes when progressBar starts at
  BottomRight and is of BottomLine type`, () => {
    const path = 400;
    const width = 300;
    const height = 200;
    const progressStart = 'BottomLeft';
    const type = 'BottomLine';
    const { top, right, bottom, left } = getLengthes({
      path,
      width,
      height,
      progressStart,
      type,
    });
    expect(left).toEqual(0);
    expect(top).toEqual(0);
    expect(right).toEqual(0);
    expect(bottom).toEqual(width);
  });
});

describe('Test getBarsPositions function', () => {
  it(`checks getBarsPositions to calculate
        bars positions properly when progressBar starts at
        BottomLeft is of OneLine type`, () => {
    const { topBar, rightBar, bottomBar, leftBar } = getBarsPositions(
      START.BottomLeft,
      LINE_TYPE.OneLine
    );
    expect(topBar).toEqual({ left: 0, top: 0 });
    expect(rightBar).toEqual({ right: 0, top: 0 });
    expect(bottomBar).toEqual({ right: 0, bottom: 0 });
    expect(leftBar).toEqual({ left: 0, bottom: 0 });
  });

  it(`checks getBarsPositions to calculate
        bars positions properly when progressBar starts at
        BottomLeft is of TwoLines type`, () => {
    const { topBar, rightBar, bottomBar, leftBar } = getBarsPositions(
      START.BottomLeft,
      LINE_TYPE.TwoLines
    );
    expect(topBar).toEqual({ left: 0, top: 0 });
    expect(rightBar).toEqual({ right: 0, bottom: 0 });
    expect(bottomBar).toEqual({ left: 0, bottom: 0 });
    expect(leftBar).toEqual({ left: 0, bottom: 0 });
  });

  it(`checks getBarsPositions to calculate
        bars positions properly when progressBar starts at
        TopLeft is of TwoLines type`, () => {
    const { topBar, rightBar, bottomBar, leftBar } = getBarsPositions(
      START.TopLeft,
      LINE_TYPE.TwoLines
    );
    expect(topBar).toEqual({ left: 0, top: 0 });
    expect(rightBar).toEqual({ right: 0, top: 0 });
    expect(bottomBar).toEqual({ left: 0, bottom: 0 });
    expect(leftBar).toEqual({ left: 0, top: 0 });
  });

  it(`checks getBarsPositions to calculate
        bars positions properly when progressBar starts at
        TopRight is of TwoLines type`, () => {
    const { topBar, rightBar, bottomBar, leftBar } = getBarsPositions(
      START.TopRight,
      LINE_TYPE.TwoLines
    );
    expect(topBar).toEqual({ right: 0, top: 0 });
    expect(rightBar).toEqual({ right: 0, top: 0 });
    expect(bottomBar).toEqual({ right: 0, bottom: 0 });
    expect(leftBar).toEqual({ left: 0, top: 0 });
  });

  it(`checks getBarsPositions to calculate
        bars positions properly when progressBar starts at
        BottomRight is of TwoLines type`, () => {
    const { topBar, rightBar, bottomBar, leftBar } = getBarsPositions(
      START.BottomRight,
      LINE_TYPE.TwoLines
    );
    expect(topBar).toEqual({ right: 0, top: 0 });
    expect(rightBar).toEqual({ right: 0, bottom: 0 });
    expect(bottomBar).toEqual({ right: 0, bottom: 0 });
    expect(leftBar).toEqual({ left: 0, bottom: 0 });
  });

  it(`checks getBarsPositions to calculate
        bars positions properly when progressBar starts at
        BottomRight is of BottomLine type`, () => {
    const { topBar, rightBar, bottomBar, leftBar } = getBarsPositions(
      START.BottomRight,
      LINE_TYPE.BottomLine
    );
    expect(topBar).toEqual({ top: 0 });
    expect(rightBar).toEqual({ right: 0 });
    expect(bottomBar).toEqual({ right: 0, bottom: 0 });
    expect(leftBar).toEqual({ left: 0 });
  });

  it(`checks getBarsPositions to calculate
        bars positions properly when progressBar starts at
        BottomLeft is of BottomLine type`, () => {
    const { topBar, rightBar, bottomBar, leftBar } = getBarsPositions(
      START.BottomLeft,
      LINE_TYPE.BottomLine
    );
    expect(topBar).toEqual({ top: 0 });
    expect(rightBar).toEqual({ right: 0 });
    expect(bottomBar).toEqual({ left: 0, bottom: 0 });
    expect(leftBar).toEqual({ left: 0 });
  });

  it(`checks getBarsPositions to calculate
    bars positions properly when progressBar starts at TopLeft
    is of BottomLine type (checks default case)`, () => {
    const { topBar, rightBar, bottomBar, leftBar } = getBarsPositions(
      START.TopLeft,
      LINE_TYPE.BottomLine
    );
    expect(topBar).toEqual({ top: 0 });
    expect(rightBar).toEqual({ right: 0 });
    expect(bottomBar).toEqual({ left: 0, bottom: 0 });
    expect(leftBar).toEqual({ left: 0 });
  });
});

describe('Test getTotalLength function', () => {
  it(`checks getTotalLength to calculate bar
    when progress line of OneLine type`, () => {
    const width = 300;
    const height = 200;
    const totalLength = getTotalLength({
      width,
      height,
      progressStart: LINE_TYPE.OneLine,
    });
    expect(totalLength).toEqual((width + height) * 2);
  });

  it(`checks getTotalLength to calculate bar
    when progress line of TwoLines type`, () => {
    const width = 300;
    const height = 200;
    const totalLength = getTotalLength({
      width,
      height,
      progressStart: LINE_TYPE.TwoLines,
    });
    expect(totalLength).toEqual(width + height);
  });

  it(`checks getTotalLength to calculate bar
    when progress line of BottomLine type`, () => {
    const width = 300;
    const height = 200;
    const totalLength = getTotalLength({
      width,
      height,
      progressStart: LINE_TYPE.BottomLine,
    });
    expect(totalLength).toEqual(width);
  });
});

describe('Test getBorderRadiuses function', () => {
  const borderRadius = '4px';
  const width = 300;
  const height = 200;
  const props = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width,
    height,
    progressStart: START.BottomLeft,
    type: LINE_TYPE.BottomLine,
    borderRadius
  };

  describe('test borderRadiuses when progressLine of BottomLine type', () => {
    const bottomLineProps = { ...props, type: LINE_TYPE.BottomLine }

    it(`checks borderRadiuses when start of BottomLeft type`, () => {
      const { bottomBarBorderRadiuses } = getBorderRadiuses(bottomLineProps);
      expect(bottomBarBorderRadiuses.borderTopRightRadius).toEqual(borderRadius);
      expect(bottomBarBorderRadiuses.borderBottomRightRadius).toEqual(borderRadius);
      expect(bottomBarBorderRadiuses.borderTopLeftRadius).toEqual(0);
      expect(bottomBarBorderRadiuses.borderBottomLeftRadius).toEqual(0);
    });

    it(`checks borderRadiuses when start of BottomRight type`, () => {
      const { bottomBarBorderRadiuses } = getBorderRadiuses({...bottomLineProps, progressStart: START.BottomRight});
      expect(bottomBarBorderRadiuses.borderTopLeftRadius).toEqual(borderRadius);
      expect(bottomBarBorderRadiuses.borderBottomLeftRadius).toEqual(borderRadius);
      expect(bottomBarBorderRadiuses.borderTopRightRadius).toEqual(0);
      expect(bottomBarBorderRadiuses.borderBottomRightRadius).toEqual(0);
    });
  });

  // describe('test borderRadiuses when progressLine of OneLine type', () => {
  //   const oneLineProps = { ...props, type: LINE_TYPE.OneLine }

  //   it(`checks borderRadiuses when start of BottomLeft type`, () => {
  //     const { bottomBarBorderRadiuses } = getBorderRadiuses(oneLineProps);
  //     expect(bottomBarBorderRadiuses.borderTopRightRadius).toEqual(borderRadius);
  //     expect(bottomBarBorderRadiuses.borderBottomRightRadius).toEqual(borderRadius);
  //   });

  //   it(`checks borderRadiuses when start of BottomRight type`, () => {
  //     const { bottomBarBorderRadiuses } = getBorderRadiuses({...props, progressStart: START.BottomRight});
  //     expect(bottomBarBorderRadiuses.borderTopLeftRadius).toEqual(borderRadius);
  //     expect(bottomBarBorderRadiuses.borderBottomLeftRadius).toEqual(borderRadius);
  //   });
  // });


});

describe('Test types', () => {
  it('checks START types', () => {
    expect(START.BottomLeft).toEqual('BottomLeft');
    expect(START.TopLeft).toEqual('TopLeft');
    expect(START.TopRight).toEqual('TopRight');
    expect(START.BottomRight).toEqual('BottomRight');
  });

  it('checks LINE_TYPE types', () => {
    expect(LINE_TYPE.OneLine).toEqual('OneLine');
    expect(LINE_TYPE.TwoLines).toEqual('TwoLines');
    expect(LINE_TYPE.BottomLine).toEqual('BottomLine');
  });
});
