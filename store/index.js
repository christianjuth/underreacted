
import React, { useContext, useReducer, useEffect } from 'react';

export const Context = React.createContext({
  store: {},
  dispatch: null
});

const initialState = { 
  darkTheme: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_TOGGLE':
      return { 
        darkTheme: !state.darkTheme
      };
    case 'REHYDRATE': {
      return rehydrate(state);
    }
    default:
      throw new Error();
  }
}

function saveState(state) {
  localStorage.setItem('root:persist', JSON.stringify(state));
}

function rehydrate(state) {
  let savedState = JSON.parse(localStorage.getItem('root:persist'));
  return Object.assign({}, state, savedState);
}

function persist(reducer) {
  return (state, action) => {
    let newState = reducer(state, action);
    saveState(newState);
    return newState;
  }
}

export function Provider({ children }) {
  const [ store, dispatch ] = useReducer(persist(reducer), initialState);

  let isBrowser = typeof(window) !== 'undefined';

  useEffect(() => {
    dispatch({
      type: 'REHYDRATE'
    });
  }, [isBrowser]);

  return (
    <Context.Provider value={{ store, dispatch }}>
      {children}
    </Context.Provider>
  );
}

export function useSelector(fn) {
  return fn(useContext(Context).store);
}

export function useDispatch() {
  return useContext(Context).dispatch;
}

export function toggleDarkMode() {
  return {
    type: 'DARK_MODE_TOGGLE'
  } 
}