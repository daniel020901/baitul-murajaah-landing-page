import * as React from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
} from 'lexical';
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  type HeadingTagType,
} from '@lexical/rich-text';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
  $isListNode,
} from '@lexical/list';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $setBlocksType } from '@lexical/selection';

export function EditorToolbar({ disabled = false }: { disabled?: boolean }) {
  const [editor] = useLexicalComposerContext();
  const [blockType, setBlockType] = React.useState<string>('paragraph');
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [isStrikethrough, setIsStrikethrough] = React.useState(false);
  const [isCode, setIsCode] = React.useState(false);

  React.useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        setIsBold(selection.hasFormat('bold'));
        setIsItalic(selection.hasFormat('italic'));
        setIsUnderline(selection.hasFormat('underline'));
        setIsStrikethrough(selection.hasFormat('strikethrough'));
        setIsCode(selection.hasFormat('code'));

        const anchorNode = selection.anchor.getNode();
        const element =
          anchorNode.getKey() === 'root'
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();

        if ($isHeadingNode(element)) {
          setBlockType(element.getTag());
        } else if ($isListNode(element)) {
          setBlockType(element.getListType());
        } else {
          setBlockType(element.getType());
        }
      });
    });
  }, [editor]);

  const formatBlock = (type: string) => {
    if (type === 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      return;
    }
    if (type === 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      return;
    }

    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      if (type === 'paragraph') {
        $setBlocksType(selection, () => $createParagraphNode());
      } else if (type === 'quote') {
        $setBlocksType(selection, () => $createQuoteNode());
      } else if (type === 'h2' || type === 'h3' || type === 'h4') {
        $setBlocksType(selection, () => $createHeadingNode(type as HeadingTagType));
      }
    });
  };

  const toggleList = (listType: 'bullet' | 'number') => {
    if (blockType === listType) {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    } else if (listType === 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  };

  const insertLink = () => {
    const url = window.prompt('Masukkan URL tautan (contoh: https://murojaah.id):', 'https://');
    if (url && url !== 'https://') {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    } else if (url === '') {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  };

  const btnBase =
    'flex items-center justify-center w-[40px] h-[40px] border-none rounded-lg transition-colors cursor-pointer disabled:opacity-40 disabled:pointer-events-none';
  const btnInactive = 'bg-transparent text-[#1b2430] hover:bg-[#f1f5f9]';
  const btnActive = 'bg-[#e7ebf1] text-[#2563eb]';

  return (
    <div
      role="toolbar"
      aria-label="Format teks"
      className="flex flex-wrap items-center gap-0.5 px-2.5 py-1.5 border-b border-[#dde3ea] bg-white"
    >
      <select
        aria-label="Format paragraf"
        disabled={disabled}
        value={
          ['h2', 'h3', 'h4', 'quote'].includes(blockType) ? blockType : 'paragraph'
        }
        onChange={(e) => formatBlock(e.target.value)}
        className="min-h-[40px] box-border px-2.5 mr-1.5 border border-[#c5cdd8] rounded-lg bg-white text-[#1b2430] font-sans text-[13px] font-medium focus:outline-none focus:border-[#2563eb] disabled:opacity-50"
      >
        <option value="paragraph">Paragraf</option>
        <option value="h2">Judul 2</option>
        <option value="h3">Judul 3</option>
        <option value="h4">Judul 4</option>
        <option value="quote">Kutipan</option>
      </select>

      <button
        type="button"
        aria-label="Tebal"
        title="Tebal (Ctrl+B)"
        disabled={disabled}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className={`${btnBase} ${isBold ? btnActive : btnInactive} text-base font-extrabold`}
      >
        B
      </button>

      <button
        type="button"
        aria-label="Miring"
        title="Miring (Ctrl+I)"
        disabled={disabled}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className={`${btnBase} ${isItalic ? btnActive : btnInactive} text-base italic font-semibold`}
      >
        I
      </button>

      <button
        type="button"
        aria-label="Garis bawah"
        title="Garis bawah (Ctrl+U)"
        disabled={disabled}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        className={`${btnBase} ${isUnderline ? btnActive : btnInactive} text-base underline font-semibold`}
      >
        U
      </button>

      <button
        type="button"
        aria-label="Coret"
        title="Coret"
        disabled={disabled}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
        className={`${btnBase} ${isStrikethrough ? btnActive : btnInactive} text-base line-through font-semibold`}
      >
        S
      </button>

      <div className="w-px h-6 mx-1.5 bg-[#dde3ea]" />

      {/* Bullet List */}
      <button
        type="button"
        aria-label="Daftar Poin"
        title="Daftar Poin"
        disabled={disabled}
        onClick={() => toggleList('bullet')}
        className={`${btnBase} ${blockType === 'bullet' ? btnActive : btnInactive}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
        </svg>
      </button>

      {/* Numbered List */}
      <button
        type="button"
        aria-label="Daftar Nomor"
        title="Daftar Nomor"
        disabled={disabled}
        onClick={() => toggleList('number')}
        className={`${btnBase} ${blockType === 'number' ? btnActive : btnInactive}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
        </svg>
      </button>

      {/* Blockquote */}
      <button
        type="button"
        aria-label="Kutipan"
        title="Kutipan"
        disabled={disabled}
        onClick={() => formatBlock(blockType === 'quote' ? 'paragraph' : 'quote')}
        className={`${btnBase} ${blockType === 'quote' ? btnActive : btnInactive}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zM15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
        </svg>
      </button>

      {/* Align Left */}
      <button
        type="button"
        aria-label="Rata Kiri"
        title="Rata Kiri"
        disabled={disabled}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
        className={`${btnBase} ${btnInactive}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 10H3M21 6H3M21 14H3M17 18H3" />
        </svg>
      </button>

      {/* Align Center */}
      <button
        type="button"
        aria-label="Rata Tengah"
        title="Rata Tengah"
        disabled={disabled}
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
        className={`${btnBase} ${btnInactive}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10H6M21 6H3M21 14H3M18 18H6" />
        </svg>
      </button>

      {/* Link */}
      <button
        type="button"
        aria-label="Sisipkan Tautan"
        title="Sisipkan Tautan"
        disabled={disabled}
        onClick={insertLink}
        className={`${btnBase} ${btnInactive}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
      </button>

      {/* Inline Code */}
      <button
        type="button"
        aria-label="Kode Inline"
        title="Kode Inline"
        disabled={disabled}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
        className={`${btnBase} ${isCode ? btnActive : btnInactive}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
      </button>
    </div>
  );
}
