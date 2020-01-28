import '../index.css';
import 'react-activity/dist/react-activity.css';
import React from "react";
import { Grid, Theme, Header } from '../components';
import NextApp from 'next/app';
import Router from "next/router";
import withGA from "next-ga";

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

export default withGA("UA-157124361-1", Router)(App);