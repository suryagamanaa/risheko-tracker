import type { Segment, Question, NumericQuestion, Tip } from './App';

export const QUESTIONS: Record<Segment, Question[]> = {
  A: [
    {
      key: 'home',
      title: 'Usaha kamu jalan dari mana?',
      hint: 'Lokasi usaha menentukan risiko aset kalau terjadi musibah mendadak.',
      funFact: '62% kerusakan peralatan usaha rumahan terjadi saat musim hujan atau mati listrik.',
      themeColor: '#3B82F6',
      emoji: '🏠',
      opts: [
        { label: 'Dari rumah sendiri', desc: 'Dapur atau garasi jadi tempat produksi', weight: 2, emoji: '🏡' },
        { label: 'Di kios atau ruko', desc: 'Lokasi usaha terpisah dari tempat tinggal', weight: 0, emoji: '🏪' },
      ],
    },
    {
      key: 'saving',
      title: 'Ada tabungan darurat khusus usaha?',
      hint: 'Dana cadangan kalau usaha tiba-tiba harus berhenti.',
      funFact: 'Idealnya dana darurat usaha = 3–6× pengeluaran operasional bulanan. Mulai dari 10% omzet harian!',
      themeColor: '#8B5CF6',
      emoji: '💰',
      opts: [
        { label: 'Belum ada nih...', desc: 'Semua kas langsung habis untuk operasional', weight: 3, emoji: '😬' },
        { label: 'Udah ada, aman!', desc: 'Ada simpanan terpisah untuk keadaan darurat', weight: 0, emoji: '😊' },
      ],
    },
    {
      key: 'mix',
      title: 'Uang usaha & rumah tangga dicampur?',
      hint: 'Pemisahan kas sangat memengaruhi ketahanan usaha jangka panjang.',
      funFact: 'Usaha yang memisahkan kas terbukti bertahan 40% lebih lama saat menghadapi krisis.',
      themeColor: '#0EA5E9',
      emoji: '👛',
      opts: [
        { label: 'Masih satu rekening', desc: 'Sering nyampur tanpa sadar tiap harinya', weight: 2, emoji: '😅' },
        { label: 'Sudah dipisah, rapi!', desc: 'Rekening atau e-wallet berbeda untuk usaha', weight: 0, emoji: '👍' },
      ],
    },
    {
      key: 'motor',
      title: 'Motor sering dipake buat operasional?',
      hint: 'Belanja bahan, antar pesanan, dan kegiatan usaha lainnya.',
      funFact: 'Tanpa perlindungan, kecelakaan motor bisa bikin usaha berhenti 1–4 minggu penuh.',
      themeColor: '#F97316',
      emoji: '🏍️',
      opts: [
        { label: 'Iya, hampir tiap hari', desc: 'Motor jadi kendaraan utama operasional', weight: 1, emoji: '😰' },
        { label: 'Jarang atau tidak pakai', desc: 'Usaha tidak bergantung pada kendaraan motor', weight: 0, emoji: '😌' },
      ],
    },
  ],
  B: [
    {
      key: 'paylater',
      title: 'Pernah pakai paylater atau pinjol?',
      hint: 'Untuk kebutuhan sehari-hari, bukan kondisi darurat mendesak.',
      funFact: 'Cicilan paylater bisa menelan 15–30% penghasilan bulanan tanpa kamu sadari lho!',
      themeColor: '#EC4899',
      emoji: '💳',
      opts: [
        { label: 'Pernah sih...', desc: 'Setidaknya pernah pakai 1–2 kali', weight: 2, emoji: '😬' },
        { label: 'Belum pernah, cash only!', desc: 'Selalu bayar tunai atau langsung lunas', weight: 0, emoji: '✌️' },
      ],
    },
    {
      key: 'saving',
      title: 'Punya tabungan atau dana darurat?',
      hint: 'Simpanan di luar uang jajan atau gaji bulanan kamu.',
      funFact: 'Mulai dari Rp10.000 per minggu sudah cukup untuk fondasi dana daruratmu!',
      themeColor: '#8B5CF6',
      emoji: '🏦',
      opts: [
        { label: 'Belum, habis tiap bulan...', desc: 'Pengeluaran selalu menyamai atau melebihi pemasukan', weight: 3, emoji: '😬' },
        { label: 'Udah ada, aman!', desc: 'Rutin menyisihkan setiap bulan tanpa gagal', weight: 0, emoji: '🙌' },
      ],
    },
    {
      key: 'health',
      title: 'Punya asuransi kesehatan sendiri?',
      hint: 'Di luar tanggungan atau asuransi dari orang tua.',
      funFact: 'Biaya rawat inap tanpa asuransi bisa menghabiskan 3–6 bulan tabunganmu sekaligus.',
      themeColor: '#EF4444',
      emoji: '❤️',
      opts: [
        { label: 'Belum, masih ngandalin ortu', desc: 'Belum punya proteksi kesehatan yang mandiri', weight: 2, emoji: '😅' },
        { label: 'Udah punya sendiri!', desc: 'Punya perlindungan kesehatan mandiri yang aktif', weight: 0, emoji: '💪' },
      ],
    },
    {
      key: 'motor',
      title: 'Ke mana-mana naik apa sehari-hari?',
      hint: 'Ke kampus, tempat kerja, atau ketemu klien dan teman.',
      funFact: 'Pengguna motor aktif harian 3× lebih berpeluang terdampak kecelakaan minor di jalan.',
      themeColor: '#F97316',
      emoji: '🛵',
      opts: [
        { label: 'Motor atau ojek online tiap hari', desc: 'Hampir selalu di jalan raya setiap harinya', weight: 1, emoji: '😰' },
        { label: 'Jalan kaki atau transportasi umum', desc: 'Risiko kecelakaan jalan lebih minimal', weight: 0, emoji: '😌' },
      ],
    },
  ],
};

