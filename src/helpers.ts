import {
  START_STRINGS,
  LINE_TYPE_STRINGS,
  START,
  LINE_TYPE,
} from './types';

export function getLengthes({
  path,
  width,
  height,
  progressStart,
  type,
}: {
  path: number;
  width: number;
  height: number;
  progressStart: START_STRINGS;
  type: LINE_TYPE_STRINGS;
}) {
  let top = 0;
  let right = 0;
  let bottom = 0;
  let left = 0;

  if (type === LINE_TYPE.OneLine) {
    switch (progressStart) {
      case START.BottomLeft:
        left = path > height ? height : path;
        top = path > height + width ? width : path - height;
        right = path > height * 2 + width ? height : path - height - width;
        bottom =
          path > height * 2 + width * 2 ? width : path - height * 2 - width;
        break;
      case START.TopLeft:
        top = path > width ? width : path;
        right = path > height + width ? height : path - width;
        bottom = path > width * 2 + height ? width : path - height - width;
        left =
          path > height * 2 + width * 2 ? height : path - width * 2 - height;
        break;
      case START.TopRight:
        right = path > height ? height : path;
        bottom = path > height + width ? width : path - height;
        left = path > height * 2 + width ? height : path - height - width;
        top = path > height * 2 + width * 2 ? width : path - height * 2 - width;
        break;
      case START.BottomRight:
        bottom = path > width ? width : path;
        left = path > height + width ? height : path - width;
        top = path > width * 2 + height ? width : path - height - width;
        right =
          path > height * 2 + width * 2 ? height : path - width * 2 - height;
        break;
    }
  } else if (type === LINE_TYPE.TwoLines) {
    switch (progressStart) {
      case START.BottomLeft:
        left = path > height ? height : path;
        bottom = path > width ? width : path;
        top = path > height + width ? width : path - height;
        right = path > height + width ? height : path - width;
        break;
      case START.TopLeft:
        left = path > height ? height : path;
        top = path > width ? width : path;
        bottom = path > height + width ? width : path - height;
        right = path > height + width ? height : path - width;
        break;
      case START.TopRight:
        right = path > height ? height : path;
        top = path > width ? width : path;
        bottom = path > height + width ? width : path - height;
        left = path > height + width ? height : path - width;
        break;
      case START.BottomRight:
        right = path > height ? height : path;
        bottom = path > width ? width : path;
        top = path > height + width ? width : path - height;
        left = path > height + width ? height : path - width;
        break;
    }
  } else if (type === LINE_TYPE.BottomLine) {
    bottom = path > width ? width : path;
  }

  return {
    top: top > 0 ? top : 0,
    right: right > 0 ? right : 0,
    bottom: bottom > 0 ? bottom : 0,
    left: left > 0 ? left : 0,
  };
}

export function getBarsPositions(
  progressStart: START_STRINGS,
  progressType: LINE_TYPE_STRINGS
) {
  const leftBar: React.CSSProperties = { left: 0 };
  const topBar: React.CSSProperties = { top: 0 };
  const rightBar: React.CSSProperties = { right: 0 };
  const bottomBar: React.CSSProperties = { bottom: 0 };
  if (progressType === LINE_TYPE.OneLine) {
    switch (progressStart) {
      case START.BottomLeft:
      case START.TopLeft:
      case START.TopRight:
      case START.BottomRight:
        leftBar.bottom = 0;
        topBar.left = 0;
        rightBar.top = 0;
        bottomBar.right = 0;
        break;
    }
  } else if (progressType === LINE_TYPE.TwoLines) {
    switch (progressStart) {
      case START.BottomLeft:
        leftBar.bottom = 0;
        bottomBar.left = 0;
        topBar.left = 0;
        rightBar.bottom = 0;
        break;
      case START.TopLeft:
        leftBar.top = 0;
        bottomBar.left = 0;
        topBar.left = 0;
        rightBar.top = 0;
        break;
      case START.TopRight:
        leftBar.top = 0;
        bottomBar.right = 0;
        topBar.right = 0;
        rightBar.top = 0;
        break;
      case START.BottomRight:
        leftBar.bottom = 0;
        topBar.right = 0;
        rightBar.bottom = 0;
        bottomBar.right = 0;
        break;
    }
  } else if (progressType === LINE_TYPE.BottomLine) {
    switch (progressStart) {
      case START.BottomLeft:
        bottomBar.left = 0;
        break;
      case START.BottomRight:
        bottomBar.right = 0;
        break;
      default:
        bottomBar.left = 0;
        break;
    }
  }

  return {
    leftBar,
    topBar,
    rightBar,
    bottomBar,
  };
}

export function getTotalLength({
  width,
  height,
  progressStart,
}: {
  width: number;
  height: number;
  progressStart: LINE_TYPE_STRINGS;
}): number {
  switch (progressStart) {
    case LINE_TYPE.OneLine:
      return (width + height) * 2;
    case LINE_TYPE.TwoLines:
      return width + height;
    case LINE_TYPE.BottomLine:
      return width;
    default:
      return 0;
  }
}

