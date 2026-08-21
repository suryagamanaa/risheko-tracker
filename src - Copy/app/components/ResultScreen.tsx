import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import type { Segment, RiskResult, Tip } from '../App';

interface Props {
  segment: Segment;
  risk: RiskResult;
  tips: Tip[];
  onReset: () => void;
}

export function ResultScreen({ segment, risk, tips, onReset }: Props) {
  const [displayAmt, setDisplayAmt] = useState(0);
  const [ctaDone, setCtaDone] = useState(false);
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

  const { level, color, needleAngle } = risk;

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

  const MICROSITE_URL = 'https://www.figma.com/make/2qcvFTV1AOJvpvur44UDAq/Microsite-SHE-UP-?code-node-id=0-6&p=f&t=jdDur7GWARjljKEH-0&fullscreen=1';

  const ctaMap: Record<string, { note: string; label: string }> = {
    'SIAGA-A': {
      note: 'Kondisi usahamu sudah cukup baik! Pelajari cara mempertahankan dan memperkuat proteksi aset & usaha rumahanmu.',
      label: 'Yuk buka Microsite SHEaga untuk tingkatkan proteksi usahamu →',
    },
    'WASPADA-A': {
      note: 'Ada beberapa celah risiko di usahamu. Temukan edukasi & solusi asuransi yang tepat untuk mompreneur seperti kamu.',
      label: 'Yuk buka Microsite SHEaga untuk lindungi usahamu →',
    },
    'GENTING-A': {
      note: 'Usahamu membutuhkan perlindungan segera. Temukan produk asuransi UMKM yang sesuai budget di microsite kami.',
      label: 'Yuk buka Microsite SHEaga untuk mulai proteksi usahamu →',
    },
    'SIAGA-B': {
      note: 'Kamu sudah di jalur yang tepat! Tingkatkan literasi finansialmu dan eksplorasi langkah proteksi berikutnya.',
      label: 'Yuk buka Microsite SHEaga untuk tingkatkan literasi finansialmu →',
    },
    'WASPADA-B': {
      note: 'Beberapa hal perlu diperhatikan. Ikuti kelas literasi & simulasi risiko yang disiapkan khusus untuk kamu.',
      label: 'Yuk buka Microsite SHEaga untuk pelajari manajemen risikomu →',
    },
    'GENTING-B': {
      note: 'Perlu tindakan cepat! Mulai dari edukasi finansial & simulasi proteksi yang tepat untuk kondisimu sekarang.',
      label: 'Yuk buka Microsite SHEaga untuk mulai perjalanan finansialmu →',
    },
  };

  const ctaCfg = ctaMap[`${level}-${segment}`] ?? ctaMap['WASPADA-B'];

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
        {/* Decorative elements */}
        <div style={{ position: 'absolute', right: -24, top: -24, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', left: -16, bottom: -16, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 10, position: 'relative' }}>
          Hasil Cek Risiko
        </div>

        {/* Level badge */}
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
          {cfg.tagline}
        </motion.p>
      </div>

      <div style={{ padding: '16px 16px 0' }}>

        {/* Gauge card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ background: 'white', borderRadius: 22, padding: '20px 16px 14px', marginBottom: 12, boxShadow: '0 2px 14px rgba(0,0,0,0.07)' }}
        >
          <div style={{ fontSize: 12, color: '#6B7280', textAlign: 'center', marginBottom: 4, fontWeight: 500 }}>
            {segment === 'A' ? 'Gambaran risiko usahamu' : 'Gambaran risiko finansialmu'}
          </div>
          <GaugeMeter needleAngle={needleAngle} color={color} level={level} />
        </motion.div>

        {/* Exposure amount */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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

        {/* Tips section */}
        <div style={{ marginBottom: 12 }}>
          <div style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 13.5,
            color: '#1A1A2E', marginBottom: 10, paddingLeft: 2,
          }}>
            Langkah yang bisa kamu mulai sekarang 👇
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 + i * 0.16 }}
                style={{
                  background: 'white', borderRadius: 18,
                  padding: '14px 16px', display: 'flex', gap: 13, alignItems: 'flex-start',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.055)',
                  border: `1.5px solid ${tip.color}18`,
                }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 14,
                  background: `${tip.color}12`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, flexShrink: 0,
                }}>
                  {tip.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'Sora, sans-serif', fontWeight: 600,
                    fontSize: 13.5, color: '#1A1A2E', lineHeight: 1.38, marginBottom: 4,
                  }}>
                    {tip.title}
                  </div>
                  <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.58 }}>
                    {tip.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA box — Microsite SHEaga */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          style={{
            background: 'linear-gradient(140deg, #0A2A6E 0%, #0050A0 100%)',
            borderRadius: 22, padding: '20px 18px', marginBottom: 12,
            textAlign: 'center', overflow: 'hidden', position: 'relative',
          }}
        >
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', right: -20, top: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', left: -16, bottom: -16, width: 80, height: 80, borderRadius: '50%', background: 'rgba(0,210,255,0.08)' }} />

          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(0,210,255,0.2)', border: '1px solid rgba(0,210,255,0.3)',
            borderRadius: 999, padding: '4px 12px', marginBottom: 10, position: 'relative',
          }}>
            <span style={{ fontSize: 14 }}>🌐</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#00D2FF', letterSpacing: '0.5px' }}>
              MICROSITE SHEaga
            </span>
          </div>

          <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.82)', lineHeight: 1.65, marginBottom: 14, position: 'relative' }}>
            {ctaCfg.note}
          </p>

          <AnimatePresence mode="wait">
            {!ctaDone ? (
              <motion.button
                key="cta"
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => {
                  setCtaDone(true);
                  window.open(MICROSITE_URL, '_blank', 'noopener,noreferrer');
                }}
                style={{
                  width: '100%', padding: '15px 16px',
                  borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: 'linear-gradient(135deg, #00D2FF 0%, #0050A0 100%)',
                  color: 'white',
                  fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 13.5,
                  position: 'relative', lineHeight: 1.4,
                  boxShadow: '0 4px 18px rgba(0,210,255,0.35)',
                }}
              >
                {ctaCfg.label}
              </motion.button>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ position: 'relative' }}
              >
                <div style={{ color: '#7DD3FC', fontSize: 13.5, fontWeight: 600, marginBottom: 10 }}>
                  ✓ Oke! Microsite SHEaga sudah dibuka di tab baru 🚀
                </div>
                <motion.a
                  href={MICROSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'block', width: '100%', padding: '12px 16px',
                    borderRadius: 12, border: '1.5px solid rgba(0,210,255,0.4)',
                    background: 'rgba(0,210,255,0.12)',
                    color: '#00D2FF', fontFamily: 'Sora, sans-serif',
                    fontWeight: 600, fontSize: 12.5, textDecoration: 'none',
                    textAlign: 'center', cursor: 'pointer',
                  }}
                >
                  Buka lagi Microsite SHEaga →
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Score breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{
            background: 'white', borderRadius: 18, padding: '14px 16px',
            marginBottom: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 12, color: '#6B7280', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Skor Risiko
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 36,
              color: color, lineHeight: 1,
            }}>
              {risk.score}
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: '#6B7280', lineHeight: 1.5 }}>dari 8 poin total</div>
              <div style={{ display: 'inline-block', marginTop: 3, padding: '3px 10px', borderRadius: 999, background: color + '18', color: color, fontSize: 11, fontWeight: 700 }}>
                {level}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {/* Mini score bar */}
              <div style={{ height: 6, borderRadius: 999, background: '#F0F0F0', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(risk.score / 8) * 100}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                  style={{ height: '100%', borderRadius: 999, background: color }}
                />
              </div>
            </div>
          </div>
        </motion.div>

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
          🔒 Semua jawaban dihitung di perangkatmu & tidak tersimpan ke server mana pun.
        </p>
      </div>
    </div>
  );
}

