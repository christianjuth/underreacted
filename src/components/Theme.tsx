import React, { useContext, useEffect } from 'react';
import { theme as themeType } from '../types';
import { theme } from '../constants';

const Context = React.createContext<themeType>(theme.light);

function prefersDark(): boolean {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function Provider({ children }: { children: any }) {

  let darkMode = prefersDark(),
    activeTheme: themeType = darkMode ? theme.dark : theme.light;

  useEffect(() => {
    document.body.style.background = activeTheme.colors.background;
  }, [activeTheme]);

  return (
    <Context.Provider value={{...activeTheme}}>
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
  prefersDark,
  Context,
  Provider,
  Consumer,
  useTheme,
  withTheme
};