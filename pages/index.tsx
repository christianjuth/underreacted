import React from "react"
import client from '../client';
import { Section, Text, Link, ActivityIndicator } from '../components';
import dayjs from 'dayjs';

function IndexPage({ items }){
  if(items.length === 0) return <ActivityIndicator.Screen/>;

  return (
    <Section>
      {/* <SEO title="Home" /> */}
      {items.map(({fields, sys}) => (
        <Link.Next 
          key={fields.title} 
          href='/[title]' 
          as={`/${fields.title.toLowerCase().replace(/\s/g, '-')}`}
          style={{textDecoration: 'none'}}
        >
          <Text variant='h2' color='primary'>{fields.title}</Text>
          <Text variant='h5'>{dayjs(sys.updatedAt).format('MMMM DD, YYYY')}</Text>
          <Text variant='h5'>{fields.subtitle}</Text>
          <br/>
        </Link.Next>
      ))}
    </Section>
  );
}

IndexPage.getInitialProps = async () => {
  let res = await client.getEntries();
  return { ...res };
};

export default IndexPage;
