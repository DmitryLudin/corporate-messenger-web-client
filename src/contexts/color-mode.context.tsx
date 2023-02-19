import { PaletteMode } from '@mui/material';
import { createContext } from 'react';

export type TColorModeContext = {
  colorMode: PaletteMode;
  toggleColorMode: VoidFunction;
};

export const ColorModeContext = createContext<TColorModeContext | null>(null);
