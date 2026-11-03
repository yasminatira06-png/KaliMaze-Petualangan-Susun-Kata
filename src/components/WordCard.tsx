import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

interface WordCardProps {
  word: string;
  index: number;
  isAnswerSlot?: boolean;
  onClick?: () => void;
  onShiftLeft?: (e: React.MouseEvent) => void;
  onShiftRight?: (e: React.MouseEvent) => void;
  isFirst?: boolean;
  isLast?: boolean;
  shake?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const WordCard: React.FC<WordCardProps> = ({
  word,
  index,
  isAnswerSlot = false,
  onClick,
  onShiftLeft,
  onShiftRight,
  isFirst = false,
  isLast = false,
  shake = false,
  draggable = true,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="inline-block cursor-pointer select-none"
    >
      <motion.div
        layout
        initial={{ scale: 0.8, opacity: 0 }}
        animate={
          shake
            ? {
                x: [0, -6, 6, -4, 4, 0],
                scale: 1,
                opacity: 1,
                transition: { duration: 0.4 }
              }
            : { scale: 1, opacity: 1 }
        }
        exit={{ scale: 0.8, opacity: 0 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={onClick}
        className={`relative group inline-flex items-center gap-1.5 rounded-2xl border-[3px] font-heading font-black transition-all ${
          isAnswerSlot
            ? 'bg-gradient-to-b from-sky-50 to-sky-100 border-sky-600 text-sky-950 shadow-[0_4px_0_#0284c7] px-3.5 py-2 text-base sm:text-lg'
            : 'bg-gradient-to-b from-amber-50 to-amber-100 border-amber-900 text-amber-950 shadow-[0_4px_0_#78350f] px-4 py-2.5 text-lg sm:text-xl'
        }`}
      >
        <span>{word}</span>

        {/* Answer Slot Controls (Reorder Left/Right & Remove) */}
        {isAnswerSlot && (
          <div className="flex items-center gap-0.5 ml-1 opacity-80 group-hover:opacity-100">
            {!isFirst && onShiftLeft && (
              <button
                onClick={onShiftLeft}
                className="p-1 rounded-md hover:bg-sky-200/80 text-sky-800 cursor-pointer"
                title="Geser ke kiri"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}

            {!isLast && onShiftRight && (
              <button
                onClick={onShiftRight}
                className="p-1 rounded-md hover:bg-sky-200/80 text-sky-800 cursor-pointer"
                title="Geser ke kanan"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <div
              className="w-4 h-4 rounded-full bg-rose-200/90 text-rose-800 flex items-center justify-center text-[10px] ml-0.5"
              title="Klik kartu untuk kembalikan"
            >
              <X className="w-2.5 h-2.5" />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
