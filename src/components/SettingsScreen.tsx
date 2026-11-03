import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  RotateCcw,
  AlertTriangle,
  Trophy,
  Star,
  CheckCircle2,
  Music,
  Sliders
} from 'lucide-react';
import { playSound } from '../utils/audio';
import { GameButton } from './GameButton';

interface SettingsScreenProps {
  onBack: () => void;
  musicEnabled: boolean;
  soundEnabled: boolean;
  musicVolume: number;
  soundVolume: number;
  onToggleMusic: () => void;
  onToggleSound: () => void;
  onChangeMusicVolume: (v: number) => void;
  onChangeSoundVolume: (v: number) => void;
  onResetAllProgress: () => void;
  totalScore: number;
  totalStars: number;
  completedCount: number;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  musicEnabled,
  soundEnabled,
  musicVolume,
  soundVolume,
  onToggleMusic,
  onToggleSound,
  onChangeMusicVolume,
  onChangeSoundVolume,
  onResetAllProgress,
  totalScore,
  totalStars,
  completedCount
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleTestSound = () => {
    playSound.correct(soundEnabled, soundVolume);
  };

  const handleConfirmReset = () => {
    playSound.tap(soundEnabled, soundVolume);
    setShowConfirmModal(false);
    onResetAllProgress();
  };

  const handleCancelReset = () => {
    playSound.tap(soundEnabled, soundVolume);
    setShowConfirmModal(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100 p-4 sm:p-6 select-none">
      {/* Top Header */}
      <header className="relative z-10 max-w-2xl w-full mx-auto flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            playSound.tap(soundEnabled, soundVolume);
            onBack();
          }}
          className="w-12 h-12 rounded-full bg-amber-200 border-[3px] border-amber-950 flex items-center justify-center shadow-[0_4px_0_#78350f] active:translate-y-1 active:shadow-[0_1px_0_#78350f] cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 text-amber-950" />
        </motion.button>

        <div className="bg-amber-400 border-[3.5px] border-amber-950 px-6 py-1.5 rounded-2xl shadow-[0_4px_0_#78350f]">
          <h1 className="font-heading font-black text-xl sm:text-2xl text-amber-950 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-950" />
            PENGATURAN
          </h1>
        </div>

        <div className="w-12" />
      </header>

      {/* Main Settings Card */}
      <main className="relative z-10 max-w-xl w-full mx-auto my-4 bg-white/95 border-[4px] border-amber-950 rounded-3xl p-5 sm:p-8 shadow-[0_8px_0_#78350f]">
        {/* Progress Stats Summary */}
        <div className="bg-amber-100/80 border-[3px] border-amber-900 rounded-2xl p-4 mb-6">
          <span className="font-heading font-black text-xs sm:text-sm text-amber-900 uppercase tracking-wider block mb-2">
            Status Progres Petualangan:
          </span>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/90 p-2.5 rounded-xl border border-amber-300 shadow-xs">
              <Trophy className="w-4 h-4 text-amber-600 mx-auto mb-0.5" />
              <div className="font-heading font-black text-base sm:text-lg text-amber-950">
                {totalScore}
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-amber-800">Total Skor</div>
            </div>

            <div className="bg-white/90 p-2.5 rounded-xl border border-amber-300 shadow-xs">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400 mx-auto mb-0.5" />
              <div className="font-heading font-black text-base sm:text-lg text-amber-950">
                {totalStars}
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-amber-800">Bintang</div>
            </div>

            <div className="bg-white/90 p-2.5 rounded-xl border border-amber-300 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto mb-0.5" />
              <div className="font-heading font-black text-base sm:text-lg text-amber-950">
                {completedCount}/16
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-amber-800">Level Selesai</div>
            </div>
          </div>
        </div>

