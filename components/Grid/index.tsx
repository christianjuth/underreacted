import Col from './Col';
import Row from './Row';
import { Context, Provider } from './context';
import * as Styles from './styles';

const breakPoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
};
const breakPointKeys = Object.keys(breakPoints);

let camelToDash = (s: string) => s.replace(/[A-Z]/g, m => "-" + m.toLowerCase());

function toBrowserCss(css) {
  let output = {};
  Object.keys(css).forEach(prop => {
    output[camelToDash(prop)] = css[prop];
  }); 
  return output;
}

function ResponsiveStyles({ children, styles }) {
  let crntStyle,
  computedStyles = {};
  breakPointKeys.forEach(key => {
    if(typeof styles[key] !== 'undefined') {
      crntStyle = styles[key];
    }
    computedStyles[key] = toBrowserCss(crntStyle);
  });

  return (
    <Styles.BreakpointSwitch
      breakPoints={breakPoints}
      computedStyles={computedStyles}
    >
      {children}
    </Styles.BreakpointSwitch>
  );
}

export {
  Col,
  Row,
  Context,
  Provider,
  ResponsiveStyles
};

export default {
  Col,
  Row,
  Context,
  Provider,
  ResponsiveStyles
}