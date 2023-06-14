import { TCustomEditor } from 'shared/slate-editor/config';

export function resetEditor(editor: TCustomEditor) {
  const point = { path: [0, 0], offset: 0 };
  editor.selection = { anchor: point, focus: point };
  editor.history = { redos: [], undos: [] };
  editor.children = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
}
