import types from './types';
import { window } from 'browser-monads';

function prefersDark(): boolean {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function darkModeEnable() {
  return {
    type: types.DARK_MODE_ENABLE
  };
}

function darkModeDisable() {
  return {
    type: types.DARK_MODE_DISABLE
  };
}

function darkModeToggle() {
  return (dispatch, getState) => {
    let { theme } = getState();
    dispatch({
      type: theme.darkMode ? types.DARK_MODE_DISABLE : types.DARK_MODE_ENABLE
    });
  }
}

function loadDefault() {
  return (dispatch, getState) => {
    let { theme } = getState();
    if(theme.darkMode === null) {
      if(prefersDark()) {
        dispatch(darkModeEnable());
      } else {
        dispatch(darkModeDisable());
      }
    }
  }
}

export {
  darkModeEnable,
  darkModeDisable,
  darkModeToggle,
  loadDefault
};