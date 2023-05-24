import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Button, ListItem, ListItemContent, Stack, Typography } from '@mui/joy';
import { PoundIcon } from 'shared/components/icons/pound';

export function BrowseChannelListItem() {
  return (
    <ListItem
      endAction={
        <Stack direction="row" gap={2}>
          <Stack gap={0.5} direction="row" alignItems="center">
            <PeopleAltIcon />
            10
          </Stack>
          <Button size="md" variant="outlined" color="neutral">
            Посмотреть
          </Button>
          <Button size="md">Присоединиться</Button>
        </Stack>
      }
    >
      <ListItemContent>
        <Stack gap={0.5} alignItems="center" direction="row">
          <PoundIcon fontSize="md" />
          <Typography fontWeight="xl" fontSize="sm">
            Название
          </Typography>
        </Stack>
        <Typography color="neutral" fontSize="xs">
          Описание
        </Typography>
      </ListItemContent>
    </ListItem>
  );
}
