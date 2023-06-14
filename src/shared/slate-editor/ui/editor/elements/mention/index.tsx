import { Typography } from '@mui/joy';
import { CSSProperties } from 'react';
import { useFocused, useSelected } from 'slate-react';

import {
  TCustomRenderElementProps,
  TMentionElement,
} from 'shared/slate-editor/config';

export const MentionElement = ({
  attributes,
  children,
  element,
}: TCustomRenderElementProps<TMentionElement>) => {
  const selected = useSelected();
  const focused = useFocused();

  const style: CSSProperties = {
    padding: '3px 3px 2px',
    margin: '0 1px',
    verticalAlign: 'baseline',
    display: 'inline-block',
    borderRadius: '4px',
    backgroundColor: '#eee',
    fontSize: '0.9em',
    boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
  };
  // See if our empty text child has any styling marks applied and apply those
  if (element.children[0].bold) {
    style.fontWeight = 'bold';
  }
  if (element.children[0].italic) {
    style.fontStyle = 'italic';
  }
  return (
    <Typography
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${element.character.replace(' ', '-')}`}
      sx={style}
    >
      @{element.character}
      {children}
    </Typography>
  );
};
