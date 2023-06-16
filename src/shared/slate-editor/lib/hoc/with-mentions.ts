import { TCustomEditor } from 'shared/slate-editor/config';

export const withMentions = (editor: TCustomEditor) => {
  const { isInline, isVoid, markableVoid } = editor;

  editor.isInline = (element) => {
    return element.type === 'mention' ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === 'mention' ? true : isVoid(element);
  };

  editor.markableVoid = (element) => {
    return element.type === 'mention' || markableVoid(element);
  };

  return editor;
};