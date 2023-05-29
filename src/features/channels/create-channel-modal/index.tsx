import { Box, Button, Modal, ModalDialog, Stack, Typography } from '@mui/joy';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { withObserver } from 'shared/lib/hoc';
import { channelsService, TCreateChannelDto } from 'entities/channel';

import {
  ChannelDescriptionField,
  ChannelNameField,
  ChannelDisplayNameField,
} from './ui';

type TProps = {
  isOpen: boolean;
  handleClose: VoidFunction;
};

const defaultFormState: TCreateChannelDto = {
  name: '',
  displayName: '',
  description: '',
};

function CreateChannelModalMemo({ isOpen, handleClose }: TProps) {
  const methods = useForm<TCreateChannelDto>({
    mode: 'all',
    defaultValues: defaultFormState,
  });
  const [isLoading, setLoading] = useState(false);
  const params = useParams<{ namespace: string }>();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (data: TCreateChannelDto) => {
      setLoading(true);

      return channelsService
        .createChannel(data)
        .then(() =>
          navigate(`/${params.namespace}/channels/${data.name}`, {
            relative: 'path',
          })
        )
        .finally(() => {
          setLoading(false);
          handleClose();
        });
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
