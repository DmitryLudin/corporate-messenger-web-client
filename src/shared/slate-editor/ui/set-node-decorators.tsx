import { Editor, Element } from 'slate';
import { useSlate } from 'slate-react';

import { getChildNodeToDecorations } from '../lib';

const mergeMaps = <K, V>(...maps: Map<K, V>[]) => {
  const map = new Map<K, V>();

  for (const m of maps) {
    for (const item of m) {
      map.set(...item);
    }
  }

  return map;
};

export const SetNodeToDecorations = () => {
  const editor = useSlate();

  const blockEntries = Array.from(
    Editor.nodes(editor, {
      at: [],
      mode: 'highest',
      match: (n) => Element.isElement(n) && n.type === 'code-block',
    })
  );

  // @ts-ignore
  editor.nodeToDecorations = mergeMaps(
    // @ts-ignore
    ...blockEntries.map(getChildNodeToDecorations)
  );

  return null;
};
