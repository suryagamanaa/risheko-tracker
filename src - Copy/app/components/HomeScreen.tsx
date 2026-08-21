import { motion } from 'motion/react';
import { ChevronRight, Zap, Lock, Sparkles } from 'lucide-react';
import type { Segment } from '../App';

// ── KOMPONEN LOGO SHE-UP! (Borderless & Lebar Fleksibel) ──
function SheUpLogo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '3px',
        background: 'transparent',
        position: 'relative',
        padding: '4px 0',
        userSelect: 'none',
      }}
    >
      {/* Teks "SHE" dengan warna Cyan Astra */}
      <span style={{
        fontFamily: 'Sora, sans-serif',
        fontWeight: 900,
        fontSize: 24,
        color: '#00D2FF',
        lineHeight: 1,
        letterSpacing: '-0.5px'
      }}>
        SHE
      </span>
      {/* Teks "-" dengan warna Kuning */}
      <span style={{
        fontFamily: 'Sora, sans-serif',
        fontWeight: 900,
        fontSize: 24,
        color: '#F9C400',
        lineHeight: 1,
      }}>
        -
      </span>
      {/* Teks "UP" dengan warna Kuning */}
      <span style={{
        fontFamily: 'Sora, sans-serif',
        fontWeight: 900,
        fontSize: 24,
        color: '#F9C400',
        lineHeight: 1,
        marginRight: '2px'
      }}>
        UP
      </span>
      
      {/* Ikon Panah "!" Dinamis (SVG Kustom) */}
      <motion.div
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: 24,
          marginLeft: 1,
        }}
      >
        <svg
          width="12"
          height="22"
          viewBox="0 0 12 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Batang Panah Menunjuk ke Atas */}
          <path
            d="M2 11L6 2M6 2L10 11M6 2V15"
            stroke="#F9C400"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Titik Tanda Seru di Bawah */}
          <circle cx="6" cy="19" r="1.5" fill="#F9C400" />
        </svg>
      </motion.div>
    </div>
  );
}

interface Props {
  onSelectSegment: (seg: Segment) => void;
}

