import React from 'react';
import Section from './Section';
import Text from './Text';
import Grid from './Grid';
import { useTheme } from './Theme';
import { useDispatch } from 'react-redux';
import { themeActions } from '../store/ducks/theme';
import Link from './Link';
import Moon from 'react-ionicons/lib/MdMoon';
import Sun from 'react-ionicons/lib/MdSunny';

let { Row, Col } = Grid;

function Header() {
  let { colors, dark } = useTheme(), 
    dispatch = useDispatch();

  return (
    <Section paddingBottom={0} zIndex={1000} position='relative'>
      <Row alignItems='center'>
        <Link.Next href='/' style={{textDecoration: 'none'}}>
          <Text variant='h3' color='accent'>Underreacted</Text>
        </Link.Next>
        <Col/>
        <div 
          style={{cursor: 'pointer'}} 
          onClick={() => dispatch(themeActions.darkModeToggle())}
        >
          {dark ? <Moon color={colors.accent}/> : <Sun color='#f1c40f'/>}
        </div>
      </Row>
    </Section>
  );
}

export default Header;