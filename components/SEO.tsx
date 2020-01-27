import React from 'react';
import { Helmet } from 'react-helmet';
import { useRouter } from 'next/router';

interface SEOData {
  data?: {
    title: string,
    description: string,
    twitterHandle: string,
    type: 'article' | 'website'
  }
}

function SEO(props: SEOData) {
  if(typeof props.data !== 'object' || props.data === null) return (
    <title>Underreacted</title>
  );

  let { 
    title,
    description,
    twitterHandle,
    type
  } = props.data;

  return (
    <>
      <title>{title} | Underreacted</title>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:site" content={twitterHandle}/>
      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:creator" content={twitterHandle}/>

      <meta property="og:title" content={title} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content="http://www.example.com/" />
      <meta property="og:image" content="http://example.com/image.jpg" />
      <meta property="og:description" content="Description Here" />
      <meta property="og:site_name" content="Site Name, i.e. Moz" />
      <meta property="fb:admins" content="Facebook numeric ID" />
    </>
  );
}

export default SEO;