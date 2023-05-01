import { Box, IconButton, Typography } from '@mui/joy';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { withObserver } from 'hoc/with-observer.hoc';
import React from 'react';
import { useParams } from 'react-router-dom';
import { namespacesService } from 'shared/domains/namespaces/services/namespaces.service';

function LogoMemo() {
  const params = useParams<{ namespace: string }>();
  const { namespaces } = namespacesService.store;
  const namespace = namespaces.find(
    (namespace) => namespace.name === params.namespace
  );

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
      {namespace && (
        <Typography component="h1" fontWeight="xl">
          {namespace.displayName || namespace.name}
        </Typography>
      )}
    </Box>
  );
}

export const Logo = withObserver(LogoMemo);
