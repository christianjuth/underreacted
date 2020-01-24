import * as CSS from 'csstype';

// type definitions
export interface breakPoints {
  xs?: number | string,
  sm?: number | string,
  md?: number | string,
  lg?: number | string,
  xl?: number | string,
  xxl?: number | string
}

export interface ColProps extends CSS.Properties, breakPoints {
  style?: CSS.StandardProperties,
  children?: React.ReactNode
}

export interface RowProps extends CSS.Properties, breakPoints {
  style?: CSS.StandardProperties,
  children?: React.ReactNode,
  spacing?: number
}

export interface ConsumerProps {
  children: Function
}