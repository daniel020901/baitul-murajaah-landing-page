// ============================================================
// Mock data untuk blog — nanti diganti fetch dari CMS / API
// ============================================================
export interface Product {
  id: string;
  title: string;
  arabicTitle: string;
  category: string;
  price: number;
  originalPrice: number;
  badge?: string;
  image: string;
  author: string;
  publisher: string;
  pages: number;
  isbn: string;
  language: string;
  paperType: string;
  description: string;
  highlights: string[];
}
export interface Article {
  slug: string;
  category: string;
  title: string;
  author: string;
  authorRole?: string;
  date: string;          // human-readable, e.g. "10 Oktober 2026"
  dateIso: string;       // ISO 8601 for <time datetime>
  excerpt: string;
  image: string;
  alt: string;
  /** Isi artikel dalam format HTML string — digunakan di [slug].astro */
  body?: string;
}
export interface CartItem {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  coverStyle: string;
  arabicTitle: string;
  quantity: number;
}
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string; // shortcut: plain-text password for dev auth, upgrade to hashed password/auth provider in production
  role: string;
  avatar: string;
}
export const mockAdminUser: AdminUser = {
  id: "admin-1",
  name: "Admin Murojaah",
  email: "admin@murojaah.id",
  password: "admin",
  role: "Super Admin",
  avatar: "/Logo.png",
};
export const chartData = 
  [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },

]
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&h=750&q=80`;

const thumb = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=120&h=80&q=70`;

