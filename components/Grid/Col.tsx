import React, { useContext } from 'react';
import * as types from './types';
import { Context } from './context';
import * as Styles from './styles';

const breakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
};
const breakPointKeys = Object.keys(breakPoints);

function Col(props: types.ColProps) {
  const context = useContext(Context),
    { spacing } = context,
    { xs, sm, md, lg, xl, xxl, style, children, ...cssProperties } = props,
    breakpointProps = { xs, sm, md, lg, xl, xxl };

  let crntWidth,
    computedBreakPoints = {};
  breakPointKeys.forEach(key => {
    if(typeof breakpointProps[key] === 'number') {
      crntWidth = breakpointProps[key] / 0.24 + '%';
    } else if(typeof breakpointProps[key] === 'string') {
      crntWidth = breakpointProps[key];
    }
    computedBreakPoints[key] = crntWidth;
  });

  let computedStyle = Object.assign({}, style, cssProperties);

  return (
    <Styles.Col 
      computedBreakPoints={computedBreakPoints} 
      spacing={spacing}
      style={computedStyle}
      breakPoints={breakPoints}
    >
      {children}
    </Styles.Col>
  );
}

export default Col;