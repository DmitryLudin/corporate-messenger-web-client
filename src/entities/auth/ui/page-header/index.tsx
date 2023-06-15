import { Box, Typography } from '@mui/joy';
import { memo } from 'react';

type TProps = {
  title: string;
  description?: string;
};

function AuthPageHeaderMemo({ title, description }: TProps) {
  return (
    <Box>
      <Typography component="h2" fontSize="xl2" fontWeight="lg">
        {title}
      </Typography>
      {description && (
        <Typography level="body2" sx={{ my: 1, mb: 3 }}>
          {description}
        </Typography>
      )}
    </Box>
  );
}

export const AuthPageHeader = memo(AuthPageHeaderMemo);
