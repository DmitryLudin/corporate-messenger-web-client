import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { TCreateChannelForm } from 'modules/create-channel-modal/types/create-channel-form';
import React, { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';

const cyrillicToTranslit = CyrillicToTranslit();

export function ChannelNameField() {
  const { watch, resetField } = useFormContext<TCreateChannelForm>();
  const {
    field: { onChange, name, value },
    fieldState: { invalid, error },
  } = useController<{ name: string }>({
    name: 'name',
    defaultValue: '',
    rules: { required: 'Обязательно поле' },
  });
  const displayName = watch('displayName');

  useEffect(() => {
    if (displayName.length > 0) {
      onChange(cyrillicToTranslit.transform(displayName, '-').toLowerCase());
    } else {
      resetField('name');
    }
  }, [displayName, onChange, resetField]);

  return (
    <FormControl required error={invalid}>
      <FormLabel>URL-адрес канала</FormLabel>
      <Input
        value={value}
        name={name}
        onChange={onChange}
        placeholder="url-канала"
        type="text"
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
