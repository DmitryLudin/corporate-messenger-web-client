import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy';
import React from 'react';
import { useController } from 'react-hook-form';

export function SignupNameField() {
  const {
    field: { onChange, name, value },
    fieldState: { invalid, error },
  } = useController<{ name: string }>({
    name: 'name',
    defaultValue: '',
    rules: { required: 'Обязательно поле' },
  });

  return (
    <FormControl required error={invalid}>
      <FormLabel>Как вас зовут?</FormLabel>
      <Input
        placeholder="Лудин Дмитрий"
        type="text"
        name={name}
        onChange={onChange}
        value={value}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
