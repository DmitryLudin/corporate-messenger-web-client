import { MouseEventHandler, useCallback, useState } from 'react';

export type TMenuProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  anchorEl?: HTMLElement | undefined;
};

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement>();
  const isMenuOpen = Boolean(anchorEl);

  const handleOpenMenu: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(undefined);
  }, []);

  return {
    anchorEl,
    isMenuOpen,
    onOpenMenu: handleOpenMenu,
    onCloseMenu: handleCloseMenu,
  } as const;
};
