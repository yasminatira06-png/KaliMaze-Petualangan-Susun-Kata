import React from 'react';
import { motion } from 'motion/react';

export type OwlMood = 'idle' | 'happy' | 'thinking' | 'celebrate' | 'waving';

interface MascotOwlProps {
  mood?: OwlMood;
  speechText?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSpeech?: boolean;
}

export const MascotOwl: React.FC<MascotOwlProps> = ({
  mood = 'idle',
  speechText,
  size = 'md',
  className = '',
  showSpeech = true
}) => {
  const sizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28 sm:w-32 sm:h-32',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
    xl: 'w-48 h-48 sm:w-60 sm:h-60'
  };

  // Determine animations based on mood
  const moodAnimation = {
    idle: {
      y: [0, -6, 0],
      rotate: [0, 1.5, 0, -1.5, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' as const }
    },
    happy: {
      y: [0, -14, 0, -10, 0],
      rotate: [0, -4, 4, -2, 0],
      scale: [1, 1.08, 1],
      transition: { duration: 0.8, repeat: Infinity, ease: 'easeOut' as const }
    },
    thinking: {
      rotate: [-3, 3, -3],
      y: [0, -3, 0],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const }
    },
    celebrate: {
      y: [0, -20, 0, -12, 0],
      rotate: [-6, 6, -6],
      scale: [1, 1.12, 1],
      transition: { duration: 0.9, repeat: Infinity, ease: 'easeInOut' as const }
    },
    waving: {
      rotate: [0, 5, -2, 5, 0],
      y: [0, -4, 0],
      transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' as const }
    }
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Speech Bubble */}
      {showSpeech && speechText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative mb-2 max-w-[260px] sm:max-w-[300px] bg-white border-[3px] border-amber-900 rounded-2xl px-4 py-2.5 shadow-[0_4px_0_#78350f] text-center z-20"
        >
          <p className="font-heading text-sm sm:text-base font-bold text-amber-950 leading-tight">
            {speechText}
          </p>
          {/* Bubble tail pointing down */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[9px] border-t-amber-900" />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[7px] border-t-white" />
        </motion.div>
      )}

      {/* Owl Character Container */}
      <motion.div
        animate={moodAnimation[mood]}
        className={`relative ${sizeClasses[size]} drop-shadow-xl flex items-center justify-center`}
      >
        {/* Glow halo when celebrating or happy */}
        {(mood === 'celebrate' || mood === 'happy') && (
          <div className="absolute inset-0 -m-3 rounded-full bg-amber-400/30 blur-xl animate-pulse" />
        )}

        {/* Mascot Image with round sticker border */}
        <div className="w-full h-full rounded-full p-1 bg-white border-[3.5px] border-amber-900 shadow-[0_5px_0_#78350f] overflow-hidden flex items-center justify-center relative bg-gradient-to-b from-amber-100 to-amber-200">
          <img
            src="/src/assets/images/kalimaze_mascot_owl_1793704477582.jpg"
            alt="Owi Burung Hantu KaliMaze"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform scale-110"
          />

          {/* Mood Expression Badges */}
          {mood === 'thinking' && (
            <div className="absolute top-1 right-1 bg-amber-400 text-amber-950 border-2 border-amber-900 rounded-full w-8 h-8 flex items-center justify-center font-heading font-black text-lg shadow-sm">
              ?
            </div>
          )}
          {mood === 'happy' && (
            <div className="absolute top-1 right-1 bg-emerald-400 text-emerald-950 border-2 border-emerald-900 rounded-full w-8 h-8 flex items-center justify-center font-heading font-black text-sm shadow-sm animate-bounce">
              ⭐
            </div>
          )}
          {mood === 'celebrate' && (
            <div className="absolute -top-1 -right-1 bg-yellow-400 text-amber-950 border-2 border-amber-900 rounded-full px-2 py-0.5 font-heading font-black text-xs shadow-md animate-bounce">
              🎉 HEBAT!
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
