import {
  Box,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/joy';
import { withObserver } from 'hoc/with-observer.hoc';
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { namespacesService } from 'shared/domains/namespaces/namespaces.service';

export function SelectNamespaceMemo() {
  const { namespaces } = namespacesService.namespacesStore;
  const navigate = useNavigate();

  return (
    <section>
      <Typography component="h2" fontSize="xl2" fontWeight="lg">
        Войдите в ранее созданное
      </Typography>
      <Typography level="body2" sx={{ my: 1, mb: 3 }}>
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
                <ListItemButton onClick={() => navigate(`/${namespace.name}`)}>
                  {namespace.displayName || namespace.name}
                </ListItemButton>
              </ListItem>
              {index < namespaces.length - 1 && <ListDivider />}
            </Fragment>
          ))}
        </List>
      </Box>
    </section>
  );
}

export const SelectNamespace = withObserver(SelectNamespaceMemo);