export function HomeScreen({ onSelectSegment }: Props) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F4F8FC' }}>
      {/* ── Astra-style blue gradient header ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0A3A82 0%, #0050A0 50%, #002B5C 100%)',
          paddingTop: 56,
          paddingBottom: 36,
          paddingLeft: 20,
          paddingRight: 20,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', right: -30, top: -30, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', right: 40, top: 10, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ position: 'absolute', left: -20, bottom: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

        {/* Brand row (Judul Satu Baris) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18, position: 'relative' }}>
          <SheUpLogo />
          
          {/* Pembatas Garis Tipis Elegan */}
          <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.2)' }} />

          {/* Judul Utama Satu Baris */}
          <div style={{ flex: 1 }}>
            <div style={{ 
              fontFamily: 'Sora, sans-serif', 
              fontWeight: 800, 
              fontSize: 19, 
              color: 'white', 
              whiteSpace: 'nowrap' 
            }}>
              ri<span style={{ color: '#00D2FF' }}>SHE</span>ko <span style={{ color: '#F9C400' }}>Tracker</span>
            </div>
          </div>
          
          {/* Decorative bar stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {[32, 20, 26].map((w, i) => (
              <div key={i} style={{ width: w, height: 3, borderRadius: 999, background: 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>
        </div>

        {/* Tagline 4 kata kebanggaan */}
        <p style={{ 
          fontFamily: 'Sora, sans-serif',
          color: 'rgba(255,255,255,0.9)', 
          fontSize: 14.5, 
          fontWeight: 600,
          lineHeight: 1.5, 
          marginBottom: 20, 
          position: 'relative',
          letterSpacing: '0.3px'
        }}>
          Sinergi Hidup Ekonomi <span style={{ color: '#F9C400', fontWeight: 800 }}>Perempuan</span>
        </p>

        {/* Feature pills row */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', position: 'relative' }}>
          {[
            { icon: <Zap size={14} color="#00D2FF" />, label: 'Cuma 2 menit' },
            { icon: <Lock size={14} color="#00D2FF" />, label: '100% Privat' },
            { icon: <Sparkles size={14} color="#F9C400" />, label: 'Hasil Instan' },
          ].map(feat => (
            <div
              key={feat.label}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 13px', borderRadius: 999,
                background: 'rgba(255,255,255,0.14)',
                color: 'white', fontSize: 11.5, fontWeight: 600,
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              {feat.icon}
              {feat.label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Content body ── */}
      <div style={{ padding: '20px 16px 60px' }}>

        {/* Section header */}
        <div style={{ marginBottom: 14 }}>
          <h2 style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 19, color: '#0A3A82', margin: '0 0 4px 0' }}>
            Kamu masuk kategori ini?
          </h2>
          <p style={{ color: '#64748B', fontSize: 13, margin: 0 }}>
            Pilih yang paling menggambarkan kondisimu sekarang.
          </p>
        </div>

        {/* Segment cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 22 }}>
          <SegmentCard
            emoji="🏠"
            title="Mompreneur"
            desc="Ibu rumah tangga pelaku UMKM atau usaha rumahan"
            tags={['UMKM', 'Usaha Rumahan', 'Ibu Produktif']}
            accentColor="#0050A0"
            bgAccent="#E6F2FC"
            onClick={() => onSelectSegment('A')}
          />
          <SegmentCard
            emoji="🎓"
            title="Woman Youth"
            desc="Mahasiswi, side-hustler, atau first jobber usia 18–25 tahun"
            tags={['Mahasiswi', 'First Jobber', 'Side Hustle']}
            accentColor="#00A3E0"
            bgAccent="#E1F5FE"
            onClick={() => onSelectSegment('B')}
          />
        </div>

        {/* Stat pills */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {[
            { value: '2 mnt', label: 'Rata-rata waktu', color: '#0050A0', bg: '#E6F2FC' },
            { value: '5 Q', label: 'Pertanyaan', color: '#00A3E0', bg: '#E1F5FE' },
            { value: '3 tips', label: 'Rekomendasi', color: '#0A3A82', bg: '#EBF1FA' },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                flex: 1, textAlign: 'center', background: stat.bg,
                borderRadius: 14, padding: '12px 8px',
                border: '1px solid rgba(0,0,0,0.02)',
              }}
            >
              <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 800, fontSize: 17, color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 10, color: '#64748B', marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* How it works card */}
        <div style={{
          background: 'white', borderRadius: 20, padding: '18px 18px',
          boxShadow: '0 4px 20px rgba(10, 58, 130, 0.05)', marginBottom: 16,
          border: '1px solid #E2E8F0',
        }}>
          <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 13.5, color: '#0A3A82', marginBottom: 14 }}>
            Cara kerjanya
          </div>
          {[
            { num: '1', title: 'Pilih kategorimu', desc: 'Mompreneur atau Woman Youth', color: '#0050A0' },
            { num: '2', title: 'Jawab 5 pertanyaan', desc: 'Seputar kondisi finansial kamu', color: '#00A3E0' },
            { num: '3', title: 'Dapatkan analisis', desc: 'Level risiko + 3 tips personal instan', color: '#0A3A82' },
          ].map((step, i) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 2 ? 13 : 0 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: step.color, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 14, flexShrink: 0,
                boxShadow: `0 3px 8px ${step.color}33`,
              }}>
                {step.num}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#1E293B' }}>{step.title}</div>
                <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 10.5, color: '#94A3B8', lineHeight: 1.6 }}>
          🔒 Semua jawaban dihitung langsung di perangkatmu.<br />Tidak ada data yang tersimpan ke server mana pun.
        </p>
      </div>
    </div>
  );
}

// --- Komponen SegmentCard ---
function SegmentCard({
  emoji, title, desc, tags, accentColor, bgAccent, onClick,
}: {
  emoji: string;
  title: string;
  desc: string;
  tags: string[];
  accentColor: string;
  bgAccent: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      style={{
        background: 'white',
        borderRadius: 20,
        padding: '16px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        cursor: 'pointer',
        border: `1.5px solid ${bgAccent}`,
        boxShadow: '0 4px 18px rgba(10, 58, 130, 0.04)',
      }}
    >
      <div style={{
        width: 56, height: 56, borderRadius: 16,
        background: bgAccent, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 30, flexShrink: 0,
      }}>
        {emoji}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700, fontSize: 15.5, color: '#0A3A82' }}>
          {title}
        </div>
        <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 3, lineHeight: 1.45 }}>
          {desc}
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10, padding: '2px 8px', borderRadius: 999,
              background: bgAccent, color: accentColor, fontWeight: 600,
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{
        width: 34, height: 34, borderRadius: '50%',
        background: bgAccent, display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0,
      }}>
        <ChevronRight size={16} color={accentColor} />
      </div>
    </motion.div>
  );
}