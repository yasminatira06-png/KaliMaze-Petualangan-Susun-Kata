import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MascotOwl } from './MascotOwl';
import { Home, Lock, Star, Volume2, VolumeX, Sparkles, Music } from 'lucide-react';
import { playSound } from '../utils/audio';
import { LEVELS_DATA } from '../data/levelsData';
import { GameButton } from './GameButton';

interface LevelSelectScreenProps {
  unlockedLevels: number[];
  completedLevels: number[];
  levelStars: Record<number, number>;
  onSelectLevel: (levelId: number) => void;
  onHome: () => void;
  soundEnabled: boolean;
  musicEnabled: boolean;
  soundVolume: number;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  totalScore: number;
  lastPlayedLevel?: number;
}

export const LevelSelectScreen: React.FC<LevelSelectScreenProps> = ({
  unlockedLevels,
  completedLevels,
  levelStars,
  onSelectLevel,
  onHome,
  soundEnabled,
  musicEnabled,
  soundVolume,
  onToggleSound,
  onToggleMusic,
  totalScore,
  lastPlayedLevel = 1
}) => {
  const [selectedLevelId, setSelectedLevelId] = useState<number>(() => {
    if (unlockedLevels.includes(lastPlayedLevel)) return lastPlayedLevel;
    return Math.max(...unlockedLevels, 1);
  });

  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  const handleLevelClick = (lvlId: number) => {
    const isUnlocked = unlockedLevels.includes(lvlId);
    if (!isUnlocked) {
      playSound.wrong(soundEnabled, soundVolume);
      setLockedNotice(`Level ${lvlId} masih terkunci! Selesaikan Level ${lvlId - 1} terlebih dahulu.`);
      setTimeout(() => setLockedNotice(null), 2500);
      return;
    }

    playSound.tap(soundEnabled, soundVolume);
    setSelectedLevelId(lvlId);
    onSelectLevel(lvlId);
  };

  const selectedData = LEVELS_DATA.find((l) => l.id === selectedLevelId);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between select-none">
      {/* Background garden scenery */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat transition-all"
        style={{
          backgroundImage: `url('/src/assets/images/kalimaze_garden_bg_1793704479441.jpg')`,
          backgroundColor: '#7dd3fc'
        }}
      >
        <div className="absolute inset-0 bg-sky-900/15 backdrop-blur-[1px]" />
      </div>

      {/* Top Header */}
      <header className="relative z-20 w-full max-w-5xl mx-auto px-4 pt-4 sm:pt-6 flex items-center justify-between">
        {/* Circular Home Button at top-left */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            playSound.tap(soundEnabled, soundVolume);
            onHome();
          }}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 border-[3.5px] border-amber-950 flex items-center justify-center shadow-[0_5px_0_#78350f] active:translate-y-1 active:shadow-[0_2px_0_#78350f] cursor-pointer"
          title="Kembali ke Menu Utama"
        >
          <Home className="w-6 h-6 sm:w-7 sm:h-7 text-amber-950" />
        </motion.button>

        {/* Title Badge */}
        <div className="bg-amber-400 border-[3.5px] border-amber-950 px-6 sm:px-8 py-2 rounded-2xl shadow-[0_5px_0_#78350f]">
          <h1 className="font-heading text-xl sm:text-2xl md:text-3xl font-black text-amber-950 tracking-wide text-center uppercase">
            PILIH LEVEL
          </h1>
        </div>

        {/* Top-Right Quick Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playSound.tap(soundEnabled, soundVolume);
              onToggleMusic();
            }}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-[3px] border-amber-950 flex items-center justify-center shadow-[0_4px_0_#78350f] active:translate-y-1 transition-all cursor-pointer ${
              musicEnabled ? 'bg-sky-200 text-sky-900' : 'bg-slate-200 text-slate-500'
            }`}
            title={musicEnabled ? 'Matikan Musik' : 'Nyalakan Musik'}
          >
            <Music className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              playSound.tap(!soundEnabled, soundVolume);
              onToggleSound();
            }}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-amber-100 hover:bg-amber-200 border-[3px] border-amber-950 flex items-center justify-center shadow-[0_4px_0_#78350f] active:translate-y-1 transition-all cursor-pointer"
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-amber-950" />
            ) : (
              <VolumeX className="w-5 h-5 text-red-600" />
            )}
          </button>
        </div>
      </header>

      {/* Locked Notification */}
      <AnimatePresence>
        {lockedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-50 border-[3px] border-amber-900 text-amber-950 font-heading font-bold text-sm sm:text-base px-6 py-2.5 rounded-2xl shadow-xl flex items-center gap-2"
          >
            <Lock className="w-5 h-5 text-amber-700" />
            <span>{lockedNotice}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area: 4-Column Grid */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 py-4 flex-1 flex flex-col justify-center">
        <div className="bg-amber-100/90 backdrop-blur-md border-[4px] border-amber-950 rounded-3xl p-4 sm:p-6 sm:pb-8 shadow-[0_8px_0_#78350f,0_20px_25px_rgba(0,0,0,0.25)]">
          {/* Header Row */}
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="font-heading font-black text-xs sm:text-sm text-amber-900 uppercase tracking-wider">
              16 Level Berjenjang · Susun Kata
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{completedLevels.length} / 16 Selesai</span>
            </div>
          </div>

          {/* 4 COLUMNS GRID */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {LEVELS_DATA.map((lvl) => {
              const isUnlocked = unlockedLevels.includes(lvl.id);
              const isCompleted = completedLevels.includes(lvl.id);
              const isSelected = selectedLevelId === lvl.id;
              const starsCount = levelStars[lvl.id] || 0;

              return (
                <motion.div
                  key={lvl.id}
                  className="flex flex-col items-center"
                  whileHover={isUnlocked ? { scale: 1.05 } : {}}
                  whileTap={isUnlocked ? { scale: 0.95 } : {}}
                >
                  <button
                    onClick={() => handleLevelClick(lvl.id)}
                    className={`relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      isUnlocked
                        ? 'btn-game-orange text-white'
                        : 'bg-slate-300 border-[3.5px] border-slate-600 text-slate-500 shadow-[0_5px_0_#475569] cursor-not-allowed opacity-85'
                    } ${
                      isSelected && isUnlocked
                        ? 'ring-4 ring-yellow-300 ring-offset-2 ring-offset-amber-900/40 -rotate-2 scale-105 shadow-[0_8px_0_#78350f]'
                        : ''
                    }`}
                  >
                    {isUnlocked ? (
                      <>
                        <span className="font-heading font-black text-2xl sm:text-4xl md:text-5xl text-white drop-shadow-[0_2px_0_#78350f]">
                          {lvl.id}
                        </span>

                        {isCompleted && (
                          <div className="absolute -top-2 -right-2 bg-emerald-500 border-2 border-emerald-900 rounded-full w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center shadow-md">
                            <span className="text-white text-xs sm:text-sm font-black">✓</span>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 sm:w-8 sm:h-8 text-slate-600 drop-shadow-sm mb-1" />
                        <span className="font-heading font-bold text-xs sm:text-base text-slate-600">
                          {lvl.id}
                        </span>
                      </>
                    )}
                  </button>

                  {/* Stars Row */}
                  <div className="flex items-center gap-0.5 sm:gap-1 mt-1.5 sm:mt-2 h-4 sm:h-5">
                    {isUnlocked ? (
                      [1, 2, 3].map((starIdx) => {
                        const filled = starIdx <= starsCount;
                        return (
                          <Star
                            key={starIdx}
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all ${
                              filled
                                ? 'text-amber-500 fill-amber-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]'
                                : 'text-amber-800/30 fill-amber-950/10'
                            }`}
                          />
                        );
                      })
                    ) : (
                      <span className="text-[10px] font-bold text-slate-500">Terkunci</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Selected Level Summary Card & Mascot */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md border-[3.5px] border-amber-950 rounded-2xl p-3 sm:p-4 shadow-[0_5px_0_#78350f]">
          <div className="flex items-center gap-3">
            <MascotOwl
              mood={completedLevels.includes(selectedLevelId) ? 'happy' : 'waving'}
              size="sm"
              showSpeech={false}
            />
            <div>
              <p className="font-heading text-xs sm:text-sm font-bold text-amber-700">
                Level Dipilih:
              </p>
              <h2 className="font-heading text-base sm:text-xl font-black text-amber-950">
                {selectedData?.title || `Level ${selectedLevelId}`}
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-amber-800">
                Tema: {selectedData?.theme} · 5 Soal ({selectedData?.difficulty})
              </p>
            </div>
          </div>

          <GameButton
            variant="green"
            size="md"
            onClick={() => handleLevelClick(selectedLevelId)}
            className="w-full sm:w-auto"
          >
            Mulai Level {selectedLevelId} ▶
          </GameButton>
        </div>
      </main>

      {/* Decorative Bottom Bar */}
      <footer className="relative z-10 h-10 w-full bg-emerald-600/90 border-t-[3.5px] border-emerald-900 flex items-center justify-center text-xs font-bold text-emerald-100">
        KaliMaze · Game Puzzle Edukatif Bahasa Indonesia
      </footer>
    </div>
  );
};
