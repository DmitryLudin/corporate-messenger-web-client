import isUrl from 'is-url';

import { wrapLink } from '../utils';
import { TCustomEditor } from '../../config';

export const withLink = (editor: TCustomEditor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) =>
    ['link'].includes(element.type) || isInline(element);

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};
