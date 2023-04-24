import { Box, formLabelClasses, Typography } from '@mui/joy';
import { SignupForm } from 'pages/signup/components/signup-form';

export function Signup() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100%',
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
        <div>
          <Typography component="h2" fontSize="xl2" fontWeight="lg">
            Добро пожаловать
          </Typography>
          <Typography level="body2" sx={{ my: 1, mb: 3 }}>
            Давайте начнем! Пожалуйста, введите свои данные.
          </Typography>
        </div>
        <SignupForm />
      </Box>
    </Box>
  );
}
