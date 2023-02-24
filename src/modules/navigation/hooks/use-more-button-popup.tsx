import { MouseEventHandler, useCallback, useState } from 'react';

export const useMoreButtonPopup = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLAnchorElement>();
  const isPopupOpen = Boolean(anchorEl);

  const handleOpenPopup: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClosePopup = useCallback(() => {
    setAnchorEl(undefined);
  }, []);

  return {
    anchorEl,
    isPopupOpen,
    onOpenPopup: handleOpenPopup,
    onClosePopup: handleClosePopup,
  } as const;
};
