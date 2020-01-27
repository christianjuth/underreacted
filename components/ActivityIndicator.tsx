import React, { useState, useEffect } from 'react';
import { Sentry } from 'react-activity';
import { Grid, Theme } from '.';
 
function ActivityIndicator() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let id = setTimeout(() => {
      setVisible(true);
    }, 500);
    return () => clearTimeout(id);
  }, []);

  return !visible ? null : <Sentry />;
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
      
      backgroundColor: colors.background,
      zIndex: 500,
    }}>
      <ActivityIndicator />
    </Grid.Row>
  );
}

export function ActivityIndicatorTouchable({ children }) {
  let { colors } = Theme.useTheme(),
    [scheduled, setScheduled] = useState(false),
    [visible, setVisible] = useState(false);

  useEffect(() => {
    let id;
    if(scheduled) {
        id = setTimeout(() => {
        setVisible(true);
      }, 500);
    }
    return () => clearTimeout(id);
  }, [scheduled]);

  return (
    <div 
      style={{position: 'relative'}}
      onClick={() => setScheduled(true)}
    >
      <div style={{
        display: visible ? 'flex' : 'none',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        opacity: 0.8
      }}>
        <Sentry />
      </div>
      {children}
    </div>
  );
}

ActivityIndicator.Screen = ActivityIndicatorScreen;
ActivityIndicator.Touchable = ActivityIndicatorTouchable;
export default ActivityIndicator;