export const articles: Article[] = [
  {
    slug: 'murojaah-camp-2026',
    category: 'Warta Santri',
    title: 'Murojaah Camp 2026 Resmi Digelar di Taman Jati, Memperkuat Ukhuwah dan Itqan Hafalan',
    author: 'Media Murojaah',
    authorRole: 'Tim Redaksi',
    date: '10 Oktober 2026',
    dateIso: '2026-10-10',
    excerpt:
      "Bogor — Yayasan Penjaga Hafalan Al-Qur'an secara resmi membuka agenda Murojaah Camp 2026. Kegiatan tahunan ini bertujuan mematangkan hafalan para santri di alam terbuka dengan metode tikrar intensif.",
    image: unsplash('photo-1609599006353-e629aaabfeae'),
    alt: "Mushaf Al-Qur'an bersampul emas di atas hamparan pasir",
    body: `
      <p>Bogor — Yayasan Penjaga Hafalan Al-Qur'an secara resmi membuka agenda <strong>Murojaah Camp 2026</strong> yang dilaksanakan di kawasan hijau Taman Jati, Bogor Barat. Kegiatan tahunan ini diikuti oleh <strong>150 santri</strong> dari berbagai halaqah se-Jabodetabek.</p>
      <p>Murojaah Camp tahun ini bertujuan mematangkan hafalan para santri di alam terbuka dengan metode tikrar intensif yang telah terbukti memperkuat daya ingat jangka panjang. Setiap peserta diwajibkan menyetorkan minimal <strong>5 juz</strong> selama tiga hari pelaksanaan.</p>
      <p>Pada <strong>hari pertama</strong>, kegiatan diawali dengan pembukaan resmi oleh Ust. Ahmad Fauzi, S.Pd., dilanjutkan dengan sesi orientasi metode tikrar dan pembagian kelompok murojaah. Setiap kelompok terdiri dari 10 santri dengan satu musyrif pendamping berpengalaman.</p>
      <p>Memasuki <strong>hari kedua</strong>, santri mengikuti sesi murojaah intensif mulai ba'da Subuh hingga Ashar dengan jeda istirahat yang teratur. Kegiatan dilanjutkan dengan muhasabah malam yang dipimpin langsung oleh Pengasuh Baitul Murojaah.</p>
      <p>Pada <strong>hari terakhir</strong>, kegiatan diakhiri dengan penutupan resmi serta pembagian syahadah bagi santri yang berhasil menyelesaikan target setoran. Adapun santri teladan pada kegiatan kali ini berjumlah tiga orang, yaitu <strong>Alif Rizkiawan</strong>, <strong>Iqqery</strong>, dan <strong>Muhammad Iqbal</strong>, yang dinilai unggul dalam sikap, kedisiplinan, dan keteladanan selama kegiatan berlangsung.</p>
      <p>Melalui kegiatan Murojaah Camp ini, diharapkan para santri tidak hanya memperoleh pengalaman berharga di alam terbuka, tetapi juga tumbuh menjadi pribadi yang tangguh, mandiri, berakhlak mulia, serta siap menjadi generasi penerus yang berkarakter Islami.</p>
    `,
  },
  {
    slug: 'dauroh-murojaah-nur-inka',
    category: 'Dauroh',
    title: 'Dauroh Murojaah Pekanan di Masjid Nur Inka Diikuti Ratusan Huffadz dari Berbagai Daerah',
    author: 'Redaksi Warta',
    authorRole: 'Kontributor',
    date: '3 Oktober 2026',
    dateIso: '2026-10-03',
    excerpt:
      "Cibinong — Ratusan penghafal Al-Qur'an memadati Masjid Nur Inka untuk mengikuti dauroh murojaah pekanan. Setiap peserta menyetorkan hafalan secara bergiliran di hadapan para musyrif.",
    image: unsplash('photo-1519817650390-64a93db51149'),
    alt: 'Pemandangan udara masjid berkubah biru saat matahari terbenam',
    body: `
      <p>Cibinong — Ratusan penghafal Al-Qur'an memadati <strong>Masjid Nur Inka</strong> untuk mengikuti dauroh murojaah pekanan yang kini menjadi agenda rutin Baitul Murojaah setiap Sabtu pagi.</p>
      <p>Kegiatan yang berlangsung selama delapan jam ini diikuti oleh <strong>320 peserta</strong> dari berbagai daerah di Jawa Barat dan DKI Jakarta. Setiap peserta menyetorkan hafalan secara bergiliran di hadapan para musyrif berpengalaman yang telah mendapatkan sanad riwayat Al-Qur'an.</p>
      <p>Menurut panitia pelaksana, antusiasme peserta semakin meningkat dari pekan ke pekan. "Alhamdulillah, jumlah peserta terus bertambah. Ini menunjukkan kesadaran masyarakat terhadap pentingnya menjaga hafalan semakin tinggi," ujar Koordinator Dauroh, Ust. Ridwan Hakim.</p>
    `,
  },
  {
    slug: 'khataman-shahih-bukhari',
    category: 'Majelis Ilmu',
    title: 'Khataman Kajian Shahih Bukhari Jilid Pertama Bersama Dewan Masyayikh',
    author: 'Media Murojaah',
    authorRole: 'Tim Redaksi',
    date: '26 September 2026',
    dateIso: '2026-09-26',
    excerpt:
      "Majelis Shahih Bukhari di Mihrab Masyayikh menutup kajian jilid pertama dengan doa khataman. Para santri mendapatkan sanad periwayatan langsung dari Dr. K.H. Deden Muhammad Makhyaruddin.",
    image: unsplash('photo-1542816417-0983c9c9ad53'),
    alt: 'Kitab bersampul biru dengan ornamen kaligrafi perak',
    body: `
      <p>Jakarta — <strong>Majelis Shahih Bukhari</strong> di Mihrab Masyayikh menutup kajian jilid pertama dengan khidmat dalam sebuah prosesi doa khataman yang dihadiri lebih dari dua ratus santri dan jama'ah.</p>
      <p>Para santri mendapatkan <strong>sanad periwayatan</strong> langsung dari Dr. K.H. Deden Muhammad Makhyaruddin, ulama ahli hadits yang memiliki silsilah sanad bersambung hingga Imam Bukhari rahimahullah.</p>
      <p>Kajian Shahih Bukhari ini telah berlangsung selama tiga belas bulan dengan pertemuan rutin setiap pekan. Total ada <strong>247 hadits</strong> yang telah dikaji beserta sanad, matan, dan syarahnya secara lengkap.</p>
    `,
  },
  {
    slug: 'ijazah-sanad-angkatan-pertama',
    category: 'Sanad',
    title: "Tujuh Santri Baitul Murojaah Menerima Ijazah Sanad Al-Qur'an Muttashil",
    author: 'Redaksi Warta',
    authorRole: 'Kontributor',
    date: '19 September 2026',
    dateIso: '2026-09-19',
    excerpt:
      "Setelah menuntaskan setoran 30 juz secara mutqin, tujuh santri angkatan pertama resmi menerima ijazah sanad yang bersambung hingga Rasulullah ﷺ dalam prosesi yang penuh haru.",
    image: unsplash('photo-1576764402988-7143f9cca90a'),
    alt: "Mushaf Al-Qur'an terbuka dikelilingi bunga putih",
    body: `
      <p>Bogor — Tujuh santri angkatan pertama Baitul Murojaah resmi menerima <strong>Ijazah Sanad Al-Qur'an Muttashil</strong> dalam prosesi yang penuh haru dan kekhidmatan di Pesantren Tahfidz Baitul Murojaah.</p>
      <p>Setelah melalui perjalanan panjang selama dua tahun, mereka berhasil menuntaskan setoran <strong>30 juz</strong> secara mutqin dengan standar ketat yang ditetapkan oleh Dewan Musyrif. Ijazah yang mereka terima merupakan sanad yang bersambung hingga Rasulullah ﷺ melalui jalur yang telah terverifikasi.</p>
    `,
  },
  {
    slug: 'metode-tikrar-hafalan-mutqin',
    category: 'Tips Hafalan',
    title: 'Metode Tikrar: Rahasia Menjaga Hafalan 30 Juz Tetap Mutqin',
    author: 'Tim Kurikulum',
    authorRole: 'Penyusun Kurikulum',
    date: '12 September 2026',
    dateIso: '2026-09-12',
    excerpt:
      'Mengulang adalah kunci. Simak bagaimana metode tikrar terstruktur yang diterapkan di Baitul Murojaah membantu para huffadz menjaga hafalan agar tetap kuat meski di tengah kesibukan.',
    image: unsplash('photo-1585036156171-384164a8c675'),
    alt: "Lembaran mushaf Al-Qur'an yang terlipat membentuk hati",
    body: `
      <p>Menjaga hafalan 30 juz Al-Qur'an bukanlah perkara mudah, terutama di tengah kesibukan sehari-hari. Namun dengan metode yang tepat, hal ini sangat mungkin dilakukan. Salah satu metode yang terbukti efektif adalah <strong>Metode Tikrar</strong> yang telah diterapkan di Baitul Murojaah.</p>
      <p><strong>Tikrar</strong> secara bahasa berarti pengulangan. Dalam konteks hafalan Al-Qur'an, tikrar adalah metode sistematis untuk mengulang hafalan secara teratur dan terstruktur sehingga hafalan tetap kuat dan terjaga.</p>
      <p>Ada beberapa prinsip utama dalam metode tikrar yang kami terapkan: pertama, pengulangan harian minimal satu juz; kedua, setoran mingguan kepada musyrif; dan ketiga, murojaah besar setiap bulan yang mencakup seluruh hafalan.</p>
    `,
  },
  {
    slug: 'beasiswa-infaq-murojaah',
    category: 'Infaq Murojaah',
    title: "Program Infaq Murojaah Salurkan Beasiswa Penuh untuk Santri Penghafal Al-Qur'an",
    author: 'Media Murojaah',
    authorRole: 'Tim Redaksi',
    date: '5 September 2026',
    dateIso: '2026-09-05',
    excerpt:
      "Berkat dukungan para donatur, Infaq Murojaah menyalurkan beasiswa penuh yang mencakup asrama, konsumsi, dan kitab bagi santri penghafal Al-Qur'an dari keluarga prasejahtera.",
    image: unsplash('photo-1584551246679-0daf3d275d0f'),
    alt: 'Masjid megah berkubah putih dengan pantulan cahaya senja',
    body: `
      <p>Jakarta — Program <strong>Infaq Murojaah</strong> kembali menyalurkan beasiswa penuh bagi para santri penghafal Al-Qur'an dari keluarga prasejahtera. Tahun ini, sebanyak <strong>45 santri</strong> terpilih mendapatkan beasiswa yang mencakup biaya asrama, konsumsi, dan kitab selama satu tahun penuh.</p>
      <p>Dana beasiswa bersumber dari infaq para donatur yang tersebar di seluruh Indonesia. Alhamdulillah, antusiasme para donatur semakin meningkat dari tahun ke tahun.</p>
    `,
  },
];

