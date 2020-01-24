import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useTheme } from './Theme';
import * as CSS from 'csstype';

interface LinkProps {
  href?: string,
  children: React.ReactNode,
  style?: CSS.Properties,
}

function Link({ href, children, style }: LinkProps) {
  let { colors } = useTheme();

  let computedStyle = Object.assign({}, {
    color: colors.primary
  }, style);

  return <a style={computedStyle} href={href} children={children}/>;
}

interface NextProps extends NextLinkProps {
  children: React.ReactNode,
  style?: CSS.Properties,
}

function Next({ children, style, ...rest }: NextProps) {
  let { colors } = useTheme();

  let computedStyle = Object.assign({}, {
    color: colors.primary
  }, style);

  return (
    <NextLink {...rest}>
      <a style={computedStyle} children={children}/>
    </NextLink>
  );
}

Link.Next = Next;
export default Link;