import React from "react";
import { Grid, Theme, Header } from '../components';
import reduxStore, { Provider } from '../store';
import withRedux from "next-redux-wrapper";
import NextApp from 'next/app';
import '../index.css';
import 'react-activity/dist/react-activity.css';

class App extends NextApp{
  render() {
    let { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Theme.Provider>
          <Grid.Provider>
            <Header/>
            <Component {...pageProps} />
          </Grid.Provider>
        </Theme.Provider>
      </Provider>
    );
  }
}

export default withRedux(reduxStore)(App);