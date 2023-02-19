import { PaletteMode, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { darkThemeOptions, lightThemeOptions } from 'theme';

export const useThemeColorMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [colorMode, setColorMode] = useState<PaletteMode>('light');
  const theme = useMemo(
    () =>
      createTheme(colorMode === 'light' ? lightThemeOptions : darkThemeOptions),
    [colorMode]
  );

  useEffect(() => {
    setColorMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const toggleColorMode = useCallback(() => {
    setColorMode((prevMode: PaletteMode) =>
      prevMode === 'light' ? 'dark' : 'light'
    );
  }, []);

  return { colorMode, theme, toggleColorMode };
};
