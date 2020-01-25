import React, { useContext, useState, useEffect } from 'react';
import { theme as themeType } from '../types';
import { theme } from '../constants';
import { useSelector } from 'react-redux';

const Context = React.createContext<themeType>(theme.dark);

function Provider({ children }: { children: any }) {

  let [activeTheme, setActiveTheme] = useState<themeType>(theme.dark),
    dark = useSelector(s => s.theme.darkMode);

  useEffect(() => {
    if(dark) {
      setActiveTheme(theme.dark);
    } else {
      setActiveTheme(theme.light);
    }
  }, [dark]);

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
  Context,
  Provider,
  Consumer,
  useTheme,
  withTheme
};