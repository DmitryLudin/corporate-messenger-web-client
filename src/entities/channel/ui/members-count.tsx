import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Stack } from '@mui/joy';

type TProps = {
  count: number;
};

export function ChannelMembersCount({ count }: TProps) {
  return (
    <Stack gap={0.5} direction="row" alignItems="center">
      <PeopleAltIcon />
      {count || 0}
    </Stack>
  );
}
