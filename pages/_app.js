import '../index.css';
import 'react-activity/dist/react-activity.css';
import React from "react";
import { Grid, Header } from '../components';
import NextApp from 'next/app';
import Router from "next/router";
import withGA from "next-ga";
import { Provider as ThemeProvider } from 'react-context-theming';
import { theme } from '../constants';

class App extends NextApp{
  render() {
    let { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme.dark}>
        <Grid.Provider>
          <Header/>
          <Component {...pageProps} />
        </Grid.Provider>
      </ThemeProvider>
    );
  }
}

export default withGA("UA-157124361-1", Router)(App);