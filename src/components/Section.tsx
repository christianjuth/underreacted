import React from 'react';
import * as CSS from 'csstype';
import * as Grid from './Grid';
let { Col, Row, BreakpointSwitch } = Grid;

interface SectionProps extends CSS.Properties {
  children: React.ReactNode,
  style: CSS.Properties,
  /**
   * Used to add extra bottom padding
   * to the last section on the page
   */
  last: boolean
}

function Section({ last, children, style, ...cssStyles }: SectionProps) {
  let padding = BreakpointSwitch({
    xs: 20,
    md: 40
  });

  let paddingLast = BreakpointSwitch({
    xs: 20,
    md: 100
  });

  let computedStyle = Object.assign({}, {
    paddingTop: padding,
    paddingBottom: last ? paddingLast : padding
  }, cssStyles, style);

  return (
    <Row style={computedStyle} justifyContent='center'>
      <Col xs={22} lg='650px'>
        {children}
      </Col>
    </Row>
  );
}

export default Section;