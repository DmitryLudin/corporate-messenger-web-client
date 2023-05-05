import { useCallback, useState } from 'react';

export const useToggle = (defaultValue: boolean = false) => {
  const [isOpen, setOpen] = useState(defaultValue);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return [isOpen, handleToggle, handleOpen, handleClose] as const;
};
