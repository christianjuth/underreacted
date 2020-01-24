import React, { useState, useEffect } from 'react';
import { Dots } from 'react-activity';
import { Grid, Theme } from '.';
import 'react-activity/dist/react-activity.css';
 
function ActivityIndicator() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let id = setTimeout(() => {
      setVisible(true);
    }, 500);
    return () => clearTimeout(id);
  });

  return !visible ? null : <Dots />;
}

export function ActivityIndicatorScreen() {
  let { colors } = Theme.useTheme();

  return (
    <Grid.Row style={{
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      
      backgroundColor: colors.surface,
      zIndex: 500,
    }}>
      <ActivityIndicator />
    </Grid.Row>
  );
}

ActivityIndicator.Screen = ActivityIndicatorScreen;
export default ActivityIndicator;