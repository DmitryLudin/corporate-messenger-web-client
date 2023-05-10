import { Box, Button, Modal, ModalDialog, Stack, Typography } from '@mui/joy';
import { channelsService } from 'pages/namespace/domains/channels/services/channels.service';
import { ChannelDescriptionField } from 'pages/namespace/layouts/navigation-bar/modules/channels/components/create-channel-popup/channel-description-field';
import { ChannelDisplayNameField } from 'pages/namespace/layouts/navigation-bar/modules/channels/components/create-channel-popup/channel-display-name-field';
import { ChannelNameField } from 'pages/namespace/layouts/navigation-bar/modules/channels/components/create-channel-popup/channel-name-field';
import React, { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type TProps = {
  isOpen: boolean;
  handleClose: VoidFunction;
};

const defaultFormState = {
  name: '',
  displayName: '',
  description: '',
  isPrivate: false,
};

export type TCreateChannelForm = typeof defaultFormState;

export function CreateChannelPopup({ isOpen, handleClose }: TProps) {
  const methods = useForm({
    mode: 'all',
    defaultValues: defaultFormState,
  });
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (data: TCreateChannelForm) => {
      setLoading(true);
      return channelsService
        .createChannel(data)
        .then((channel) => channel && navigate(`channels/${channel.name}`))
        .finally(() => {
          setLoading(false);
          handleClose();
        });
    },
    [handleClose, navigate]
  );

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        aria-describedby="basic-modal-dialog-description"
        sx={{ width: '100%', maxWidth: 550 }}
      >
        <Typography id="basic-modal-dialog-title" component="h2">
          Создать канал
        </Typography>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <Stack spacing={2}>
              <ChannelDisplayNameField />
              <ChannelNameField />
              <ChannelDescriptionField />

              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  justifyContent: 'flex-end',
                  pt: 2,
                }}
              >
                <Button variant="soft" color="neutral" onClick={handleClose}>
                  Отменить
                </Button>
                <Button
                  loading={isLoading}
                  variant="solid"
                  type="submit"
                  color="primary"
                >
                  Создать
                </Button>
              </Box>
            </Stack>
          </form>
        </FormProvider>
      </ModalDialog>
    </Modal>
  );
}