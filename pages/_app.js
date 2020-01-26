import '../index.css';
import 'react-activity/dist/react-activity.css';
import React from "react";
import { Grid, Theme, Header } from '../components';
import NextApp from 'next/app';

class App extends NextApp{
  render() {
    let { Component, pageProps } = this.props;
    return (
      <Theme.Provider>
        <Grid.Provider>
          <Header/>
          <Component {...pageProps} />
        </Grid.Provider>
      </Theme.Provider>
    );
  }
}

export default App;