function GaugeMeter({ needleAngle, color, level }: { needleAngle: number; color: string; level: string }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 350);
    return () => clearTimeout(t);
  }, []);

  const finalNeedle = animated ? needleAngle : -90;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg
        width="240" height="138"
        viewBox="0 0 240 138"
        style={{ overflow: 'visible' }}
      >
        {/* Zone arcs - background */}
        <path d="M22,122 A100,100 0 0,1 218,122" fill="none" stroke="#F0F0F0" strokeWidth="20" strokeLinecap="round" />
        {/* Green zone */}
        <path d="M22,122 A100,100 0 0,1 83,34" fill="none" stroke="#DCFCE7" strokeWidth="20" strokeLinecap="butt" />
        {/* Yellow zone */}
        <path d="M83,34 A100,100 0 0,1 157,34" fill="none" stroke="#FEF3C7" strokeWidth="20" strokeLinecap="butt" />
        {/* Red zone */}
        <path d="M157,34 A100,100 0 0,1 218,122" fill="none" stroke="#FEE2E2" strokeWidth="20" strokeLinecap="butt" />

        {/* Active colored arc */}
        <path
          d="M22,122 A100,100 0 0,1 218,122"
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${((needleAngle + 90) / 180) * 314} 314`}
          style={{
            opacity: animated ? 1 : 0,
            transition: 'stroke-dasharray 1.1s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s',
          }}
        />

        {/* Needle */}
        <line
          x1="120" y1="122"
          x2="120" y2="36"
          stroke="#1A1A2E"
          strokeWidth="4.5"
          strokeLinecap="round"
          style={{
            transformOrigin: '120px 122px',
            transform: `rotate(${finalNeedle}deg)`,
            transition: 'transform 1.1s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        />
        {/* Needle hub */}
        <circle cx="120" cy="122" r="10" fill="#1A1A2E" />
        <circle cx="120" cy="122" r="5" fill="white" />

        {/* Zone labels */}
        <text x="24" y="148" fill="#10B981" fontSize="9.5" fontWeight="700" fontFamily="Sora, sans-serif">SIAGA</text>
        <text x="120" y="16" fill="#F59E0B" fontSize="9.5" fontWeight="700" fontFamily="Sora, sans-serif" textAnchor="middle">WASPADA</text>
        <text x="216" y="148" fill="#EF4444" fontSize="9.5" fontWeight="700" fontFamily="Sora, sans-serif" textAnchor="end">GENTING</text>
      </svg>

      {/* Risk level pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '7px 20px', borderRadius: 999,
          background: color, color: 'white',
          fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 13,
          marginTop: -4, boxShadow: `0 4px 14px ${color}55`,
        }}
      >
        <span>Level Risiko: {level}</span>
      </motion.div>
    </div>
  );
}
