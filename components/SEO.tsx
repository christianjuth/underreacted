import React from 'react';

interface SEOData {
  data?: {
    title: string,
    description: string,
    twitterHandle: string,
    type: 'article' | 'website',
    imageSrc: string,
    url: string,
    host: string,
    pathname: string
  }
}

function SEO(props: SEOData) {
  let data = Object.assign({}, {
    description: 'Personal blog of Christian Juth',
    facebookAppId: '885582855189621',
    host: 'https://underreacted.io',
    imageSrc: 'https://underreacted.io/social-media-card-image.png',
    pathname: '/',
    title: 'Underreacted',
    twitterHandle: '@christianjuth',
    type: 'website',
  }, props.data);

  return (
    <>
      <title>{data.title} | Underreacted</title>

      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:site" content={data.twitterHandle} />
      <meta name="twitter:title" content={data.title} />
      <meta name="twitter:description" content={data.description} />
      <meta name="twitter:creator" content={data.twitterHandle} />
      <meta name="twitter:image" content={data.imageSrc} />

      <meta property="og:title" content={data.title} />
      <meta property="og:type" content={data.type} />
      <meta property="og:url" content={data.host+data.pathname} />
      <meta property="og:image" content={data.imageSrc} />
      <meta property="og:description" content={data.description} />
      <meta property="og:site_name" content='Underreacted' />
      <meta property="fb:app_id" content={data.facebookAppId} />
    </>
  );
}

export default SEO;