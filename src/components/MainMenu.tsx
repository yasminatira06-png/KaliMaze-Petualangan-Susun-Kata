import React from 'react';
import { motion } from 'motion/react';
import { MascotOwl } from './MascotOwl';
import { Play, BookOpen, Info, Sliders, Volume2, VolumeX, Star, Trophy, Music } from 'lucide-react';
import { playSound } from '../utils/audio';
import { GameButton } from './GameButton';

interface MainMenuProps {
  onPlay: () => void;
  onGuide: () => void;
  onAbout: () => void;
  onSettings: () => void;
  soundEnabled: boolean;
  musicEnabled: boolean;
  soundVolume: number;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  totalScore: number;
  totalStars: number;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onPlay,
  onGuide,
  onAbout,
  onSettings,
  soundEnabled,
  musicEnabled,
  soundVolume,
  onToggleSound,
  onToggleMusic,
  totalScore,
  totalStars
}) => {
  const handleClick = (fn: () => void) => {
    playSound.tap(soundEnabled, soundVolume);
    fn();
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 p-4 sm:p-6 select-none">
      {/* Cartoon clouds floating */}
      <motion.div
        animate={{ x: [-30, 30, -30] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-12 left-10 w-32 h-14 bg-white/80 rounded-full blur-[1px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [25, -25, 25] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 right-12 w-40 h-16 bg-white/75 rounded-full blur-[1px] pointer-events-none"
      />

      {/* Top Bar with Stats and Audio Quick Toggles */}
      <header className="relative z-20 flex items-center justify-between max-w-4xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-heading text-2xl sm:text-3xl font-black text-amber-950 tracking-tight drop-shadow-sm">
            Kali<span className="text-sky-600">Maze</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Total Stars */}
          <div className="flex items-center gap-1.5 bg-amber-400 border-[2.5px] border-amber-900 px-3 py-1 rounded-full shadow-[0_3px_0_#78350f]">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950 fill-amber-950" />
            <span className="font-heading font-black text-sm sm:text-base text-amber-950">
              {totalStars}
            </span>
          </div>

          {/* Total Score */}
          <div className="flex items-center gap-1.5 bg-white border-[2.5px] border-amber-900 px-3 py-1 rounded-full shadow-[0_3px_0_#78350f]">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 fill-amber-500" />
            <span className="font-heading font-black text-sm sm:text-base text-amber-950">
              {totalScore}
            </span>
          </div>

          {/* Music Quick Toggle */}
          <button
            onClick={() => {
              playSound.tap(soundEnabled, soundVolume);
              onToggleMusic();
            }}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-[2.5px] border-amber-900 flex items-center justify-center shadow-[0_3px_0_#78350f] active:translate-y-0.5 transition-all cursor-pointer ${
              musicEnabled ? 'bg-sky-200 text-sky-900' : 'bg-slate-200 text-slate-500'
            }`}
            title={musicEnabled ? 'Matikan Musik' : 'Nyalakan Musik'}
          >
            <Music className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* SFX Quick Toggle */}
          <button
            onClick={() => {
              playSound.tap(!soundEnabled, soundVolume);
              onToggleSound();
            }}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-100 hover:bg-amber-200 border-[2.5px] border-amber-900 flex items-center justify-center shadow-[0_3px_0_#78350f] active:translate-y-0.5 transition-all cursor-pointer"
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

      {/* Main Center Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center my-6 max-w-2xl w-full mx-auto">
        <div className="text-center mb-4 sm:mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 12 }}
          >
            <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-black text-white drop-shadow-[0_8px_0_#78350f] tracking-tight">
              <span className="text-amber-400 drop-shadow-[0_7px_0_#78350f]">Kali</span>
              <span className="text-sky-400 drop-shadow-[0_7px_0_#0369a1]">Maze</span>
            </h1>
          </motion.div>
          {/* Exact Tagline from Prompt: "Susun Kata, Jadi Kalimat!" */}
          <p className="font-heading text-base sm:text-xl font-bold text-amber-950 mt-2 bg-white/75 backdrop-blur-xs px-5 py-1.5 rounded-full inline-block border-[2px] border-amber-900/30 shadow-xs">
            ✨ “Susun Kata, Jadi Kalimat!”
          </p>
        </div>

        {/* Mascot Owl */}
        <div className="mb-6 sm:mb-8">
          <MascotOwl
            mood="idle"
            size="lg"
            speechText="Halo Sahabat Hebat! Siap menyusun kalimat hari ini?"
          />
        </div>

        {/* Menu Buttons */}
        <div className="flex flex-col gap-3.5 w-full max-w-sm sm:max-w-md px-2">
          {/* Mulai Bermain */}
          <GameButton
            variant="orange"
            size="xl"
            onClick={() => handleClick(onPlay)}
            icon={<Play className="w-6 h-6 fill-white" />}
            className="w-full"
          >
            Mulai Bermain
          </GameButton>

          {/* Cara Bermain */}
          <GameButton
            variant="green"
            size="lg"
            onClick={() => handleClick(onGuide)}
            icon={<BookOpen className="w-6 h-6" />}
            className="w-full"
          >
            Cara Bermain
          </GameButton>

          <div className="grid grid-cols-2 gap-3">
            {/* Pengaturan */}
            <GameButton
              variant="purple"
              size="md"
              onClick={() => handleClick(onSettings)}
              icon={<Sliders className="w-5 h-5" />}
            >
              Pengaturan
            </GameButton>

            {/* Tentang Game */}
            <GameButton
              variant="blue"
              size="md"
              onClick={() => handleClick(onAbout)}
              icon={<Info className="w-5 h-5" />}
            >
              Tentang Game
            </GameButton>
          </div>
        </div>
      </main>

      {/* Cheerful Garden Bottom Bar */}
      <footer className="relative z-10 max-w-4xl w-full mx-auto text-center text-xs sm:text-sm font-bold text-emerald-950 bg-emerald-400/80 backdrop-blur-xs py-2 px-4 rounded-xl border border-emerald-600/40">
        KaliMaze – Petualangan Susun Kata Edukatif SD Usia 7–12 Tahun
      </footer>
    </div>
  );
};