// ── Daftar kategori unik ──────────────────────────────────────
export const categories: string[] = [
  ...new Set(articles.map((a) => a.category)),
];

// ── Thumbnail kecil untuk sidebar "Recent Posts" ─────────────
export const recentPosts = articles.slice(0, 5).map((a) => ({
  slug: a.slug,
  title: a.title,
  date: a.date,
  image: thumb(a.image.split('unsplash.com/')[1].split('?')[0]),
}));

export const products: Product[] = [
  {
    id: "prod-1",
    title: "Mushaf Huffadz Series Juz 1 - 30 (Edisi Eksklusif)",
    arabicTitle: "مُصْحَفُ الحُفَّاظِ",
    category: "MUSHAF STANDAR",
    price: 185000,
    originalPrice: 220000,
    badge: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1603808033176-9d134e6f2c74?q=80&w=600&auto=format&fit=crop",
    author: "Tim Lajnah Pentashih Al-Qur'an",
    publisher: "Murojaah Press Indonesia",
    pages: 604,
    isbn: "978-602-1234-56-7",
    language: "Arab & Terjemah Kemenag RI",
    paperType: "QPP (Quran Paper Premium)",
    description:
      "Mushaf khusus dirancang untuk para penghafal Al-Qur'an. Dilengkapi dengan blok warna penanda maqtha tikrar, kata kunci awal ayat di margin kiri-kanan, dan pembagian juz yang presisi.",
    highlights: [
      "Fitur Blok Warna Tikrar 20x per Halaman",
      "Sudut Margin Penanda Kata Awal Ayat",
      "Kertas QPP Krim Lembut Di Mata",
      "Cover Kulit Sintetis Premium Emboss Emas",
    ],
  },
  {
    id: "prod-2",
    title: "Kitab Fiqih Ringkas Madzhab Syafi'i",
    arabicTitle: "فقه مختصر",
    category: "KITAB FIQIH",
    price: 85000,
    originalPrice: 110000,
    badge: "NEW ARRIVAL",
    image:
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=600&auto=format&fit=crop",
    author: "Syaikh Abu Syuja",
    publisher: "Murojaah Press Indonesia",
    pages: 312,
    isbn: "978-602-1234-56-8",
    language: "Arab & Terjemah Indonesia",
    paperType: "Bookpaper 55gr",
    description:
      "Terjemahan lengkap dan penjelasan dari Matan Ghayah wat Taqrib karya Syaikh Abu Syuja. Disertai dengan dalil-dalil dari Al-Qur'an dan As-Sunnah.",
    highlights: [
      "Matan Arab dan Terjemahan Berdampingan",
      "Catatan Kaki Penjelasan Tambahan",
      "Dilengkapi Skema Fiqih Praktis",
      "Hardcover Klasik Elegan",
    ],
  },
  {
    id: "prod-3",
    title: "Tafsir Al-Jalalain (Edisi Lengkap 30 Juz)",
    arabicTitle: "تفسير الجلالين",
    category: "KITAB TAFSIR",
    price: 240000,
    originalPrice: 280000,
    badge: "RECOMMENDED",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    author: "Jalaluddin Al-Mahalli & Jalaluddin As-Suyuthi",
    publisher: "Murojaah Press Indonesia",
    pages: 840,
    isbn: "978-602-1234-56-9",
    language: "Arab & Terjemah Indonesia",
    paperType: "HVS 70gr Premium",
    description:
      "Kitab tafsir fenomenal yang menjadi rujukan utama santri dan penuntut ilmu. Kini hadir dengan terjemahan bahasa Indonesia yang mudah dipahami, tata letak yang rapi, dan tahqiq terbaru.",
    highlights: [
      "Khat Utsmani Standar Madinah",
      "Terjemahan Tafsir per Kata",
      "Asbabun Nuzul Lengkap",
      "Indeks Tematik Al-Qur'an",
    ],
  },
  {
    id: "prod-4",
    title: "Al-Qur'an Mushaf Tajwid Warna A5",
    arabicTitle: "القرآن الكريم مع التجويد",
    category: "MUSHAF TAJWID",
    price: 95000,
    originalPrice: 125000,
    badge: "FAVORITE",
    image:
      "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=600&auto=format&fit=crop",
    author: "Tim Lajnah Pentashih Al-Qur'an",
    publisher: "Murojaah Press Indonesia",
    pages: 615,
    isbn: "978-602-1234-57-0",
    language: "Arab",
    paperType: "QPP (Quran Paper Premium)",
    description:
      "Mushaf dengan panduan tajwid blok warna sesuai standar Kementerian Agama RI. Sangat cocok bagi pemula yang sedang memperbaiki bacaan dan makharijul huruf.",
    highlights: [
      "Panduan 8 Warna Tajwid",
      "Transliterasi Latin Sesuai Bacaan",
      "Panduan Tanda Waqaf",
      "Dilengkapi Dzikir Pagi & Petang",
    ],
  },
  {
    id: "prod-5",
    title: "Shahih Al-Bukhari (Jilid 1 - 4 Lengkap)",
    arabicTitle: "صَحِيحُ البُخَارِيّ",
    category: "KITAB HADITS",
    price: 420000,
    originalPrice: 480000,
    image:
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=600&auto=format&fit=crop",
    author: "Imam Abu Abdillah Muhammad bin Ismail Al-Bukhari",
    publisher: "Murojaah Press Indonesia",
    pages: 1250,
    isbn: "978-602-1234-71-0",
    language: "Arab & Terjemah Indonesia",
    paperType: "Chamois 60gr Khusus Kitab",
    description:
      "Kumpulan hadits shahih terlengkap dengan tahqiq sanad, takhrij hadits, serta catatan faidah fiqih dari para pensyarah mu'tabar.",
    highlights: [
      "Takhrij Hadits Standar Internasional",
      "Sanad Riwayat Lengkap & Terverifikasi",
      "Khat Naskhi Jelas & Harakat Sempurna",
      "Hardcover Lux Tinta Emas 4 Jilid",
    ],
  },
  {
    id: "prod-6",
    title: "Matan Al-Jazariyyah wa Tuhfatul Athfal",
    arabicTitle: "المقدمة الجزرية وتحفة الأطفال",
    category: "KITAB TAJWID",
    price: 45000,
    originalPrice: 60000,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    author: "Imam Ibnul Jazari & Syaikh Sulaiman Al-Jamzuri",
    publisher: "Murojaah Press Indonesia",
    pages: 128,
    isbn: "978-602-1234-72-7",
    language: "Arab & Terjemah Penjelasan",
    paperType: "Bookpaper 72gr",
    description:
      "Dua matan tajwid paling fundamental yang wajib dihafal dan dipahami oleh setiap penghafal Al-Qur'an sebelum mengambil sanad bacaan.",
    highlights: [
      "Bait Nadham Lengkap Berharakat",
      "Terjemah Makna & Kaidah Tajwid",
      "Tabel Makharij & Sifatul Huruf",
      "Cocok untuk Talaqqi & Halaqah",
    ],
  },
  {
    id: "prod-7",
    title: "Buku Panduan Metode Tikrar Murojaah 30 Juz",
    arabicTitle: "دَلِيلُ التِّكْرَارِ لِحِفْظِ القُرْآنِ",
    category: "PANDUAN TAHFIDZ",
    price: 65000,
    originalPrice: 80000,
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop",
    author: "Dr. K.H. Deden Muhammad Makhyaruddin",
    publisher: "Murojaah Press Indonesia",
    pages: 216,
    isbn: "978-602-1234-73-4",
    language: "Indonesia",
    paperType: "Bookpaper 65gr",
    description:
      "Panduan komprehensif menjaga hafalan 30 juz agar mutqin dan melekat seumur hidup menggunakan kurikulum tikrar bertingkat Baitul Murojaah.",
    highlights: [
      "Jadwal & Pola Tikrar Harian Santri",
      "Manajemen Waktu Huffadz Profesional",
      "Solusi Menghadapi Ayat Mutasyabihat",
      "Lembar Mutaba'ah Mandiri",
    ],
  },
  {
    id: "prod-8",
    title: "Mushaf Madinah Saku (Ukuran B6 Resleting)",
    arabicTitle: "مُصْحَفُ المَدِينَةِ - حَجْمُ الجَيْبِ",
    category: "MUSHAF STANDAR",
    price: 110000,
    originalPrice: 135000,
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    author: "Lajnah Pentashihan Mushaf Al-Qur'an",
    publisher: "Murojaah Press Indonesia",
    pages: 604,
    isbn: "978-602-1234-74-1",
    language: "Arab (Rasm Utsmani)",
    paperType: "QPP Premium Soft",
    description:
      "Mushaf praktis beresleting pelindung debu dan air, sangat ringkas dibawa bepergian, safar, dan murojaah di perjalanan.",
    highlights: [
      "Rasm Utsmani Standar Madinah",
      "Cover Kulit Sintetis dengan Zipper Halus",
      "Sudut Halaman Pojok Ayat",
      "Kertas Anti-Silau Super Ringan",
    ],
  },
  {
    id: "prod-9",
    title: "Riyadhus Shalihin (Edisi Syarah Santri)",
    arabicTitle: "رِيَاضُ الصَّالِحِينَ",
    category: "KITAB HADITS",
    price: 175000,
    originalPrice: 210000,
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop",
    author: "Imam Abu Zakariya Yahya bin Syaraf An-Nawawi",
    publisher: "Murojaah Press Indonesia",
    pages: 760,
    isbn: "978-602-1234-75-8",
    language: "Arab & Terjemah Indonesia",
    paperType: "Bookpaper 57gr",
    description:
      "Kitab hadits pegangan akhlak, tarbiyah, dan penyucian jiwa (tazkiyatun nufus) yang diajarkan di seluruh pesantren tahfidz.",
    highlights: [
      "Penjelasan Kosa Kata Asing (Gharib)",
      "Faidah Praktis Tiap Bab Hadits",
      "Indeks Tematik Berdasarkan Kebutuhan Amal",
      "Hardcover Laminasi Doff Elegan",
    ],
  },
  {
    id: "prod-10",
    title: "Al-Tibyan fi Adabi Hamalatil Qur'an",
    arabicTitle: "التِّبْيَانُ فِي آدَابِ حَمَلَةِ القُرْآنِ",
    category: "PANDUAN TAHFIDZ",
    price: 55000,
    originalPrice: 70000,
    image:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600&auto=format&fit=crop",
    author: "Imam An-Nawawi rahimahullah",
    publisher: "Murojaah Press Indonesia",
    pages: 198,
    isbn: "978-602-1234-76-5",
    language: "Arab & Terjemah Indonesia",
    paperType: "Bookpaper 60gr",
    description:
      "Adab-adab mulia para penghafal dan pembaca Al-Qur'an, adab guru dan murid Al-Qur'an, serta keutamaan membaca dan menghafal kalamullah.",
    highlights: [
      "Teks Arab Berdampingan Terjemah",
      "Panduan Ikhlas & Niat Penghafal",
      "Adab Menghadapi Mushaf & Majelis",
      "Edisi Saku Pembinaan Karakter",
    ],
  },
  {
    id: "prod-11",
    title: "Mushaf Waqaf & Ibtida' Cordova A4",
    arabicTitle: "مُصْحَفُ الوَقْفِ وَالإِبْتِدَاءِ",
    category: "MUSHAF TAJWID",
    price: 135000,
    originalPrice: 160000,
    image:
      "https://images.unsplash.com/photo-1544716278-e513176f20b5?q=80&w=600&auto=format&fit=crop",
    author: "Tim Ahli Qira'at Baitul Murojaah",
    publisher: "Murojaah Press Indonesia",
    pages: 604,
    isbn: "978-602-1234-77-2",
    language: "Arab",
    paperType: "QPP Cream 50gr",
    description:
      "Mushaf ukuran besar A4 dengan panduan tanda berhenti (waqaf) dan memulai kembali (ibtida') bergaris warna agar nafas teratur dan makna tidak rusak.",
    highlights: [
      "Panduan Jeda Nafas Berwarna",
      "Ukuran Huruf Besar & Nyaman Dibaca",
      "Pedoman Terjemah Singkat Per Ayat",
      "Hardcover Motif Kaligrafi Khas Nusantara",
    ],
  },
  {
    id: "prod-12",
    title: "Fathul Qarib Al-Mujib (Syarah Taqrib)",
    arabicTitle: "فَتْحُ القَرِيبِ المُجِيبِ",
    category: "KITAB FIQIH",
    price: 78000,
    originalPrice: 95000,
    image:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop",
    author: "Syaikh Muhammad bin Qasim Al-Ghazi",
    publisher: "Murojaah Press Indonesia",
    pages: 340,
    isbn: "978-602-1234-78-9",
    language: "Arab & Terjemah Indonesia",
    paperType: "Bookpaper 55gr",
    description:
      "Kitab fiqih madzhab Syafi'i rujukan pesantren di Nusantara, mengupas hukum thaharah, shalat, zakat, puasa, haji hingga mu'amalah secara sistematis.",
    highlights: [
      "Tahqiq Makna Leksikal & Istilah Fiqih",
      "Diagram Pembagian Waris & Zakat",
      "Bahasa Terjemahan Mudah Dipahami",
      "Cover Doff Softtouch Berkualitas",
    ],
  },
  {
    id: "prod-13",
    title: "Tafsir Ayat-Ayat Ahkam (Kompilasi Hukum Al-Qur'an)",
    arabicTitle: "تَفْسِيرُ آيَاتِ الأَحْكَامِ",
    category: "KITAB TAFSIR",
    price: 195000,
    originalPrice: 230000,
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
    author: "Syaikh Muhammad Ali Ash-Shabuni",
    publisher: "Murojaah Press Indonesia",
    pages: 580,
    isbn: "978-602-1234-79-6",
    language: "Arab & Terjemah Indonesia",
    paperType: "HVS 70gr Cream",
    description:
      "Kajian tafsir mendalam terhadap ayat-ayat hukum dalam Al-Qur'an dengan perbandingan pendapat para imam madzhab dan istinbath hukum yang kuat.",
    highlights: [
      "Perbandingan 4 Madzhab Terkemuka",
      "Analisis Kebahasaan I'rab & Balaghah",
      "Asbabun Nuzul Tematik",
      "Hardcover Eksklusif Edisi Pesantren",
    ],
  },
  {
    id: "prod-14",
    title: "Buku Saku Mutasyabihat Lafdziyyah Al-Qur'an",
    arabicTitle: "المُتَشَابِهَاتُ اللَّفْظِيَّةُ فِي القُرْآنِ",
    category: "PANDUAN TAHFIDZ",
    price: 48000,
    originalPrice: 60000,
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=600&auto=format&fit=crop",
    author: "Ustadz Ahmad Fauzi, S.Pd. & Tim Musyrif",
    publisher: "Murojaah Press Indonesia",
    pages: 184,
    isbn: "978-602-1234-80-2",
    language: "Indonesia & Arab",
    paperType: "Bookpaper 60gr",
    description:
      "Kamus saku pengingat ayat-ayat yang serupa (mutasyabihat) di seluruh 30 juz lengkap dengan kaidah cara membedakannya agar tidak tertukar saat setoran.",
    highlights: [
      "Tabel Komparasi Ayat Mirip Antar-Surat",
      "Rumus Singkatan Mudah Dihafal",
      "Disusun Berdasarkan Urutan Mushaf",
      "Ukuran Pas Masuk Saku Baju Koko",
    ],
  },
];

/** Produk pilihan yang dilabeli badge — khusus untuk BookSection di homepage */
export const featuredProducts: Product[] = products.filter(
  (p) => Boolean(p.badge && p.badge.trim().length > 0)
);

/** Daftar semua kategori buku unik untuk filter */
export const bookCategories: string[] = [
  "SEMUA",
  ...Array.from(new Set(products.map((p) => p.category))),
];