import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';
import { QUESTIONS, NUMERIC_QUESTIONS } from '../data';
import type { Segment, Question, NumericQuestion } from '../App';

interface Props {
  segment: Segment;
  qIndex: number;
  onAnswer: (key: string, weight: number) => void;
  onSliderSubmit: (value: number) => void;
  onBack: () => void;
}

export function QuestionFlow({ segment, qIndex, onAnswer, onSliderSubmit, onBack }: Props) {
  const questions = QUESTIONS[segment];
  const numericQ = NUMERIC_QUESTIONS[segment];
  const totalQs = questions.length + 1;
  const isSlider = qIndex >= questions.length;
  const currentQ = !isSlider ? questions[qIndex] : null;

  const progressPct = Math.round((qIndex / totalQs) * 100);

  return (
    <div style={{ minHeight: '100vh', background: '#F4F5F7' }}>
      {/* Top nav bar */}
      <div style={{
        background: 'white',
        paddingTop: 50,
        paddingBottom: 14,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 1px 10px rgba(0,0,0,0.06)',
      }}>
        <motion.button
          onClick={onBack}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: '#F4F5F7', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <ChevronLeft size={20} color="#1A1A2E" />
        </motion.button>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: '#6B7280', fontWeight: 600, marginBottom: 7 }}>
            Pertanyaan {qIndex + 1} dari {totalQs}
          </div>
          {/* Pill progress bar */}
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {Array.from({ length: totalQs }).map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: i <= qIndex ? 20 : 8, backgroundColor: i <= qIndex ? '#00AA13' : '#E0E0E0' }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{ height: 5, borderRadius: 999 }}
              />
            ))}
          </div>
        </div>

        {/* Percent badge */}
        <div style={{
          background: '#E6F9E8', color: '#00880A',
          fontSize: 11, fontWeight: 700,
          padding: '5px 11px', borderRadius: 999,
          fontFamily: 'Sora, sans-serif',
        }}>
          {progressPct}%
        </div>
      </div>

      {/* Animated content */}
      <div style={{ padding: '20px 16px 48px' }}>
        <AnimatePresence mode="wait">
          {currentQ && (
            <motion.div
              key={`q-${qIndex}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            >
              <QuestionCard q={currentQ} onPick={(weight) => onAnswer(currentQ.key, weight)} />
            </motion.div>
          )}

          {isSlider && (
            <motion.div
              key="slider"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            >
              <SliderCard nq={numericQ} onSubmit={onSliderSubmit} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function QuestionCard({ q, onPick }: { q: Question; onPick: (weight: number) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showFact, setShowFact] = useState(false);

  const handlePick = (i: number, weight: number) => {
    if (selected !== null) return;
    setSelected(i);
    setShowFact(true);
    setTimeout(() => onPick(weight), 530);
  };

  return (
    <div>
      {/* Question header card */}
      <div style={{
        borderRadius: 24,
        padding: '22px 20px 20px',
        marginBottom: 16,
        background: q.themeColor,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 8px 28px ${q.themeColor}45`,
      }}>
        {/* Large background emoji */}
        <div style={{
          position: 'absolute', right: 14, top: 10,
          fontSize: 80, opacity: 0.16, lineHeight: 1, userSelect: 'none',
          transform: 'rotate(8deg)',
        }}>
          {q.emoji}
        </div>
        {/* Decorative circle */}
        <div style={{
          position: 'absolute', left: -30, bottom: -30,
          width: 120, height: 120, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />

        <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: 9.5, fontWeight: 700, letterSpacing: '2.2px', textTransform: 'uppercase', marginBottom: 10, position: 'relative' }}>
          Pertanyaan
        </div>
        <h2 style={{
          fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 20,
          color: 'white', lineHeight: 1.32, margin: '0 0 10px 0', position: 'relative',
        }}>
          {q.title}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 12.5, lineHeight: 1.58, margin: 0, position: 'relative' }}>
          {q.hint}
        </p>
      </div>

      {/* Option cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 14 }}>
        {q.opts.map((opt, i) => {
          const isSelected = selected === i;
          const isDimmed = selected !== null && selected !== i;

          return (
            <motion.div
              key={i}
              onClick={() => handlePick(i, opt.weight)}
              whileTap={selected === null ? { scale: 0.97 } : {}}
              style={{
                background: isSelected ? `${q.themeColor}09` : 'white',
                borderRadius: 18,
                padding: '16px 16px',
                display: 'flex', alignItems: 'center', gap: 14,
                cursor: selected === null ? 'pointer' : 'default',
                border: isSelected ? `2.5px solid ${q.themeColor}` : '2px solid transparent',
                opacity: isDimmed ? 0.42 : 1,
                transition: 'opacity 0.25s, border-color 0.2s, background 0.2s',
                boxShadow: isSelected
                  ? `0 0 0 5px ${q.themeColor}18, 0 4px 16px rgba(0,0,0,0.06)`
                  : '0 2px 12px rgba(0,0,0,0.06)',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Emoji icon */}
              <div style={{
                width: 54, height: 54, borderRadius: 15,
                background: `${q.themeColor}14`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, flexShrink: 0,
              }}>
                {opt.emoji}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: 'Sora, sans-serif', fontWeight: 600,
                  fontSize: 14.5, color: '#1A1A2E', lineHeight: 1.35,
                }}>
                  {opt.label}
                </div>
                <div style={{ fontSize: 11.5, color: '#6B7280', marginTop: 4, lineHeight: 1.45 }}>
                  {opt.desc}
                </div>
              </div>

              {/* Selection checkmark */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: q.themeColor,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, boxShadow: `0 2px 10px ${q.themeColor}55`,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Fun fact reveal */}
      <AnimatePresence>
        {showFact && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3 }}
            style={{
              borderRadius: 16, padding: '12px 15px',
              background: `${q.themeColor}0F`,
              border: `1.5px solid ${q.themeColor}2A`,
              display: 'flex', gap: 10, alignItems: 'flex-start',
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1.4, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12.5, color: q.themeColor, lineHeight: 1.58, margin: 0, fontWeight: 500 }}>
              {q.funFact}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SliderCard({ nq, onSubmit }: { nq: NumericQuestion; onSubmit: (value: number) => void }) {
  const [value, setValue] = useState(nq.def);

  const pct = (value - nq.min) / (nq.max - nq.min);
  const tierColor = pct < 0.35 ? '#10B981' : pct < 0.65 ? '#F59E0B' : '#EF4444';
  const tierLabel = pct < 0.35 ? 'Rendah' : pct < 0.65 ? 'Menengah' : 'Tinggi';
  const tierBg = pct < 0.35 ? '#DCFCE7' : pct < 0.65 ? '#FEF3C7' : '#FEE2E2';

  const formatVal = (v: number) => {
    if (v >= 1000000) {
      const jt = v / 1000000;
      return `Rp${Number.isInteger(jt) ? jt : jt.toFixed(1)} jt`;
    }
    return `Rp${(v / 1000).toFixed(0)} rb`;
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        borderRadius: 24, padding: '22px 20px 20px', marginBottom: 16,
        background: 'linear-gradient(135deg, #005F0B 0%, #00880A 100%)',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 28px rgba(0,136,10,0.38)',
      }}>
        <div style={{ position: 'absolute', right: 14, top: 10, fontSize: 80, opacity: 0.16, lineHeight: 1, userSelect: 'none', transform: 'rotate(8deg)' }}>
          {nq.emoji}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.68)', fontSize: 9.5, fontWeight: 700, letterSpacing: '2.2px', textTransform: 'uppercase', marginBottom: 10 }}>
          Pertanyaan Terakhir ✨
        </div>
        <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 20, color: 'white', lineHeight: 1.32, margin: '0 0 10px 0' }}>
          {nq.title}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 12.5, lineHeight: 1.58, margin: 0 }}>
          {nq.hint}
        </p>
      </div>

      {/* Slider card */}
      <div style={{ background: 'white', borderRadius: 22, padding: '22px 20px', boxShadow: '0 2px 14px rgba(0,0,0,0.07)' }}>
        {/* Value display */}
        <div style={{ textAlign: 'center', marginBottom: 26 }}>
          <div style={{ fontSize: 11.5, color: '#6B7280', marginBottom: 6 }}>Estimasi kamu</div>
          <motion.div
            key={Math.round(value / 500000)}
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 36, color: tierColor, lineHeight: 1 }}
          >
            {formatVal(value)}
          </motion.div>
          <div style={{
            display: 'inline-block', marginTop: 8,
            padding: '4px 16px', borderRadius: 999,
            background: tierBg, color: tierColor,
            fontSize: 12, fontWeight: 700,
          }}>
            Kategori: {tierLabel}
          </div>
        </div>

        {/* Custom slider track */}
        <div style={{ position: 'relative', height: 36, marginBottom: 10 }}>
          {/* Gradient track */}
          <div style={{
            position: 'absolute', top: '50%', left: 0, right: 0,
            height: 10, borderRadius: 999, transform: 'translateY(-50%)',
            background: 'linear-gradient(to right, #10B981 0%, #F59E0B 50%, #EF4444 100%)',
          }} />
          {/* Custom thumb */}
          <div style={{
            position: 'absolute', top: '50%',
            left: `${pct * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: 28, height: 28, borderRadius: '50%',
            background: 'white',
            border: `3.5px solid ${tierColor}`,
            boxShadow: `0 3px 12px ${tierColor}50, 0 1px 4px rgba(0,0,0,0.15)`,
            transition: 'left 0.05s, border-color 0.3s, box-shadow 0.3s',
            pointerEvents: 'none',
            zIndex: 2,
          }} />
          {/* Invisible input */}
          <input
            type="range"
            min={nq.min} max={nq.max} step={nq.step} value={value}
            onChange={e => setValue(Number(e.target.value))}
            style={{
              position: 'absolute', inset: 0,
              opacity: 0, cursor: 'pointer',
              width: '100%', height: '100%',
              margin: 0, padding: 0,
            }}
          />
        </div>

        {/* Min / max labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: '#9CA3AF', marginBottom: 16 }}>
          <span>{formatVal(nq.min)}</span>
          <span>{formatVal(nq.max)}+</span>
        </div>

        {/* Tier legend */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
          {[
            { label: 'Rendah', color: '#10B981', bg: '#DCFCE7' },
            { label: 'Menengah', color: '#F59E0B', bg: '#FEF3C7' },
            { label: 'Tinggi', color: '#EF4444', bg: '#FEE2E2' },
          ].map(t => (
            <div key={t.label} style={{
              flex: 1, textAlign: 'center', padding: '5px 4px',
              borderRadius: 10, background: t.bg,
              fontSize: 10, fontWeight: 600, color: t.color,
            }}>
              {t.label}
            </div>
          ))}
        </div>

        {/* Submit button */}
        <motion.button
          onClick={() => onSubmit(value)}
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%', padding: '16px',
            borderRadius: 15, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg, #005F0B 0%, #00AA13 100%)',
            color: 'white', fontFamily: 'Sora, sans-serif',
            fontWeight: 700, fontSize: 15.5,
            boxShadow: '0 5px 18px rgba(0,136,10,0.38)',
          }}
        >
          Lihat Hasil Cek Risikomu 🔍
        </motion.button>
      </div>
    </div>
  );
}
