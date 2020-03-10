import React from 'react';
import Section from './Section';
import Text from './Text';
import Grid from './Grid';
import { useTheme } from 'react-context-theming';
import Link from './Link';
import Twitter from 'react-ionicons/lib/LogoTwitter';
import LogoGithub from 'react-ionicons/lib/LogoGithub';

let { Row } = Grid;

function Header() {
  let { colors } = useTheme();

  return (
    <Section paddingBottom='5px' zIndex={1000} position='relative'>
      <Row alignItems='center'>
        <Link.Next href='/' style={{textDecoration: 'none'}}>
          <Text variant='h4' color='accent' noPadding>Underreacted</Text>
        </Link.Next>
        <div style={{flex: 1}}/>
        <a href='https://github.com/christianjuth' style={{display: 'inline-flex'}}>
          <LogoGithub color={colors.accent} style={{marginRight: 12}}/>
        </a>
        <a href='https://twitter.com/christianjuth' style={{display: 'inline-flex'}}>
          <Twitter color={colors.accent}/>
        </a>
      </Row>
    </Section>
  );
}

export default Header;