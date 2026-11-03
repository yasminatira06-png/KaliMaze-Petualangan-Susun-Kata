import React from 'react';
import { motion } from 'motion/react';
import { MascotOwl } from './MascotOwl';
import { ArrowLeft, BookOpen, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { playSound } from '../utils/audio';
import { GameButton } from './GameButton';

interface AboutScreenProps {
  onBack: () => void;
  soundEnabled: boolean;
  soundVolume: number;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack, soundEnabled, soundVolume }) => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100 p-4 sm:p-6 select-none">
      {/* Header */}
      <header className="relative z-10 max-w-3xl w-full mx-auto flex items-center justify-between">
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
          <h1 className="font-heading font-black text-xl sm:text-2xl text-amber-950">
            TENTANG GAME
          </h1>
        </div>

        <div className="w-12" />
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-2xl w-full mx-auto my-4 bg-white/95 border-[4px] border-amber-950 rounded-3xl p-6 sm:p-8 shadow-[0_8px_0_#78350f] text-center">
        {/* Mascot Center */}
        <div className="mb-4">
          <MascotOwl mood="waving" size="md" showSpeech={false} />
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-amber-950 mt-2">
            <span className="text-amber-500">Kali</span>
            <span className="text-sky-500">Maze</span>
          </h2>
          <p className="font-heading text-xs sm:text-sm font-bold text-amber-900 bg-amber-100 px-4 py-1 rounded-full inline-block mt-1 border border-amber-300">
            “Susun Kata, Jadi Kalimat!” · Versi 2.0
          </p>
        </div>

        {/* Short Description */}
        <div className="text-left space-y-3 font-sans text-sm sm:text-base text-amber-950 font-semibold bg-amber-50/75 p-5 rounded-2xl border-2 border-amber-200">
          <p>
            <strong className="text-amber-900 font-heading">KaliMaze</strong> adalah game edukasi interaktif untuk anak usia <strong>7–12 tahun</strong> yang melatih kemampuan menyusun kata menjadi kalimat Bahasa Indonesia yang baik, benar, dan bermakna.
          </p>
          <p>
            Dengan pendekatan game mobile kartun 3D yang ceria, anak diajak memahami struktur kalimat (Subjek, Predikat, Objek, dan Keterangan) melalui 16 level petualangan puzzle kata yang seru.
          </p>
        </div>

        {/* Learning Objectives Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-5 text-left">
          <div className="p-3.5 rounded-2xl bg-sky-50 border-2 border-sky-300">
            <BookOpen className="w-6 h-6 text-sky-600 mb-1" />
            <h3 className="font-heading font-black text-sm text-sky-950">80 Soal Edukatif</h3>
            <p className="text-xs text-sky-800 font-semibold mt-0.5">
              Tingkat kesulitan bertahap dari kalimat pendek hingga kompleks.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300">
            <Award className="w-6 h-6 text-amber-600 mb-1" />
            <h3 className="font-heading font-black text-sm text-amber-950">Sistem Bintang</h3>
            <p className="text-xs text-amber-800 font-semibold mt-0.5">
              Penilaian akurat 1–3 bintang berdasarkan persentase jawaban.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mb-1" />
            <h3 className="font-heading font-black text-sm text-emerald-950">Ramah Anak</h3>
            <p className="text-xs text-emerald-800 font-semibold mt-0.5">
              Bebas iklan, tanpa login, dan mendukung penyimpanan lokal.
            </p>
          </div>
        </div>

        {/* Mascot info */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-amber-900 mb-6">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Karakter Utama: <strong>Owi si Burung Hantu Pemandu</strong></span>
        </div>

        {/* Back Button */}
        <GameButton
          variant="blue"
          size="md"
          onClick={onBack}
          className="w-full sm:w-auto px-8 mx-auto"
        >
          Kembali ke Menu Utama
        </GameButton>
      </main>

      <footer className="text-center text-xs font-bold text-amber-900">
        KaliMaze © 2026 · Game Edukasi Bahasa Indonesia
      </footer>
    </div>
  );
};
