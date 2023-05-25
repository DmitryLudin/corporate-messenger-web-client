import {
  Box,
  CircularProgress,
  Grid,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/joy';
import { browseNamespacesService } from 'pages/browse-namespaces/domains';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';

export function SelectNamespaceMemo() {
  const { isLoading, namespaces } = browseNamespacesService.store;
  const navigate = useNavigate();

  return (
    <section>
      {isLoading ? (
        <Grid sx={{ mt: 3 }} container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        namespaces.length > 0 && (
          <>
            <Typography level="body2" sx={{ mt: 3, mb: 2 }}>
              Выберите пространство из списка.
            </Typography>
            <Box maxWidth={400}>
              <List
                variant="outlined"
                sx={{
                  bgcolor: 'background.surface',
                  minWidth: 240,
                  borderRadius: 'sm',
                  boxShadow: 'sm',
                  '--ListItemDecorator-size': '48px',
                  '--ListItem-paddingLeft': '1.5rem',
                  '--ListItem-paddingRight': '1rem',
                }}
              >
                {namespaces.map((namespace, index) => (
                  <Fragment key={namespace.id}>
                    <ListItem>
                      <ListItemButton
                        onClick={() => navigate(`/${namespace.name}`)}
                      >
                        {namespace.displayName || namespace.name}
                      </ListItemButton>
                    </ListItem>
                    {index < namespaces.length - 1 && <ListDivider />}
                  </Fragment>
                ))}
              </List>
            </Box>
          </>
        )
      )}
    </section>
  );
}

export const SelectNamespaceSection = withObserver(SelectNamespaceMemo);
