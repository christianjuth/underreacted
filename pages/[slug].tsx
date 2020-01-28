import React from "react"
import client from '../client';
import styled from 'styled-components';
import { Section, Text, Divider, ActivityIndicator, Link, SEO } from '../components';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import NotFoundPage from './404';
import { Helmet } from 'react-helmet';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from '../constants';

const InlineCode = styled.span`
  font-family: monospace;
  display: inline;
  border-radius: 7px;
  padding: 4px 6px;
  background-color: #2d2c56;
`;

const renderers = {
  paragraph: (props) => <Text variant='p' {...props}/>,
  code: ({ value, language }) => <SyntaxHighlighter language={language} style={prism}>{value||''}</SyntaxHighlighter>,
  inlineCode: ({ value }) => (
    <InlineCode>{value}</InlineCode>
  ),
}


function BlogPost({ notFound, entry }){
  if(notFound) return <NotFoundPage/>;

  if(!entry) return <ActivityIndicator.Screen/>;

  let { fields, sys } = entry;

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
  let { slug } = ctx.query;

  let entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug[match]': slug
  });
    
  let seo = null,
    notFound = false,
    entry = null;

  if(entries.items.length === 0) {
    notFound = true;
  } else {
    entry = entries.items[0];
    seo = {
      title: entry.fields.title,
      description: entry.fields.subtitle,
      twitterHandle: '@christianjuth',
      type: 'article'
    };
  }

  return { 
    notFound,
    entry,
    seo
  };
};

export default BlogPost;