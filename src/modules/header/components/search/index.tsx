import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Input } from '@mui/joy';
import React from 'react';

export function Search() {
  return (
    <Input
      size="sm"
      fullWidth
      placeholder="Поиск"
      startDecorator={<SearchRoundedIcon color="primary" />}
      sx={{
        display: {
          xs: 'none',
          sm: 'flex',
        },
      }}
    />
  );
}
