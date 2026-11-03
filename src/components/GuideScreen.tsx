import React from 'react';
import { motion } from 'motion/react';
import { MascotOwl } from './MascotOwl';
import { ArrowLeft, BookOpen, CheckCircle2, Star, Sparkles, HelpCircle, Lightbulb } from 'lucide-react';
import { playSound } from '../utils/audio';
import { GameButton } from './GameButton';

interface GuideScreenProps {
  onBack: () => void;
  soundEnabled: boolean;
  soundVolume: number;
}

export const GuideScreen: React.FC<GuideScreenProps> = ({ onBack, soundEnabled, soundVolume }) => {
  const steps = [
    {
      step: '1',
      title: 'Baca Kata-Kata yang Tersedia',
      desc: 'Perhatikan kumpulan kartu kata acak di kotak bawah. Kenali siapa pelakunya (Subjek), apa tindakannya (Predikat), dan objek atau tempatnya.',
      icon: HelpCircle,
      badge: 'bg-amber-400 border-amber-900 text-amber-950'
    },
    {
      step: '2',
      title: 'Susun Kata Menjadi Kalimat yang Benar',
      desc: 'Sentuh kartu kata untuk memasukkannya ke area jawaban, atau geser kartu untuk mengubah susunan urutan kalimat.',
      icon: Sparkles,
      badge: 'bg-sky-400 border-sky-900 text-white'
    },
    {
      step: '3',
      title: 'Periksa Jawabanmu',
      desc: 'Tekan tombol hijau "Periksa Jawaban". Owi akan memberitahu jika kalimatmu sudah sempurna atau masih perlu diperbaiki.',
      icon: CheckCircle2,
      badge: 'bg-emerald-400 border-emerald-900 text-emerald-950'
    },
    {
      step: '4',
      title: 'Kumpulkan Bintang dan Buka Level Baru',
      desc: 'Dapatkan 100 poin untuk jawaban benar pada percobaan pertama, raih hingga 3 bintang, dan buka level petualangan berikutnya!',
      icon: Star,
      badge: 'bg-purple-400 border-purple-900 text-white'
    }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col justify-between bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100 p-4 sm:p-6 select-none">
      {/* Top Header */}
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
          <h1 className="font-heading font-black text-xl sm:text-2xl text-amber-950 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-950" />
            CARA BERMAIN
          </h1>
        </div>

        <div className="w-12" />
      </header>

      {/* Main Guide Card */}
      <main className="relative z-10 max-w-3xl w-full mx-auto my-4 bg-white/95 border-[4px] border-amber-950 rounded-3xl p-5 sm:p-8 shadow-[0_8px_0_#78350f]">
        {/* Intro Banner with Mascot */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-amber-100/80 border-[3px] border-amber-900 rounded-2xl mb-6">
          <MascotOwl mood="waving" size="sm" showSpeech={false} />
          <div>
            <h2 className="font-heading font-black text-lg sm:text-xl text-amber-950">
              Halo Sahabat KaliMaze!
            </h2>
            <p className="font-sans text-sm sm:text-base font-semibold text-amber-900 mt-1 leading-relaxed">
              Ikuti 4 langkah mudah ini untuk menjadi juara penyusun kalimat Bahasa Indonesia bersama Owi si Burung Hantu:
            </p>
          </div>
        </div>

        {/* 4 Steps */}
        <div className="space-y-3.5">
          {steps.map((item) => {
            return (
              <div
                key={item.step}
                className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200"
              >
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl border-[2.5px] flex items-center justify-center font-heading font-black text-base sm:text-lg shadow-sm shrink-0 ${item.badge}`}
                >
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-black text-base sm:text-lg text-amber-950">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm font-semibold text-amber-900/90 mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hints and Scoring Tips */}
        <div className="mt-5 p-4 rounded-2xl bg-sky-50 border-[2.5px] border-sky-600 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-sky-950">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p><strong>Tips Petunjuk:</strong> Jika kamu kesulitan, tekan tombol <strong>"Petunjuk"</strong> saat bermain untuk mendapatkan bantuan Owi!</p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
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

      <footer className="text-center text-xs font-bold text-amber-900">
        KaliMaze · Susun Kata, Jadi Kalimat!
      </footer>
    </div>
  );
};
