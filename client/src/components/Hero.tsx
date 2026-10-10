import { useState, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import MorphSlider from './ui/Morphslider';
import type { MorphItem } from './ui/Morphslider';

const ROTATING_WORDS = [
  'Menjaga Hafalan',
  'Kajian Hadits',
  'Infaq Sodaqoh',
  'Umroh Bareng',
];

// Gambar banner background (auto loop)
const SLIDES: MorphItem[] = [
  { image: '/gambar_1.webp'  },
  { image: '/gambar_2.jpg' },
  { image: '/gambar_3.jpg' },
];

interface SurahItem {
  id: number;
  name: string;
  arabic: string;
  verses: number;
  status: 'done' | 'ziyadah' | 'baru';
  statusText: string;
  progress: string;
}


const STATS = [
  { value: '124.000+', label: 'Alumni Mutqin' },
  { value: '45+', label: 'Judul Mushaf & Kitab' },
  { value: '4', label: 'Cabang Baitul Murojaah' },
];

// Helper jeda animasi masuk bertahap
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let swap: number | undefined;
    const interval = window.setInterval(() => {
      setIsFading(true);
      swap = window.setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsFading(false);
      }, 450);
    }, 3200);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(swap);
    };
  }, []);

  return (
    <section id="beranda" className="relative z-10 px-3 sm:px-5 pb-6 font-pop">
      {/* ================= BANNER ================= */}
      <div className="hero-stage relative mx-auto max-w-[1400px] min-h-[calc(100svh-6.5rem)] overflow-hidden rounded-md bg-[#05060a] ">
        {/* Background: MorphSlider auto loop */}
        <div className="absolute inset-0">
          <MorphSlider
            items={SLIDES}
            transition="melt"
            intensity={0.55}
            aberration={0.35}
            drift={0.4}
            autoplay
            pauseOnHover={false}
            overlayColor="#05060a"
            duration={1.1}
            ease="power2.inOut"
            scale={2.4}
            autoplayDelay={4}
            loop
            radius={28}
            showCaptions
            showControls
            showIndicators
            className="hero-morph"
          />
        </div>

        {/* Overlay gradasi agar teks tetap terbaca di atas gambar */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#05060a]/90 via-[#05060a]/55 to-[#05060a]/10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2/3 bg-gradient-to-t from-[#05060a]/85 via-[#05060a]/30 to-transparent" />
       
        {/* ================= KONTEN ================= */}
        {/* pointer-events-none agar slider tetap bisa di-drag; elemen interaktif diaktifkan kembali */}
        <div className="pointer-events-none relative z-[2] flex min-h-[calc(100svh-6.5rem)] flex-col justify-center px-6 pt-16 pb-28 sm:px-20 lg:px-24">
          <div className="max-w-2xl space-y-7">
            {/* Badge */}
            <div
              className="hero-reveal inline-flex flex-wrap items-center gap-2.5 rounded-[20px] border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-md"
              style={delay(150)}
            >
                <span className="font-extrabold">Murojaah.Id</span>
              <span className="h-3.5 w-px bg-white/25" />
              <span className="text-base text-amber-200">مُرَاجَعَة</span>
              <span className="hidden h-3.5 w-px bg-white/25 sm:block" />
              <span className="hidden font-semibold text-white/70 sm:inline">
                Pusat Literasi &amp; Sanad Huffadz — 1447 H
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="hero-reveal block" style={delay(280)}>
                Wadah Para
              </span>
              <span className="hero-reveal block" style={delay(400)}>
                Hafizh{' '}
                <span className="relative inline-block">
                  Qur’an
                  <svg
                    className="absolute left-0 -bottom-2 h-3 w-full overflow-visible"
                    viewBox="0 0 200 20"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 14 C 60 5, 125 17, 197 8"
                      fill="none"
                      stroke="#fb7185"
                      strokeWidth="6"
                      strokeLinecap="round"
                      opacity="0.9"
                    />
                  </svg>
                </span>
              </span>
              <span
                className="hero-reveal block bg-gradient-to-r from-rose-300 via-rose-400 to-amber-200 bg-clip-text text-transparent"
                style={delay(520)}
              >
                Indonesia
              </span>
              <span
                className="hero-reveal mt-4 flex h-[1.3em] items-center gap-2 overflow-hidden text-2xl sm:text-3xl"
                style={delay(640)}
              >
                <span
                  key={wordIndex}
                  className={`hero-word font-extrabold text-rose-100 ${isFading ? 'is-out' : ''}`}
                >
                  {ROTATING_WORDS[wordIndex]}
                </span>
                <span className="h-[0.9em] w-[3px] animate-pulse rounded-full bg-rose-400" />
              </span>
            </h1>

            {/* Description */}
            <p
              className="hero-reveal max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
              style={delay(760)}
            >
              Wadah bagi para hafizh Al-Qur'an di Indonesia yang berfokus pada menjaga hafalan serta
              menyelenggarakan berbagai kajian Islam.
            </p>

            {/* Action Buttons */}
            <div className="hero-reveal flex flex-wrap items-center gap-4 pt-1" style={delay(880)}>
              <a
                href="/kegiatan"
                className="hero-btn group pointer-events-auto inline-flex items-center gap-2 rounded-full bg-rose-400 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-rose-500/30 hover:bg-rose-500 hover:shadow-xl hover:shadow-rose-500/40 sm:text-base"
              >
                Mulai Perjalanan Hafalan
                <ArrowRight className="h-5 w-5 transition-transform duration-500 ease-out group-hover:translate-x-1" />
              </a>
              <a
                href="/bookstore"
                className="hero-btn pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md hover:border-white/60 hover:bg-white hover:text-rose-600 sm:text-base"
              >
                <BookOpen className="h-5 w-5" />
                Jelajahi Toko Buku
              </a>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 sm:grid-cols-4">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="hero-reveal" style={delay(1000 + i * 110)}>
                  <b className="block text-2xl font-extrabold text-white">{stat.value}</b>
                  <span className="text-xs font-semibold text-white/60">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Rotating Sticker */}
        <div
          className="hero-reveal pointer-events-none absolute right-8 top-8 z-[2] hidden h-24 w-24 lg:block"
          style={delay(1200)}
        >
          <div className="hero-float relative h-full w-full">
            <svg className="hero-spin h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <path id="cirPath" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
              </defs>
              <text className="fill-white/85 text-[9.5px] font-bold tracking-[2.6px]">
                <textPath href="#cirPath">MUROJAAH.ID • TIKRAR • ZIYADAH • MUTQIN •</textPath>
              </text>
            </svg>
            <span className="absolute inset-[26px] flex items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-rose-600 text-xl font-bold text-white shadow-md shadow-rose-700/50">
              م
            </span>
          </div>
        </div>

      
      </div>
    </section>
  );
}
