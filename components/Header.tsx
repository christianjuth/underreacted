import React from 'react';
import Section from './Section';
import Text from './Text';
import Grid from './Grid';
import { useTheme } from './Theme';
import Link from './Link';
import Twitter from 'react-ionicons/lib/LogoTwitter';
import LogoGithub from 'react-ionicons/lib/LogoGithub';

let { Row } = Grid;

function Header() {
  let { colors } = useTheme();

  return (
    <Section paddingBottom={0} zIndex={1000} position='relative'>
      <Row alignItems='center'>
        <Link.Next href='/' style={{textDecoration: 'none'}}>
          <Text variant='h3' color='accent'>Underreacted</Text>
        </Link.Next>
        <div style={{flex: 1}}/>
        <LogoGithub color={colors.accent} style={{marginRight: 10}}/>
        <Twitter color={colors.accent}/>
      </Row>
    </Section>
  );
}

export default Header;