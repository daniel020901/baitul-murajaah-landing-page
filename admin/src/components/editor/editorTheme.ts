import type { EditorThemeClasses } from 'lexical';

export const editorTheme: EditorThemeClasses = {
  paragraph: 'm-0 mb-4 text-[17px] leading-[1.75] text-[#1b2430]',
  heading: {
    h1: 'm-0 mb-4 text-[30px] leading-[1.25] font-bold text-[#1b2430]',
    h2: 'm-0 mb-3 text-[26px] leading-[1.3] font-bold text-[#1b2430]',
    h3: 'm-0 mb-2.5 text-[21px] leading-[1.35] font-bold text-[#1b2430]',
    h4: 'm-0 mb-2 text-[18px] leading-[1.4] font-semibold text-[#1b2430]',
  },
  list: {
    ul: 'm-0 mb-4 pl-6 list-disc text-[17px] leading-[1.75] text-[#1b2430]',
    ol: 'm-0 mb-4 pl-6 list-decimal text-[17px] leading-[1.75] text-[#1b2430]',
    listitem: 'mb-1',
  },
  quote:
    'm-0 mb-4 pl-4 border-l-4 border-[#2563eb] italic text-[#4a5565] text-[17px] leading-[1.75]',
  link: 'text-[#1d4ed8] underline cursor-pointer',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    code: 'bg-[#f1f5f9] text-[#0f172a] font-mono text-[14px] px-1.5 py-0.5 rounded border border-[#e2e8f0]',
  },
};
