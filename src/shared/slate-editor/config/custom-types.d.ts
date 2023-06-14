import type {
  BaseNode,
  Text,
  Descendant,
  BaseEditor,
  BaseRange,
  Range,
  Element,
} from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type TBlockQuoteElement = {
  type: 'block-quote';
  align?: string;
  children: Descendant[];
};

export type TBulletedListElement = {
  type: 'bulleted-list';
  align?: string;
  children: Descendant[];
};

export type TNumberedListElement = {
  type: 'numbered-list';
  align?: string;
  children: Descendant[];
};

export type TCheckListItemElement = {
  type: 'check-list-item';
  checked: boolean;
  children: Descendant[];
};

export type TEditableVoidElement = {
  type: 'editable-void';
  children: TEmptyText[];
};

export type THeadingElement = {
  type: 'heading';
  align?: string;
  children: Descendant[];
};

export type THeadingTwoElement = {
  type: 'heading-two';
  align?: string;
  children: Descendant[];
};

export type TImageElement = {
  type: 'image';
  url: string;
  children: TEmptyText[];
};

export type TLinkElement = {
  type: 'link';
  url: string;
  children: Descendant[];
};

export type TButtonElement = { type: 'button'; children: Descendant[] };

export type TBadgeElement = { type: 'badge'; children: Descendant[] };

export type TListItemElement = { type: 'list-item'; children: Descendant[] };

export type TMentionElement = {
  type: 'mention';
  character: string;
  children: TCustomText[];
};

export type TParagraphElement = {
  type: 'paragraph';
  align?: string;
  children: Descendant[];
};

export type TTableElement = { type: 'table'; children: TTableRow[] };

export type TTableCellElement = { type: 'table-cell'; children: TCustomText[] };

export type TTableRowElement = { type: 'table-row'; children: TTableCell[] };

export type TTitleElement = { type: 'title'; children: Descendant[] };

export type TVideoElement = {
  type: 'video';
  url: string;
  children: TEmptyText[];
};

export type TCodeBlockElement = {
  type: 'code-block';
  language: string;
  children: Descendant[];
};

export type TCodeLineElement = {
  type: 'code-line';
  children: Descendant[];
};

type TCustomElement =
  | TBlockQuoteElement
  | TBulletedListElement
  | TCheckListItemElement
  | TEditableVoidElement
  | THeadingElement
  | THeadingTwoElement
  | TImageElement
  | TLinkElement
  | TButtonElement
  | TBadgeElement
  | TListItemElement
  | TMentionElement
  | TParagraphElement
  | TTableElement
  | TTableRowElement
  | TTableCellElement
  | TTitleElement
  | TVideoElement
  | TCodeBlockElement
  | TCodeLineElement
  | TNumberedListElement;

export type TCustomText = {
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  text: string;
};

export type TEmptyText = {
  text: string;
};

export type TCustomEditor = BaseEditor &
  ReactEditor &
  HistoryEditor & {
    nodeToDecorations?: Map<Element, Range[]>;
  };

export type TCustomRenderElementProps<
  T extends TCustomElement = TCustomElement
> = {
  children: any;
  element: T;
  attributes: {
    'data-slate-node': 'element';
    'data-slate-inline'?: true;
    'data-slate-void'?: true;
    dir?: 'rtl';
    ref: any;
  };
};

export type TCustomRenderLeafProps = {
  children: any;
  leaf: TCustomText;
  text: Text;
  attributes: {
    'data-slate-leaf': true;
  };
};

declare module 'slate' {
  interface CustomTypes {
    Editor: TCustomEditor;
    Element: TCustomElement;
    Text: TCustomText | TEmptyText;
    Note: BaseNode;
    Range: BaseRange & {
      [key: string]: unknown;
    };
  }
}
