import React from "react";
import { Grid, Theme } from '../components';
import '../index.css';
import 'react-activity/dist/react-activity.css';

function App({ Component, pageProps }) {
  return (
    <Theme.Provider>
      <Grid.Provider>
        <Component {...pageProps} />
      </Grid.Provider>
    </Theme.Provider>
  );
}
export default App;