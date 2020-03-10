import React from "react"
import { Section, Text } from '../components';
import { Helmet } from 'react-helmet';

function NotFoundPage(){
  return (
    <>
      <Helmet>
        <title>Underreacted</title>
      </Helmet>
      <Section>
        <Text variant='h1'>404. Not Found.</Text>
      </Section>
    </>
  );
}

export default NotFoundPage;
