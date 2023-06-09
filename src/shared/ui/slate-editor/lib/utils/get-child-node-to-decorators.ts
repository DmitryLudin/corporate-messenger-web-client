import type { NodeEntry, Element } from 'slate';
import { Node } from 'slate';
import Prism from 'prismjs';

import { TCodeBlockElement } from '../../config';
import { normalizeTokens } from './normalize-tokens';

export const getChildNodeToDecorations = ([
  block,
  blockPath,
]: NodeEntry<TCodeBlockElement>) => {
  const nodeToDecorations = new Map<Element, Range[]>();

  const text = block.children.map((line) => Node.string(line)).join('\n');
  const language = block.language;
  const tokens = Prism.tokenize(text, Prism.languages[language]);
  const normalizedTokens = normalizeTokens(tokens); // make tokens flat and grouped by line
  const blockChildren = block.children as Element[];

  for (let index = 0; index < normalizedTokens.length; index++) {
    const tokens = normalizedTokens[index];
    const element = blockChildren[index];

    if (!nodeToDecorations.has(element)) {
      nodeToDecorations.set(element, []);
    }

    let start = 0;
    for (const token of tokens) {
      const length = token.content.length;
      if (!length) {
        continue;
      }

      const end = start + length;

      const path = [...blockPath, index, 0];
      const range = {
        anchor: { path, offset: start },
        focus: { path, offset: end },
        token: true,
        ...Object.fromEntries(token.types.map((type) => [type, true])),
      };

      // @ts-ignore
      nodeToDecorations.get(element)!.push(range);

      start = end;
    }
  }

  return nodeToDecorations;
};
