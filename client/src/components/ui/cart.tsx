import { useState } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, CheckCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hook/useCart';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, clearCart } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Jangan return null di sini — biarkan komponen tetap di-mount agar useState tidak reset.
  // Sembunyikan dengan CSS (pointer-events-none + opacity-0) ketika tidak aktif.

  function handleCheckout() {
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
      closeCart();
    }, 2200);
  }

  return (
    <div
      className={`fixed inset-0 z-[60] overflow-hidden transition-all duration-200 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200 cursor-pointer ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      <div
        className={`fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="w-screen max-w-md bg-card text-foreground border-l border-border flex flex-col justify-between">

          {/* ── DRAWER HEADER ── */}
          <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-muted/40">
            <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
              <span>Keranjang Belanja</span>
              <span className="text-[11px] font-mono font-bold bg-destructive text-destructive-foreground px-2 py-0.5 rounded-lg">
                {items.length}
              </span>
            </h3>
            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              aria-label="Tutup Keranjang"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* ── DRAWER BODY ── */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4 scrollbar-none">
            {checkoutSuccess ? (
              <div className="py-20 text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-extrabold text-foreground">Pesanan Diproses!</h4>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                    Mengalihkan ke gateway pembayaran Mayar.id untuk menyelesaikan transaksi Anda...
                  </p>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-muted/60 grid place-items-center mx-auto text-muted-foreground">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-foreground">Keranjang Anda masih kosong</p>
                  <p className="text-xs text-muted-foreground">Pilih mushaf atau kitab yang Anda inginkan dari katalog.</p>
                </div>
                <button
                  type="button"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-wider hover:bg-destructive/90 transition-all cursor-pointer"
                >
                  Lihat Katalog Buku
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-2xl p-4 flex gap-3.5 items-center justify-between hover:border-border/80 transition-all"
                >
                  {/* Thumbnail / Inisial Arab */}
                  <div className="w-12 h-14 rounded-xl bg-gradient-to-br from-r700 to-r900 text-white flex items-center justify-center font-arabic text-sm font-bold shrink-0 select-none">
                    {item.arabicTitle ? item.arabicTitle.slice(0, 4) : 'ك'}
                  </div>

                  {/* Info Buku */}
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h5 className="text-xs font-extrabold text-foreground truncate leading-snug">
                      {item.title}
                    </h5>
                    <b className="text-r600 text-xs font-semibold block mt-1">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </b>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="flex items-center border border-border rounded-lg bg-muted/40 p-0.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-card transition-colors cursor-pointer"
                        aria-label="Kurangi jumlah"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold w-6 text-center select-none text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-card transition-colors cursor-pointer"
                        aria-label="Tambah jumlah"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Hapus Item */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                      title="Hapus item"
                      aria-label="Hapus item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ── DRAWER FOOTER ── */}
          {items.length > 0 && !checkoutSuccess && (
            <div className="p-6 border-t border-border bg-muted/20 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Total Pembayaran
                </span>
                <b className="text-foreground text-base font-extrabold">
                  Rp {total.toLocaleString('id-ID')}
                </b>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full py-3 rounded-xl bg-destructive text-destructive-foreground font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-destructive/90 transition-all cursor-pointer active:scale-[0.99]"
              >
                <CreditCard className="w-4 h-4" />
                Checkout via Mayar.id
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;