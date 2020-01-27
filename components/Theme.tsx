import React, { useContext } from 'react';
import { theme as themeType } from '../types';
import { theme } from '../constants';

const Context = React.createContext<themeType>(theme.dark);

function Provider({ children }: { children: any }) {
  
  // let isBrowser = typeof(window) !== 'undefined';
  // useEffect(() => {
  //   if(isBrowser) {
  //     window.document.body.style.background = theme.dark.colors.background;
  //   }
  // }, [isBrowser]);

  return (
    <Context.Provider value={theme.dark}>
      {children}
    </Context.Provider>
  );
}

export function useTheme(): themeType {
  return useContext(Context);
}

export function withTheme(WrappedComponent) {
  return (props) => (
    <Context.Consumer>
      {(context: themeType) => (
        <WrappedComponent {...props} theme={context as themeType} />
      )}  
    </Context.Consumer>
  );
}

export function Consumer({ children }) {
  let theme: themeType = useTheme();
  return children(theme);
}

export default {
  Context,
  Provider,
  Consumer,
  useTheme,
  withTheme
};