import { ThemeOptions } from '@mui/material/styles';

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    background: {
      default: '#f7f7f8',
      paper: '#fff',
    },
    primary: {
      main: '#7558e0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e142a4',
    },
  },
};

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: '#0e0e0f',
      paper: '#18181a',
    },
    primary: {
      main: '#7558e0',
    },
    secondary: {
      main: '#e142a4',
    },
  },
};
