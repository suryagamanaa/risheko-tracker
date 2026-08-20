import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HomeScreen } from './components/HomeScreen';
import { QuestionFlow } from './components/QuestionFlow';
import { ScanningScreen } from './components/ScanningScreen';
import { ResultScreen } from './components/ResultScreen';
import { computeRisk, computeTips } from './data';

export type Segment = 'A' | 'B';
export type Phase = 'home' | 'questions' | 'scanning' | 'result';

export interface QuestionOption {
  label: string;
  desc: string;
  weight: number;
  emoji: string;
}

export interface Question {
  key: string;
  title: string;
  hint: string;
  funFact: string;
  themeColor: string;
  emoji: string;
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

export interface Tip {
  title: string;
  desc: string;
  icon: string;
  color: string;
}

export interface RiskResult {
  score: number;
  level: 'SIAGA' | 'WASPADA' | 'GENTING';
  color: string;
  needleAngle: number;
  exposure: number;
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('home');
  const [segment, setSegment] = useState<Segment | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleSelectSegment = (seg: Segment) => {
    setSegment(seg);
    setAnswers({});
    setQIndex(0);
    setPhase('questions');
  };

  const handleAnswer = (key: string, weight: number) => {
    setAnswers(prev => ({ ...prev, [key]: weight }));
    setQIndex(prev => prev + 1);
  };

  const handleSliderSubmit = (value: number) => {
    const nKey = segment === 'A' ? 'omzet' : 'income';
    setAnswers(prev => ({ ...prev, [nKey]: value }));
    setPhase('scanning');
    setTimeout(() => setPhase('result'), 2500);
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
                onAnswer={handleAnswer}
                onSliderSubmit={handleSliderSubmit}
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

          {phase === 'result' && segment && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38 }}
            >
              <ResultScreen
                segment={segment}
                risk={computeRisk(segment, answers)}
                tips={computeTips(segment, answers)}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
