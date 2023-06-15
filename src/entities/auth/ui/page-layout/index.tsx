import { Box, formLabelClasses } from '@mui/joy';
import { memo, PropsWithChildren } from 'react';

function AuthLayoutMemo({ children }: PropsWithChildren) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box
        component="main"
        sx={{
          p: 2,
          width: 400,
          maxWidth: '100%',
          [`& .${formLabelClasses.asterisk}`]: {
            visibility: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export const AuthPageLayout = memo(AuthLayoutMemo);
