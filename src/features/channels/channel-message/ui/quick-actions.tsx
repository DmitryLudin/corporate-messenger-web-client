import Delete from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Sheet, Stack } from '@mui/joy';
import { selectedChannelService } from 'entities/channel';
import React from 'react';

type TProps = {
  onEditToggle: VoidFunction;
  messageId: string;
  channelId: string;
};

export function MessageQuickActions({
  onEditToggle,
  messageId,
  channelId,
}: TProps) {
  return (
    <Sheet
      variant="outlined"
      sx={(theme) => ({
        borderRadius: '6px',
        p: 0.5,
      })}
    >
      <Stack spacing={0.5} direction="row">
        <IconButton
          variant="plain"
          aria-label="edit"
          color="neutral"
          onClick={onEditToggle}
          sx={{
            '--IconButton-size': '24px',
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          variant="plain"
          color="danger"
          onClick={() =>
            selectedChannelService.sendRemoveMessage({
              channelId,
              id: messageId,
            })
          }
          aria-label="Delete"
          sx={{
            '--IconButton-size': '24px',
          }}
        >
          <Delete />
        </IconButton>
      </Stack>
    </Sheet>
  );
}
