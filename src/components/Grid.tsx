import React, { useState, useContext, useEffect } from 'react';
import * as CSS from 'csstype';
const Context = React.createContext({breakPoint: null, spacing: 0});


// type definitions
interface breakPoints {
  xs?: number | string,
  sm?: number | string,
  md?: number | string,
  lg?: number | string,
  xl?: number | string,
  xxl?: number | string
}

interface ColProps extends CSS.Properties, breakPoints {
  style?: CSS.StandardProperties,
  children?: React.ReactNode
}

interface RowProps extends CSS.Properties, breakPoints {
  style?: CSS.StandardProperties,
  children?: React.ReactNode,
  spacing?: number
}

interface ConsumerProps {
  children: Function
}



const breakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
};
const breakPointKeys = Object.keys(breakPoints);

function Col(props: ColProps) {
  const context = useContext(Context),
    { breakPoint, spacing } = context,
    { xs, sm, md, lg, xl, xxl, style, children, ...cssProperties } = props,
    breakpointProps = { xs, sm, md, lg, xl, xxl };

  let width;
  breakPointKeys.forEach(key => {
    if(typeof breakpointProps[key] !== 'undefined' && breakPointKeys.indexOf(key) <= breakPointKeys.indexOf(breakPoint)) {
      width = breakpointProps[key];
    }
  });

  const computedStyle = width === 0 ? {
    display: 'none'
  } : Object.assign({}, {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    maxWidth: typeof width === 'number' ? `${width / 0.24}%` : width,
    minWidth: typeof width === 'number' ? `${width / 0.24}%` : width,
    width: typeof width === 'number' ? `${width / 0.24}%` : width,
    paddingLeft: spacing / 2,
    paddingRight: spacing / 2
  }, cssProperties, style);

  return (
    <div style={computedStyle}>
      {children}
    </div>
  );
}

export function useGrid() {
  return useContext(Context);
}

export function BreakpointSwitch(styles) {
  const { breakPoint } = useContext(Context);

  let style;
  breakPointKeys.forEach(key => {
    if(styles[key] !== undefined && breakPointKeys.indexOf(key) <= breakPointKeys.indexOf(breakPoint)) {
      style = styles[key];
    }
  });

  return style;
}

function Row(options: RowProps) {
  const context = useContext(Context);

  options = Object.assign({}, {
    spacing: 0
  }, options);
  let { spacing, children, style, ...cssProperties } = options;

  const computedStyle = Object.assign({}, {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -spacing / 2 + 'px',
    marginRight: -spacing / 2 + 'px'
  }, cssProperties, style);

  return (
    <Context.Provider value={{...context, spacing }}>
      <div style={computedStyle}>
        {children}
      </div>
    </Context.Provider>
  );
}

function Provider(props) {

  function getBreakpoint() {
    let width = window.innerWidth;
    let breaker;
    breakPointKeys.forEach(key => {
      if(width > breakPoints[key]) {
        breaker = key;
      }
    });
    return breaker;
  }

  const [breakPoint, setBreakPoint] = useState(getBreakpoint());

  useEffect(() => {
    const onLayout = () => setBreakPoint(getBreakpoint());
    onLayout();
    window.addEventListener('resize', onLayout);
    return () => {
      window.removeEventListener('resize', onLayout);
    }
  }, []);

  return (
    <Context.Provider value={{breakPoint, spacing: 0}}>
      <div style={{flex: 1}}>
        {props.children}
      </div>
    </Context.Provider>
  );
}

function Consumer({ children }: ConsumerProps) {
  return children(useGrid());
}

export {
  Context,
  Provider,
  Consumer,
  Row,
  Col
};