/**
 * blogProgress.tsx
 * Controller untuk Blog Carousel & Progress Pagination
 * Menyediakan:
 * 1. setupBlogCarousel & initBlogProgress untuk mengontrol carousel dan progress bar
 * 2. React component BlogProgress untuk kemudahan reuse di komponen React
 */
import React, { useEffect, useState } from 'react';

export interface BlogCarouselConfig {
  interval?: number;
  pauseOnHoverViewport?: boolean;
}

/**
 * Inisialisasi controller carousel untuk elemen container
 */
export function setupBlogCarousel(
  root: HTMLElement,
  config?: BlogCarouselConfig
): () => void {
  // Cegah re-inisialisasi pada elemen yang sama
  if (root.dataset.carouselActive === 'true') {
    return () => {};
  }
  root.dataset.carouselActive = 'true';

  const track = root.querySelector<HTMLElement>('[data-track]');
  const viewport = root.querySelector<HTMLElement>('[data-viewport]');
  const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'));
  const dots = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-dot]'));
  const counter = root.querySelector<HTMLElement>('[data-current]');

  if (!track || slides.length === 0) {
    root.dataset.carouselActive = 'false';
    return () => {};
  }

  const total = slides.length;
  const interval =
    config?.interval ?? (Number(root.dataset.interval) || 5000);
  const pauseOnHover = config?.pauseOnHoverViewport ?? true;
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let currentIndex = 0;
  let timer: number | undefined = undefined;
  let startedAt = 0;
  let remaining = interval;
  let isHoveringViewport = false;
  let isTabHidden = false;

  // Set CSS custom property agar animasi CSS akurat mengikuti interval
  root.style.setProperty('--blog-interval', `${interval}ms`);

  function clearTimer() {
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timer = undefined;
    }
  }

  function scheduleNext(ms = interval) {
    clearTimer();
    if (reduceMotion || isHoveringViewport || isTabHidden) {
      return;
    }
    startedAt = performance.now();
    remaining = ms;
    timer = window.setTimeout(() => {
      goTo(currentIndex + 1);
    }, ms);
  }

  function triggerDotProgress(dotElement: HTMLElement) {
    const fill = dotElement.querySelector<HTMLElement>('.dot-fill');
    if (!fill) return;

    fill.classList.remove('is-animating');
    // Paksa browser reflow agar animasi CSS keyframes mulai ulang dari 0%
    void fill.offsetWidth;
    fill.classList.add('is-animating');
  }

  function goTo(target: number) {
    if (!root.isConnected) {
      clearTimer();
      return;
    }

    currentIndex = (target + total) % total;

    // 1. Geser track carousel
    track!.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;

    // 2. Perbarui state tiap slide
    slides.forEach((slide, i) => {
      const isActive = i === currentIndex;
      slide.dataset.active = String(isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      slide.inert = !isActive;
    });

    // 3. Perbarui dots pagination dan jalankan progress aktif
    dots.forEach((dot, i) => {
      const isActive = i === currentIndex;
      dot.dataset.active = String(isActive);
      dot.setAttribute('aria-selected', String(isActive));

      const fill = dot.querySelector<HTMLElement>('.dot-fill');
      if (fill) {
        fill.classList.remove('is-animating');
      }

      if (isActive) {
        triggerDotProgress(dot);
      }
    });

    // 4. Perbarui counter artikel (contoh: 01, 04, dst)
    if (counter) {
      counter.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    // 5. Reset waktu & jadwalkan auto move berikutnya
    root.dataset.paused = isHoveringViewport || isTabHidden ? 'true' : 'false';
    remaining = interval;
    scheduleNext(interval);
  }

  // Event listener tombol dot navigasi (klik ke dot mana pun langsung memicu progress & geser slide)
  const dotCleanups: Array<() => void> = [];
  dots.forEach((dot, i) => {
    const onDotClick = (e: MouseEvent) => {
      (e.currentTarget as HTMLElement)?.blur();
      goTo(i);
    };
    dot.addEventListener('click', onDotClick);
    dotCleanups.push(() => dot.removeEventListener('click', onDotClick));
  });

  // Event listener tombol panah kiri / kanan
  const prevButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-prev]'));
  const nextButtons = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-next]'));

  const onPrevClick = (e: MouseEvent) => {
    (e.currentTarget as HTMLElement)?.blur();
    goTo(currentIndex - 1);
  };
  const onNextClick = (e: MouseEvent) => {
    (e.currentTarget as HTMLElement)?.blur();
    goTo(currentIndex + 1);
  };

  prevButtons.forEach((btn) => btn.addEventListener('click', onPrevClick));
  nextButtons.forEach((btn) => btn.addEventListener('click', onNextClick));

  // Keyboard navigation saat fokus berada di dalam carousel
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goTo(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      goTo(currentIndex + 1);
    }
  };
  root.addEventListener('keydown', onKeyDown);

  // Pause HANYA pada artikel viewport saat mouse masuk untuk membaca,
  // TIDAK pada tombol dots/pagination!
  let onViewportEnter: (() => void) | undefined;
  let onViewportLeave: (() => void) | undefined;

  if (viewport && pauseOnHover) {
    onViewportEnter = () => {
      isHoveringViewport = true;
      root.dataset.paused = 'true';
      if (timer !== undefined) {
        const elapsed = performance.now() - startedAt;
        remaining = Math.max(500, remaining - elapsed);
        clearTimer();
      }
    };

    onViewportLeave = () => {
      isHoveringViewport = false;
      root.dataset.paused = 'false';
      scheduleNext(remaining);
    };

    viewport.addEventListener('mouseenter', onViewportEnter);
    viewport.addEventListener('mouseleave', onViewportLeave);
  }

  // Tab visibility: jeda saat tab browser tidak aktif
  const onVisibilityChange = () => {
    if (!root.isConnected) return;
    if (document.hidden) {
      isTabHidden = true;
      root.dataset.paused = 'true';
      clearTimer();
    } else {
      isTabHidden = false;
      root.dataset.paused = isHoveringViewport ? 'true' : 'false';
      scheduleNext(remaining);
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  // Gestur swipe sentuh di mobile
  let touchStartX = 0;
  let touchStartY = 0;

  const onTouchStart = (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  };

  const onTouchEnd = (e: TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goTo(currentIndex + 1);
      } else {
        goTo(currentIndex - 1);
      }
    }
  };

  viewport?.addEventListener('touchstart', onTouchStart, { passive: true });
  viewport?.addEventListener('touchend', onTouchEnd, { passive: true });

  // Mulai dari slide pertama
  goTo(0);

  // Fungsi pembersihan jika komponen di-unmount
  return () => {
    clearTimer();
    root.dataset.carouselActive = 'false';
    dotCleanups.forEach((cleanup) => cleanup());
    prevButtons.forEach((btn) => btn.removeEventListener('click', onPrevClick));
    nextButtons.forEach((btn) => btn.removeEventListener('click', onNextClick));
    root.removeEventListener('keydown', onKeyDown);
    if (viewport) {
      if (onViewportEnter) viewport.removeEventListener('mouseenter', onViewportEnter);
      if (onViewportLeave) viewport.removeEventListener('mouseleave', onViewportLeave);
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchend', onTouchEnd);
    }
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
}

