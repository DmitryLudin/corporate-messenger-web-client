import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy';
import { useController } from 'react-hook-form';

export function ChannelDisplayNameField() {
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
      <FormLabel>Название канала</FormLabel>
      <Input
        value={value}
        name={name}
        onChange={onChange}
        placeholder="Ваш канал"
        type="text"
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
