import {
  AppBar,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Unstable_Grid2';

export function Header() {
  return (
    <AppBar color="inherit">
      <Toolbar variant="dense">
        <Grid sx={{ flexGrow: 1 }} container spacing={3} alignItems="center">
          <Grid xs>
            <Typography>Корпоративный чат</Typography>
          </Grid>
          <Grid xs={4} display="flex" justifyContent="center">
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Поиск"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid xs display="flex" justifyContent="end">
            <Typography>секция Пользователь</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
