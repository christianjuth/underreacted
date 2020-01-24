import React, { useContext, useState, useEffect } from 'react';
export const Context = React.createContext({breakPoint: null, spacing: 0});

const breakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
};
const breakPointKeys = Object.keys(breakPoints);

export function useGrid() {
  return useContext(Context);
}

export function Provider(props: any) {

  // function getBreakpoint() {
  //   let width = window.innerWidth;
  //   let breaker;
  //   breakPointKeys.forEach(key => {
  //     if(width > breakPoints[key]) {
  //       breaker = key;
  //     }
  //   });
  //   return breaker;
  // }

  // const [breakPoint, setBreakPoint] = useState(null);

  // useEffect(() => {
  //   const onLayout = () => {
  //     setBreakPoint(getBreakpoint());
  //   };
  //   // onLayout();
  //   window.addEventListener('load', onLayout);
  //   // window.addEventListener('resize', onLayout);
  //   // setTimeout(() => onLayout(), 5000);
  //   return () => {
  //     window.removeEventListener('load', onLayout);
  //     window.removeEventListener('resize', onLayout);
  //   }
  // }, [window, process.browser]);

  return (
    <Context.Provider value={{breakPoint: null, spacing: 0}}>
      <div style={{flex: 1}}>
        {props.children}
      </div>
    </Context.Provider>
  );
}

export function Consumer({ children }: any) {
  return children(useGrid());
}