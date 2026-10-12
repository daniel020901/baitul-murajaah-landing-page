import { ShoppingBag } from "lucide-react";
import { featuredProducts, type Product } from "@/data/mock";

interface BookCardSingleProps {
  product: Product;
}

export function BookCardSingle({ product }: BookCardSingleProps) {
  return (
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
          <span className="absolute left-0 top-3 z-10 rounded-r-full bg-gold px-3 py-1 text-[9px] font-extrabold tracking-widest text-amber-950">
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
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-destructive py-2.5 text-sm font-bold text-destructive-foreground transition-all hover:bg-destructive/90 active:scale-[0.98] cursor-pointer"
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
          <button
            type="button"
            title="Beli Sekarang"
            className="shrink-0 rounded-xl bg-destructive p-2.5 text-destructive-foreground transition-all hover:bg-destructive/90 active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

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