import React, { useContext, useState, useEffect } from 'react';
import { window } from 'browser-monads';
import { theme as themeType } from '../types';
import { theme } from '../constants';

const Context = React.createContext<themeType>(theme.light);

function prefersDark(): boolean {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function Provider({ children }: { children: any }) {

  let [activeTheme, setActiveTheme] = useState<themeType>(theme.dark);

  useEffect(() => {
    const updateTheme = () => {
      if(prefersDark()) {
        setActiveTheme(theme.dark);
      } else {
        setActiveTheme(theme.light);
      }
    };
    // updateTheme();
    // window.addEventListener('load', updateTheme);
    // window.addEventListener('resize', updateTheme);
    setTimeout(() => updateTheme(), 5000);
    return () => {
      window.removeEventListener('load', updateTheme);
      window.removeEventListener('resize', updateTheme);
    }
  }, [window]);

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