import React from 'react';
import * as CSS from 'csstype';
import * as Grid from './Grid';
let { Col, Row, ResponsiveStyles } = Grid;

interface SectionProps extends CSS.Properties {
  children: React.ReactNode,
  style?: CSS.Properties,
  slim?: boolean
}

function Section({ children, style, slim, ...cssStyles }: SectionProps) {
  let computedStyle = Object.assign({}, cssStyles, style);

  return (
    <ResponsiveStyles
      styles={{
        xs: { padding: '20px' },
        md: { padding: slim ? '20px 0' : '30px 0' }
      }}
    >
      <Row style={computedStyle} justifyContent='center'>
        <Col xs={24} md='675px'>
          {children}
        </Col>
      </Row>
    </ResponsiveStyles>
  );
}

export default Section;