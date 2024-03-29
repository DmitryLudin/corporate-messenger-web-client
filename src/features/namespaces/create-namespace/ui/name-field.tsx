import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy';
import { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import CyrillicToTranslit from 'cyrillic-to-translit-js';

import { TCreateNamespaceDto } from 'shared/domains/namespace';

const cyrillicToTranslit = CyrillicToTranslit();

export function NamespaceNameField() {
  const { watch, resetField } = useFormContext<TCreateNamespaceDto>();
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
      <FormLabel>URL-адрес пространства</FormLabel>
      <Input
        value={value}
        name={name}
        onChange={onChange}
        placeholder="ваше-пространство"
        type="text"
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
