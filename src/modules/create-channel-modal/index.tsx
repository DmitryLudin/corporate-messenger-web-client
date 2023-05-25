import { Box, Button, Modal, ModalDialog, Stack, Typography } from '@mui/joy';
import { ChannelDescriptionField } from 'modules/create-channel-modal/components/channel-description-field';
import { ChannelDisplayNameField } from 'modules/create-channel-modal/components/channel-display-name-field';
import { ChannelNameField } from 'modules/create-channel-modal/components/channel-name-field';
import { defaultCreateChannelFormState } from 'modules/create-channel-modal/consts/default-create-channel-form-state';
import { TCreateChannelForm } from 'modules/create-channel-modal/types/create-channel-form';
import { navigationBarChannelsService } from 'pages/namespace/modules/left-sidebar/modules/channels/services/navigation-bar-channels.service';
import React, { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';

type TProps = {
  isOpen: boolean;
  handleClose: VoidFunction;
};

function CreateChannelModalMemo({ isOpen, handleClose }: TProps) {
  const methods = useForm({
    mode: 'all',
    defaultValues: defaultCreateChannelFormState,
  });
  const [isLoading, setLoading] = useState(false);
  const params = useParams<{ namespace: string }>();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (data: TCreateChannelForm) => {
      setLoading(true);

      return (
        navigationBarChannelsService
          .createChannel(data)
          // .then(
          //   (channel) =>
          //     channel &&
          //     navigate(`/${params.namespace}/channels/${channel.name}`, {
          //       relative: 'path',
          //     })
          // )
          .finally(() => {
            setLoading(false);
            handleClose();
          })
      );
    },
    [handleClose, navigate, params]
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

export const CreateChannelModal = withObserver(CreateChannelModalMemo);
