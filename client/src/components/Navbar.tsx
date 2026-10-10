import { useState } from 'react';
import { MobileMenu } from './mobile-menu';
import { Send } from 'lucide-react';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative z-50 font-pop">
      {/* ===== Tombol aksi melayang (kanan, hanya layar XL) ===== */}
      <div className="hidden xl:flex flex-col gap-3 fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <button className="w-11 h-11 rounded-full bg-background/70 border border-border grid place-items-center hover:bg-foreground hover:text-background transition shadow-sm" aria-label="Favorit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
          </svg>
        </button>
        <button className="w-11 h-11 rounded-full bg-background/70 border border-border grid place-items-center hover:bg-foreground hover:text-background transition shadow-sm" aria-label="Bagikan">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/>
            <path d="m8.4 10.8 7.2-4.6M8.4 13.2l7.2 4.6"/>
          </svg>
        </button>
      </div>

      {/* ================= HEADER ================= */}
      <header className="max-w-[1400px] mx-auto px-2 sm:px-8 py-6 flex items-center justify-between gap-4 relative z-50 bg-background lg:bg-transparent">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 shrink-0">
          <img src="/Logo.png" alt="Baitul Murojaah" className="w-25 h-25 object-contain mix-blend-multiply" />
          <span className="font-extrabold text-[15px] sm:text-lg tracking-tight leading-tight uppercase text-foreground">Baitul<br />Murojaah</span>
        </a>

        {/* Navigasi pill */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border bg-background/60 backdrop-blur p-1.5">
          <a href="#home" className="px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground hover:bg-foreground hover:text-background transition">Home</a>
          <a href="#blog" className="px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground hover:bg-foreground hover:text-background transition">Blog</a>
          <a href="#bookstore" className="px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground hover:bg-foreground hover:text-background transition">Bookstore</a>
          <a href="#kegiatan" className="px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground hover:bg-foreground hover:text-background transition">Kegiatan</a>
          <a href="#cabang" className="px-5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground hover:bg-foreground hover:text-background transition">Cabang</a>
        </nav>

        <div className="flex items-center gap-3">
          {/* CTA Desktop & Tablet */}
          <a href="#kontak" className="hidden sm:inline-flex items-center gap-3 rounded-full bg-destructive text-destructive-foreground pl-6 pr-1.5 py-1.5 group hover:bg-destructive/90 transition-colors">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">Daftar Sekarang</span>
            <span className="w-9 h-9 rounded-full bg-destructive-foreground text-destructive grid place-items-center transition-transform duration-300 group-hover:rotate-45">
              <Send />
                </span>
          </a>
          {/* Hamburger (Mobile) */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden w-11 h-11 rounded-full border border-border grid place-items-center text-foreground hover:bg-foreground/5 transition-colors" aria-label="Buka menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-6 h-6 transition-transform duration-300">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Menu mobile (Komponen terpisah dengan background blur glassmorphism) */}
      <MobileMenu isOpen={mobileOpen} setIsOpen={setMobileOpen} />
    </div>
  );
}

export default Navbar;
