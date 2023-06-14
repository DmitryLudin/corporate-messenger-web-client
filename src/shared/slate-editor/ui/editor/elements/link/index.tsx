import { Link } from '@mui/joy';

import {
  TCustomRenderElementProps,
  TLinkElement,
} from 'shared/slate-editor/config';

export function LinkElement({
  attributes,
  children,
  element,
}: TCustomRenderElementProps<TLinkElement>) {
  return (
    <Link href={element.url} {...attributes}>
      {children}
    </Link>
  );
}
