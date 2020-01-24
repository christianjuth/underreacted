import React, { useContext } from 'react';
import { Context } from './context';
import * as types from './types'

function Row(options: types.RowProps) {
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

export default Row;