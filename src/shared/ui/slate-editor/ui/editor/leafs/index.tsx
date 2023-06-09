import { Box, Typography } from '@mui/joy';

import { TCustomRenderLeafProps } from 'shared/ui/slate-editor/config';

export const renderLeaf = ({
  leaf,
  children,
  attributes,
}: TCustomRenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <Typography fontSize="sm" variant="soft" component="code">
        {children}
      </Typography>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }

  const { text, ...rest } = leaf;

  return (
    <Box
      component="span"
      className={Object.keys(rest).join(' ')}
      sx={{ paddingLeft: leaf.text === '' ? '0.1px' : 0 }}
      {...attributes}
    >
      {children}
    </Box>
  );
};
