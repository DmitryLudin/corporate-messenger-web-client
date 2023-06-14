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

import { Editor, EditorFooterToolbar } from 'shared/slate-editor';
import { UserAvatar } from 'entities/user';

import { ChannelMessageModel } from '../../domain';

type TProps = ChannelMessageModel;

export function ChannelMessage({ text, user, createdAt, updatedAt }: TProps) {
  const [isEditMode, setEditMode] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = useCallback((data: string) => {
    setValue(data);
  }, []);

  const handleSubmit = useCallback(() => {
    setValue('');
  }, []);

  const handleToggleEditMode = useCallback(() => {
    setEditMode((prevState) => !prevState);
  }, []);

  return (
    <ListItem>
      <ListItemButton sx={{ py: 1, px: 2.5 }}>
        <ListItemDecorator sx={{ alignSelf: 'flex-start', mr: 1 }}>
          <UserAvatar name={user.username} isOnline size="sm" />
        </ListItemDecorator>
        <ListItemContent>
          <Typography
            sx={{ fontSize: '15px', fontWeight: 900 }}
            endDecorator={
              <Typography
                textColor="neutral.700"
                fontWeight={400}
                fontSize="xs"
              >
                {dayjs(createdAt).format('HH:mm')}
              </Typography>
            }
          >
            {user.name}
          </Typography>

          <Editor
            placeholder="Редактировать сообщение"
            isReadOnly={!isEditMode}
            initialValue={text}
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
