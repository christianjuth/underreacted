import React, { useState, useEffect } from "react"
// import Image from "../components/image"
// import SEO from "../components/seo"


import client from '../client';
import { Section, Text, Divider, Grid, Link, Theme } from '../components';
import dayjs from 'dayjs';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import profile from '../images/profile.png';
let { Row, Col } = Grid;



let options = {
  // renderMark: {
  //   [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  // },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text variant='p'>{children}</Text>,
  },
};


function IndexPage(){
  let { colors } = Theme.useTheme(),
    [items, setItems] = useState([]);

  useEffect(() => {
    client.getEntries()
    .then(function (entries) {
      setItems(entries.items);
    });
  }, []);

  return (
    <div style={{flexDirection: 'column'}}>
      <Section paddingBottom={20}>
        <Text variant='h3'>Underreacted</Text>
        <br/>
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
                Personal blog of <Link to='https://christianjuth.com'>Christian Juth</Link><br/> Everything I say with a grain of salt
              </Text>
            </Col>
          </Row>
        </div>
      </Section>
      <Section>
        {/* <SEO title="Home" /> */}
        {items.map(({fields, sys}) => (
          <Link key={fields.title} to={`/${fields.title.toLowerCase().replace(/\s/g, '-')}`} style={{textDecoration: 'none'}}>
            <Text variant='h2' color='primary'>{fields.title}</Text>
            <Text variant='p'>{dayjs(sys.updatedAt).format('MMMM DD, YYYY')}</Text>
            <Text variant='p' noPadding>{fields.subtitle}</Text>
            <br/>
            <Divider/>
            <br/>
          </Link>
        ))}
      </Section>
    </div>
  );
}

export default IndexPage
