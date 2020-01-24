import React, { Children } from 'react';
import { useTheme } from './Theme';
import { Link as GatsbyLink } from "gatsby";

function Link({ to, children, style, ...props }) {
  let { colors } = useTheme();

  let computedStyle = Object.assign({}, {
    color: colors.primary
  }, style);

  if(/^\//.test(to)) {
    return <GatsbyLink style={computedStyle} to={to} children={children}/>;
  } else {
    return <a style={computedStyle} href={to} children={children}/>;
  }
}

export default Link;