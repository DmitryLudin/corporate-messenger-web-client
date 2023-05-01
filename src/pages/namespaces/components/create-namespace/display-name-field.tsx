import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy';
import { useController } from 'react-hook-form';

export function NamespaceDisplayNameField() {
  const {
    field: { onChange, name, value },
    fieldState: { invalid, error },
  } = useController<{ displayName: string }>({
    name: 'displayName',
    defaultValue: '',
    rules: { required: 'Обязательно поле' },
  });

  return (
    <FormControl required error={invalid}>
      <FormLabel>Название пространства</FormLabel>
      <Input
        value={value}
        name={name}
        onChange={onChange}
        placeholder="Ваше пространство"
        type="text"
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
