import { TCustomRenderElementProps } from 'shared/ui/slate-editor/config';

import { QuoteElement } from './quote';
import { LinkElement } from './link';
import { DefaultElement } from './default';
import { BulletedListElement } from './bulleted-list';
import { NumberedListElement } from './numbered-list';
import { ListItemElement } from './list-item';
import { CodeBlockElement } from './code-block';
import { CodeLineElement } from './code-line';
import { MentionElement } from './mention';

export const renderElement = (props: TCustomRenderElementProps) => {
  switch (props.element.type) {
    case 'block-quote':
      return <QuoteElement {...props} />;
    case 'link':
      // @ts-ignore
      return <LinkElement {...props} />;
    case 'numbered-list':
      return <NumberedListElement {...props} />;
    case 'bulleted-list':
      return <BulletedListElement {...props} />;
    case 'list-item':
      return <ListItemElement {...props} />;
    case 'code-block':
      // @ts-ignore
      return <CodeBlockElement {...props} />;
    case 'code-line':
      return <CodeLineElement {...props} />;
    case 'mention':
      // @ts-ignore
      return <MentionElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
};
