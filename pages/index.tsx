import React, { useState, useEffect } from "react"
import client from '../client';
import { Section, Text, Divider, Theme, 
         Link, ActivityIndicator, Author } from '../components';
import dayjs from 'dayjs';

function IndexPage(){
  let { colors } = Theme.useTheme(),
    [items, setItems] = useState([]);

  useEffect(() => {
    client.getEntries()
    .then(function (entries) {
      setItems(entries.items);
    });
  }, []);

  if(items.length === 0) return <ActivityIndicator.Screen/>;

  return (
    <>
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
            <Text variant='p'>{fields.subtitle}</Text>
            <br/>
          </Link.Next>
        ))}
      </Section>
    </>
  );
}

export default IndexPage