        {/* Setting Controls */}
        <div className="space-y-4">
          {/* Music Control */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-200 border-2 border-sky-800 flex items-center justify-center text-sky-950">
                  <Music className="w-4 h-4 text-sky-800" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm sm:text-base text-amber-950">
                    Musik Latar (BGM)
                  </h3>
                  <p className="text-[11px] font-semibold text-amber-800">
                    {musicEnabled ? `Aktif (${Math.round(musicVolume * 100)}%)` : 'Nonaktif'}
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <button
                onClick={onToggleMusic}
                className={`relative w-12 h-7 rounded-full border-2 border-amber-950 transition-colors p-0.5 cursor-pointer ${
                  musicEnabled ? 'bg-sky-500' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white border border-amber-950 shadow-sm transition-transform ${
                    musicEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Volume slider */}
            <div className="mt-2 flex items-center gap-3">
              <span className="text-xs font-bold text-amber-800">Volume:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                disabled={!musicEnabled}
                value={musicEnabled ? musicVolume : 0}
                onChange={(e) => onChangeMusicVolume(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-sky-600 disabled:opacity-40"
              />
              <span className="text-xs font-bold text-amber-900 w-8 text-right">
                {musicEnabled ? `${Math.round(musicVolume * 100)}%` : '0%'}
              </span>
            </div>
          </div>

          {/* Sound Effects Control */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border-2 border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-200 border-2 border-emerald-800 flex items-center justify-center text-emerald-950">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-emerald-800" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-rose-700" />
                  )}
                </div>
                <div>
                  <h3 className="font-heading font-black text-sm sm:text-base text-amber-950">
                    Efek Suara (SFX)
                  </h3>
                  <p className="text-[11px] font-semibold text-amber-800">
                    {soundEnabled ? `Aktif (${Math.round(soundVolume * 100)}%)` : 'Nonaktif'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {soundEnabled && (
                  <button
                    onClick={handleTestSound}
                    className="px-2 py-1 text-xs font-bold bg-amber-200 hover:bg-amber-300 rounded-lg border border-amber-400 text-amber-900 cursor-pointer"
                  >
                    Tes
                  </button>
                )}
                {/* Toggle switch */}
                <button
                  onClick={onToggleSound}
                  className={`relative w-12 h-7 rounded-full border-2 border-amber-950 transition-colors p-0.5 cursor-pointer ${
                    soundEnabled ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white border border-amber-950 shadow-sm transition-transform ${
                      soundEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Volume slider */}
            <div className="mt-2 flex items-center gap-3">
              <span className="text-xs font-bold text-amber-800">Volume:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                disabled={!soundEnabled}
                value={soundEnabled ? soundVolume : 0}
                onChange={(e) => onChangeSoundVolume(parseFloat(e.target.value))}
                className="flex-1 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 disabled:opacity-40"
              />
              <span className="text-xs font-bold text-amber-900 w-8 text-right">
                {soundEnabled ? `${Math.round(soundVolume * 100)}%` : '0%'}
              </span>
            </div>
          </div>

          {/* Reset Progress Section */}
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-heading font-black text-sm sm:text-base text-rose-950 flex items-center gap-1.5">
                  <RotateCcw className="w-4 h-4 text-rose-600" />
                  Reset Progres Permainan
                </h3>
                <p className="text-[11px] font-semibold text-rose-800/90 mt-0.5">
                  Kembalikan level ke Level 1 dan hapus seluruh skor serta riwayat bintang.
                </p>
              </div>

              <button
                onClick={() => {
                  playSound.tap(soundEnabled, soundVolume);
                  setShowConfirmModal(true);
                }}
                className="px-3.5 py-2 bg-rose-500 hover:bg-rose-600 text-white font-heading font-bold text-xs sm:text-sm rounded-xl border-[2.5px] border-rose-950 shadow-[0_3px_0_#4c0519] cursor-pointer whitespace-nowrap"
              >
                Reset Progress
              </button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <GameButton
            variant="orange"
            size="md"
            onClick={onBack}
            className="w-full sm:w-auto px-8 mx-auto"
          >
            Kembali ke Menu Utama
          </GameButton>
        </div>
      </main>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white border-[4px] border-amber-950 rounded-3xl p-6 max-w-sm w-full text-center shadow-[0_10px_0_#78350f]"
            >
              <div className="w-14 h-14 rounded-full bg-rose-100 border-[3px] border-rose-900 mx-auto flex items-center justify-center mb-3 text-rose-600">
                <AlertTriangle className="w-8 h-8" />
              </div>

              <h2 className="font-heading font-black text-xl text-amber-950 mb-2">
                Konfirmasi Reset
              </h2>

              <p className="font-sans font-bold text-sm text-amber-900 mb-6">
                Apakah kamu yakin ingin menghapus semua progres permainan?
              </p>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCancelReset}
                  className="py-2.5 px-4 bg-slate-200 hover:bg-slate-300 border-[2.5px] border-slate-700 text-slate-800 font-heading font-bold text-sm rounded-xl cursor-pointer"
                >
                  Batal
                </button>

                <button
                  onClick={handleConfirmReset}
                  className="py-2.5 px-4 bg-rose-500 hover:bg-rose-600 border-[2.5px] border-rose-950 text-white font-heading font-bold text-sm rounded-xl shadow-[0_3px_0_#4c0519] cursor-pointer"
                >
                  Ya, Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="text-center text-xs font-bold text-amber-900">
        KaliMaze · Pengaturan Permainan
      </footer>
    </div>
  );
};
