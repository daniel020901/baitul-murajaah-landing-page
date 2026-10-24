import { useState } from "react";
import {
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  CheckCircle,
  Loader2,
  CreditCard,
  Truck,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import { useCart } from "@/hook/useCart";
import {
  shippingFormSchema,
  type ShippingFormData,
  type Order,
} from "@/data/mock";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function CheckoutView() {
  const { items, total, itemCount, clearCart } = useCart();

  const [formData, setFormData] = useState<ShippingFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      return;
    }

    const validationResult = shippingFormSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0];
        if (fieldName && !fieldErrors[String(fieldName)]) {
          fieldErrors[String(fieldName)] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // shortcut: gateway pembayaran belum di-handle, upgrade saat integrasi Mayar/Midtrans
    setTimeout(() => {
      const order: Order = {
        id: `ORD-${Date.now().toString(36).toUpperCase()}`,
        items: [...items],
        shipping: validationResult.data,
        subtotal: total,
        totalAmount: total,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      setCreatedOrder(order);
      setIsSubmitting(false);
    }, 900);
  };

  // ── ORDER SUCCESS / READY FOR PAYMENT STATE ──
  if (createdOrder) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-9 h-9" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Pesanan Siap untuk Pembayaran
        </h2>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
          Data pengiriman telah tersimpan dengan nomor pesanan{" "}
          <strong className="text-foreground font-mono">{createdOrder.id}</strong>.
        </p>

        <div className="mt-8 p-6 rounded-2xl bg-card border border-border text-left space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="text-xs text-muted-foreground font-medium">Penerima</span>
            <span className="text-sm font-bold text-foreground">{createdOrder.shipping.name}</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="text-xs text-muted-foreground font-medium">WhatsApp / Telp</span>
            <span className="text-sm font-mono text-foreground">{createdOrder.shipping.phone}</span>
          </div>
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="text-xs text-muted-foreground font-medium">Alamat</span>
            <span className="text-sm text-foreground text-right max-w-xs ">
              {createdOrder.shipping.address}, {createdOrder.shipping.city}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground font-medium">Total Pembayaran</span>
            <span className="text-base font-extrabold text-foreground">
              Rp {createdOrder.totalAmount.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-200 text-xs">
          <strong>Tahap Selanjutnya:</strong> Integrasi gateway pembayaran Mayar.id / Midtrans akan dihubungkan di sini.
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            disabled
            className="px-6 py-3 rounded-xl bg-destructive/50 text-destructive-foreground font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed opacity-80"
          >
            <CreditCard className="w-4 h-4" />
            Lanjut ke Pembayaran (Segera Hadir)
          </button>
          <a
            href="/bookstore"
            onClick={() => clearCart()}
            className="px-6 py-3 rounded-xl border border-border text-foreground hover:bg-muted font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            Kembali ke Katalog
          </a>
        </div>
      </div>
    );
  }

  // ── EMPTY CART STATE ──
  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-muted/60 grid place-items-center mx-auto text-muted-foreground mb-5">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-extrabold text-foreground">Keranjang Anda Kosong</h2>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          Anda belum memilih mushaf atau kitab apapun. Silakan pilih produk dari katalog sebelum melakukan checkout.
        </p>
        <a
          href="/bookstore"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-wider hover:bg-destructive/90 transition-all cursor-pointer "
        >
          <ArrowLeft className="w-4 h-4" />
          Lihat Katalog Buku
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Checkout Pesanan
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Lengkapi data pengiriman untuk menyelesaikan pesanan mushaf &amp; kitab Anda.
          </p>
        </div>
        <a
          href="/bookstore"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors self-start sm:self-center"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Kembali ke Katalog
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── LEFT: FORM PENGIRIMAN ── */}
        <div className="lg:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Truck className="w-4 h-4 text-destructive" />
                <span>Data Pengiriman</span>
              </CardTitle>
              <CardDescription>
                Pastikan nama, alamat, dan nomor telepon aktif untuk memudahkan kurir mengantar paket.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmitOrder} className="space-y-4 pt-2">
                {/* Nama Lengkap */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    Nama Lengkap <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Contoh: Muhammad"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-background border text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:ring-2 focus:ring-foreground/10 ${
                      errors.name ? "border-destructive focus:border-destructive" : "border-border focus:border-foreground/40"
                    }`}
                  />
                  {errors.name && <p className="text-[11px] font-semibold text-destructive">{errors.name}</p>}
                </div>

                {/* Email & Phone (2 cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-background border text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:ring-2 focus:ring-foreground/10 ${
                        errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-foreground/40"
                      }`}
                    />
                    {errors.email && <p className="text-[11px] font-semibold text-destructive">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      No. WhatsApp / Telp <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="0812xxxxxxxx"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-background border text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:ring-2 focus:ring-foreground/10 ${
                        errors.phone ? "border-destructive focus:border-destructive" : "border-border focus:border-foreground/40"
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] font-semibold text-destructive">{errors.phone}</p>}
                  </div>
                </div>

                {/* Kota / Kabupaten */}
                <div className="space-y-1.5">
                  <label htmlFor="city" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Kota / Kabupaten <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Contoh: Jakarta Selatan, Bogor, Depok"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-background border text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:ring-2 focus:ring-foreground/10 ${
                      errors.city ? "border-destructive focus:border-destructive" : "border-border focus:border-foreground/40"
                    }`}
                  />
                  {errors.city && <p className="text-[11px] font-semibold text-destructive">{errors.city}</p>}
                </div>

                {/* Alamat Lengkap */}
                <div className="space-y-1.5">
                  <label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    Alamat Lengkap Pengiriman <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan, dan patokan rumah"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-background border text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors resize-none focus:ring-2 focus:ring-foreground/10 ${
                      errors.address ? "border-destructive focus:border-destructive" : "border-border focus:border-foreground/40"
                    }`}
                  />
                  {errors.address && <p className="text-[11px] font-semibold text-destructive">{errors.address}</p>}
                </div>

                {/* Catatan Tambahan (Opsional) */}
                <div className="space-y-1.5">
                  <label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    Catatan Pengiriman <span className="text-muted-foreground font-normal lowercase">(opsional)</span>
                  </label>
                  <input
                    id="notes"
                    name="notes"
                    type="text"
                    value={formData.notes || ""}
                    onChange={handleInputChange}
                    placeholder="Misal: Titipkan di pos satpam / hubungi sebelum antar"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:ring-2 focus:ring-foreground/10 focus:border-foreground/40"
                  />
                </div>

                {/* Tombol Lanjut ke Pembayaran */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-destructive text-destructive-foreground font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-destructive/90 transition-all cursor-pointer  disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Menyiapkan Pembayaran...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Lanjut ke Pembayaran
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-muted-foreground text-center mt-2.5 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Data transaksi Anda dienkripsi dan terlindungi dengan aman.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* ── RIGHT: RINGKASAN PESANAN ── */}
        <div className="lg:col-span-5 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Ringkasan Pesanan</CardTitle>
                <span className="text-[11px] font-mono font-bold bg-muted px-2.5 py-1 rounded-lg text-foreground">
                  {itemCount} Produk
                </span>
              </div>
            </CardHeader>

            <CardContent>
              {/* Daftar Item */}
              <div className="divide-y divide-border -my-2 max-h-[380px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center gap-3">
                    {/* Arabic initial / icon */}
                    <div className="w-10 h-12 rounded-lg bg-gradient-to-br from-r700 to-r900 text-white flex items-center justify-center font-arabic text-xs font-bold shrink-0 select-none">
                      {item.arabicTitle ? item.arabicTitle.slice(0, 4) : "ك"}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider truncate">
                        {item.category}
                      </p>
                      <h4 className="text-xs font-extrabold text-foreground truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {item.quantity} × Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-extrabold text-foreground block">
                        Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Rincian Biaya */}
              <div className="pt-4 border-t border-border space-y-2 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Subtotal Produk</span>
                  <span className="font-semibold text-foreground">
                    Rp {total.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Ongkos Kirim</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Gratis (Promo)
                  </span>
                </div>
                <div className="pt-2 border-t border-border flex items-center justify-between text-sm">
                  <span className="font-bold text-foreground">Total Pembayaran</span>
                  <b className="text-base font-extrabold text-destructive">
                    Rp {total.toLocaleString("id-ID")}
                  </b>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badge Kepercayaan */}
          <div className="p-4 rounded-2xl bg-card border border-border text-xs text-muted-foreground space-y-2">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-foreground block font-bold">Penerbitan Resmi &amp; Ber-tashih</strong>
                <span>Seluruh mushaf telah lolos tashih Kementerian Agama Republik Indonesia.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutView;
