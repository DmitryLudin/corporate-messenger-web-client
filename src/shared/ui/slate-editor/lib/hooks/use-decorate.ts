import { useCallback } from 'react';
import { Element } from 'slate';

import { TCustomEditor } from 'shared/ui/slate-editor/config';

export const useDecorate = (editor: TCustomEditor) => {
  return useCallback(
    // @ts-ignore
    ([node, path]) => {
      if (Element.isElement(node) && node.type === 'code-line') {
        return editor.nodeToDecorations?.get(node) || [];
      }

      return [];
    },
    [editor.nodeToDecorations]
  );
};
