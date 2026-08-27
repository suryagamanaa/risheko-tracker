import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HomeScreen } from './components/HomeScreen';
import { QuestionFlow } from './components/QuestionFlow';
import { ScanningScreen } from './components/ScanningScreen';
import { ResultScreen } from './components/ResultScreen';
import { computeRisk, computeInsights } from './data';
import { saveSubmission } from './storage';

export type Segment = 'A' | 'B';
export type Phase = 'home' | 'questions' | 'scanning' | 'result';
export type QuestionTheme = 'A' | 'B' | 'C';
export type QuestionCategory = 'pengetahuan' | 'sikap' | 'perilaku';
export interface Profile {
  name: string;
  age: number;
}

export interface QuestionOption {
  label: string;
  weight: number; // 0 (paling aman) - 2 (paling berisiko)
}

export interface Question {
  key: string; // pattern: '<tema>_<kategori>', mis. 'A_pengetahuan'
  theme: QuestionTheme;
  category: QuestionCategory;
  themeColor: string;
  title: string;
  opts: QuestionOption[];
}

export interface NumericQuestion {
  key: string;
  title: string;
  hint: string;
  emoji: string;
  min: number;
  max: number;
  step: number;
  def: number;
}

export interface RiskResult {
  totalScore: number;
  level: 'SIAGA' | 'WASPADA' | 'GENTING';
  color: string;
  needleAngle: number;
  exposure: number;
  categoryScores: { pengetahuan: number; sikap: number; perilaku: number };
  themeScores: { A: number; B: number; C: number };
  affordDarurat: number;   // 0-2: tier kemampuan nyisihin dana darurat/hari
  affordProteksi: number;  // 0-3: tier kemampuan bayar proteksi/bulan
}

export interface InsightItem {
  title: string;
  desc: string;
}

export interface Recommendation {
  title: string;
  desc: string;
  ctaLabel: string;
  ctaUrl: string;
  icon: string;
}

export interface Insights {
  strengths: InsightItem[];
  improvements: InsightItem[];
  recommendations: Recommendation[];
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('home');
  const [segment, setSegment] = useState<Segment | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [profile, setProfile] = useState<Profile>({ name: '', age: 0 });

  const handleSelectSegment = (seg: Segment) => {
    setSegment(seg);
    setAnswers({});
    // Kalau nama sudah pernah diisi sebelumnya (mis. setelah "Ulangi cek"),
    // lewati langkah profil dan langsung ke pertanyaan pertama.
    setQIndex(profile.name.trim() ? 1 : 0);
    setPhase('questions');
  };

  const handleProfileSubmit = (name: string, age: number) => {
    setProfile({ name: name.trim(), age });
    setQIndex(prev => prev + 1);
  };

  const handleAnswer = (key: string, weight: number) => {
    setAnswers(prev => ({ ...prev, [key]: weight }));
    setQIndex(prev => prev + 1);
  };

  const handleSliderSubmit = (value: number) => {
    if (!segment) return;
    const nKey = segment === 'A' ? 'omzet' : 'income';
    const finalAnswers = { ...answers, [nKey]: value };
    setAnswers(finalAnswers);
    setPhase('scanning');
    setTimeout(() => {
      const risk = computeRisk(segment, finalAnswers);
      saveSubmission({
        name: profile.name || 'Anonim',
        age: profile.age || 0,
        segment,
        answers: finalAnswers,
        score: risk.totalScore,
        level: risk.level,
        exposure: risk.exposure,
      });
      setPhase('result');
    }, 2000);
  };

  const handleBack = () => {
    if (qIndex > 0) {
      setQIndex(prev => prev - 1);
    } else {
      setPhase('home');
      setSegment(null);
    }
  };

  const handleReset = () => {
    setPhase('home');
    setSegment(null);
    setQIndex(0);
    setAnswers({});
  };

  const risk = segment ? computeRisk(segment, answers) : null;

  return (
    <div style={{ minHeight: '100vh', background: '#F4F5F7', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 430, margin: '0 auto', minHeight: '100vh' }}>
        <AnimatePresence mode="wait">
          {phase === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
            >
              <HomeScreen onSelectSegment={handleSelectSegment} />
            </motion.div>
          )}

          {phase === 'questions' && segment && (
            <motion.div
              key={`q-${qIndex}`}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -32 }}
              transition={{ duration: 0.22 }}
            >
              <QuestionFlow
                segment={segment}
                qIndex={qIndex}
                profile={profile}
                onAnswer={handleAnswer}
                onSliderSubmit={handleSliderSubmit}
                onProfileSubmit={handleProfileSubmit}
                onBack={handleBack}
              />
            </motion.div>
          )}

          {phase === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ScanningScreen />
            </motion.div>
          )}

          {phase === 'result' && segment && risk && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38 }}
            >
              <ResultScreen
                segment={segment}
                profile={profile}
                risk={risk}
                insights={computeInsights(segment, risk)}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}