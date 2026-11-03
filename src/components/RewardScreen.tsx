import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { MascotOwl } from './MascotOwl';
import { Star, RotateCcw, ArrowRight, Trophy, Sparkles, Award, Grid, Home } from 'lucide-react';
import { playSound } from '../utils/audio';
import { LevelResult } from '../types/game';
import { GameButton } from './GameButton';
import rewardPartyBgImg from '../assets/images/kalimaze_party_reward_bg_1793704479774.jpg';

interface RewardScreenProps {
  result: LevelResult;
  onNextLevel: () => void;
  onPlayAgain: () => void;
  onLevelSelect: () => void;
  onMenu: () => void;
  soundEnabled: boolean;
  soundVolume: number;
  hasNextLevel: boolean;
}

export const RewardScreen: React.FC<RewardScreenProps> = ({
  result,
  onNextLevel,
  onPlayAgain,
  onLevelSelect,
  onMenu,
  soundEnabled,
  soundVolume,
  hasNextLevel
}) => {
  const isFinalGameChampion = result.levelId === 16;

  useEffect(() => {
    playSound.victory(soundEnabled, soundVolume);
  }, [soundEnabled, soundVolume]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center p-4 select-none">
      {/* Festive Background Image */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${rewardPartyBgImg || '/assets/images/kalimaze_party_reward_bg_1793704479774.jpg'})`,
          backgroundColor: '#3b0764'
        }}
      >
        <div className="absolute inset-0 bg-purple-950/40 backdrop-blur-[1px]" />
      </div>

      {/* Floating party sparkles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2 + (i % 3),
              repeat: Infinity,
              delay: (i * 0.2) % 2
            }}
            className="absolute text-yellow-300"
            style={{
              top: `${(i * 17) % 90}%`,
              left: `${(i * 23) % 92}%`
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* Main Victory Panel (Dark Purple with Thick Blue Outline) */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 14, stiffness: 180 }}
        className="relative z-10 w-full max-w-lg bg-gradient-to-b from-purple-950/95 via-indigo-950/95 to-purple-950/95 border-[6px] border-sky-400 rounded-3xl p-6 sm:p-8 text-center shadow-[0_12px_0_#1e1b4b,0_25px_50px_rgba(0,0,0,0.6)]"
      >
        {/* Top Header Ribbon Banner */}
        <div className="absolute -top-6 sm:-top-7 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 border-[3.5px] border-amber-950 px-8 py-2 rounded-2xl shadow-[0_5px_0_#78350f] whitespace-nowrap">
          <span className="font-heading font-black text-xl sm:text-2xl text-amber-950 tracking-wider uppercase drop-shadow-xs">
            {isFinalGameChampion ? 'Petualangan Selesai!' : 'Kamu Berhasil!'}
          </span>
        </div>

        {/* Level Indicator Title */}
        <div className="mt-4 mb-2">
          <p className="font-heading text-sm sm:text-base font-bold text-sky-300 uppercase tracking-widest">
            {isFinalGameChampion ? 'Juara Master KaliMaze' : `Level ${result.levelId} Selesai`}
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white drop-shadow-[0_4px_0_#1e1b4b] mt-1">
            {isFinalGameChampion ? 'SELAMAT JUARA!' : 'KAMU BERHASIL!'}
          </h2>
        </div>

        {/* Special Champion Badge if Level 16 */}
        {isFinalGameChampion && (
          <div className="my-3 p-3 bg-amber-400/20 border-2 border-amber-300 rounded-2xl text-amber-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Kamu telah menyelesaikan seluruh 16 level dan 80 tantangan kalimat!</span>
          </div>
        )}

        {/* Three Big Yellow-Orange Glowing Stars */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-6">
          {[1, 2, 3].map((starIdx) => {
            const isEarned = starIdx <= result.stars;
            return (
              <motion.div
                key={starIdx}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring',
                  damping: 10,
                  delay: 0.2 + starIdx * 0.18
                }}
                className={`relative flex items-center justify-center ${
                  starIdx === 2 ? 'mb-4 scale-110' : ''
                }`}
              >
                {isEarned ? (
                  <div className="animate-star-glow">
                    <Star className="w-16 h-16 sm:w-20 sm:h-20 text-yellow-300 fill-gradient fill-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.9)]" />
                  </div>
                ) : (
                  <Star className="w-16 h-16 sm:w-20 sm:h-20 text-purple-800/60 fill-purple-900/40" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Stats Summary Box */}
        <div className="bg-purple-900/80 border-[2.5px] border-sky-400/50 rounded-2xl p-3.5 sm:p-4 mb-6 shadow-inner text-left">
          <div className="grid grid-cols-3 gap-2 text-center">
            {/* Total Skor */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-purple-200">
                Total Skor
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <Trophy className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-heading font-black text-xl sm:text-2xl text-amber-300">
                  {result.score}
                </span>
              </div>
            </div>

            {/* Jawaban Benar */}
            <div className="flex flex-col items-center border-x border-purple-700/60 px-1">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-purple-200">
                Benar Awal
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="font-heading font-black text-xl sm:text-2xl text-emerald-300">
                  {result.correctFirstTryCount}/{result.totalQuestions}
                </span>
              </div>
            </div>

            {/* Total Percobaan */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-purple-200">
                Percobaan
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <RotateCcw className="w-4 h-4 text-sky-400" />
                <span className="font-heading font-black text-xl sm:text-2xl text-sky-300">
                  {result.totalAttempts}x
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-center text-sky-200 font-semibold mt-2.5 pt-2 border-t border-purple-800/60">
            Bonus Selesai Level: +100 Poin Telah Ditambahkan ke Skor!
          </p>
        </div>

        {/* Mascot & 3D Blue Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Owl Mascot on Bottom-Left */}
          <div className="flex items-center gap-3">
            <MascotOwl mood="celebrate" size="sm" showSpeech={false} />
            <div className="text-left hidden sm:block">
              <p className="font-heading text-xs font-bold text-amber-300">Owi Berkata:</p>
              <p className="font-heading text-sm font-bold text-white leading-tight">
                {isFinalGameChampion
                  ? 'Kamu telah menamatkan semua level KaliMaze!'
                  : 'Hebat sekali! Level baru siap untuk kamu jelajahi!'}
              </p>
            </div>
          </div>

          {/* Action Buttons: Next Level, Main Lagi, Menu Level */}
          <div className="flex flex-col gap-2.5 w-full sm:w-auto">
            {hasNextLevel ? (
              <GameButton
                variant="blue"
                size="md"
                onClick={onNextLevel}
                icon={<ArrowRight className="w-5 h-5" />}
                className="w-full"
              >
                Level Berikutnya
              </GameButton>
            ) : (
              <GameButton
                variant="green"
                size="md"
                onClick={onLevelSelect}
                icon={<Trophy className="w-5 h-5" />}
                className="w-full"
              >
                Peta Juara
              </GameButton>
            )}

            <div className="grid grid-cols-2 gap-2">
              <GameButton
                variant="blue"
                size="sm"
                onClick={onPlayAgain}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Main Lagi
              </GameButton>

              <GameButton
                variant="blue"
                size="sm"
                onClick={onLevelSelect}
                icon={<Grid className="w-4 h-4" />}
              >
                Menu Level
              </GameButton>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
