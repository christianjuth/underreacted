import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { SEO } from '../components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const page = ctx.renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, ...page, styleTags };
  }
  
  render() {
    let seo;
    try {
      seo = this.props.__NEXT_DATA__.props.pageProps.seo;
    } catch(e) {}

    return (
      <html>
        <Head>
          {this.props.styleTags}
          <link href="https://fonts.googleapis.com/css?family=Montserrat:900|Rubik:300&display=swap" rel="stylesheet"/>
          <SEO data={seo} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}