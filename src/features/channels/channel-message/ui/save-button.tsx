import { Button } from '@mui/joy';
import { resetEditor } from 'shared/slate-editor/lib';
import { useSlate } from 'slate-react';

export function EditMessageSaveButton({
  onClick,
  value,
}: {
  onClick: VoidFunction;
  value: string;
}) {
  const editor = useSlate();

  return (
    <Button
      size="sm"
      onClick={() => {
        onClick();
        resetEditor(editor, JSON.parse(value));
      }}
    >
      Сохранить
    </Button>
  );
}