/**
 * Inisialisasi otomatis untuk seluruh elemen carousel blog
 */
export function initBlogProgress(selector = '[data-blog-carousel]'): () => void {
  const elements = document.querySelectorAll<HTMLElement>(selector);
  const cleanups: Array<() => void> = [];

  elements.forEach((el) => {
    cleanups.push(setupBlogCarousel(el));
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
}

/**
 * Props untuk React Component BlogProgress
 */
export interface BlogProgressProps {
  total: number;
  current: number;
  interval?: number;
  isPaused?: boolean;
  onSelect?: (index: number) => void;
  className?: string;
}

/**
 * React Component BlogProgress (bisa digunakan jika carousel diimplementasikan via React)
 */
export function BlogProgress({
  total,
  current,
  interval = 5000,
  isPaused = false,
  onSelect,
  className = '',
}: BlogProgressProps) {
  const [activeIdx, setActiveIdx] = useState(current);

  useEffect(() => {
    setActiveIdx(current);
  }, [current]);

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-1" role="tablist" aria-label="Pilih artikel">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={i}
              type="button"
              className="blog-dot p-1 transition-all"
              data-dot={i}
              data-active={isActive ? 'true' : 'false'}
              role="tab"
              aria-selected={isActive}
              aria-label={`Artikel ${i + 1}`}
              onClick={(e) => {
                e.currentTarget.blur();
                setActiveIdx(i);
                onSelect?.(i);
              }}
            >
              <span
                className={`dot-visual block h-2.5 rounded-full overflow-hidden border border-foreground/40 transition-all ${
                  isActive ? 'w-8 border-foreground/80' : 'w-2.5'
                }`}
              >
                <span
                  className={`dot-fill block h-full bg-foreground/80 origin-left ${
                    isActive && !isPaused ? 'is-animating' : ''
                  }`}
                  style={{
                    animationDuration: `${interval}ms`,
                  }}
                />
              </span>
            </button>
          );
        })}
      </div>

      <span className="text-xs font-mono text-muted-foreground tabular-nums">
        <span className="text-foreground font-semibold">
          {String(activeIdx + 1).padStart(2, '0')}
        </span>
        <span className="mx-1">/</span>
        <span>{String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
}

export default initBlogProgress;
