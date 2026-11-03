import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  current: number; // 1-indexed
  total: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, className = '' }) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className={`w-full max-w-xs sm:max-w-md ${className}`}>
      <div className="flex items-center justify-between text-xs sm:text-sm font-heading font-black text-amber-950 mb-1 px-1">
        <span>Pertanyaan {current} dari {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>

      <div className="w-full h-4 sm:h-5 bg-white/90 border-[3px] border-amber-950 rounded-full p-0.5 shadow-[0_3px_0_#78350f] overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', damping: 15, stiffness: 120 }}
        />
      </div>
    </div>
  );
};
