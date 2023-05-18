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
import { withObserver } from 'hoc/with-observer.hoc';
import { JoinNamespace } from 'pages/namespaces/components/select-namespace/join-namespace';
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { namespacesService } from 'shared/domains/namespaces/namespaces.service';

export function SelectNamespaceMemo() {
  const { isLoading, namespaces } = namespacesService.namespacesStore;
  const navigate = useNavigate();

  return (
    <section>
      <Typography component="h2" fontSize="xl2" fontWeight="lg">
        Войдите в ранее созданное
      </Typography>
      <JoinNamespace />

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

export const SelectNamespace = withObserver(SelectNamespaceMemo);
