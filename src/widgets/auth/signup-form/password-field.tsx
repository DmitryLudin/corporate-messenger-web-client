import { FormControl, FormHelperText, FormLabel, Input } from '@mui/joy';
import { useController } from 'react-hook-form';

export function SignupPasswordField() {
  const {
    field: { onChange, name, value },
    fieldState: { invalid, error },
  } = useController<{ password: string }>({
    name: 'password',
    defaultValue: '',
    rules: {
      required: 'Обязательно поле',
      minLength: {
        value: 8,
        message: 'Пароль должен содержать как минимум 8 символов',
      },
    },
  });

  return (
    <FormControl error={invalid} required>
      <FormLabel>Пароль</FormLabel>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Введите пароль"
        type="password"
        name={name}
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
}
