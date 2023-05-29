import { Box, IconButton, Typography } from '@mui/joy';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { useNavigate } from 'react-router-dom';

import { withObserver } from 'shared/lib/hoc';
import { namespacesService } from 'shared/domains/namespace';

function LogoMemo() {
  const navigate = useNavigate();
  const namespace = namespacesService.selectedNamespaceStore.namespace;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1.5,
      }}
    >
      <IconButton onClick={() => navigate('/')} size="sm" variant="solid">
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