export const NUMERIC_QUESTIONS: Record<Segment, NumericQuestion> = {
  A: {
    key: 'omzet',
    title: 'Rata-rata omzet usahamu per bulan?',
    hint: 'Perkiraan kasar saja, nggak perlu tepat banget kok.',
    emoji: '📊',
    min: 300000,
    max: 8000000,
    step: 100000,
    def: 1500000,
  },
  B: {
    key: 'income',
    title: 'Rata-rata uang saku atau gajimu per bulan?',
    hint: 'Perkiraan saja — ini privat dan tidak tersimpan ke mana pun.',
    emoji: '💵',
    min: 300000,
    max: 6000000,
    step: 100000,
    def: 1200000,
  },
};

const ALL_TIPS: Record<string, Tip> = {
  homeRisk: { title: 'Amankan sumber risiko di rumah', desc: 'Cek instalasi listrik & alat masak tempat usaha secara berkala — banyak musibah usaha rumahan berawal dari sini.', icon: '🏠', color: '#3B82F6' },
  savingA: { title: 'Mulai dana darurat usaha sekarang', desc: 'Coba metode amplop: sisihkan sebagian kecil omzet setiap hari sebelum terpakai untuk keperluan lain.', icon: '🪙', color: '#8B5CF6' },
  mixFix: { title: 'Pisahkan kas usaha & rumah tangga', desc: 'Buka rekening atau e-wallet kedua khusus usaha minggu ini — supaya kas tidak bercampur tanpa sadar.', icon: '👛', color: '#0EA5E9' },
  motorA: { title: 'Jaga kendaraan operasional', desc: 'Rutin servis motor & simpan nomor darurat — kendaraan sehat berarti usaha jalan terus tanpa hambatan.', icon: '🏍️', color: '#F97316' },
  paylaterFix: { title: 'Beri jeda 24 jam sebelum checkout', desc: 'Banyak dorongan FOMO hilang begitu diberi waktu untuk berpikir ulang — coba tunda dulu!', icon: '💳', color: '#EC4899' },
  savingB: { title: 'Mulai dari nominal kecil dulu', desc: 'Sisihkan meski cuma Rp10.000 per minggu — konsistensi jauh lebih penting dari besarnya nominal di awal.', icon: '🪙', color: '#8B5CF6' },
  healthFix: { title: 'Manfaatkan fasilitas yang sudah ada', desc: 'Cek layanan kesehatan kampus atau kantor yang mungkin sudah bisa kamu akses gratis atau biaya murah.', icon: '❤️', color: '#EF4444' },
  motorB: { title: 'Utamakan keselamatan di jalan', desc: 'Selalu pakai helm SNI & cek kondisi kendaraan — kecelakaan kecil bisa berdampak besar pada dompetmu.', icon: '🛵', color: '#F97316' },
  goodHabit: { title: 'Pertahankan kebiasaan baikmu!', desc: 'Kamu sudah di jalur yang tepat — teruskan kebiasaan mencatat dan menyisihkan ini secara konsisten.', icon: '🏆', color: '#10B981' },
};

export function computeTips(segment: Segment, answers: Record<string, number>): Tip[] {
  const tips: Tip[] = [];
  const noSaving = answers.saving === 3;
  if (segment === 'A') {
    if (answers.home === 2) tips.push(ALL_TIPS.homeRisk);
    if (answers.mix === 2) tips.push(ALL_TIPS.mixFix);
    if (noSaving) tips.push(ALL_TIPS.savingA);
    if (answers.motor === 1) tips.push(ALL_TIPS.motorA);
    if (tips.length === 0) tips.push(ALL_TIPS.goodHabit);
  } else {
    if (answers.paylater === 2) tips.push(ALL_TIPS.paylaterFix);
    if (noSaving) tips.push(ALL_TIPS.savingB);
    if (answers.health === 2) tips.push(ALL_TIPS.healthFix);
    if (answers.motor === 1) tips.push(ALL_TIPS.motorB);
    if (tips.length === 0) tips.push(ALL_TIPS.goodHabit);
  }
  return tips.slice(0, 3);
}

export function computeRisk(segment: Segment, answers: Record<string, number>) {
  let score = 0;
  QUESTIONS[segment].forEach(q => { score += (answers[q.key] || 0); });
  const base = answers[segment === 'A' ? 'omzet' : 'income'] || 0;
  const factor = answers.saving === 3 ? 1.5 : 0.5;
  const exposure = Math.round((base * factor) / 10000) * 10000;
  let level: 'SIAGA' | 'WASPADA' | 'GENTING';
  let color: string;
  let needleAngle: number;
  if (score <= 2) { level = 'SIAGA'; color = '#10B981'; needleAngle = -68; }
  else if (score <= 5) { level = 'WASPADA'; color = '#F59E0B'; needleAngle = 4; }
  else { level = 'GENTING'; color = '#EF4444'; needleAngle = 72; }
  return { score, level, color, needleAngle, exposure };
}
