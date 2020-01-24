import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router';
// import { Link } from "gatsby"
// import Image from "../components/image"
// import SEO from "../components/seo"


import client from '../client';
import { Section, Text, Divider, ActivityIndicator, Theme, Grid, Link } from '../components';
import dayjs from 'dayjs';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
let { Row, Col } = Grid;

let profile = require('../images/profile.png');


let options = {
  // renderMark: {
  //   [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  // },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text variant='p'>{children}</Text>,
  },
};


function IndexPage(){
  let { query } = useRouter(),
    { colors } = Theme.useTheme(),
    [item, setItem] = useState();

  useEffect(() => {
    let { title } = query;

    console.log(title);

    let computedTitle = typeof title === "string" ? title.replace(/-/g, ' ') : title[0].replace(/-/g, ' ');

    client.getEntries({
      content_type: 'blogPost',
      'fields.title[match]': computedTitle
    }).then(function (entries) {
      setItem(entries.items[0]);
    });
  }, [query.title]);  

  if(!item) return <ActivityIndicator.Screen/>;

  let { fields, sys } = item;
  return (
    <div style={{flexDirection: 'column'}}>
      <Section paddingBottom={0}>
        <Text variant='h3'>Underreacted</Text>
      </Section>

      <Section>
        {/* <SEO title="Home" /> */}
        <Text variant='h1' color='primary'>{fields.title}</Text>
        <Text variant='p'>{dayjs(sys.updatedAt).format('MMMM DD, YYYY')}</Text>
        <Divider/>
        {documentToReactComponents(fields.content, options)}
      </Section>

      <Section>
        <div style={{
          width: 370, 
          border: `1px solid ${colors.divider}`, 
          borderRadius: 37, 
          padding: 10
        }}>
          <Row spacing={15}>
            <Col xs='70px'>
              <img style={{width: '100%', borderRadius: '100%'}} alt='' src={profile}/>
            </Col>
            <Col justifyContent='center'>
              <Text variant='p' noPadding>
                Personal blog of <Link href='https://christianjuth.com'>Christian Juth</Link><br/> Everything I say with a grain of salt
              </Text>
            </Col>
          </Row>
        </div>
      </Section>
    </div>
  );
}

export default IndexPage;