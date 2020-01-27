import React from "react"
import {drafts} from '../../client';
import styled from 'styled-components';
import { Section, Text, Divider, ActivityIndicator, Link } from '../../components';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import NotFoundPage from '../404';
import { Helmet } from 'react-helmet';
import SyntaxHighlighter from 'react-syntax-highlighter';
let hljs = require('react-syntax-highlighter/dist/cjs/styles/hljs');

const InlineCode = styled.span`
  font-family: monospace;
  display: inline;
  border-radius: 7px;
  padding: 4px 6px;
  background-color: #2d2c56;
`


const renderers = {
  paragraph: (props) => <Text variant='p' {...props}/>,
  code: ({ value, language }) => <SyntaxHighlighter language={language} style={hljs.shadesOfPurple}>{value}</SyntaxHighlighter>,
  inlineCode: ({ value }) => (
    <InlineCode>{value}</InlineCode>
  ),
}


function BlogPost({ notFound, entry }){
  if(notFound) return <NotFoundPage/>;

  if(!entry) return <ActivityIndicator.Screen/>;

  let { fields, sys } = entry;

  console.log(fields);

  return (
    <>
      <Helmet>
        <title>{fields.title}</title>
      </Helmet>
      <Section>
        <Text variant='h1' color='primary'>{fields.title}</Text>
        <Text variant='h5' paddingBottom='1rem'>
          {dayjs(sys.updatedAt).format('MMM DD, YYYY')} – <Link style={{textDecoration: 'none'}} href='https://twitter.com/christianjuth'>@christianjuth</Link>
        </Text>
        <Divider/>
        <ReactMarkdown 
          source={fields.body} 
          renderers={renderers}
        />
      </Section>
    </>
  );
}

BlogPost.getInitialProps = async ctx => {
  let { id } = ctx.query;

  let entry,
    seo, 
    notFound = false;
  try {
    entry = await drafts.getEntry(id);
    seo = {
      title: entry.fields.title,
      description: entry.fields.subtitle,
      twitterHandle: '@christianjuth',
      type: 'article'
    };
  } catch(e) {
    notFound = true;
  }
   

  return { 
    notFound,
    entry,
    seo
  };
};

export default BlogPost;