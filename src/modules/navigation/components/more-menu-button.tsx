import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/joy';
import React, { memo, MouseEventHandler } from 'react';

type TProps = {
  onClick: MouseEventHandler<HTMLAnchorElement>;
};

function NavigationMoreButtonMemo({ onClick }: TProps) {
  return (
    <IconButton
      size="sm"
      color="neutral"
      variant="plain"
      onClick={onClick}
      sx={{
        '--IconButton-size': '24px',
      }}
    >
      <MoreVertIcon fontSize="small" />
    </IconButton>
  );
}

export const NavigationMoreButton = memo(NavigationMoreButtonMemo);
