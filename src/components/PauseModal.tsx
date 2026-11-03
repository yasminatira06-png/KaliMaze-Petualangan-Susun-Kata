import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Grid, Home, Volume2, VolumeX, Music } from 'lucide-react';
import { GameButton } from './GameButton';

interface PauseModalProps {
  isOpen: boolean;
  onResume: () => void;
  onRestartQuestion: () => void;
  onLevelSelect: () => void;
  onMainMenu: () => void;
  musicEnabled: boolean;
  soundEnabled: boolean;
  musicVolume: number;
  soundVolume: number;
  onToggleMusic: () => void;
  onToggleSound: () => void;
  onChangeMusicVolume: (v: number) => void;
  onChangeSoundVolume: (v: number) => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  isOpen,
  onResume,
  onRestartQuestion,
  onLevelSelect,
  onMainMenu,
  musicEnabled,
  soundEnabled,
  musicVolume,
  soundVolume,
  onToggleMusic,
  onToggleSound,
  onChangeMusicVolume,
  onChangeSoundVolume
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full max-w-sm bg-amber-50 border-[4.5px] border-amber-950 rounded-3xl p-6 text-center shadow-[0_10px_0_#78350f]"
          >
            {/* Header Badge */}
            <div className="bg-amber-400 border-[3px] border-amber-950 px-6 py-1.5 rounded-2xl shadow-[0_4px_0_#78350f] inline-block mb-4">
              <h2 className="font-heading font-black text-xl text-amber-950 uppercase tracking-wide">
                Permainan Dijeda
              </h2>
            </div>

            {/* Quick Audio Controls */}
            <div className="bg-white/80 border-2 border-amber-300 rounded-2xl p-3.5 mb-5 space-y-3 text-left">
              {/* Music Row */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-1">
                  <div className="flex items-center gap-1.5">
                    <Music className="w-4 h-4 text-sky-600" />
                    <span>Musik Latar</span>
                  </div>
                  <button
                    onClick={onToggleMusic}
                    className="text-[11px] font-bold text-sky-800 underline cursor-pointer"
                  >
                    {musicEnabled ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={musicEnabled ? musicVolume : 0}
                  onChange={(e) => onChangeMusicVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                />
              </div>

              {/* Sound Effects Row */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-amber-950 mb-1">
                  <div className="flex items-center gap-1.5">
                    {soundEnabled ? (
                      <Volume2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-rose-600" />
                    )}
                    <span>Efek Suara</span>
                  </div>
                  <button
                    onClick={onToggleSound}
                    className="text-[11px] font-bold text-emerald-800 underline cursor-pointer"
                  >
                    {soundEnabled ? 'Nonaktifkan' : 'Aktifkan'}
                  </button>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={soundEnabled ? soundVolume : 0}
                  onChange={(e) => onChangeSoundVolume(parseFloat(e.target.value))}
                  className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5">
              <GameButton
                variant="green"
                size="md"
                onClick={onResume}
                icon={<Play className="w-4 h-4 fill-white" />}
              >
                Lanjutkan Permainan
              </GameButton>

              <GameButton
                variant="orange"
                size="md"
                onClick={onRestartQuestion}
                icon={<RotateCcw className="w-4 h-4" />}
              >
                Ulangi Susunan Soal Ini
              </GameButton>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <GameButton
                  variant="blue"
                  size="sm"
                  onClick={onLevelSelect}
                  icon={<Grid className="w-4 h-4" />}
                >
                  Pilih Level
                </GameButton>

                <GameButton
                  variant="purple"
                  size="sm"
                  onClick={onMainMenu}
                  icon={<Home className="w-4 h-4" />}
                >
                  Menu Utama
                </GameButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
