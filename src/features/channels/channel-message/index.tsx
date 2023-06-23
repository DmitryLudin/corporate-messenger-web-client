import {
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Stack,
  Typography,
} from '@mui/joy';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { resetEditor } from 'shared/slate-editor/lib';
import { Editor as SlateEditor } from 'slate';

import { withObserver } from 'shared/lib/hoc';
import { Editor, EditorFooterToolbar } from 'shared/slate-editor';
import { UserAvatar } from 'entities/user';
import { selectedChannelService } from 'entities/channel';

import {
  MessageQuickActions,
  EditMessageCancelButton,
  EditMessageSaveButton,
} from './ui';

type TProps = {
  messageId: string;
};

function ChannelMessageMemo({ messageId }: TProps) {
  const [isEditMode, setEditMode] = useState(false);
  const [value, setValue] = useState('');
  const message = selectedChannelService.getChannelMessage(messageId);
  const [isHovered, setHovered] = useState(false);

  const handleChange = useCallback((data: string) => {
    setValue(data);
  }, []);

  const handleSubmit = useCallback(
    (editor?: SlateEditor) => {
      selectedChannelService.sendEditMessage({ id: messageId, text: value });
      handleToggleEditMode();
      editor && resetEditor(editor, JSON.parse(value));
    },
    [messageId, value]
  );

  const handleToggleEditMode = useCallback(() => {
    setEditMode((prevState) => !prevState);
  }, []);

  if (!message) return null;

  const isEdited = !dayjs(message.updatedAt).isSame(dayjs(message.createdAt));

  return (
    <ListItem
      endAction={
        isHovered &&
        !isEditMode && (
          <MessageQuickActions
            onEditToggle={handleToggleEditMode}
            channelId={message.channelId}
            messageId={messageId}
          />
        )
      }
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <ListItemButton
        sx={{ cursor: isEditMode ? 'auto' : 'pointer', py: 1, px: 2.5 }}
        selected={isEditMode}
      >
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
                <Stack alignItems="center" direction="row" gap={0.75}>
                  {dayjs(message.createdAt).format('HH:mm')}
                  {isEdited && (
                    <>
                      <span>·</span>
                      <Stack gap={0.15} direction="row" alignItems="center">
                        <EditOutlinedIcon />
                        Отредактировано
                      </Stack>
                    </>
                  )}
                </Stack>
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
                    <EditMessageCancelButton
                      onClick={() => {
                        handleToggleEditMode();
                        setHovered(false);
                      }}
                      value={message.text}
                    />
                    <EditMessageSaveButton
                      value={value}
                      onClick={() => {
                        handleSubmit();
                        setHovered(false);
                      }}
                    />
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
