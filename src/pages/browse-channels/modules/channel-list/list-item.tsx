import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Button, ListItem, ListItemContent, Stack, Typography } from '@mui/joy';
import { Link, useParams } from 'react-router-dom';
import { PoundIcon } from 'shared/components/icons/pound';

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
          <Stack gap={0.5} direction="row" alignItems="center">
            <PeopleAltIcon />
            {membersCount || 0}
          </Stack>
          {isMember ? (
            <Button size="sm" variant="outlined" color="danger">
              Покинуть
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to={`/${params.namespace}/channels/${name}`}
                size="sm"
                variant="outlined"
                color="neutral"
              >
                Посмотреть
              </Button>
              <Button size="sm">Присоединиться</Button>
            </>
          )}
        </Stack>
      }
    >
      <ListItemContent>
        <Stack gap={0.5} alignItems="center" direction="row">
          <PoundIcon fontSize="md" />
          <Typography fontWeight="xl" fontSize="sm">
            {displayName}
          </Typography>
        </Stack>
        {description && (
          <Typography color="neutral" fontSize="xs">
            {description}
          </Typography>
        )}
      </ListItemContent>
    </ListItem>
  );
}
