import { Button } from '@mui/joy';
import { resetEditor } from 'shared/slate-editor/lib';
import { useSlate } from 'slate-react';

export function EditMessageCancelButton({
  onClick,
  value,
}: {
  onClick: VoidFunction;
  value: string;
}) {
  const editor = useSlate();

  return (
    <Button
      onClick={() => {
        onClick();
        resetEditor(editor, JSON.parse(value));
      }}
      size="sm"
      color="neutral"
    >
      Отмена
    </Button>
  );
}
