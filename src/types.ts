export enum START {
  BottomLeft = 'BottomLeft',
  TopLeft = 'TopLeft',
  TopRight = 'TopRight',
  BottomRight = 'BottomRight'
}

export enum LINE_TYPE {
  OneLine = 'OneLine',
  TwoLines = 'TwoLines',
  BottomLine = 'BottomLine'
}

export interface VideoProps extends React.ComponentPropsWithoutRef<'video'> {
  pathColor?: string
  pathWidth?: string
  progressStart?: START
  type?: LINE_TYPE
  wrapperStyle?: React.CSSProperties
  wrapperClassName?: string
  onLoadedMetadata?(e: React.SyntheticEvent<HTMLVideoElement>): void
  onTimeUpdate?(e: React.SyntheticEvent<HTMLVideoElement>): void
}

export type Ref = HTMLVideoElement | null
