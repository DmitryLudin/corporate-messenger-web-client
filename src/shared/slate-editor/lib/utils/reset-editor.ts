import { TCustomEditor } from 'shared/slate-editor/config';
import type { Descendant } from 'slate';

export function resetEditor(editor: TCustomEditor, value?: Descendant[]) {
  const point = { path: [0, 0], offset: 0 };
  if (!value) {
    editor.selection = { anchor: point, focus: point };
  }
  editor.history = { redos: [], undos: [] };
  editor.children = value || [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
}
