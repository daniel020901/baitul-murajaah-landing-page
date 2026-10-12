import { useState, useMemo, useRef } from "react";
import { Search, X, SlidersHorizontal, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { products as allProducts, bookCategories, type Product } from "@/data/mock";
import { BookCardSingle } from "@/components/ui/bookCard";

interface BookstoreCatalogProps {
  initialProducts?: Product[];
}

export function BookstoreCatalog({ initialProducts = allProducts }: BookstoreCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("SEMUA");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc" | "pages-desc">("default");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const catalogRef = useRef<HTMLDivElement>(null);

  // Hitung jumlah item per kategori
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { SEMUA: initialProducts.length };
    for (const prod of initialProducts) {
      counts[prod.category] = (counts[prod.category] || 0) + 1;
    }
    return counts;
  }, [initialProducts]);

  // Filter & Sort logika
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((p) => {
        // Filter kategori
        if (selectedCategory !== "SEMUA" && p.category !== selectedCategory) {
          return false;
        }
        // Filter pencarian
        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchArabic = p.arabicTitle?.toLowerCase().includes(q);
          const matchAuthor = p.author.toLowerCase().includes(q);
          const matchPublisher = p.publisher.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchIsbn = p.isbn?.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchHighlights = p.highlights?.some((hl) => hl.toLowerCase().includes(q));

          return (
            matchTitle ||
            matchArabic ||
            matchAuthor ||
            matchPublisher ||
            matchCategory ||
            matchIsbn ||
            matchDesc ||
            matchHighlights
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "pages-desc") return b.pages - a.pages;
        return 0; // default order
      });
  }, [initialProducts, selectedCategory, searchQuery, sortBy]);

  // Logika Pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("SEMUA");
    setSortBy("default");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={catalogRef} className="w-full space-y-8">
      {/* ── BAR PENCARIAN & URUTAN ── */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Input Search */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            id="bookstore-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Cari judul mushaf, kitab, penulis, atau kata kunci..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground/70 text-sm focus:outline-none focus:ring-2 focus:ring-r600/30 focus:border-r600 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              title="Hapus pencarian"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sortir Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <label htmlFor="bookstore-sort-select" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Urutkan:
          </label>
          <select
            id="bookstore-sort-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as any);
              setCurrentPage(1);
            }}
            className="px-3.5 py-2.5 rounded-xl border border-border bg-card text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-r600/30 focus:border-r600 cursor-pointer"
          >
            <option value="default">Rekomendasi Utama</option>
            <option value="price-asc">Harga: Termurah</option>
            <option value="price-desc">Harga: Tertinggi</option>
            <option value="pages-desc">Jumlah Halaman Terbanyak</option>
          </select>
        </div>
      </div>

      {/* ── KATEGORI TABS / PILLS ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {bookCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          const count = categoryCounts[cat] ?? 0;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <span>{cat === "SEMUA" ? "Semua Koleksi" : cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  isActive
                    ? "bg-white/20 text-destructive-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── STATUS BAR & RESET FILTER ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground pt-1 pb-2 border-b border-border">
        <div>
          {totalItems > 0 ? (
            <span>
              Menampilkan{" "}
              <b className="text-foreground font-semibold">
                {startIndex + 1}–{endIndex}
              </b>{" "}
              dari <b className="text-foreground font-semibold">{totalItems}</b> buku
              {selectedCategory !== "SEMUA" && (
                <span>
                  {" "}
                  dalam kategori <span className="text-r600 font-semibold">{selectedCategory}</span>
                </span>
              )}
            </span>
          ) : (
            <span>Tidak ada buku yang sesuai kriteria</span>
          )}
        </div>

        {(searchQuery.trim() !== "" || selectedCategory !== "SEMUA" || sortBy !== "default") && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs text-r600 hover:text-r700 font-bold underline transition-colors cursor-pointer"
          >
            Reset Semua Filter
          </button>
        )}
      </div>

      {/* ── GRID PRODUK ATAU EMPTY STATE ── */}
      {paginatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
          {paginatedProducts.map((p) => (
            <BookCardSingle key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center rounded-3xl border border-dashed border-border bg-card/50 p-8">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-muted/60 grid place-items-center mb-4 text-muted-foreground">
            <BookOpen className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-extrabold text-foreground mb-1">
            Buku Tidak Ditemukan
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
            Tidak ada buku atau kitab yang sesuai dengan pencarian{" "}
            {searchQuery ? `"${searchQuery}"` : "kriteria yang dipilih"}.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-wider hover:bg-destructive/90 transition-all cursor-pointer"
          >
            Tampilkan Semua Buku
          </button>
        </div>
      )}

      {/* ── PAGINATION CONTROLS ── */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <div className="text-xs text-muted-foreground font-mono">
            Halaman <span className="font-bold text-foreground">{currentPage}</span> dari{" "}
            <span className="font-bold text-foreground">{totalPages}</span>
          </div>

          <nav className="flex items-center gap-1.5" aria-label="Navigasi Halaman Bookstore">
            {/* Tombol Sebelumnya */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            {/* Nomor Halaman */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-destructive text-destructive-foreground"
                        : "border border-border bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            {/* Tombol Selanjutnya */}
            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl border border-border bg-card text-xs font-semibold text-foreground hover:bg-muted disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
              aria-label="Halaman Selanjutnya"
            >
              <span className="hidden sm:inline">Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default BookstoreCatalog;
