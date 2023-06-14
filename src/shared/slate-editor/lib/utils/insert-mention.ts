import { Transforms } from 'slate';

import { TCustomEditor, TMentionElement } from 'shared/slate-editor/config';

export const insertMention = (editor: TCustomEditor, character: string) => {
  const mention: TMentionElement = {
    type: 'mention',
    character,
    children: [{ text: '' }],
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};
