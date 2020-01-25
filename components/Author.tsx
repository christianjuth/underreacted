import React from 'react';
import styled from 'styled-components';
import { useTheme } from './Theme';
import Text from './Text';
import Link from './Link';
let profile = require('../images/profile.jpg');

const Card = styled.div`
  user-select: none;
  display: flex;
  max-width: 325px; 
  height: 80px;
  border: 1px solid ${({borderColor}) => borderColor};
  border-radius: 90px;
  padding: 10px;
  align-items: center;
`;

const ProfilePicture = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  margin-right: 8px;
`;

function Author() {
  let { colors } = useTheme();
  return (
    <Card borderColor={colors.divider}>
      <ProfilePicture alt='' src={profile}/>
      <Text variant='p' noPadding>
        Personal blog of <Link href='https://christianjuth.com'>Christian Juth</Link><br/> Watch me struggle to code
      </Text>
    </Card>
  );
}

export default Author;