import React, { useContext } from 'react';
export const Context = React.createContext({breakPoint: null, spacing: 0});

export function useGrid() {
  return useContext(Context);
}

export function Provider(props: any) {
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