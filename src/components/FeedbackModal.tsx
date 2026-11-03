import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MascotOwl } from './MascotOwl';
import { CheckCircle2, RotateCcw, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import { GameButton } from './GameButton';

interface FeedbackModalProps {
  isOpen: boolean;
  type: 'CORRECT' | 'WRONG';
  pointsEarned: number;
  onContinue: () => void;
  onRetry: () => void;
  isLastQuestion?: boolean;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  type,
  pointsEarned,
  onContinue,
  onRetry,
  isLastQuestion = false
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className={`w-full max-w-sm rounded-3xl p-6 text-center border-[5px] shadow-[0_10px_0_rgba(0,0,0,0.35)] ${
              type === 'CORRECT'
                ? 'bg-gradient-to-b from-emerald-50 via-white to-emerald-100 border-emerald-700 shadow-[0_10px_0_#14532d]'
                : 'bg-gradient-to-b from-amber-50 via-white to-orange-100 border-amber-900 shadow-[0_10px_0_#78350f]'
            }`}
          >
            {/* Mascot Owl Reaction */}
            <div className="mb-2">
              <MascotOwl
                mood={type === 'CORRECT' ? 'celebrate' : 'thinking'}
                size="md"
                showSpeech={false}
              />
            </div>

            {/* Header Title */}
            <div className="my-2">
              {type === 'CORRECT' ? (
                <>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Jawaban Tepat!
                  </div>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-emerald-950">
                    Hebat! Kalimatmu benar!
                  </h3>
                  <div className="mt-2 inline-flex items-center gap-1 px-4 py-1.5 rounded-2xl bg-amber-400 text-amber-950 font-heading font-black text-base border-2 border-amber-900 shadow-[0_3px_0_#78350f]">
                    <span>+{pointsEarned} Poin</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 text-amber-900 border border-amber-400 text-xs font-bold mb-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Belum Tepat
                  </div>
                  <h3 className="font-heading font-black text-xl sm:text-2xl text-amber-950">
                    Hampir benar! Coba susun lagi, ya!
                  </h3>
                  <p className="text-xs font-semibold text-amber-800 mt-1">
                    Jangan khawatir, skor tidak dikurangi. Ayo periksa susunan subjek dan tempatnya.
                  </p>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex justify-center">
              {type === 'CORRECT' ? (
                <GameButton
                  variant="green"
                  size="lg"
                  onClick={onContinue}
                  className="w-full"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  {isLastQuestion ? 'Lihat Hasil Level!' : 'Lanjutkan Soal'}
                </GameButton>
              ) : (
                <GameButton
                  variant="orange"
                  size="lg"
                  onClick={onRetry}
                  className="w-full"
                  icon={<RotateCcw className="w-5 h-5" />}
                >
                  Coba Susun Lagi
                </GameButton>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
