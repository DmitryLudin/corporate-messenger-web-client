import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy';
import { useController } from 'react-hook-form';

export function SignupUsernameField() {
  const {
    field: { onChange, name, value },
    fieldState: { invalid, error },
  } = useController<{ username: string }>({
    name: 'username',
    defaultValue: '',
    rules: { required: 'Обязательно поле' },
  });

  return (
    <FormControl required error={invalid}>
      <FormLabel>Имя пользователя</FormLabel>
      <Input
        value={value}
        name={name}
        onChange={onChange}
        placeholder="ludin"
        type="text"
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
