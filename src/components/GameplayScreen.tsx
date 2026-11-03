import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MascotOwl, OwlMood } from './MascotOwl';
import {
  Pause,
  RotateCcw,
  CheckCircle2,
  Lightbulb,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { playSound } from '../utils/audio';
import { LevelData, Question, LevelResult } from '../types/game';
import { WordCard } from './WordCard';
import { ProgressBar } from './ProgressBar';
import { GameButton } from './GameButton';
import { FeedbackModal } from './FeedbackModal';
import { PauseModal } from './PauseModal';

interface GameplayScreenProps {
  levelData: LevelData;
  onBack: () => void;
  onFinishLevel: (result: LevelResult) => void;
  onHome: () => void;
  soundEnabled: boolean;
  musicEnabled: boolean;
  soundVolume: number;
  musicVolume: number;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onChangeSoundVolume: (v: number) => void;
  onChangeMusicVolume: (v: number) => void;
  globalTotalScore: number;
}

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  levelData,
  onBack,
  onFinishLevel,
  onHome,
  soundEnabled,
  musicEnabled,
  soundVolume,
  musicVolume,
  onToggleSound,
  onToggleMusic,
  onChangeSoundVolume,
  onChangeMusicVolume,
  globalTotalScore
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const currentQuestion: Question = levelData.questions[currentQIndex];

  // Answer slots & available bank
  const [answerWords, setAnswerWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);

  // Scoring and tracking for this question
  const [attemptCount, setAttemptCount] = useState(1);
  const [usedHint, setUsedHint] = useState(false);
  const [showHintBox, setShowHintBox] = useState(false);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);

  // Overall level statistics
  const [levelSessionScore, setLevelSessionScore] = useState(0);
  const [firstTryCount, setFirstTryCount] = useState(0);
  const [totalAttemptsCount, setTotalAttemptsCount] = useState(0);

  // UI state
  const [isPaused, setIsPaused] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'CORRECT' | 'WRONG' | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [shakeCards, setShakeCards] = useState(false);
  const [mascotMood, setMascotMood] = useState<OwlMood>('idle');
  const [mascotSpeech, setMascotSpeech] = useState<string>(
    'Susun kata menjadi kalimat yang tepat!'
  );

  // Drag and drop tracking
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Initialize/reset on question change
  useEffect(() => {
    if (!currentQuestion) return;
    setAvailableWords([...currentQuestion.scrambledWords]);
    setAnswerWords([]);
    setAttemptCount(1);
    setUsedHint(false);
    setShowHintBox(false);
    setIsAnswerLocked(false);
    setFeedbackType(null);
    setShowFeedbackModal(false);
    setShakeCards(false);
    setMascotMood('idle');
    setMascotSpeech(`Soal ${currentQIndex + 1}: Susun kata menjadi kalimat yang benar!`);
  }, [currentQIndex, currentQuestion]);

  // Click card in word bank -> move to answer tray
  const handleSelectWord = (word: string, index: number) => {
    if (isAnswerLocked) return;
    playSound.cardPlace(soundEnabled, soundVolume);

    const nextAvail = [...availableWords];
    nextAvail.splice(index, 1);
    setAvailableWords(nextAvail);
    setAnswerWords((prev) => [...prev, word]);
  };

  // Click card in answer tray -> return to word bank
  const handleRemoveWord = (word: string, index: number) => {
    if (isAnswerLocked) return;
    playSound.cardRemove(soundEnabled, soundVolume);

    const nextAns = [...answerWords];
    nextAns.splice(index, 1);
    setAnswerWords(nextAns);
    setAvailableWords((prev) => [...prev, word]);
  };

  // Reordering in answer tray via micro buttons
  const handleShiftLeft = (index: number) => {
    if (index === 0 || isAnswerLocked) return;
    playSound.tap(soundEnabled, soundVolume);
    setAnswerWords((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleShiftRight = (index: number) => {
    if (index === answerWords.length - 1 || isAnswerLocked) return;
    playSound.tap(soundEnabled, soundVolume);
    setAnswerWords((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  // HTML5 Drag and drop handlers for answer words reordering
  const handleDragStart = (idx: number) => {
    setDraggedIndex(idx);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetIdx: number) => {
    if (draggedIndex === null || draggedIndex === targetIdx) return;
    playSound.cardPlace(soundEnabled, soundVolume);
    setAnswerWords((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(draggedIndex, 1);
      copy.splice(targetIdx, 0, moved);
      return copy;
    });
    setDraggedIndex(null);
  };

  // Reset current question (Tombol Ulangi Susunan)
  const handleResetCurrentQuestion = () => {
    playSound.tap(soundEnabled, soundVolume);
    const reScrambled = [...currentQuestion.scrambledWords];
    for (let i = reScrambled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [reScrambled[i], reScrambled[j]] = [reScrambled[j], reScrambled[i]];
    }
    setAvailableWords(reScrambled);
    setAnswerWords([]);
    setFeedbackType(null);
    setShowFeedbackModal(false);
    setMascotMood('idle');
    setMascotSpeech('Kata-kata dikembalikan ke kotak. Ayo coba susun kembali!');
  };

  // Hint activation
  const handleUseHint = () => {
    playSound.hint(soundEnabled, soundVolume);
    setUsedHint(true);
    setShowHintBox(true);
    setMascotMood('thinking');
    setMascotSpeech('Perhatikan petunjuk Owi di bawah kalimat ya!');
  };

  // Check Answer
  const handleCheckAnswer = () => {
    if (isAnswerLocked) return;

    if (answerWords.length === 0) {
      playSound.wrong(soundEnabled, soundVolume);
      setMascotMood('thinking');
      setMascotSpeech('Pilih kata-kata di bawah terlebih dahulu untuk menyusun kalimat!');
      return;
    }

    setTotalAttemptsCount((prev) => prev + 1);

    const assembled = answerWords.join(' ').trim().toLowerCase();
    const target = currentQuestion.targetSentence.trim().toLowerCase();

    if (assembled === target) {
      // CORRECT!
      setIsAnswerLocked(true);
      setFeedbackType('CORRECT');
      playSound.correct(soundEnabled, soundVolume);

      // Scoring rule:
      // First try without hint: 100 points
      // Retry or with hint: 50 points
      let points = 100;
      if (attemptCount > 1 || usedHint) {
        points = 50;
      }

      setLevelSessionScore((prev) => prev + points);

      if (attemptCount === 1 && !usedHint) {
        setFirstTryCount((prev) => prev + 1);
      }

      setMascotMood('happy');
      setShowFeedbackModal(true);
    } else {
      // WRONG!
      setFeedbackType('WRONG');
      playSound.wrong(soundEnabled, soundVolume);
      setAttemptCount((prev) => prev + 1);
      setShakeCards(true);
      setTimeout(() => setShakeCards(false), 500);

      setMascotMood('thinking');
      setShowFeedbackModal(true);
    }
  };

  // Continue to next question or victory screen
  const handleContinueNext = () => {
    setShowFeedbackModal(false);
    if (currentQIndex < levelData.questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Level completed! Add 100 completion bonus
      const finalScore = levelSessionScore + 100;

      // Calculate star rating:
      // Question max base score = 500 (5 * 100)
      // 90% - 100% (450+) => 3 stars
      // 60% - 89% (300 - 449) => 2 stars
      // < 60% (< 300) => 1 star
      let stars = 1;
      if (levelSessionScore >= 450) {
        stars = 3;
      } else if (levelSessionScore >= 300) {
        stars = 2;
      } else {
        stars = 1;
      }

      onFinishLevel({
        levelId: levelData.id,
        score: finalScore,
        correctFirstTryCount: firstTryCount,
        totalQuestions: levelData.questions.length,
        totalAttempts: totalAttemptsCount + 1,
        stars,
        isNewBest: true
      });
    }
  };

  const handleRetryAfterWrong = () => {
    setShowFeedbackModal(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100 p-3 sm:p-5 select-none">
      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Pause Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            playSound.tap(soundEnabled, soundVolume);
            setIsPaused(true);
          }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber-200 border-[3px] border-amber-950 flex items-center justify-center shadow-[0_4px_0_#78350f] active:translate-y-1 active:shadow-[0_1px_0_#78350f] cursor-pointer"
          title="Jeda Permainan"
        >
          <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-amber-950" />
        </motion.button>

        {/* Progress Bar Center */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <ProgressBar current={currentQIndex + 1} total={levelData.questions.length} />
        </div>

        {/* Level Session Score Pill */}
        <div className="flex items-center gap-1.5 bg-amber-400 border-[3px] border-amber-950 px-3 sm:px-4 py-1.5 rounded-2xl shadow-[0_4px_0_#78350f]">
          <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950 fill-amber-950" />
          <span className="font-heading font-black text-amber-950 text-sm sm:text-base">
            {levelSessionScore} Poin
          </span>
        </div>
      </header>

      {/* Main Game Arena */}
      <main className="relative z-10 w-full max-w-3xl mx-auto my-3 flex-1 flex flex-col justify-between">
        {/* Level & Question Header Banner */}
        <div className="bg-white/95 border-[3.5px] border-amber-950 rounded-2xl p-3 sm:p-4 shadow-[0_5px_0_#78350f]">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-xs sm:text-sm px-3 py-1 rounded-xl bg-amber-400 border-2 border-amber-950 text-amber-950">
                Level {levelData.id}
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
                Tema: {levelData.theme}
              </span>
            </div>

            {/* Hint Button */}
            <button
              onClick={handleUseHint}
              disabled={showHintBox}
              className={`flex items-center gap-1.5 text-xs font-heading font-bold px-3 py-1.5 rounded-xl border-[2px] transition-all cursor-pointer ${
                showHintBox
                  ? 'bg-amber-200 border-amber-400 text-amber-900 opacity-80'
                  : 'bg-yellow-300 hover:bg-yellow-400 border-amber-900 text-amber-950 shadow-[0_2px_0_#78350f]'
              }`}
              title="Buka petunjuk kalimat (maksimal 50 poin)"
            >
              <Lightbulb className="w-4 h-4 text-amber-800" />
              <span>{showHintBox ? 'Petunjuk Terbuka' : 'Petunjuk'}</span>
            </button>
          </div>

          <h2 className="font-heading font-black text-lg sm:text-2xl text-amber-950 mt-2">
            Susun kata berikut menjadi kalimat yang benar:
          </h2>

          {/* Hint Disclosure */}
          {showHintBox && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-2.5 p-3 rounded-xl bg-sky-50 border-2 border-sky-300 text-xs sm:text-sm font-semibold text-sky-950"
            >
              <div className="flex items-start gap-2">
                <span className="text-base">💡</span>
                <div>
                  <p><strong>Petunjuk Owi:</strong> {currentQuestion.hint}</p>
                  <p className="text-[11px] text-sky-700 mt-0.5">
                    *Karena menggunakan petunjuk, poin maksimal soal ini adalah 50 poin.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Mascot Speech / Hint Line */}
        <div className="my-2 flex items-center justify-center gap-2">
          <MascotOwl mood={mascotMood} size="sm" showSpeech={false} />
          <div className="bg-white/80 backdrop-blur-xs border-2 border-amber-900/30 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-amber-900 text-center shadow-xs">
            {mascotSpeech}
          </div>
        </div>

        {/* Answer Construction Area */}
        <div className="bg-white/95 border-[3.5px] border-amber-950 rounded-2xl p-4 sm:p-5 shadow-[0_6px_0_#78350f] min-h-[140px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-amber-900">
              Area Kalimat Jawaban:
            </span>
            <span className="text-xs font-bold text-amber-700">
              {answerWords.length} / {currentQuestion.originalWords.length} Kata Tersusun
            </span>
          </div>

          {/* Answer Tray */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-h-[70px] p-2.5 bg-amber-50/70 rounded-xl border-2 border-dashed border-amber-300">
            {answerWords.length === 0 ? (
              <div className="w-full text-center py-5 text-xs sm:text-sm font-semibold text-amber-800/60 italic">
                Sentuh kartu kata di bawah untuk menyusun kalimat di sini...
              </div>
            ) : (
              answerWords.map((word, idx) => (
                <WordCard
                  key={`${word}-${idx}`}
                  word={word}
                  index={idx}
                  isAnswerSlot
                  onClick={() => handleRemoveWord(word, idx)}
                  onShiftLeft={(e) => {
                    e.stopPropagation();
                    handleShiftLeft(idx);
                  }}
                  onShiftRight={(e) => {
                    e.stopPropagation();
                    handleShiftRight(idx);
                  }}
                  isFirst={idx === 0}
                  isLast={idx === answerWords.length - 1}
                  shake={shakeCards}
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(idx)}
                />
              ))
            )}
          </div>
          <p className="text-[11px] font-semibold text-amber-800/70 text-right mt-1.5">
            Sentuh kartu untuk mengembalikannya ke bank kata, atau gunakan panah untuk menggeser urutan.
          </p>
        </div>

        {/* Word Bank Area */}
        <div className="my-3 bg-amber-100/90 border-[3.5px] border-amber-950 rounded-2xl p-4 sm:p-5 shadow-[0_5px_0_#78350f]">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-heading font-black text-xs sm:text-sm uppercase tracking-wider text-amber-950">
              Kumpulan Kartu Kata Acak:
            </span>
            <span className="text-xs font-bold text-amber-800">
              {availableWords.length} kata tersisa
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 min-h-[64px]">
            {availableWords.map((word, idx) => (
              <WordCard
                key={`${word}-${idx}`}
                word={word}
                index={idx}
                onClick={() => handleSelectWord(word, idx)}
              />
            ))}
            {availableWords.length === 0 && (
              <span className="text-xs sm:text-sm font-bold text-emerald-800 py-2">
                Semua kata telah dimasukkan! Tekan tombol "Periksa Jawaban" untuk mengecek.
              </span>
            )}
          </div>
        </div>

        {/* Bottom Game Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          {/* Ulangi Susunan */}
          <GameButton
            variant="orange"
            size="md"
            onClick={handleResetCurrentQuestion}
            icon={<RotateCcw className="w-5 h-5" />}
          >
            Ulangi Susunan
          </GameButton>

          {/* Periksa Jawaban */}
          <GameButton
            variant="green"
            size="lg"
            onClick={handleCheckAnswer}
            disabled={isAnswerLocked || answerWords.length === 0}
            icon={<CheckCircle2 className="w-5 h-5" />}
          >
            Periksa Jawaban
          </GameButton>
        </div>
      </main>

      {/* Feedback Modal for Correct / Wrong */}
      <FeedbackModal
        isOpen={showFeedbackModal}
        type={feedbackType || 'CORRECT'}
        pointsEarned={attemptCount === 1 && !usedHint ? 100 : 50}
        onContinue={handleContinueNext}
        onRetry={handleRetryAfterWrong}
        isLastQuestion={currentQIndex === levelData.questions.length - 1}
      />

      {/* Pause Modal */}
      <PauseModal
        isOpen={isPaused}
        onResume={() => setIsPaused(false)}
        onRestartQuestion={() => {
          setIsPaused(false);
          handleResetCurrentQuestion();
        }}
        onLevelSelect={() => {
          setIsPaused(false);
          onBack();
        }}
        onMainMenu={() => {
          setIsPaused(false);
          onHome();
        }}
        musicEnabled={musicEnabled}
        soundEnabled={soundEnabled}
        musicVolume={musicVolume}
        soundVolume={soundVolume}
        onToggleMusic={onToggleMusic}
        onToggleSound={onToggleSound}
        onChangeMusicVolume={onChangeMusicVolume}
        onChangeSoundVolume={onChangeSoundVolume}
      />
    </div>
  );
};
