import { Stack, Typography } from '@mui/joy';
import type { FontSize } from '@mui/joy/styles/types';
import type { SvgIconPropsSizeOverrides } from '@mui/joy/SvgIcon/SvgIconProps';
import type { OverridableStringUnion } from '@mui/types';

import { PoundIcon } from 'shared/ui/icons';

type TProps = {
  name: string;
  size?: OverridableStringUnion<
    'inherit' | keyof FontSize,
    SvgIconPropsSizeOverrides
  >;
};

export function ChannelName({ name, size }: TProps) {
  return (
    <Typography fontWeight="xl" fontSize={size}>
      <Stack gap={0.5} alignItems="center" direction="row">
        <PoundIcon />
        <span>{name}</span>
      </Stack>
    </Typography>
  );
}
