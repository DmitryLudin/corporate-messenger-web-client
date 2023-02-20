import { Box } from '@mui/joy';
import { Header } from 'modules/header';
import React from 'react';

const appLayoutStyles = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

export function App() {
  return (
    <Box sx={appLayoutStyles}>
      <Header />
    </Box>
  );
}
