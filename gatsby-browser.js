/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from "react";
import { Grid, Theme } from './src/components';
import './src/index.css';

export const wrapRootElement = ({ element }) => (
  <Theme.Provider>
    <Grid.Provider>
      {element}
    </Grid.Provider>
  </Theme.Provider>
)