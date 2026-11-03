import { LevelData, Question, UserProgress } from '../types/game';

// Helper to scramble words reliably ensuring it differs from original
function scramble(words: string[]): string[] {
  const copy = [...words];
  let tries = 0;
  while (tries < 10) {
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    if (copy.join(' ') !== words.join(' ')) {
      return copy;
    }
    tries++;
  }
  return [...words].reverse();
}

function q(
  levelId: number,
  questionNumber: number,
  words: string[],
  hint: string,
  category: string,
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan' | 'Mahir'
): Question {
  return {
    id: `lvl-${levelId}-q-${questionNumber}`,
    levelId,
    questionNumber,
    originalWords: words,
    scrambledWords: scramble(words),
    targetSentence: words.join(' '),
    hint,
    category,
    difficulty
  };
}

export const LEVELS_DATA: LevelData[] = [
  // ================= LEVEL 1 (3-4 Kata) =================
  {
    id: 1,
    title: 'Level 1: Kalimat Pertama',
    theme: 'Kegiatan Sehari-hari',
    difficulty: 'Mudah',
    questions: [
      q(1, 1, ['Saya', 'membaca', 'buku.'], 'Kata pelaku "Saya" berada di awal kalimat, diikuti apa yang sedang kamu lakukan.', 'Sekolah', 'Mudah'),
      q(1, 2, ['Ibu', 'memasak', 'di', 'dapur.'], 'Pelaku "Ibu" diletakkan pertama, lalu kegiatan memasak, dan tempatnya di akhir.', 'Keluarga', 'Mudah'),
      q(1, 3, ['Adik', 'minum', 'susu.'], 'Siapa yang minum? Letakkan nama pelaku di awal kalimat.', 'Keluarga', 'Mudah'),
      q(1, 4, ['Kucing', 'tidur', 'di', 'kursi.'], 'Hewan peliharaan berada di depan sebagai subjek kalimat.', 'Hewan', 'Mudah'),
      q(1, 5, ['Budi', 'membeli', 'pensil.'], 'Pelaku "Budi" membeli barang untuk belajar.', 'Sekolah', 'Mudah')
    ]
  },

  // ================= LEVEL 2 (3-4 Kata) =================
  {
    id: 2,
    title: 'Level 2: Aktivitas Rumah',
    theme: 'Rumah & Kebersihan',
    difficulty: 'Mudah',
    questions: [
      q(2, 1, ['Ayah', 'minum', 'teh', 'hangat.'], 'Ayah menikmati minuman hangat di sore hari.', 'Keluarga', 'Mudah'),
      q(2, 2, ['Rani', 'menyapu', 'lantai', 'kamar.'], 'Siapa yang membersihkan kamar? Letakkan "Rani" di awal.', 'Kegiatan', 'Mudah'),
      q(2, 3, ['Burung', 'terbang', 'sangat', 'tinggi.'], 'Hewan yang memiliki sayap berada di posisi subjek.', 'Hewan', 'Mudah'),
      q(2, 4, ['Doni', 'makan', 'roti', 'keju.'], 'Doni menikmati makanan kesukaannya untuk sarapan.', 'Makanan', 'Mudah'),
      q(2, 5, ['Ibu', 'mencuci', 'baju', 'putih.'], 'Ibu membersihkan pakaian di pagi hari.', 'Rumah', 'Mudah')
    ]
  },

  // ================= LEVEL 3 (3-4 Kata) =================
  {
    id: 3,
    title: 'Level 3: Teman dan Hobi',
    theme: 'Hobi & Bermain',
    difficulty: 'Mudah',
    questions: [
      q(3, 1, ['Adik', 'bermain', 'boneka', 'lucu.'], 'Adik perempuan sedang bersenang-senang dengan mainannya.', 'Hobi', 'Mudah'),
      q(3, 2, ['Siti', 'belajar', 'berhitung', 'rajin.'], 'Siti yang tekun diletakkan paling depan.', 'Belajar', 'Mudah'),
      q(3, 3, ['Bunga', 'mawar', 'mekar', 'indah.'], 'Benda yang indah di taman mekar dengan cantiknya.', 'Alam', 'Mudah'),
      q(3, 4, ['Kakak', 'menggambar', 'pemandangan', 'gunung.'], 'Kakak menyalurkan bakat melukisnya.', 'Seni', 'Mudah'),
      q(3, 5, ['Ikan', 'berenang', 'di', 'akuarium.'], 'Ikan air tawar bergerak lincah di dalam kaca.', 'Hewan', 'Mudah')
    ]
  },

  // ================= LEVEL 4 (3-4 Kata) =================
  {
    id: 4,
    title: 'Level 4: Disiplin Diri',
    theme: 'Kebiasaan Baik',
    difficulty: 'Mudah',
    questions: [
      q(4, 1, ['Edo', 'mencuci', 'tangan', 'bersih.'], 'Kebiasaan baik sebelum menyentuh makanan.', 'Kesehatan', 'Mudah'),
      q(4, 2, ['Matahari', 'terbit', 'pagi', 'hari.'], 'Bintang fajar menyinari bumi sejak subuh.', 'Alam', 'Mudah'),
      q(4, 3, ['Lani', 'merapikan', 'tempat', 'tidur.'], 'Lani membuat kamarnya kembali rapi setelah bangun.', 'Kebiasaan', 'Mudah'),
      q(4, 4, ['Pak', 'guru', 'tersenyum', 'ramah.'], 'Guru yang baik menyapa murid-murid di gerbang.', 'Sekolah', 'Mudah'),
      q(4, 5, ['Beni', 'membuang', 'sampah', 'tertib.'], 'Beni menjaga lingkungan tetap sehat dan bersih.', 'Lingkungan', 'Mudah')
    ]
  },

  // ================= LEVEL 5 (4-6 Kata) =================
  {
    id: 5,
    title: 'Level 5: Serunya Bermain',
    theme: 'Olahraga & Lapangan',
    difficulty: 'Sedang',
    questions: [
      q(5, 1, ['Adik', 'bermain', 'bola', 'di', 'halaman.'], 'Keterangan tempat "di halaman" diletakkan pada akhir kalimat.', 'Olahraga', 'Sedang'),
      q(5, 2, ['Doni', 'menyiram', 'tanaman', 'di', 'kebun.'], 'Doni memberi air pada tanaman agar tumbuh subur.', 'Alam', 'Sedang'),
      q(5, 3, ['Siti', 'meminjam', 'buku', 'cerita', 'baru.'], 'Siti membawa bahan bacaan seru dari perpustakaan.', 'Literasi', 'Sedang'),
      q(5, 4, ['Kelinci', 'putih', 'melompat', 'sangat', 'lincah.'], 'Ciri-ciri hewan diletakkan berdampingan dengan nama hewannya.', 'Hewan', 'Sedang'),
      q(5, 5, ['Riko', 'mengayuh', 'sepeda', 'di', 'taman.'], 'Aktivitas sehat bersepeda di bawah pohon rindang.', 'Hobi', 'Sedang')
    ]
  },

  // ================= LEVEL 6 (4-6 Kata) =================
  {
    id: 6,
    title: 'Level 6: Suasana Kelas',
    theme: 'Dunia Sekolah',
    difficulty: 'Sedang',
    questions: [
      q(6, 1, ['Siswa', 'berbaris', 'rapi', 'di', 'lapangan.'], 'Semua murid bersiap untuk mengikuti apel pagi.', 'Sekolah', 'Sedang'),
      q(6, 2, ['Bu', 'guru', 'menulis', 'materi', 'di', 'papan.'], 'Guru mencatat pelajaran penting agar mudah dibaca.', 'Pendidikan', 'Sedang'),
      q(6, 3, ['Dina', 'menghapus', 'tulisan', 'dengan', 'sangat', 'bersih.'], 'Papan tulis kembali putih dan siap digunakan.', 'Sekolah', 'Sedang'),
      q(6, 4, ['Kami', 'menyanyikan', 'lagu', 'kebangsaan', 'bersama-sama.'], 'Lagu patriotik dinyanyikan dengan penuh semangat.', 'Nasionalisme', 'Sedang'),
      q(6, 5, ['Bel', 'istirahat', 'berbunyi', 'sangat', 'nyaring.'], 'Tanda waktu istirahat tiba untuk bermain dan makan.', 'Sekolah', 'Sedang')
    ]
  },

  // ================= LEVEL 7 (4-6 Kata) =================
  {
    id: 7,
    title: 'Level 7: Makanan Sehat',
    theme: 'Gizi Seimbang',
    difficulty: 'Sedang',
    questions: [
      q(7, 1, ['Ibu', 'membuat', 'jus', 'alpukat', 'yang', 'segar.'], 'Minuman manis alami kaya nutrisi untuk keluarga.', 'Kesehatan', 'Sedang'),
      q(7, 2, ['Sayur', 'bayam', 'sangat', 'baik', 'untuk', 'tubuh.'], 'Sayuran hijau yang membuat badan kuat dan sehat.', 'Makanan', 'Sedang'),
      q(7, 3, ['Keluarga', 'kami', 'selalu', 'sarapan', 'pagi', 'bersama.'], 'Awali hari dengan energi yang cukup.', 'Keluarga', 'Sedang'),
      q(7, 4, ['Buah', 'pepaya', 'banyak', 'mengandung', 'vitamin', 'bergizi.'], 'Buah manis berwarna jingga pelancar pencernaan.', 'Gizi', 'Sedang'),
      q(7, 5, ['Minum', 'air', 'putih', 'menyehatkan', 'tubuh', 'kita.'], 'Kebutuhan cairan tubuh agar tidak dehidrasi.', 'Kesehatan', 'Sedang')
    ]
  },

  // ================= LEVEL 8 (4-6 Kata) =================
  {
    id: 8,
    title: 'Level 8: Sikap Terpuji',
    theme: 'Budi Pekerti',
    difficulty: 'Sedang',
    questions: [
      q(8, 1, ['Budi', 'selalu', 'mengucapkan', 'salam', 'saat', 'bertemu.'], 'Sopan santun kepada guru dan teman di sekolah.', 'Karakter', 'Sedang'),
      q(8, 2, ['Lani', 'menolong', 'teman', 'yang', 'sedang', 'terjatuh.'], 'Sikap empati dan peduli saat melihat orang kesusahan.', 'Kebaikan', 'Sedang'),
      q(8, 3, ['Anak', 'yang', 'jujur', 'akan', 'disayang', 'semua.'], 'Kejujuran adalah perhiasan hati yang paling mulia.', 'Budi Pekerti', 'Sedang'),
      q(8, 4, ['Kami', 'berterima', 'kasih', 'atas', 'semua', 'bantuan.'], 'Ucapan tulus setelah menerima kebaikan orang lain.', 'Sopan Santun', 'Sedang'),
      q(8, 5, ['Saling', 'menghargai', 'membuat', 'hidup', 'menjadi', 'rukun.'], 'Kerukunan tercipta dari rasa saling menghormati.', 'Karakter', 'Sedang')
    ]
  },

  // ================= LEVEL 9 (5-7 Kata) =================
  {
    id: 9,
    title: 'Level 9: Kerja Sama Tim',
    theme: 'Gotong Royong',
    difficulty: 'Tantangan',
    questions: [
      q(9, 1, ['Kami', 'membersihkan', 'kelas', 'bersama-sama', 'setiap', 'pagi.'], 'Pekerjaan piket kelas terasa ringan bila kompak.', 'Sekolah', 'Tantangan'),
      q(9, 2, ['Warga', 'desa', 'bergotong', 'royong', 'memperbaiki', 'jembatan', 'desa.'], 'Semangat gotong royong warisan luhur nenek moyang.', 'Masyarakat', 'Tantangan'),
      q(9, 3, ['Regu', 'pramuka', 'mendirikan', 'tenda', 'kemah', 'dengan', 'cepat.'], 'Kerja sama regu dalam perkemahan akhir pekan.', 'Pramuka', 'Tantangan'),
      q(9, 4, ['Semua', 'anggota', 'kelompok', 'ikut', 'menyumbangkan', 'ide', 'kreatif.'], 'Musyawarah untuk mencapai mufakat dalam tugas.', 'Belajar', 'Tantangan'),
      q(9, 5, ['Kerja', 'bakti', 'lingkungan', 'membuat', 'kampung', 'terlihat', 'asri.'], 'Kebersihan pangkal kesehatan bagi warga sekitar.', 'Lingkungan', 'Tantangan')
    ]
  },

  // ================= LEVEL 10 (5-7 Kata) =================
  {
    id: 10,
    title: 'Level 10: Sahabat Alam',
    theme: 'Pelestarian Bumi',
    difficulty: 'Tantangan',
    questions: [
      q(10, 1, ['Pohon', 'rindang', 'menghasilkan', 'oksigen', 'segar', 'bagi', 'manusia.'], 'Tumbuhan hijau menyaring udara kotor di bumi.', 'Sains', 'Tantangan'),
      q(10, 2, ['Jangan', 'membuang', 'sampah', 'plastik', 'ke', 'aliran', 'sungai.'], 'Larangan penting agar aliran air tidak tersumbat.', 'Lingkungan', 'Tantangan'),
      q(10, 3, ['Burung', 'hantu', 'mencari', 'makanan', 'pada', 'malam', 'hari.'], 'Hewan nokturnal seperti maskot Owi yang bijak.', 'Fauna', 'Tantangan'),
      q(10, 4, ['Hutan', 'lindung', 'menjaga', 'sumber', 'mata', 'air', 'tetap', 'mengalir.'], 'Peran hutan sebagai penyimpan air hujan alami.', 'Geografi', 'Tantangan'),
      q(10, 5, ['Kupu-kupu', 'cantik', 'hinggap', 'menghisap', 'madu', 'di', 'kelopak', 'bunga.'], 'Proses penyerbukan alami yang membantu bunga berkembang.', 'Biologi', 'Tantangan')
    ]
  },

  // ================= LEVEL 11 (5-7 Kata) =================
  {
    id: 11,
    title: 'Level 11: Ragam Seni Budaya',
    theme: 'Kesenian Tradisional',
    difficulty: 'Tantangan',
    questions: [
      q(11, 1, ['Ayu', 'menarikan', 'tari', 'pendet', 'dengan', 'mata', 'berbinar.'], 'Tarian penyambutan yang sangat terkenal dari Bali.', 'Budaya', 'Tantangan'),
      q(11, 2, ['Alat', 'musik', 'gamelan', 'mengalun', 'sangat', 'merdu', 'dan', 'tenang.'], 'Harmoni suara gong dan kenong pengiring pagelaran.', 'Musik', 'Tantangan'),
      q(11, 3, ['Dalang', 'memainkan', 'wayang', 'kulit', 'di', 'balik', 'layar', 'kelir.'], 'Kesenian wayang cerita kepahlawanan nusantara.', 'Tradisi', 'Tantangan'),
      q(11, 4, ['Ibu', 'membatik', 'kain', 'mori', 'dengan', 'canting', 'tembaga.'], 'Kerajinan tangan adiluhung yang diakui dunia.', 'Kriya', 'Tantangan'),
      q(11, 5, ['Karnaval', 'budaya', 'menampilkan', 'beragam', 'baju', 'adat', 'nusantara.'], 'Kemeriahan busana daerah lambang kebhinekaan.', 'Pawai', 'Tantangan')
    ]
  },

  // ================= LEVEL 12 (5-7 Kata) =================
  {
    id: 12,
    title: 'Level 12: Jelajah Langit',
    theme: 'Astronomi Sederhana',
    difficulty: 'Tantangan',
    questions: [
      q(12, 1, ['Bintang', 'berkelap-kelip', 'menghiasi', 'langit', 'malam', 'yang', 'gelap.'], 'Pemandangan luar angkasa yang menakjubkan.', 'Antariksa', 'Tantangan'),
      q(12, 2, ['Bumi', 'berputar', 'pada', 'porosnya', 'menyebabkan', 'siang', 'dan', 'malam.'], 'Rotasi bumi yang terjadi setiap 24 jam.', 'Sains', 'Tantangan'),
      q(12, 3, ['Bulan', 'memantulkan', 'cahaya', 'matahari', 'yang', 'menerangi', 'bumi.'], 'Satelit alami yang mengitari bumi kita.', 'Astronomi', 'Tantangan'),
      q(12, 4, ['Pelangi', 'memiliki', 'tujuh', 'warna', 'yang', 'sangat', 'menawan.'], 'Fenomena pembiasan cahaya matahari oleh butiran hujan.', 'Fisika', 'Tantangan'),
      q(12, 5, ['Teleskop', 'membantu', 'para', 'ilmuwan', 'melihat', 'planet', 'yang', 'jauh.'], 'Alat teropong canggih penatap bintang.', 'Teknologi', 'Tantangan')
    ]
  },

  // ================= LEVEL 13 (6-9 Kata) =================
  {
    id: 13,
    title: 'Level 13: Mobilitas Kota',
    theme: 'Transportasi & Disiplin',
    difficulty: 'Mahir',
    questions: [
      q(13, 1, ['Ayah', 'pergi', 'ke', 'kantor', 'naik', 'kereta', 'pagi', 'ini.'], 'Transportasi umum massal cepat dan bebas kemacetan.', 'Transportasi', 'Mahir'),
      q(13, 2, ['Pengendara', 'motor', 'wajib', 'memakai', 'helm', 'demi', 'keselamatan', 'berkendara.'], 'Patuhi aturan lalu lintas demi nyawa kita.', 'Tertib Lalu Lintas', 'Mahir'),
      q(13, 3, ['Lampu', 'lalu', 'lintas', 'menyala', 'merah', 'tanda', 'semua', 'kendaraan', 'berhenti.'], 'Tiga warna lampu pemandu arus kendaraan jalan raya.', 'Keselamatan', 'Mahir'),
      q(13, 4, ['Bus', 'sekolah', 'menjemput', 'anak-anak', 'di', 'depan', 'rumah', 'dengan', 'tepat', 'waktu.'], 'Fasilitas transportasi ramah anak menuju sekolah.', 'Sekolah', 'Mahir'),
      q(13, 5, ['Pejalan', 'kaki', 'menyeberang', 'jalan', 'melalui', 'zebra', 'cross', 'dengan', 'sangat', 'hati-hati.'], 'Garis putih di aspal untuk keamanan penyeberang.', 'Disiplin', 'Mahir')
    ]
  },

  // ================= LEVEL 14 (6-9 Kata) =================
  {
    id: 14,
    title: 'Level 14: Semangat Meraih Prestasi',
    theme: 'Edukasi & Masa Depan',
    difficulty: 'Mahir',
    questions: [
      q(14, 1, ['Farhan', 'rajin', 'berlatih', 'matematika', 'agar', 'bisa', 'menjuarai', 'olimpiade', 'nasional.'], 'Kerja keras tidak pernah mengkhianati hasil akhir.', 'Prestasi', 'Mahir'),
      q(14, 2, ['Membaca', 'buku', 'setiap', 'hari', 'dapat', 'membuka', 'wawasan', 'ilmu', 'pengetahuan', 'luas.'], 'Buku adalah jendela dunia yang tak ternilai.', 'Literasi', 'Mahir'),
      q(14, 3, ['Guru', 'memberikan', 'penghargaan', 'kepada', 'siswa', 'yang', 'paling', 'disiplin', 'dan', 'jujur.'], 'Apresiasi sekolah bagi pembelajar teladan.', 'Karakter', 'Mahir'),
      q(14, 4, ['Jangan', 'mudah', 'menyerah', 'saat', 'menghadapi', 'soal', 'pelajaran', 'yang', 'cukup', 'sulit.'], 'Kegigihan dan ketekunan mengatasi setiap rintangan.', 'Motivasi', 'Mahir'),
      q(14, 5, ['Cita-cita', 'setinggi', 'langit', 'bisa', 'terwujud', 'dengan', 'doa', 'serta', 'usaha', 'sungguh-sungguh.'], 'Pesan bijak untuk generasi penerus bangsa.', 'Masa Depan', 'Mahir')
    ]
  },

  // ================= LEVEL 15 (6-9 Kata) =================
  {
    id: 15,
    title: 'Level 15: Kebersamaan Keluarga',
    theme: 'Kasih Sayang Rumah',
    difficulty: 'Mahir',
    questions: [
      q(15, 1, ['Kakek', 'menceritakan', 'kisah', 'dongeng', 'rakyat', 'yang', 'sangat', 'menarik', 'saat', 'malam.'], 'Cerita rakyat nusantara penuh pesan moral mulia.', 'Keluarga', 'Mahir'),
      q(15, 2, ['Kami', 'sekeluarga', 'menikmati', 'liburan', 'akhir', 'pekan', 'di', 'pantai', 'yang', 'indah.'], 'Momen indah menyegarkan pikiran bersama orang tersayang.', 'Liburan', 'Mahir'),
      q(15, 3, ['Kakak', 'membantu', 'adik', 'mengerjakan', 'tugas', 'sekolah', 'dengan', 'penuh', 'kesabaran', 'tinggi.'], 'Kakak beradik rukun saling mendukung di rumah.', 'Keluarga', 'Mahir'),
      q(15, 4, ['Ibu', 'menyiapkan', 'bekal', 'makanan', 'sehat', 'sebelum', 'anak-anak', 'berangkat', 'ke', 'sekolah.'], 'Bentuk cinta ibu melalui makanan penuh gizi.', 'Kasih Sayang', 'Mahir'),
      q(15, 5, ['Rumah', 'yang', 'hangat', 'dan', 'penuh', 'cinta', 'merupakan', 'tempat', 'terbaik', 'untuk', 'tumbuh.'], 'Pondasi utama perkembangan karakter anak.', 'Keluarga', 'Mahir')
    ]
  },

  // ================= LEVEL 16 (6-9 Kata) =================
  {
    id: 16,
    title: 'Level 16: Puncak Juara KaliMaze',
    theme: 'Master Kalimat Bahasa Indonesia',
    difficulty: 'Mahir',
    questions: [
      q(16, 1, ['Bahasa', 'Indonesia', 'adalah', 'bahasa', 'persatuan', 'yang', 'menghubungkan', 'seluruh', 'rakyat', 'nusantara.'], 'Bahasa resmi pemersatu dari Sabang sampai Merauke.', 'Bahasa', 'Mahir'),
      q(16, 2, ['Menyusun', 'kalimat', 'dengan', 'kaidah', 'yang', 'benar', 'membuat', 'pesan', 'kita', 'mudah', 'dipahami.'], 'Kunci keberhasilan komunikasi yang efektif.', 'Literasi', 'Mahir'),
      q(16, 3, ['Belajar', 'dengan', 'gembira', 'di', 'KaliMaze', 'meningkatkan', 'kemampuan', 'berpikir', 'kritis', 'anak.'], 'Tujuan pembelajaran edukatif yang tercapai.', 'E-Learning', 'Mahir'),
      q(16, 4, ['Pemain', 'hebat', 'selalu', 'berusaha', 'memahami', 'struktur', 'kalimat', 'dengan', 'sangat', 'teliti.'], 'Ketelitian dalam memilah subjek, predikat, dan objek.', 'Keterampilan', 'Mahir'),
      q(16, 5, ['Selamat', 'kamu', 'telah', 'menjadi', 'juara', 'sejati', 'dalam', 'petualangan', 'susun', 'kata', 'KaliMaze!'], 'Pencapaian luar biasa menyelesaikan seluruh 16 level!', 'Juara', 'Mahir')
    ]
  }
];

