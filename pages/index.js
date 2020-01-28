import React from "react";
import client from '../client';
import { Section, Text, Link, ActivityIndicator } from '../components';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';

function IndexPage({ items }){
  if(items.length === 0) return <ActivityIndicator.Screen/>;

  return (
    <>
      <Helmet>
        <title>Underreacted</title>
      </Helmet>
      <Section>
        {/* <SEO title="Home" /> */}
        {items.map(({fields, sys}) => (
          <ActivityIndicator.Touchable key={fields.title}>
            <Link.Next 
              href='/[title]' 
              as={`/${fields.slug}`}
              style={{textDecoration: 'none'}}
            >
              <Text variant='h2' color='primary' paddingBottom='8px'>{fields.title}</Text>
              <Text variant='h5'>{dayjs(sys.updatedAt).format('MMMM DD, YYYY')}</Text>
              <Text variant='h5'>{fields.subtitle}</Text>
              <br/>
            </Link.Next>
          </ActivityIndicator.Touchable>
        ))}
      </Section>
    </>
  );
}

IndexPage.getInitialProps = async () => {
  let res = await client.getEntries();
  return { ...res };
};

export default IndexPage;
