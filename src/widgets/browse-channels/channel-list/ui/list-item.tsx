import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {
  Button,
  ListItem,
  ListItemButton,
  ListItemContent,
  Stack,
  Typography,
} from '@mui/joy';
import { Link, useParams } from 'react-router-dom';

import { PoundIcon } from 'shared/ui/icons';

type TProps = {
  name: string;
  displayName: string;
  description?: string;
  isMember: boolean;
  membersCount: number;
};

export function BrowseChannelListItem({
  name,
  displayName,
  description,
  isMember,
  membersCount,
}: TProps) {
  const params = useParams<{ namespace: string }>();

  return (
    <ListItem
      endAction={
        <Stack direction="row" gap={2}>
          {isMember ? (
            <Button size="sm" variant="outlined" color="danger">
              Покинуть
            </Button>
          ) : (
            <Button size="sm">Присоединиться</Button>
          )}
        </Stack>
      }
    >
      <ListItemButton
        component={Link}
        to={`/${params.namespace}/channels/${name}`}
      >
        <ListItemContent>
          <Stack gap={0.5} alignItems="center" direction="row">
            <PoundIcon fontSize="md" />
            <Typography fontWeight="xl" fontSize="sm">
              {displayName}
            </Typography>
          </Stack>
          <Typography color="neutral" fontSize="xs">
            <Stack gap={0.5} alignItems="center" direction="row">
              {description}
              {description && <span>·</span>}
              <Stack gap={0.5} direction="row" alignItems="center">
                <PeopleAltIcon />
                {membersCount || 0}
              </Stack>
            </Stack>
          </Typography>
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}
