export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  seoTitle: string;
  metaDescription: string;
  status: 'Draf' | 'Menunggu tinjauan' | 'Terbit';
  visibility: 'Publik' | 'Privat' | 'Dilindungi kata sandi';
  schedule: 'Terbitkan segera' | 'Jadwalkan tanggal';
  categories: string[];
  tags: string[];
  featuredImage?: string;
  author: string;
  updatedAt: string;
}

export const defaultCategories = [
  'Tutorial',
  'Berita',
  'Tips & Trik',
  'Opini',
];

export const mockArticles: BlogArticle[] = [
  {
    id: '1',
    title: 'Panduan Memulai Blog Pertamamu',
    slug: 'panduan-memulai-blog',
    content: `<h2>Mulai dari Satu Tulisan</h2>
<p>Blog yang baik dimulai dari satu tulisan sederhana. Tentukan topik, tulis dengan jujur, lalu terbitkan. Perbaikannya bisa menyusul.</p>
<ul>
  <li>Pilih satu topik yang kamu kuasai</li>
  <li>Tulis kerangka sebelum menulis isi</li>
  <li>Tambahkan gambar agar mudah dibaca</li>
</ul>`,
    excerpt: 'Panduan praktis memulai blog dari nol mulai dari menentukan topik, membuat kerangka tulisan, hingga menerbitkan artikel pertama.',
    seoTitle: 'Panduan Memulai Blog Pertamamu - Murojaah.id',
    metaDescription: 'Pelajari langkah mudah memulai blog pertamamu dari menentukan topik hingga optimasi gambar dan struktur artikel.',
    status: 'Draf',
    visibility: 'Publik',
    schedule: 'Terbitkan segera',
    categories: ['Tutorial', 'Tips & Trik'],
    tags: ['web', 'tutorial', 'cms'],
    author: 'Ustadz Ahmad',
    updatedAt: 'Hari ini, 14:30',
  },
  {
    id: '2',
    title: 'Adab Menuntut Ilmu dalam Tradisi Sanad Keilmuan Islam',
    slug: 'adab-menuntut-ilmu-sanad',
    content: `<h2>Keberkahan Ilmu Melalui Adab</h2>
<p>Para ulama terdahulu mempelajari adab jauh lebih lama sebelum mendalami cabang ilmu pengetahuan. Sanad keilmuan menjaga keotentikan pemahaman dari guru ke murid.</p>
<blockquote>Adab sebelum ilmu adalah kunci dibukanya pintu kefahaman yang hakiki.</blockquote>`,
    excerpt: 'Pentingnya menjaga adab terhadap guru dan kitab dalam tradisi keilmuan Islam bersanad.',
    seoTitle: 'Adab Menuntut Ilmu dalam Tradisi Sanad - Murojaah.id',
    metaDescription: 'Mengenal pentingnya adab dan sanad keilmuan dalam tradisi belajar mengajar ulama salaf.',
    status: 'Terbit',
    visibility: 'Publik',
    schedule: 'Terbitkan segera',
    categories: ['Opini', 'Tutorial'],
    tags: ['adab', 'sanad', 'keilmuan'],
    author: 'Admin Murojaah',
    updatedAt: 'Kemarin, 09:15',
  },
  {
    id: '3',
    title: 'Jadwal Daurah Kitab Turats Semester Ganjil 2026',
    slug: 'jadwal-daurah-kitab-turats-2026',
    content: `<h2>Pendaftaran Daurah Dibuka</h2>
<p>Berikut informasi lengkap jadwal kajian intensif kitab turats bersama para masyaikh dan asatidzah.</p>`,
    excerpt: 'Informasi jadwal dan pendaftaran daurah kitab turats semester ganjil 2026.',
    seoTitle: 'Jadwal Daurah Kitab Turats 2026',
    metaDescription: 'Daftar segera daurah kitab turats bersanad semester ganjil tahun 2026.',
    status: 'Menunggu tinjauan',
    visibility: 'Publik',
    schedule: 'Jadwalkan tanggal',
    categories: ['Berita'],
    tags: ['daurah', 'kajian', 'jadwal'],
    author: 'Tim Redaksi',
    updatedAt: '16 Okt 2026',
  },
];
