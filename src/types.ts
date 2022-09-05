export const LINE_TYPE = {
  OneLine: 'OneLine',
  TwoLines: 'TwoLines',
  BottomLine: 'BottomLine',
} as const;

export const START = {
  BottomLeft: 'BottomLeft',
  TopLeft: 'TopLeft',
  TopRight: 'TopRight',
  BottomRight: 'BottomRight',
} as const;

type START_KEYS = keyof typeof START;
type LINE_TYPE_KEYS = keyof typeof LINE_TYPE;
export type START_STRINGS = typeof START[START_KEYS];
export type LINE_TYPE_STRINGS = typeof LINE_TYPE[LINE_TYPE_KEYS];

export interface VideoProps extends React.ComponentPropsWithoutRef<'video'> {
  pathColor?: string;
  pathWidth?: string;
  pathBorderRadius?: string;
  progressStart?: START_KEYS;
  type?: LINE_TYPE_STRINGS;
  wrapperStyle?: React.CSSProperties;
  wrapperClassName?: string;
  onLoadedMetadata?(e: React.SyntheticEvent<HTMLVideoElement>): void;
  onTimeUpdate?(e: React.SyntheticEvent<HTMLVideoElement>): void;
}

export type Ref = HTMLVideoElement | null;
