import types from './types';

const initialState = {
  darkMode: null
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case types.DARK_MODE_ENABLE:
      return {
        ...state,
        darkMode: true
      };
    case types.DARK_MODE_DISABLE:
      return {
        ...state,
        darkMode: false
      };
    default:
      return state;
  }
}
