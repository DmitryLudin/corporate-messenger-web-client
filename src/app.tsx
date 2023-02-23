import { Box } from '@mui/joy';
import { Header } from 'modules/header';
import { Navigation } from 'modules/navigation';
import React from 'react';

const styles = {
  appLayout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
};

export function App() {
  return (
    <Box sx={styles.appLayout}>
      <Header />
      <Navigation />
    </Box>
  );
}
