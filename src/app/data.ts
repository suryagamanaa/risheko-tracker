import type { Segment, Question, NumericQuestion, RiskResult, Insights, InsightItem, Recommendation } from './App';

// ============================================================
// PERTANYAAN — 3 Tema (A: Dana Darurat, B: Pencatatan, C: Risiko Utang)
//              x 3 Kategori (Pengetahuan, Sikap, Perilaku)
// key pattern: '<tema>_<kategori>' → mis. 'A_pengetahuan'
// weight per opsi: 0 (paling aman) - 1 (menengah) - 2 (paling berisiko)
// ============================================================

export const QUESTIONS: Record<Segment, Question[]> = {
  A: [
    // ── TEMA A — Dana Darurat ──
    {
      key: 'A_pengetahuan',
      theme: 'A',
      category: 'pengetahuan',
      themeColor: '#3B82F6',
      title: 'Kalau tiba-tiba dagangan/usahamu sepi total sebulan, kira-kira kamu tau nggak harus pakai uang dari mana dulu?',
      opts: [
        { label: 'Tau persis, ada pos dana khusus buat itu', weight: 0 },
        { label: 'Ada gambaran, tapi belum pasti dari mana', weight: 1 },
        { label: 'Nggak kepikiran sama sekali', weight: 2 },
      ],
    },
    {
      key: 'A_sikap',
      theme: 'A',
      category: 'sikap',
      themeColor: '#3B82F6',
      title: 'Menurutmu, sepenting apa punya "kas cadangan" khusus buat usaha di luar uang belanja harian?',
      opts: [
        { label: 'Sangat penting, wajib ada', weight: 0 },
        { label: 'Penting, tapi belum jadi prioritas', weight: 1 },
        { label: 'Nggak terlalu penting, yang penting jalan dulu', weight: 2 },
      ],
    },
    {
      key: 'A_perilaku',
      theme: 'A',
      category: 'perilaku',
      themeColor: '#3B82F6',
      title: 'Sejauh ini, kas cadangan usahamu ada nggak, dan udah kepake belum?',
      opts: [
        { label: 'Ada, dan belum pernah kepake buat hal lain', weight: 0 },
        { label: 'Ada, tapi kadang kepake buat kebutuhan lain', weight: 1 },
        { label: 'Belum ada sama sekali', weight: 2 },
      ],
    },
    // ── TEMA B — Pencatatan & Pengelolaan ──
    {
      key: 'B_pengetahuan',
      theme: 'B',
      category: 'pengetahuan',
      themeColor: '#8B5CF6',
      title: 'Kalau ditanya "bulan ini untung berapa dari usaha?", kamu bisa jawab cepat atau harus ngitung dulu lama?',
      opts: [
        { label: 'Bisa jawab cepat, udah kebayang angkanya', weight: 0 },
        { label: 'Bisa, tapi harus ngitung dulu beberapa saat', weight: 1 },
        { label: 'Susah jawab, nggak kebayang sama sekali', weight: 2 },
      ],
    },
    {
      key: 'B_sikap',
      theme: 'B',
      category: 'sikap',
      themeColor: '#8B5CF6',
      title: 'Menurutmu, penting nggak sih catat keluar-masuk uang usaha, walau usahanya kecil-kecilan?',
      opts: [
        { label: 'Penting banget, sekecil apapun usahanya', weight: 0 },
        { label: 'Penting, tapi rasanya ribet buat usaha kecil', weight: 1 },
        { label: 'Nggak terlalu penting selama masih ingat', weight: 2 },
      ],
    },
    {
      key: 'B_perilaku',
      theme: 'B',
      category: 'perilaku',
      themeColor: '#8B5CF6',
      title: 'Seberapa sering kamu beneran nyatet uang masuk-keluar usahamu (di buku/hp/nota)?',
      opts: [
        { label: 'Rutin, hampir tiap hari atau tiap transaksi', weight: 0 },
        { label: 'Kadang-kadang, nggak rutin', weight: 1 },
        { label: 'Nggak pernah nyatet sama sekali', weight: 2 },
      ],
    },
    // ── TEMA C — Risiko Utang (versi halus) ──
    {
      key: 'C_pengetahuan',
      theme: 'C',
      category: 'pengetahuan',
      themeColor: '#F97316',
      title: 'Kalau ada yang nawarin "modal usaha cair hari ini, tanpa jaminan, tanpa ribet", kamu ngerti nggak itu biasanya berisiko apa?',
      opts: [
        { label: 'Ngerti, biasanya bunga/dendanya tinggi banget', weight: 0 },
        { label: 'Ada gambaran dikit, tapi nggak yakin detailnya', weight: 1 },
        { label: 'Nggak ngerti risikonya, yang penting cair cepat', weight: 2 },
      ],
    },
    {
      key: 'C_sikap',
      theme: 'C',
      category: 'sikap',
      themeColor: '#F97316',
      title: 'Kalau modal usaha lagi mepet banget, gimana biasanya sikapmu — buru-buru ambil tawaran cepat, atau mikir dulu?',
      opts: [
        { label: 'Mikir & cari info dulu sebelum ambil keputusan', weight: 0 },
        { label: 'Kadang buru-buru kalau situasinya mendesak banget', weight: 1 },
        { label: 'Biasanya langsung ambil yang paling cepat cair', weight: 2 },
      ],
    },
    {
      key: 'C_perilaku',
      theme: 'C',
      category: 'perilaku',
      themeColor: '#F97316',
      title: 'Kalau usahamu butuh modal mendadak, langkah pertama yang biasanya kamu ambil apa?',
      opts: [
        { label: 'Pakai kas atau tabungan sendiri dulu', weight: 0 },
        { label: 'Pinjam ke saudara atau koperasi', weight: 1 },
        { label: 'Cari pinjaman online yang cepat cair', weight: 2 },
      ],
    },
  ],
  B: [
    // ── TEMA A — Dana Darurat ──
    {
      key: 'A_pengetahuan',
      theme: 'A',
      category: 'pengetahuan',
      themeColor: '#3B82F6',
      title: 'Kalau bulan ini tiba-tiba nggak gajian/dapat uang saku, kamu tau nggak harus pakai dana dari mana?',
      opts: [
        { label: 'Tau persis, ada tabungan khusus buat itu', weight: 0 },
        { label: 'Ada gambaran, tapi belum pasti dari mana', weight: 1 },
        { label: 'Nggak kepikiran sama sekali', weight: 2 },
      ],
    },
    {
      key: 'A_sikap',
      theme: 'A',
      category: 'sikap',
      themeColor: '#3B82F6',
      title: 'Menurutmu, sepenting apa nyisihin uang "buat jaga-jaga" di luar uang jajan/kebutuhan bulanan?',
      opts: [
        { label: 'Sangat penting, wajib ada', weight: 0 },
        { label: 'Penting, tapi belum jadi prioritas', weight: 1 },
        { label: 'Nggak terlalu penting, yang penting cukup bulan ini', weight: 2 },
      ],
    },
    {
      key: 'A_perilaku',
      theme: 'A',
      category: 'perilaku',
      themeColor: '#3B82F6',
      title: 'Sejauh ini, kamu udah mulai nyisihin uang jaga-jaga, atau masih rencana doang?',
      opts: [
        { label: 'Udah rutin nyisihin, dan belum pernah kepake', weight: 0 },
        { label: 'Udah mulai, tapi kadang kepake buat hal lain', weight: 1 },
        { label: 'Masih rencana doang, belum jalan', weight: 2 },
      ],
    },
    // ── TEMA B — Pencatatan & Pengelolaan ──
    {
      key: 'B_pengetahuan',
      theme: 'B',
      category: 'pengetahuan',
      themeColor: '#8B5CF6',
      title: 'Kalau ditanya "bulan ini abis buat apa aja uangmu?", kamu bisa jawab cepat atau bingung dulu?',
      opts: [
        { label: 'Bisa jawab cepat, udah kebayang rinciannya', weight: 0 },
        { label: 'Bisa, tapi harus mikir/inget-inget dulu', weight: 1 },
        { label: 'Bingung, nggak kebayang sama sekali', weight: 2 },
      ],
    },
    {
      key: 'B_sikap',
      theme: 'B',
      category: 'sikap',
      themeColor: '#8B5CF6',
      title: 'Menurutmu, penting nggak sih catat pengeluaran, walau cuma jajan sehari-hari?',
      opts: [
        { label: 'Penting banget, sekecil apapun pengeluarannya', weight: 0 },
        { label: 'Penting, tapi rasanya ribet buat jajan kecil', weight: 1 },
        { label: 'Nggak terlalu penting selama masih ingat', weight: 2 },
      ],
    },
    {
      key: 'B_perilaku',
      theme: 'B',
      category: 'perilaku',
      themeColor: '#8B5CF6',
      title: 'Seberapa sering kamu beneran nyatet pengeluaranmu (di app/notes/buku)?',
      opts: [
        { label: 'Rutin, hampir tiap hari atau tiap transaksi', weight: 0 },
        { label: 'Kadang-kadang, nggak rutin', weight: 1 },
        { label: 'Nggak pernah nyatet sama sekali', weight: 2 },
      ],
    },
    // ── TEMA C — Risiko Utang (versi halus) ──
    {
      key: 'C_pengetahuan',
      theme: 'C',
      category: 'pengetahuan',
      themeColor: '#F97316',
      title: 'Kalau ada tawaran "pinjaman cair 10 menit tanpa syarat", kamu ngerti nggak biasanya itu berisiko apa?',
      opts: [
        { label: 'Ngerti, biasanya bunga/dendanya tinggi banget', weight: 0 },
        { label: 'Ada gambaran dikit, tapi nggak yakin detailnya', weight: 1 },
        { label: 'Nggak ngerti risikonya, yang penting cair cepat', weight: 2 },
      ],
    },
    {
      key: 'C_sikap',
      theme: 'C',
      category: 'sikap',
      themeColor: '#F97316',
      title: 'Kalau lagi butuh uang mendadak, gimana biasanya sikapmu — buru-buru ambil tawaran cepat, atau mikir dulu?',
      opts: [
        { label: 'Mikir & cari info dulu sebelum ambil keputusan', weight: 0 },
        { label: 'Kadang buru-buru kalau situasinya mendesak banget', weight: 1 },
        { label: 'Biasanya langsung ambil yang paling cepat cair', weight: 2 },
      ],
    },
    {
      key: 'C_perilaku',
      theme: 'C',
      category: 'perilaku',
      themeColor: '#F97316',
      title: 'Kalau butuh uang mendadak, langkah pertama yang biasanya kamu ambil apa?',
      opts: [
        { label: 'Pakai tabungan sendiri dulu', weight: 0 },
        { label: 'Pinjam ke keluarga atau teman', weight: 1 },
        { label: 'Cari pinjaman online yang cepat cair', weight: 2 },
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

// ============================================================
// SKOR — per kategori (Pengetahuan/Sikap/Perilaku) & per tema (A/B/C)
// Tiap kategori/tema = jumlah 3 pertanyaan, masing² weight 0-2 → skor 0-6
// Semakin TINGGI skor = semakin BERISIKO (bukan semakin bagus)
// ============================================================

export function computeRisk(segment: Segment, answers: Record<string, number>): RiskResult {
  const w = (key: string) => answers[key] || 0;

  const categoryScores = {
    pengetahuan: w('A_pengetahuan') + w('B_pengetahuan') + w('C_pengetahuan'),
    sikap: w('A_sikap') + w('B_sikap') + w('C_sikap'),
    perilaku: w('A_perilaku') + w('B_perilaku') + w('C_perilaku'),
  };

  const themeScores = {
    A: w('A_pengetahuan') + w('A_sikap') + w('A_perilaku'),
    B: w('B_pengetahuan') + w('B_sikap') + w('B_perilaku'),
    C: w('C_pengetahuan') + w('C_sikap') + w('C_perilaku'),
  };

  const totalScore = categoryScores.pengetahuan + categoryScores.sikap + categoryScores.perilaku; // 0-18

  const base = answers[segment === 'A' ? 'omzet' : 'income'] || 0;
  // Tema A = dana darurat. Kalau skor tema A tinggi (berisiko / belum siap),
  // anggap dampak finansial kalau ada musibah jadi lebih besar (faktor lebih tinggi).
  const factor = themeScores.A >= 4 ? 1.5 : 0.5;
  const exposure = Math.round((base * factor) / 10000) * 10000;

  let level: 'SIAGA' | 'WASPADA' | 'GENTING';
  let color: string;
  let needleAngle: number;
  if (totalScore <= 6) { level = 'SIAGA'; color = '#10B981'; needleAngle = -68; }
  else if (totalScore <= 12) { level = 'WASPADA'; color = '#F59E0B'; needleAngle = 4; }
  else { level = 'GENTING'; color = '#EF4444'; needleAngle = 72; }

  return { totalScore, level, color, needleAngle, exposure, categoryScores, themeScores };
}

// ============================================================
// INSIGHTS — 2 kekuatan + 2 area perlu ditingkatkan, dipilih dari
// gabungan 3 skor kategori + 3 skor tema (6 kandidat total).
// Skor rendah = kekuatan (2 terendah), skor tinggi = perlu ditingkatkan (2 tertinggi).
// ============================================================


// ============================================================
// INSIGHTS — 2 kekuatan + 2 area perlu ditingkatkan, dipilih dari
// gabungan 3 skor kategori + 3 skor tema (6 kandidat total).
// Skor rendah = kekuatan (2 terendah), skor tinggi = perlu ditingkatkan (2 tertinggi).
//
// REKOMENDASI: setiap kandidat punya rekomendasi bawaan sendiri. Kandidat
// yang muncul di "Perlu ditingkatkan" itu juga yang jadi sumber rekomendasi
// —dengan begitu rekomendasi selalu nyambung ke apa yang ditampilkan di atas.
// Ada 2 pengecualian (rule spesial): (1) kalau sikap sudah bagus tapi
// perilaku masih rendah, rekomendasi perilaku diganti versi "komunitas"
// yang lebih presisi; (2) kalau dua kandidat terlemah skornya rendah semua
// (artinya semua aspek udah oke), rekomendasi diganti 1 apresiasi fallback.
// Rekomendasi proteksi/asuransi ditambahkan sebagai bonus terpisah (bukan
// dari kandidat terlemah) kalau kondisi user sudah cukup baik + ada income.
// ============================================================

const MICROSITE_BASE = 'https://microsite-she-up.vercel.app/';

interface Candidate {
  id: string;
  label: string;
  score: number;
  strengthText: string;
  improvementText: string;
  recommendation: Recommendation;
}

function buildCandidates(segment: Segment, risk: RiskResult): Candidate[] {
  const isA = segment === 'A';
  return [
    {
      id: 'pengetahuan',
      label: 'Pengetahuan Keuangan',
      score: risk.categoryScores.pengetahuan,
      strengthText: 'Kamu sudah cukup paham dasar-dasar pengelolaan keuangan yang ditanya di tes ini.',
      improvementText: 'Beberapa konsep dasar keuangan (dana darurat, pencatatan, risiko pinjaman) masih perlu kamu pelajari lagi.',
      recommendation: {
        title: 'Perdalam pengetahuanmu dulu',
        desc: 'Beberapa hal dasar soal pengelolaan keuangan masih perlu kamu pahami. Yuk mulai dari edukasi & berita yang ringan dulu.',
        ctaLabel: 'Buka Microsite SHEaga — Edukasi & Berita',
        ctaUrl: MICROSITE_BASE,
        icon: '📚',
      },
    },
    {
      id: 'sikap',
      label: 'Sikap terhadap Keuangan',
      score: risk.categoryScores.sikap,
      strengthText: 'Sikapmu terhadap pentingnya mengelola keuangan sudah cukup baik.',
      improvementText: 'Perlu bangun kesadaran lebih soal pentingnya kelola keuangan sebagai prioritas, bukan sekadar tahu.',
      recommendation: {
        title: 'Bangun kesadaran dulu, pelan-pelan',
        desc: 'Coba mulai dari konten yang bangun motivasi soal pentingnya kelola keuangan — kadang mulai dari cerita orang lain bikin lebih related.',
        ctaLabel: 'Baca Cerita & Motivasi di SHEaga',
        ctaUrl: MICROSITE_BASE,
        icon: '💡',
      },
    },
    {
      id: 'perilaku',
      label: 'Kebiasaan Sehari-hari',
      score: risk.categoryScores.perilaku,
      strengthText: 'Kebiasaan keuanganmu sehari-hari (mencatat, menyisihkan, hati-hati soal pinjaman) sudah cukup konsisten.',
      improvementText: 'Praktik nyata sehari-hari — mencatat, menyisihkan dana, dan menahan diri dari pinjaman cepat — masih perlu dilatih lagi.',
      recommendation: {
        title: 'Mulai dari kebiasaan kecil dulu',
        desc: 'Coba mulai praktik nyata sedikit demi sedikit — nyatat, nyisihin, atau lebih hati-hati soal pinjaman. Nggak perlu langsung sempurna.',
        ctaLabel: 'Coba Fitur Pencatatan SHE-UP',
        ctaUrl: MICROSITE_BASE,
        icon: '🚶',
      },
    },
    {
      id: 'A',
      label: isA ? 'Dana Cadangan Usaha' : 'Dana Jaga-jaga',
      score: risk.themeScores.A,
      strengthText: isA
        ? 'Kamu sudah cukup siap soal dana cadangan buat usahamu.'
        : 'Kamu sudah cukup siap soal dana jaga-jaga pribadi.',
      improvementText: isA
        ? 'Dana cadangan khusus usaha (di luar kas harian) masih perlu diperkuat.'
        : 'Dana jaga-jaga di luar uang jajan/gaji bulanan masih perlu diperkuat.',
      recommendation: {
        title: isA ? 'Mulai bangun dana cadangan usaha' : 'Mulai bangun dana jaga-jaga',
        desc: isA
          ? 'Coba sisihkan sebagian kecil omzet tiap hari sebelum terpakai untuk hal lain — mulai dari nominal kecil dulu juga nggak apa-apa.'
          : 'Coba sisihkan sedikit dari uang saku/gajimu tiap bulan — mulai dari nominal kecil dulu juga nggak apa-apa.',
        ctaLabel: 'Pelajari Dana Darurat di SHEaga',
        ctaUrl: MICROSITE_BASE,
        icon: '💰',
      },
    },
    {
      id: 'B',
      label: 'Pencatatan Keuangan',
      score: risk.themeScores.B,
      strengthText: isA
        ? 'Kamu sudah cukup rapi dalam mencatat keluar-masuk uang usaha.'
        : 'Kamu sudah cukup rapi dalam mencatat pengeluaran sehari-hari.',
      improvementText: isA
        ? 'Pencatatan keluar-masuk uang usaha masih jarang dilakukan — ini bikin susah tau untung/rugi sebenarnya.'
        : 'Pencatatan pengeluaran sehari-hari masih jarang dilakukan — ini bikin susah tau ke mana uang perginya.',
      recommendation: {
        title: 'Coba mulai nyatat, pelan-pelan aja',
        desc: isA
          ? 'Kamu udah tau pentingnya nyatat keuangan usaha, cuma belum praktik rutin. Coba mulai dari fitur pencatatan sederhana — nggak perlu ribet.'
          : 'Kamu udah tau pentingnya nyatat pengeluaran, cuma belum praktik rutin. Coba mulai dari fitur pencatatan sederhana — nggak perlu ribet.',
        ctaLabel: 'Coba Pencatatan Sederhana SHE-UP',
        ctaUrl: MICROSITE_BASE,
        icon: '📝',
      },
    },
    {
      id: 'C',
      label: 'Kehati-hatian soal Pinjaman',
      score: risk.themeScores.C,
      strengthText: 'Kamu cukup hati-hati dan paham risiko soal tawaran pinjaman cepat/instan.',
      improvementText: 'Perlu lebih hati-hati soal tawaran pinjaman cepat cair — sering kali risikonya (bunga/denda) nggak kelihatan di awal.',
      recommendation: {
        title: 'Kenali dulu pinjaman yang aman',
        desc: 'Tawaran pinjaman cepat cair emang menggoda pas kepepet, tapi sering kali risikonya baru kelihatan belakangan. Yuk kenali cara membedakan pinjaman aman vs berisiko.',
        ctaLabel: 'Pelajari Pinjaman Aman di SHEaga',
        ctaUrl: MICROSITE_BASE,
        icon: '⚠️',
      },
    },
  ];
}

const COMMUNITY_RECOMMENDATION: Recommendation = {
  title: 'Kamu nggak sendirian, yuk gabung komunitas',
  desc: 'Kamu sebenarnya udah sadar pentingnya kelola keuangan, cuma butuh dorongan buat mulai praktik. Temenan bareng yang lain sering bikin lebih konsisten.',
  ctaLabel: 'Gabung Komunitas SHE-UP',
  ctaUrl: MICROSITE_BASE,
  icon: '🤝',
};

const FALLBACK_RECOMMENDATION: Recommendation = {
  title: 'Pertahankan kebiasaan baikmu!',
  desc: 'Semua aspek yang kita cek udah cukup oke. Terus konsisten, dan boleh banget eksplor konten lain di microsite buat naik level lagi.',
  ctaLabel: 'Jelajahi Microsite SHEaga',
  ctaUrl: MICROSITE_BASE,
  icon: '🏆',
};

const PROTEKSI_RECOMMENDATION: Recommendation = {
  title: 'Saatnya pikirkan proteksi',
  desc: 'Pemahaman & sikapmu soal keuangan udah cukup baik — sekarang saatnya lirik perlindungan (asuransi/proteksi) buat jaga apa yang udah kamu bangun.',
  ctaLabel: 'Buka Microsite SHEaga — Proteksi & Asuransi',
  ctaUrl: MICROSITE_BASE,
  icon: '🛡️',
};

export function computeInsights(segment: Segment, risk: RiskResult): Insights {
  const candidates = buildCandidates(segment, risk);
  const sorted = [...candidates].sort((a, b) => a.score - b.score);

  const strengths: InsightItem[] = sorted.slice(0, 2).map(c => ({
    title: c.label,
    desc: c.strengthText,
  }));

  const weakest2 = sorted.slice(-2).reverse();
  const improvements: InsightItem[] = weakest2.map(c => ({
    title: c.label,
    desc: c.improvementText,
  }));

  const recommendations = buildRecommendations(segment, risk, weakest2);

  return { strengths, improvements, recommendations };
}

// ============================================================
// REKOMENDASI — diambil langsung dari 2 kandidat "perlu ditingkatkan",
// dengan pengecualian rule spesial (komunitas & fallback), plus bonus
// proteksi/asuransi kalau kondisinya sudah cukup baik.
// ============================================================

function buildRecommendations(segment: Segment, risk: RiskResult, weakest2: Candidate[]): Recommendation[] {
  const { categoryScores } = risk;
  const sikapBagus = categoryScores.sikap <= 2;
  const allGood = weakest2[0].score <= 2 && weakest2[1].score <= 2;

  let recs: Recommendation[] = [];

  if (allGood) {
    recs.push(FALLBACK_RECOMMENDATION);
  } else {
    recs = weakest2.map(c => {
      // Rule spesial: sikap udah bagus tapi perilaku masih rendah →
      // butuh dorongan sosial, bukan sekadar "mulai kebiasaan kecil".
      if (c.id === 'perilaku' && sikapBagus) return COMMUNITY_RECOMMENDATION;
      return c.recommendation;
    });
  }

  // Bonus: kalau pengetahuan & sikap udah cukup baik + ada nominal income/omzet,
  // tambahkan rekomendasi proteksi (selama slot masih ada, maks 3 total).
  const hasDecentIncome = risk.exposure > 0;
  const pengetahuanRendah = categoryScores.pengetahuan >= 4;
  if (!allGood && !pengetahuanRendah && sikapBagus && hasDecentIncome && recs.length < 3) {
    recs.push(PROTEKSI_RECOMMENDATION);
  }

  // Hindari duplikat judul (misal 2 kandidat terlemah kebetulan kasih rekomendasi yang sama)
  const seen = new Set<string>();
  const deduped = recs.filter(r => {
    if (seen.has(r.title)) return false;
    seen.add(r.title);
    return true;
  });

  return deduped.slice(0, 3);
}