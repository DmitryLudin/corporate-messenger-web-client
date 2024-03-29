import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { TCreateChannelDto } from 'entities/channel';

const cyrillicToTranslit = CyrillicToTranslit();

export function ChannelNameField() {
  const { watch, resetField } = useFormContext<TCreateChannelDto>();
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
    if (displayName && displayName.length > 0) {
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
