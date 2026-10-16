import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { featuredProducts, type Product } from "@/data/mock";
import { useCart } from "@/hook/useCart";

/* ──────────────────────────────────────────────────────────
   Mini Toast — muncul di pojok kanan bawah tiap klik "Beli"
   ────────────────────────────────────────────────────────── */
interface ToastItem {
  id: number;
  title: string;
}

let toastIdCounter = 0;

function Toast({ toasts, onRemove }: { toasts: ToastItem[]; onRemove: (id: number) => void }) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border text-foreground text-xs font-semibold animate-in slide-in-from-bottom-4 duration-300 min-w-[240px] max-w-[320px]"
        >
          <span className="shrink-0 w-6 h-6 rounded-lg bg-emerald-500/15 text-emerald-600 grid place-items-center">
            <Check className="w-3.5 h-3.5" />
          </span>
          <span className="flex-1 truncate">
            <b className="text-foreground">Ditambahkan!</b>{" "}
            <span className="text-muted-foreground">{t.title}</span>
          </span>
          <button
            type="button"
            onClick={() => onRemove(t.id)}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   BookCardSingle
   ────────────────────────────────────────────────────────── */
interface BookCardSingleProps {
  product: Product;
}

export function BookCardSingle({ product }: BookCardSingleProps) {
  const { addItem } = useCart();
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: String(product.id),
      title: product.title,
      price: product.price,
      category: product.category,
      arabicTitle: (product as any).arabicTitle,
      image: product.image,
    } as any);

    // Tampilkan toast
    const newId = ++toastIdCounter;
    setToasts((prev) => [...prev, { id: newId, title: product.title }]);
    setTimeout(() => removeToast(newId), 3000);
  };

  return (
    <>
      <Toast toasts={toasts} onRemove={removeToast} />

      <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card text-card-foreground p-4 transition-all duration-300 hover:-translate-y-1 hover:border-border/80">
        {/* Gambar & Badge */}
        <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-muted/40">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute left-0 top-3 z-10 rounded-r-xl bg-gold px-3 py-1 text-[9px] font-extrabold tracking-widest text-amber-950">
              {product.badge}
            </span>
          )}
        </div>

        {/* Konten Depan */}
        <div className="flex flex-1 flex-col justify-between p-2 pt-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground block">
              {product.category}
            </span>
            <h4 className="mt-1 text-sm font-extrabold leading-snug line-clamp-2 text-foreground group-hover:text-r600 transition-colors">
              {product.title}
            </h4>
          </div>

          <div className="mt-4">
            <div className="mb-3 flex items-baseline gap-2">
              <b className="text-base font-extrabold text-r600">
                Rp {product.price.toLocaleString("id-ID")}
              </b>
              {product.originalPrice > product.price && (
                <s className="text-xs text-muted-foreground">
                  Rp {product.originalPrice.toLocaleString("id-ID")}
                </s>
              )}
            </div>

            <button
              type="button"
              id={`add-to-cart-${product.id}`}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-destructive py-2.5 text-sm font-bold text-destructive-foreground transition-all hover:bg-destructive/90 active:scale-[0.98] cursor-pointer"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="w-4 h-4" /> Beli Sekarang
            </button>
          </div>
        </div>

        {/* Detail Overlay Saat Hover */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between overflow-y-auto bg-card/95 p-5 opacity-0 backdrop-blur-md transition-all duration-300 invisible group-hover:visible group-hover:opacity-100">
          <div className="flex-1">
            <span className="mb-1 block text-[10px] font-extrabold uppercase tracking-widest text-r600">
              {product.category}
            </span>
            <h4 className="mb-1 text-sm font-extrabold leading-snug text-foreground">
              {product.title}
            </h4>
            <p className="mb-3 text-[11px] text-muted-foreground">
              {product.author} • {product.pages} hlm
            </p>

            <p className="mb-4 text-xs leading-relaxed text-muted-foreground line-clamp-4">
              {product.description}
            </p>

            {product.highlights && product.highlights.length > 0 && (
              <div className="mb-4">
                <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                  Highlights
                </span>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {product.highlights.map((hl) => (
                    <li key={hl} className="flex items-start gap-2">
                      <span className="mt-0.5 text-r600 font-bold">•</span>
                      <span className="leading-snug text-foreground/90">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-4 flex shrink-0 items-center justify-between gap-3 border-t border-border pt-4">
            <div className="flex-1">
              <span className="block text-[10px] text-muted-foreground">Kertas</span>
              <span className="line-clamp-1 text-xs font-bold text-foreground">
                {product.paperType}
              </span>
            </div>
            {/* ✅ Fix: tombol overlay sekarang juga memanggil handleAddToCart */}
            <button
              type="button"
              title="Beli Sekarang"
              onClick={handleAddToCart}
              className="shrink-0 rounded-xl bg-destructive p-2.5 text-destructive-foreground transition-all hover:bg-destructive/90 active:scale-95 cursor-pointer"
              aria-label="Tambah ke keranjang"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────────────────
   BookCard (wrapper grid untuk homepage / featured section)
   ────────────────────────────────────────────────────────── */
interface BookCardProps {
  products?: Product[];
}

export default function BookCard({ products = featuredProducts }: BookCardProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
      {products.map((p) => (
        <BookCardSingle key={p.id} product={p} />
      ))}
    </div>
  );
}