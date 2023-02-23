import { MouseEventHandler, useCallback, useState } from 'react';

export const usePopup = (label: string | number) => {
  const buttonLabel = `navigation-more-button-${label}`;
  const popupLabel = `navigation-more-popup-${label}`;
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
    buttonLabel,
    popupLabel,
    anchorEl,
    isPopupOpen,
    onOpenPopup: handleOpenPopup,
    onClosePopup: handleClosePopup,
  } as const;
};
