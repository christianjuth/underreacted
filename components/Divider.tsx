import React from 'react';
import * as CSS from 'csstype';
import { useTheme } from './Theme';

interface DividerProps extends CSS.Properties {
  style?: CSS.Properties
}

function Divider({ style, ...cssProps }: DividerProps) {
  let { colors } = useTheme();

  let computedStyle = Object.assign({}, {
    height: 1,
    width: '100%',
    backgroundColor: colors.divider
  }, cssProps, style);

  return (
    <div className='hr' style={computedStyle}/>
  );
}

export default Divider;