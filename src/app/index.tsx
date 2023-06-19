import {
  Box,
  CircularProgress,
  CssBaseline,
  CssVarsProvider,
  Grid,
} from '@mui/joy';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';

import { appTheme } from 'shared/config/themes';
import { authService } from 'entities/auth';
import { router } from 'pages';

dayjs.locale('ru');
dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isTomorrow);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

export function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    authService.authenticate().finally(() => setLoading(false));
  }, []);

  return (
    <CssVarsProvider theme={appTheme} defaultMode="system">
      <CssBaseline />
      {isLoading ? (
        <Grid
          minHeight="100vh"
          height="100%"
          container
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress color="primary" variant="soft" />
        </Grid>
      ) : (
        <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
          <RouterProvider router={router} />
        </Box>
      )}
    </CssVarsProvider>
  );
}
