import { Box } from '@mui/joy';
import { Header } from 'modules/header';
import { MainSidebar } from 'modules/main-sidebar';
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
      <MainSidebar />
    </Box>
  );
}