export const INITIAL_PROGRESS: UserProgress = {
  unlockedLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  completedLevels: [],
  levelStars: {},
  levelHighScores: {},
  totalScore: 0,
  musicEnabled: true,
  soundEnabled: true,
  musicVolume: 0.4,
  soundVolume: 0.8,
  lastPlayedLevel: 1
};

export const STORAGE_KEY = 'kalimaze_progress_data_v2';

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      unlockedLevels:
        Array.isArray(parsed.unlockedLevels) && parsed.unlockedLevels.length > 0
          ? parsed.unlockedLevels
          : INITIAL_PROGRESS.unlockedLevels,
      completedLevels: Array.isArray(parsed.completedLevels) ? parsed.completedLevels : [],
      levelStars: parsed.levelStars || {},
      levelHighScores: parsed.levelHighScores || {},
      totalScore: typeof parsed.totalScore === 'number' ? parsed.totalScore : 0,
      musicEnabled: typeof parsed.musicEnabled === 'boolean' ? parsed.musicEnabled : true,
      soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : true,
      musicVolume: typeof parsed.musicVolume === 'number' ? parsed.musicVolume : 0.4,
      soundVolume: typeof parsed.soundVolume === 'number' ? parsed.soundVolume : 0.8,
      lastPlayedLevel: typeof parsed.lastPlayedLevel === 'number' ? parsed.lastPlayedLevel : 1
    };
  } catch {
    return INITIAL_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {}
}

export function clearUserProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
