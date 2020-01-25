import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router';
// import SEO from "../components/seo"


import client from '../client';
import { Section, Text, Divider, ActivityIndicator, Link } from '../components';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import NotFoundPage from './404';
import SyntaxHighlighter from 'react-syntax-highlighter';
let hljs = require('react-syntax-highlighter/dist/cjs/styles/hljs');


const renderers = {
  paragraph: (props) => <Text variant='p' {...props}/>,
  code: ({ value, language }) => <SyntaxHighlighter language={language} style={hljs.a11yDark}>{value}</SyntaxHighlighter>,
  inlineCode: ({ value }) => <SyntaxHighlighter className='inline-code' useInlineStyles={true} style={hljs.a11yDark}>{value}</SyntaxHighlighter>,
}


function IndexPage(){
  let { query } = useRouter(),
    [item, setItem] = useState(),
    [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let { title } = query;

    let computedTitle = typeof title === "string" ? title.replace(/-/g, ' ') : title[0].replace(/-/g, ' ');

    client.getEntries({
      content_type: 'blogPost',
      'fields.title[match]': computedTitle
    }).then(function (entries) {
      if(entries.items.length === 0) {
        setNotFound(true);
      } else {
        setItem(entries.items[0]);
      }
    });
  }, [query.title]);  

  if(notFound) return <NotFoundPage/>;

  if(!item) return <ActivityIndicator.Screen/>;

  let { fields, sys } = item;
  return (
    <Section>
      {/* <SEO title="Home" /> */}
      <Text variant='h1' color='primary'>{fields.title}</Text>
      <Text variant='h5' paddingBottom='1rem'>
        {dayjs(sys.updatedAt).format('MMMM DD, YYYY')} – <Link href='https://twitter.com/christianjuth'>@christianjuth</Link>
      </Text>
      <Divider/>
      <ReactMarkdown 
        source={fields.body} 
        renderers={renderers}
      />
    </Section>
  );
}

export default IndexPage;