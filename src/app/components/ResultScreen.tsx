import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import type { Segment, RiskResult, Insights, Profile } from '../App';

interface Props {
  segment: Segment;
  profile: Profile;
  risk: RiskResult;
  insights: Insights;
  onReset: () => void;
}

const CATEGORY_META: { key: 'pengetahuan' | 'sikap' | 'perilaku'; label: string; icon: string }[] = [
  { key: 'pengetahuan', label: 'Pengetahuan', icon: '🧠' },
  { key: 'sikap', label: 'Sikap', icon: '💬' },
  { key: 'perilaku', label: 'Perilaku', icon: '🚶' },
];

function bandFromScore(score: number): { color: string; bg: string; label: string } {
  if (score <= 2) return { color: '#10B981', bg: '#DCFCE7', label: 'Baik' };
  if (score <= 4) return { color: '#F59E0B', bg: '#FEF3C7', label: 'Cukup' };
  return { color: '#EF4444', bg: '#FEE2E2', label: 'Perlu perhatian' };
}

export function ResultScreen({ segment, profile, risk, insights, onReset }: Props) {
  const [displayAmt, setDisplayAmt] = useState(0);
  const [ctaDone, setCtaDone] = useState<Record<number, boolean>>({});
  const animatedRef = useRef(false);

  useEffect(() => {
    if (animatedRef.current) return;
    animatedRef.current = true;

    if (risk.level === 'SIAGA') {
      setTimeout(() => {
        confetti({ particleCount: 90, spread: 75, origin: { y: 0.5 }, colors: ['#00AA13', '#F9C400', '#10B981', '#ECFDF5', '#86EFAC'] });
        setTimeout(() => {
          confetti({ particleCount: 50, spread: 55, origin: { y: 0.4, x: 0.2 }, colors: ['#00AA13', '#F9C400'] });
        }, 300);
      }, 700);
    }

    const duration = 1300;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayAmt(Math.round(risk.exposure * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    setTimeout(() => requestAnimationFrame(tick), 500);
  }, [risk.exposure, risk.level]);

  const { level, color } = risk;

  const levelConfig: Record<string, { emoji: string; tagline: string; headerBg: string }> = {
    SIAGA: {
      emoji: '🎉',
      tagline: 'Kondisi finansialmu cukup terlindungi. Pertahankan!',
      headerBg: 'linear-gradient(145deg, #047857 0%, #10B981 100%)',
    },
    WASPADA: {
      emoji: '⚠️',
      tagline: 'Ada beberapa hal yang perlu segera kamu perhatikan.',
      headerBg: 'linear-gradient(145deg, #B45309 0%, #F59E0B 100%)',
    },
    GENTING: {
      emoji: '🚨',
      tagline: 'Beberapa risiko keuangan perlu segera diatasi sekarang.',
      headerBg: 'linear-gradient(145deg, #B91C1C 0%, #EF4444 100%)',
    },
  };

  const cfg = levelConfig[level];

  // Personalisasi teks pakai nama panggilan, biar hasilnya terasa buat dia sendiri.
  const callName = profile.name?.trim() || '';
  const personalize = (text: string) =>
    callName ? `${callName}, ${text.charAt(0).toLowerCase()}${text.slice(1)}` : text;

  return (
    <div style={{ minHeight: '100vh', background: '#F4F5F7', paddingBottom: 56 }}>
      {/* Result header */}
      <div style={{
        background: cfg.headerBg,
        paddingTop: 54, paddingBottom: 32,
        paddingLeft: 20, paddingRight: 20,
        borderBottomLeftRadius: 32, borderBottomRightRadius: 32,
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', right: -24, top: -24, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', left: -16, bottom: -16, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 10, position: 'relative' }}>
          {profile.name ? `Hasil Cek Risiko · ${profile.name}` : 'Hasil Cek Risiko'}
        </div>

        <motion.div
          initial={{ scale: 0.65, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 18 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.22)',
            backdropFilter: 'blur(6px)',
            padding: '11px 26px', borderRadius: 999, marginBottom: 10,
            border: '1px solid rgba(255,255,255,0.18)', position: 'relative',
          }}
        >
          <span style={{ fontSize: 24 }}>{cfg.emoji}</span>
          <span style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 24, color: 'white', letterSpacing: '0.5px' }}>
            {level}
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{ color: 'rgba(255,255,255,0.82)', fontSize: 13, lineHeight: 1.55, margin: 0, position: 'relative' }}
        >
          {personalize(cfg.tagline)}
        </motion.p>
      </div>

      <div style={{ padding: '16px 16px 0' }}>

        {/* 3 mini bar per kategori: Pengetahuan / Sikap / Perilaku */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ background: 'white', borderRadius: 22, padding: '18px 18px', marginBottom: 12, boxShadow: '0 2px 14px rgba(0,0,0,0.07)' }}
        >
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 12.5, color: '#1A1A2E', marginBottom: 14 }}>
            Gambaran per aspek
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {CATEGORY_META.map((cat, i) => {
              const score = risk.categoryScores[cat.key];
              const band = bandFromScore(score);
              const pct = (score / 6) * 100;
              return (
                <div key={cat.key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: '#1A1A2E', fontWeight: 600 }}>
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </div>
                    <span style={{
                      fontSize: 10.5, fontWeight: 700, color: band.color,
                      background: band.bg, padding: '2px 9px', borderRadius: 999,
                    }}>
                      {band.label}
                    </span>
                  </div>
                  <div style={{ height: 8, borderRadius: 999, background: '#F0F0F0', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                      style={{ height: '100%', borderRadius: 999, background: band.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Exposure amount */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            background: 'white', borderRadius: 20, padding: '18px 20px',
            marginBottom: 12, boxShadow: '0 2px 14px rgba(0,0,0,0.07)', textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 11.5, color: '#6B7280', marginBottom: 5 }}>
            {segment === 'A' ? 'Estimasi potensi kerugian per bulan' : 'Estimasi dampak finansial per bulan'}
          </div>
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 32, color: color }}>
            Rp{displayAmt.toLocaleString('id-ID')}
          </div>
          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 5, lineHeight: 1.55 }}>
            {segment === 'A'
              ? 'jika usahamu berhenti sementara & belum ada dana darurat'
              : 'jika kamu sakit/kecelakaan & belum ada proteksi kesehatan'}
          </div>
        </motion.div>

        {/* Kekuatan */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{ marginBottom: 12 }}
        >
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 13.5, color: '#1A1A2E', marginBottom: 10, paddingLeft: 2 }}>
            Kelebihanmu 💪
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {insights.strengths.map((item, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 16, padding: '14px 16px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1.5px solid #10B98118',
              }}>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: 13, color: '#047857', marginBottom: 3 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.55 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Perlu ditingkatkan */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{ marginBottom: 12 }}
        >
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 13.5, color: '#1A1A2E', marginBottom: 10, paddingLeft: 2 }}>
            Perlu ditingkatkan 🎯
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {insights.improvements.map((item, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 16, padding: '14px 16px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1.5px solid #F59E0B18',
              }}>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 600, fontSize: 13, color: '#B45309', marginBottom: 3 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.55 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rekomendasi — rule-based, bisa lebih dari 1 */}
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 13.5, color: '#1A1A2E', marginBottom: 10, paddingLeft: 2 }}>
            Langkah selanjutnya 👇
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {insights.recommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + i * 0.12 }}
                style={{
                  background: 'linear-gradient(140deg, #0A2A6E 0%, #0050A0 100%)',
                  borderRadius: 20, padding: '18px 16px',
                  textAlign: 'center', overflow: 'hidden', position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

                <div style={{ fontSize: 26, marginBottom: 6, position: 'relative' }}>{rec.icon}</div>
                <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 14, color: 'white', marginBottom: 6, position: 'relative' }}>
                  {rec.title}
                </div>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 14, position: 'relative' }}>
                  {rec.desc}
                </p>

                <AnimatePresence mode="wait">
                  {!ctaDone[i] ? (
                    <motion.button
                      key="cta"
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setCtaDone(prev => ({ ...prev, [i]: true }));
                        window.open(rec.ctaUrl, '_blank', 'noopener,noreferrer');
                      }}
                      style={{
                        width: '100%', padding: '13px 14px',
                        borderRadius: 13, border: 'none', cursor: 'pointer',
                        background: 'linear-gradient(135deg, #00D2FF 0%, #0050A0 100%)',
                        color: 'white', fontFamily: 'Sora, sans-serif',
                        fontWeight: 700, fontSize: 12.5, position: 'relative',
                        boxShadow: '0 4px 18px rgba(0,210,255,0.3)',
                      }}
                    >
                      {rec.ctaLabel} →
                    </motion.button>
                  ) : (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ color: '#7DD3FC', fontSize: 12.5, fontWeight: 600, position: 'relative' }}
                    >
                      ✓ Sudah dibuka di tab baru
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Reset */}
        <div style={{ textAlign: 'center', marginBottom: 6 }}>
          <button
            onClick={onReset}
            style={{
              background: 'none', border: 'none',
              color: '#00AA13', fontFamily: 'Sora, sans-serif',
              fontWeight: 600, fontSize: 13.5, cursor: 'pointer',
              padding: '10px 20px',
            }}
          >
            ↺ Ulangi cek dari awal
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: 10.5, color: '#9CA3AF', lineHeight: 1.6 }}>
          🔒 Jawabanmu tersimpan aman untuk keperluan riset SHE-UP.
        </p>
      </div>
    </div>
  );
}