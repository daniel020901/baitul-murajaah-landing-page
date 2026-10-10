import { Send } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <div 
      className={`lg:hidden absolute top-full left-0 w-full bg-background/40 backdrop-blur-2xl overflow-hidden transition-all duration-500 ease-in-out z-40 shadow-xl ${
        isOpen ? 'max-h-[500px] border-b border-border opacity-100' : 'max-h-0 border-transparent opacity-0 shadow-none'
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-5 sm:px-8 py-5 flex flex-col gap-1.5">
        <a href="#home" onClick={() => setIsOpen(false)} className="px-5 py-3.5 rounded-2xl text-sm font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-foreground/10 hover:shadow-sm transition-all">Home</a>
        <a href="#blog" onClick={() => setIsOpen(false)} className="px-5 py-3.5 rounded-2xl text-sm font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-foreground/10 hover:shadow-sm transition-all">Blog</a>
        <a href="#bookstore" onClick={() => setIsOpen(false)} className="px-5 py-3.5 rounded-2xl text-sm font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-foreground/10 hover:shadow-sm transition-all">Bookstore</a>
        <a href="#kegiatan" onClick={() => setIsOpen(false)} className="px-5 py-3.5 rounded-2xl text-sm font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-foreground/10 hover:shadow-sm transition-all">Kegiatan</a>
        <a href="#cabang" onClick={() => setIsOpen(false)} className="px-5 py-3.5 rounded-2xl text-sm font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-foreground/10 hover:shadow-sm transition-all">Cabang</a>
        
        {/* CTA Mobile (hanya muncul jika layar sangat kecil / xs) */}
        <a href="#kontak" onClick={() => setIsOpen(false)} className="sm:hidden mt-3 inline-flex items-center justify-between gap-3 rounded-full bg-destructive text-destructive-foreground pl-7 pr-2 py-2 group shadow-md hover:bg-destructive/90 transition-all">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Daftar Sekarang</span>
          <span className="w-10 h-10 rounded-full bg-destructive-foreground text-destructive grid place-items-center transition-transform duration-300 group-hover:rotate-45">
               <Send />
          </span>
        </a>
      </nav>
    </div>
  );
}

export default MobileMenu;
