import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const MESSAGES = [
  'Menganalisis pola risikomu...',
  'Menghitung estimasi eksposur...',
  'Menyiapkan rekomendasi personal...',
  'Hampir selesai! ✨',
];

const BLIPS = [
  { top: '28%', left: '38%', color: '#10B981', delay: 0 },
  { top: '55%', left: '68%', color: '#F59E0B', delay: 0.4 },
  { top: '72%', left: '28%', color: '#EF4444', delay: 0.8 },
  { top: '40%', left: '62%', color: '#10B981', delay: 1.1 },
  { top: '60%', left: '44%', color: '#F59E0B', delay: 1.5 },
];

export function ScanningScreen() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setMsgIdx(prev => Math.min(prev + 1, MESSAGES.length - 1));
    }, 620);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #00400A 0%, #001B05 50%, #000E03 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background ambient glows */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,170,19,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Branding */}
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 4 }}>
          riSHEko Tracker
        </div>
      </div>

      {/* Main radar */}
      <div style={{ position: 'relative', width: 200, height: 200, marginBottom: 40 }}>
        {/* Outer glow ring */}
        <div style={{
          position: 'absolute', inset: -16, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,170,19,0.14) 0%, transparent 70%)',
          animation: 'rishekoFadeUp 2s ease-in-out infinite alternate',
        }} />

        {/* Main radar circle */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 35%, #0E3512 0%, #041005 100%)',
          border: '1.5px solid rgba(0,200,25,0.28)',
          overflow: 'hidden',
          boxShadow: '0 0 40px rgba(0,170,19,0.2)',
        }}>
          {/* Concentric rings */}
          {[0.18, 0.36, 0.54, 0.72].map((r, i) => (
            <div key={i} style={{
              position: 'absolute',
              inset: `${200 * r * 0.5}px`,
              borderRadius: '50%',
              border: '1px solid rgba(0,200,25,0.18)',
            }} />
          ))}

          {/* Crosshair */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: '#00CC18' }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: '#00CC18' }} />
          </div>

          {/* Rotating sweep arm */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0,210,25,0.52) 32deg, transparent 64deg)',
            animation: 'spin 1.4s linear infinite',
          }} />

          {/* Blips */}
          {BLIPS.map((blip, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.6, 0], scale: [0, 1.2, 1, 0.6] }}
              transition={{
                delay: blip.delay,
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 0.6,
                ease: 'easeOut',
              }}
              style={{
                position: 'absolute',
                top: blip.top, left: blip.left,
                width: 9, height: 9, borderRadius: '50%',
                background: blip.color,
                boxShadow: `0 0 10px 2px ${blip.color}`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        {/* Rotating outer ring */}
        <div style={{
          position: 'absolute', inset: -6, borderRadius: '50%',
          border: '1px dashed rgba(0,200,25,0.2)',
          animation: 'spin 8s linear infinite',
        }} />
      </div>

      {/* Status message */}
      <AnimatePresence mode="wait">
        <motion.div
          key={msgIdx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28 }}
          style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 600,
            fontSize: 15, color: 'rgba(255,255,255,0.88)',
            textAlign: 'center', marginBottom: 14,
          }}
        >
          {MESSAGES[msgIdx]}
        </motion.div>
      </AnimatePresence>

      {/* Pulsing dots */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 36 }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ delay: i * 0.22, duration: 0.9, repeat: Infinity }}
            style={{ width: 7, height: 7, borderRadius: '50%', background: '#00AA13' }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', maxWidth: 240, marginBottom: 24 }}>
        <motion.div
          style={{ height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.1)' }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            style={{ height: '100%', borderRadius: 999, background: 'linear-gradient(to right, #00AA13, #F9C400)' }}
          />
        </motion.div>
      </div>

      {/* Privacy note */}
      <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, textAlign: 'center' }}>
        🔒 Data kamu dihitung di perangkatmu sendiri
      </p>
    </div>
  );
}