export function getBorderRadiuses({
  top,
  right,
  bottom,
  left,
  width,
  height,
  progressStart,
  type,
  borderRadius
}: {
  top: number,
  right: number,
  bottom: number,
  left: number,
  width: number,
  height: number,
  progressStart: START_STRINGS,
  type: LINE_TYPE_STRINGS,
  borderRadius: string
}): {
  leftBarBorderRadiuses: React.CSSProperties, 
  rightBarBorderRadiuses: React.CSSProperties, 
  bottomBarBorderRadiuses: React.CSSProperties, 
  topBarBorderRadiuses: React.CSSProperties
} {
  const borderRadiuses: React.CSSProperties = { 
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
  const leftBarBorderRadiuses = { ...borderRadiuses };
  const rightBarBorderRadiuses = { ...borderRadiuses };
  const bottomBarBorderRadiuses = { ...borderRadiuses };
  const topBarBorderRadiuses = { ...borderRadiuses };

  if (type === LINE_TYPE.BottomLine) {
    switch(progressStart) {
      case START.BottomLeft:
        bottomBarBorderRadiuses.borderTopRightRadius = borderRadius;
        bottomBarBorderRadiuses.borderBottomRightRadius = borderRadius;
        break;
      case START.BottomRight:
        bottomBarBorderRadiuses.borderTopLeftRadius = borderRadius;
        bottomBarBorderRadiuses.borderBottomLeftRadius = borderRadius;
        break;
      default:
        break;
    }
  } else if ( type === LINE_TYPE.OneLine) {
    switch(progressStart) {
      case START.BottomRight:
      case START.TopRight:
      case START.TopLeft:
      case START.BottomLeft:
        if (bottom < width) {
          bottomBarBorderRadiuses.borderTopLeftRadius = borderRadius;
          bottomBarBorderRadiuses.borderBottomLeftRadius = borderRadius;
        }
        if (right < height) {
          rightBarBorderRadiuses.borderBottomLeftRadius = borderRadius;
          rightBarBorderRadiuses.borderBottomRightRadius = borderRadius;
        }
        if (top < width) {
          topBarBorderRadiuses.borderTopRightRadius = borderRadius;
          topBarBorderRadiuses.borderBottomRightRadius = borderRadius;
        }
        if (left < height) {
          leftBarBorderRadiuses.borderTopLeftRadius = borderRadius;
          leftBarBorderRadiuses.borderTopRightRadius = borderRadius;
        }
        break;
      default:
        break;
    }
  } else if ( type === LINE_TYPE.TwoLines) {
    switch(progressStart) {
      case START.BottomRight:
        if (bottom < width) {
          bottomBarBorderRadiuses.borderTopLeftRadius = borderRadius;
          bottomBarBorderRadiuses.borderBottomLeftRadius = borderRadius;
        }
        if (right < height) {
          rightBarBorderRadiuses.borderTopLeftRadius = borderRadius;
          rightBarBorderRadiuses.borderTopRightRadius = borderRadius;
        }
        if (top < width) {
          topBarBorderRadiuses.borderTopLeftRadius = borderRadius;
          topBarBorderRadiuses.borderBottomLeftRadius = borderRadius;
        }
        if (left < height) {
          leftBarBorderRadiuses.borderTopRightRadius = borderRadius;
          leftBarBorderRadiuses.borderTopLeftRadius = borderRadius;
        }
        break;
      case START.TopRight:
        if (bottom < width) {
          bottomBarBorderRadiuses.borderTopLeftRadius = borderRadius;
          bottomBarBorderRadiuses.borderBottomLeftRadius = borderRadius;
        }
        if (right < height) {
          rightBarBorderRadiuses.borderBottomLeftRadius = borderRadius;
          rightBarBorderRadiuses.borderBottomRightRadius = borderRadius;
        }
        if (top < width) {
          topBarBorderRadiuses.borderTopLeftRadius = borderRadius;
          topBarBorderRadiuses.borderBottomLeftRadius = borderRadius;
        }
        if (left < height) {
          leftBarBorderRadiuses.borderBottomLeftRadius = borderRadius;
          leftBarBorderRadiuses.borderBottomRightRadius = borderRadius;
        }
        break;
      case START.TopLeft:
        if (bottom < width) {
          bottomBarBorderRadiuses.borderTopRightRadius = borderRadius;
          bottomBarBorderRadiuses.borderBottomRightRadius = borderRadius;
        }
        if (right < height) {
          rightBarBorderRadiuses.borderBottomLeftRadius = borderRadius;
          rightBarBorderRadiuses.borderBottomRightRadius = borderRadius;
        }
        if (top < width) {
          topBarBorderRadiuses.borderTopRightRadius = borderRadius;
          topBarBorderRadiuses.borderBottomRightRadius = borderRadius;
        }
        if (left < height) {
          leftBarBorderRadiuses.borderBottomLeftRadius = borderRadius;
          leftBarBorderRadiuses.borderBottomRightRadius = borderRadius;
        }
        break;
      case START.BottomLeft:
        if (bottom < width) {
          bottomBarBorderRadiuses.borderTopRightRadius = borderRadius;
          bottomBarBorderRadiuses.borderBottomRightRadius = borderRadius;
        }
        if (right < height) {
          rightBarBorderRadiuses.borderTopLeftRadius = borderRadius;
          rightBarBorderRadiuses.borderTopRightRadius = borderRadius;
        }
        if (top < width) {
          topBarBorderRadiuses.borderTopRightRadius = borderRadius;
          topBarBorderRadiuses.borderBottomRightRadius = borderRadius;
        }
        if (left < height) {
          leftBarBorderRadiuses.borderTopLeftRadius = borderRadius;
          leftBarBorderRadiuses.borderTopRightRadius = borderRadius;
        }
        break;
      default:
        break;
    }
  }
  return {
    leftBarBorderRadiuses,
    rightBarBorderRadiuses,
    bottomBarBorderRadiuses,
    topBarBorderRadiuses
  }
}
