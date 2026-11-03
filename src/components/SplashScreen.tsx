import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { MascotOwl } from './MascotOwl';
import { Sparkles, Play } from 'lucide-react';
import { playSound } from '../utils/audio';
import { GameButton } from './GameButton';

interface SplashScreenProps {
  onStart: () => void;
  soundEnabled: boolean;
  soundVolume: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onStart,
  soundEnabled,
  soundVolume
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const autoTimeout = setTimeout(() => {
        onStart();
      }, 600);
      return () => clearTimeout(autoTimeout);
    }
  }, [progress, onStart]);

  const handleManualStart = () => {
    playSound.tap(soundEnabled, soundVolume);
    onStart();
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200 select-none">
      {/* Decorative Cloud SVGs */}
      <motion.div
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-8 sm:left-24 bg-white/80 rounded-full w-28 h-12 blur-[1px] shadow-sm pointer-events-none"
      />
      <motion.div
        animate={{ x: [20, -20, 20] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-8 sm:right-28 bg-white/75 rounded-full w-36 h-14 blur-[1px] shadow-sm pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-400 border-[2.5px] border-amber-950 rounded-full font-heading font-black text-amber-950 text-xs sm:text-sm shadow-[0_3px_0_#78350f] mb-4"
        >
          <Sparkles className="w-4 h-4 text-amber-950 fill-amber-950" />
          Game Edukasi Bahasa Indonesia SD
        </motion.div>

        {/* Big KaliMaze Logo */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 14 }}
          className="mb-2"
        >
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl font-black tracking-tight text-white drop-shadow-[0_7px_0_#78350f]">
            <span className="text-amber-400 drop-shadow-[0_6px_0_#92400e]">Kali</span>
            <span className="text-sky-400 drop-shadow-[0_6px_0_#0369a1]">Maze</span>
          </h1>
          {/* Exact Tagline: “Susun Kata, Jadi Kalimat!” */}
          <p className="font-heading text-lg sm:text-xl font-black text-amber-950 mt-1 bg-white/80 px-4 py-1 rounded-full border-2 border-amber-900/30 inline-block">
            “Susun Kata, Jadi Kalimat!”
          </p>
        </motion.div>

        {/* Mascot Owl */}
        <div className="my-5">
          <MascotOwl
            mood="waving"
            size="lg"
            speechText="Ayo berpetualang menyusun kata bersama Owi!"
          />
        </div>

        {/* Loading Bar */}
        <div className="w-full max-w-xs mt-2">
          <div className="w-full h-5 bg-white/80 border-[3px] border-amber-900 rounded-full p-0.5 shadow-[0_3px_0_#78350f] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-bold text-amber-900 mt-2 px-1">
            <span>Menyiapkan petualangan...</span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* Direct Start Button */}
        <div className="mt-6">
          <GameButton
            variant="orange"
            size="md"
            onClick={handleManualStart}
            icon={<Play className="w-4 h-4 fill-white" />}
          >
            Masuk Menu Utama
          </GameButton>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-emerald-600 to-emerald-500 border-t-[4px] border-emerald-800 flex items-center justify-center">
        <span className="text-xs font-bold text-emerald-100">
          Untuk Anak Sekolah Dasar Usia 7–12 Tahun
        </span>
      </div>
    </div>
  );
};
