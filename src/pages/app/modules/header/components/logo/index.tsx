import { Box, IconButton, Typography } from '@mui/joy';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import React from 'react';

export function Logo() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <IconButton size="sm" variant="solid">
        <QuestionAnswerOutlinedIcon />
      </IconButton>
      <Typography component="h1" fontWeight="xl">
        Корпоративный чат
      </Typography>
    </Box>
  );
}
