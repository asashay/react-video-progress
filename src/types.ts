export enum StartOptions {
  BottomLeft = 'BottomLeft',
  TopLeft = 'TopLeft',
  TopRight = 'TopRight',
  BottomRight = 'BottomRight'
}

export enum ProgressTypes {
  OneLine = 'OneLine',
  TwoLines = 'TwoLines'
}

export interface VideoProps extends React.ComponentPropsWithoutRef<'video'> {
  pathColor?: string
  pathWidth?: string
  progressStart?: StartOptions
  type?: ProgressTypes
  wrapperStyle?: React.CSSProperties
  wrapperClassName?: string
  onLoadedMetadata?(e: React.SyntheticEvent<HTMLVideoElement>): void
  onTimeUpdate?(e: React.SyntheticEvent<HTMLVideoElement>): void
}

export type Ref = HTMLVideoElement | null
