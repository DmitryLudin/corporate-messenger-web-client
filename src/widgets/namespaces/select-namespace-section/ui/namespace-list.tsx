import { List, ListDivider } from '@mui/joy';
import { Fragment } from 'react';

import { Namespace } from 'shared/domains/namespace';

import { BrowseNamespaceListItem } from './namespace-list-item';

type TProps = {
  namespaces: Namespace[];
};

export function BrowseNamespaceList({ namespaces }: TProps) {
  return (
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
          <BrowseNamespaceListItem
            name={namespace.name}
            displayName={namespace.displayName}
          />
          {index < namespaces.length - 1 && <ListDivider />}
        </Fragment>
      ))}
    </List>
  );
}
