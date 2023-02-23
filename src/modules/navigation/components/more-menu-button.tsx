import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/joy';
import React, { memo, MouseEventHandler } from 'react';

type TProps = {
  id: string;
  popupId: string;
  onClick: MouseEventHandler<HTMLAnchorElement>;
  isPopupOpened: boolean;
};

function NavigationMoreButtonMemo({
  id,
  popupId,
  onClick,
  isPopupOpened,
}: TProps) {
  return (
    <IconButton
      id={id}
      size="sm"
      color="neutral"
      variant="plain"
      onClick={onClick}
      aria-controls={isPopupOpened ? popupId : undefined}
      aria-haspopup="true"
      aria-expanded={isPopupOpened ? 'true' : undefined}
      sx={{
        '--IconButton-size': '24px',
      }}
    >
      <MoreVertIcon fontSize="small" />
    </IconButton>
  );
}

export const NavigationMoreButton = memo(NavigationMoreButtonMemo);
