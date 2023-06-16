import {
  Button,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from '@mui/joy';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

import { withObserver } from 'shared/lib/hoc';
import { Editor, EditorFooterToolbar } from 'shared/slate-editor';
import { UserAvatar } from 'entities/user';
import { selectedChannelService } from 'entities/channel';

type TProps = {
  messageId: string;
};

function ChannelMessageMemo({ messageId }: TProps) {
  const [isEditMode, setEditMode] = useState(false);
  const [value, setValue] = useState('');
  const message = selectedChannelService.getChannelMessage(messageId);

  const handleChange = useCallback((data: string) => {
    setValue(data);
  }, []);

  const handleSubmit = useCallback(() => {
    setValue('');
  }, []);

  const handleToggleEditMode = useCallback(() => {
    setEditMode((prevState) => !prevState);
  }, []);

  if (!message) return null;

  return (
    <ListItem>
      <ListItemButton sx={{ py: 1, px: 2.5 }}>
        <ListItemDecorator sx={{ alignSelf: 'flex-start', mr: 1 }}>
          <UserAvatar name={message.user.username} isOnline size="sm" />
        </ListItemDecorator>
        <ListItemContent>
          <Typography
            sx={{ fontSize: '15px', fontWeight: 800 }}
            endDecorator={
              <Typography
                textColor="neutral.700"
                fontWeight={400}
                fontSize="xs"
              >
                {dayjs(message.createdAt).format('HH:mm')}
              </Typography>
            }
          >
            {message.user.name}
          </Typography>

          <Editor
            placeholder="Редактировать сообщение"
            isReadOnly={!isEditMode}
            initialValue={message.text}
            onChange={handleChange}
            onSubmit={handleSubmit}
            footer={
              <EditorFooterToolbar
                endAction={
                  <>
                    <Button>Отмена</Button>
                    <Button>Сохранить</Button>
                  </>
                }
              />
            }
          />
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}

export const ChannelMessage = withObserver(ChannelMessageMemo);
