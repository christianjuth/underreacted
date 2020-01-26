import React from "react"
// import SEO from "../components/seo"

import client from '../client';
import styled from 'styled-components';
import { Section, Text, Divider, ActivityIndicator, Link } from '../components';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import NotFoundPage from './404';
import SyntaxHighlighter from 'react-syntax-highlighter';
let hljs = require('react-syntax-highlighter/dist/cjs/styles/hljs');


const InlineCode = styled.span`
  font-family: monospace;
  display: inline;
  border-radius: 7px;
  padding: 4px 6px;
  background-color: rgb(43, 43, 43);
  color: rgb(245, 171, 53);
`


const renderers = {
  paragraph: (props) => <Text variant='p' {...props}/>,
  code: ({ value, language }) => <SyntaxHighlighter language={language} style={hljs.a11yDark}>{value}</SyntaxHighlighter>,
  inlineCode: ({ value }) => (
    <InlineCode>{value}</InlineCode>
  ),
}


function BlogPost({ notFound, entry }){
  if(notFound) return <NotFoundPage/>;

  if(!entry) return <ActivityIndicator.Screen/>;

  let { fields, sys } = entry;
  return (
    <Section>
      {/* <SEO title="Home" /> */}
      <Text variant='h1' color='primary'>{fields.title}</Text>
      <Text variant='h5' paddingBottom='1rem'>
        {dayjs(sys.updatedAt).format('MMMM DD, YYYY')} – <Link style={{textDecoration: 'none'}} href='https://twitter.com/christianjuth'>@christianjuth</Link>
      </Text>
      <Divider/>
      <ReactMarkdown 
        source={fields.body} 
        renderers={renderers}
      />
    </Section>
  );
}

BlogPost.getInitialProps = async ctx => {
  let { title } = ctx.query,
    computedTitle = typeof title === "string" ? title.replace(/-/g, ' ') : title[0].replace(/-/g, ' ');

  let entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.title[match]': computedTitle
  });
    
  let notFound = false,
    entry = null;
  if(entries.items.length === 0) {
    notFound = true;
  } else {
    entry = entries.items[0];
  }

  return { 
    notFound,
    entry
  };
};

export default BlogPost;