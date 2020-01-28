import React, { useState, useEffect } from "react"
import client from '../../client';
import styled from 'styled-components';
import { Section, Text, Divider, ActivityIndicator, Link } from '../../components';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import NotFoundPage from '../404';
import { Helmet } from 'react-helmet';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from '../../constants';

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


function BlogPost({ notFound, entry, id }){
  if(notFound) return <NotFoundPage/>;
  if(!entry) return <ActivityIndicator.Screen/>;

  // copy entry so it can be updated
  let [ post, setPost ] = useState(entry);

  useEffect(() => {
    async function refresh() {
      setPost(await client.drafts.getEntry(id));
    }
    window.addEventListener("focus", refresh); 
    return () => window.removeEventListener("focus", refresh);
  }, [id]);

  let { fields, sys } = post;

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
    entry = await client.drafts.getEntry(id);
    seo = {
      description: entry.fields.subtitle,
      pathname: `/${slug}`,
      title: entry.fields.title,
      type: 'article',
    };
  } catch(e) {
    notFound = true;
  }
   
  return { 
    id,
    notFound,
    entry,
    seo
  };
};

export default BlogPost;