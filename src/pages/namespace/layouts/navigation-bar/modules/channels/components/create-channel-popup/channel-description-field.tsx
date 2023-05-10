import { FormControl, FormHelperText, FormLabel, Textarea } from '@mui/joy';
import React from 'react';
import { useController } from 'react-hook-form';

export function ChannelDescriptionField() {
  const {
    field: { onChange, name, value },
    fieldState: { invalid, error },
  } = useController<{ description: string }>({
    name: 'description',
    defaultValue: '',
  });

  return (
    <FormControl error={invalid}>
      <FormLabel>Описание канала</FormLabel>
      <Textarea
        value={value}
        name={name}
        onChange={onChange}
        placeholder="Укажи цель канала"
        minRows={4}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
