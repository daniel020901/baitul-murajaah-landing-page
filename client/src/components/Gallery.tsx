import React, { useState } from 'react';
import DomeGallery from '@/components/ui/DomeGallery';
import {
  Globe,
  Play,
  Pause,
  RotateCw,
  Palette,
  Sparkles,
  Move,
  ZoomIn,
  Compass,
  Layers,
  BookOpen,
  Award,
} from 'lucide-react';



export default function Gallery() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = searah jarum jam, -1 = berlawanan
  const [isGrayscale, setIsGrayscale] = useState(false);

  const toggleDirection = () => {
    setDirection((prev) => (prev === 1 ? -1 : 1));
  };

  return (
    <section id="galeri" className="py-20 md:py-28 relative z-10 overflow-hidden bg-background">
      {/* Ornamen latar belakang lembut */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        {/* ================= HEADER SECTION ================= */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs uppercase tracking-widest font-semibold mb-3 border border-border">
          
            <span>Dokumentasi 3D Interaktif</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground uppercase mb-4">
            Galeri 3D Baitul Murojaah
          </h2>

          <p className=" text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Jelajahi momen dauroh santri, murojaah camp di alam bebas, majelis ilmu sanad hadits, dan
            kegiatan tahfidz dalam visualisasi 3D interaktif.
          </p>
        </div>

        {/* ================= 3D GLOBE GALLERY CONTAINER ================= */}
        <div className="relative w-full rounded-3xl md:rounded-[2.5rem] border border-border/80 bg-[#08090f] overflow-hidden  transition-all">
          {/* Efek Bintang / Glow Atas Canvas */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-rose-500/15 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none z-10" />

          {/* Bar Kontrol Atas (Glassmorphism Toolbar) */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            {/* Status Indikator Globe */}
            <div className="pointer-events-auto inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-xs font-medium">
             
                
              <Globe className={`w-3.5 h-3.5 text-white/80 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '18s' }} />
             
            </div>

            {/* Tombol Interaksi */}
            <div className="pointer-events-auto flex items-center gap-2">
              {/* Tombol Play/Pause Auto Rotate */}
              <button
                type="button"
                onClick={() => setAutoRotate(!autoRotate)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white hover:bg-white/20 hover:border-white/30 text-xs font-semibold transition-all cursor-pointer"
                title={autoRotate ? 'Jeda Putaran' : 'Mulai Putar Otomatis'}
              >
                {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span className="hidden sm:inline">{autoRotate ? 'Jeda' : 'Putar'}</span>
              </button>

              {/* Tombol Ubah Arah Putaran */}
              <button
                type="button"
                onClick={toggleDirection}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white hover:bg-white/20 hover:border-white/30 text-xs font-semibold transition-all cursor-pointer"
                title="Balik Arah Putaran"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Arah</span>
              </button>

              {/* Tombol Mode Warna / Grayscale */}
              <button
                type="button"
                onClick={() => setIsGrayscale(!isGrayscale)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-semibold transition-all cursor-pointer ${
                  isGrayscale
                    ? 'bg-white text-black border-white'
                    : 'bg-black/60 border-white/15 text-white hover:bg-white/20 hover:border-white/30'
                }`}
                title="Beralih Warna / Grayscale"
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isGrayscale ? 'B/W' : 'Warna'}</span>
              </button>
            </div>
          </div>

          {/* Canvas Kubah 3D Dome Gallery */}
          <div className="relative w-full h-[580px] sm:h-[640px] md:h-[700px] lg:h-[750px] cursor-grab active:cursor-grabbing">
            <DomeGallery
              
              fit={0.82}
              minRadius={580}
              maxRadius={1400}
              segments={34}
              dragDampening={2}
              maxVerticalRotationDeg={6}
              overlayBlurColor="#08090f"
              imageBorderRadius="18px"
              openedImageBorderRadius="24px"
              openedImageWidth="min(88vw, 540px)"
              openedImageHeight="min(88vh, 540px)"
              grayscale={isGrayscale}
              autoRotate={autoRotate}
              autoRotateSpeed={direction * 0.14}
            />
          </div>

          {/* Hint Navigasi Melayang di Bawah Canvas */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-full px-4 flex justify-center">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/85 text-xs font-medium shadow-lg">
              <span className="flex items-center gap-1.5 text-amber-300">
                <Move className="w-3.5 h-3.5" />
                <span>Geser untuk memutar</span>
              </span>
              <span className="h-3 w-px bg-white/20" />
              <span className="flex items-center gap-1.5 text-rose-300">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Klik foto untuk detail</span>
              </span>
            </div>
          </div>
        </div>

      
       </div>
    </section>
  );
}