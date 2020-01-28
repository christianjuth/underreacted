import React from 'react';
import * as CSS from 'csstype';
import { useTheme } from './Theme';

interface TextProps extends CSS.Properties {
  children: React.ReactNode,
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span',
  style?: CSS.Properties,
  color?: string,
  className?: string,
  noPadding?: boolean
};

function Text({ children, color, variant, noPadding, style, className, ...cssProperties }: TextProps) {
  const { colors } = useTheme();

  let computedColor = null;
  if(color === 'muted') {
    computedColor = colors.textMuted;
  } else if(color === 'primary') {
    computedColor = colors.primary;
  } else if(color === 'accent') {
    computedColor = colors.accent;
  } else if(['h6'].includes(variant)) {
    computedColor = colors.textMuted;
  } else if(color) {
    computedColor = color;
  }

  let computedStyle = Object.assign({}, {
    color: computedColor,
    paddingBottom: noPadding ? 0 : null,
    marginBottom: noPadding ? 0 : null
  }, cssProperties, style);

  function Variant(props: any) {
    switch(variant) {
      case 'h1':
        return <h1 {...props}>{children}</h1>;
      case 'h2':
        return <h2 {...props}>{children}</h2>;
      case 'h3':
        return <h3 {...props}>{children}</h3>;
      case 'h4':
        return <h4 {...props}>{children}</h4>;
      case 'h5':
        return <h5 {...props}>{children}</h5>;
      case 'h6':
        return <h6 {...props}>{children}</h6>;
      case 'p':
        return <p {...props}>{children}</p>;
      default:
        return <span {...props}>{children}</span>;
    }
  }

  return (
    <Variant className={className} {...{style: computedStyle}}>
      {children}
    </Variant>
  );
}

export default Text;