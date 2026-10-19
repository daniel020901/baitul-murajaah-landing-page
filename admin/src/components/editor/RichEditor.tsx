import * as React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes, $createParagraphNode } from 'lexical';

import { editorTheme } from './editorTheme';
import { EditorToolbar } from './EditorToolbar';

interface RichEditorProps {
  initialHtml?: string;
  lastUpdated?: string;
}

const DEFAULT_HTML = `<h2>Mulai dari Satu Tulisan</h2>
<p>Blog yang baik dimulai dari satu tulisan sederhana. Tentukan topik, tulis dengan jujur, lalu terbitkan. Perbaikannya bisa menyusul.</p>
<ul>
  <li>Pilih satu topik yang kamu kuasai</li>
  <li>Tulis kerangka sebelum menulis isi</li>
  <li>Tambahkan gambar agar mudah dibaca</li>
</ul>`;

function HtmlBridgePlugin({
  initialHtml,
  mode,
  htmlCode,
  onHtmlChange,
}: {
  initialHtml: string;
  mode: 'visual' | 'code';
  htmlCode: string;
  onHtmlChange: (html: string) => void;
}) {
  const [editor] = useLexicalComposerContext();
  const initializedRef = React.useRef(false);
  const prevModeRef = React.useRef<'visual' | 'code'>(mode);

  const importHtmlToLexical = React.useCallback(
    (rawHtml: string) => {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(rawHtml, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        const root = $getRoot();
        root.clear();
        if (nodes.length > 0) {
          $insertNodes(nodes);
        } else {
          root.append($createParagraphNode());
        }
      });
    },
    [editor]
  );

  // Hydrate initial HTML once
  React.useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    importHtmlToLexical(initialHtml);
  }, [initialHtml, importHtmlToLexical]);

  // Sync HTML -> Lexical when switching from 'code' back to 'visual'
  React.useEffect(() => {
    if (prevModeRef.current === 'code' && mode === 'visual') {
      importHtmlToLexical(htmlCode);
    }
    prevModeRef.current = mode;
  }, [mode, htmlCode, importHtmlToLexical]);

  return (
    <OnChangePlugin
      ignoreSelectionChange
      onChange={(editorState) => {
        if (mode !== 'visual') return;
        editorState.read(() => {
          const raw = $generateHtmlFromNodes(editor, null);
          onHtmlChange(raw);
        });
      }}
    />
  );
}

export default function RichEditor({
  initialHtml = DEFAULT_HTML,
  lastUpdated = 'hari ini',
}: RichEditorProps) {
  const [mode, setMode] = React.useState<'visual' | 'code'>('visual');
  const [htmlCode, setHtmlCode] = React.useState<string>(initialHtml);
  const [savedNotice, setSavedNotice] = React.useState<string>(
    'Perubahan disimpan otomatis sebagai draf'
  );

  const initialConfig = React.useMemo(
    () => ({
      namespace: 'MurojaahBlogEditor',
      theme: editorTheme,
      nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, LinkNode, AutoLinkNode],
      onError(error: Error) {
        console.error('Lexical Error:', error);
      },
    }),
    []
  );

  const handleHtmlChange = (newHtml: string) => {
    setHtmlCode(newHtml);
    setSavedNotice('Menyimpan draf...');
    window.clearTimeout((window as unknown as { __draftTimer?: number }).__draftTimer);
    (window as unknown as { __draftTimer?: number }).__draftTimer = window.setTimeout(() => {
      setSavedNotice('Perubahan disimpan otomatis sebagai draf');
    }, 600);
  };

  return (
    <section
      aria-label="Editor konten"
      className="bg-white border border-[#dde3ea] rounded-[10px] overflow-hidden"
    >
      <LexicalComposer initialConfig={initialConfig}>
        {/* Top bar: Tambah Media & Visual/Kode Switch */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 px-3 py-2.5 border-b border-[#dde3ea] bg-[#f8fafc]">
          <button
            type="button"
            onClick={() => {
              const imgUrl = window.prompt(
                'Masukkan URL gambar atau media:',
                'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
              );
              if (imgUrl) {
                const nextHtml = `${htmlCode}\n<p><img src="${imgUrl}" alt="Media Artikel" /></p>`;
                setHtmlCode(nextHtml);
                if (mode === 'visual') {
                  setMode('code');
                  setTimeout(() => setMode('visual'), 10);
                }
              }
            }}
            className="flex items-center gap-2 min-h-[44px] px-3.5 rounded-lg border border-[#c5cdd8] bg-white hover:bg-[#f1f5f9] text-[#1b2430] font-sans text-[13px] font-semibold cursor-pointer transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M9 9.5h.01" />
            </svg>
            <span>Tambah media</span>
          </button>

          <div className="flex gap-0.5 p-[3px] rounded-[10px] bg-[#e7ebf1]">
            <button
              type="button"
              onClick={() => setMode('visual')}
              className={`min-h-[38px] px-4 rounded-lg border-none font-sans text-[13px] cursor-pointer transition-all ${
                mode === 'visual'
                  ? 'bg-white text-[#1b2430] font-bold shadow-[0_1px_2px_rgba(16,24,40,0.12)]'
                  : 'bg-transparent text-[#4a5565] font-semibold hover:text-[#1b2430]'
              }`}
            >
              Visual
            </button>
            <button
              type="button"
              onClick={() => setMode('code')}
              className={`min-h-[38px] px-4 rounded-lg border-none font-sans text-[13px] cursor-pointer transition-all ${
                mode === 'code'
                  ? 'bg-white text-[#1b2430] font-bold shadow-[0_1px_2px_rgba(16,24,40,0.12)]'
                  : 'bg-transparent text-[#4a5565] font-semibold hover:text-[#1b2430]'
              }`}
            >
              Kode
            </button>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <EditorToolbar disabled={mode === 'code'} />

        {/* Visual Editor Surface */}
        <div className={mode === 'visual' ? 'block relative' : 'hidden'}>
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                aria-label="Isi artikel"
                className="min-h-[360px] box-border px-8 py-7 text-[17px] leading-[1.75] text-[#1b2430] focus:outline-none"
              />
            }
            placeholder={
              <div className="pointer-events-none absolute top-7 left-8 text-[17px] text-[#667085] select-none">
                Ketik di sini untuk melanjutkan tulisan…
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
        </div>

        {/* Code (Raw HTML) Surface */}
        {mode === 'code' && (
          <div className="min-h-[360px] box-border bg-[#0f141b] text-[#d6deeb]">
            <textarea
              aria-label="Editor kode HTML"
              value={htmlCode}
              onChange={(e) => handleHtmlChange(e.target.value)}
              spellCheck={false}
              className="w-full min-h-[360px] box-border px-7 py-6 bg-[#0f141b] text-[#d6deeb] font-mono text-[13px] leading-[1.8] border-none resize-y focus:outline-none"
            />
          </div>
        )}

        <HtmlBridgePlugin
          initialHtml={initialHtml}
          mode={mode}
          htmlCode={htmlCode}
          onHtmlChange={handleHtmlChange}
        />

        <input type="hidden" name="content" value={htmlCode} />

        {/* Status Bar Footer */}
        <div className="flex flex-wrap justify-between gap-2 px-4 py-2.5 border-t border-[#dde3ea] bg-[#f8fafc] text-xs text-[#5b6472]">
          <span>{savedNotice}</span>
          <span>Terakhir diubah: {lastUpdated}</span>
        </div>
      </LexicalComposer>
    </section>
  );
}
