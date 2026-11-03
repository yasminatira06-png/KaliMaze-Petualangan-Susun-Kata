/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameScreen, UserProgress, LevelResult } from './types/game';
import {
  LEVELS_DATA,
  INITIAL_PROGRESS,
  loadUserProgress,
  saveUserProgress,
  clearUserProgress
} from './data/levelsData';
import { bgmPlayer, playSound } from './utils/audio';
import { SplashScreen } from './components/SplashScreen';
import { MainMenu } from './components/MainMenu';
import { LevelSelectScreen } from './components/LevelSelectScreen';
import { GameplayScreen } from './components/GameplayScreen';
import { RewardScreen } from './components/RewardScreen';
import { GuideScreen } from './components/GuideScreen';
import { AboutScreen } from './components/AboutScreen';
import { SettingsScreen } from './components/SettingsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('SPLASH');
  const [activeLevelId, setActiveLevelId] = useState<number>(1);
  const [latestResult, setLatestResult] = useState<LevelResult | null>(null);
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());

  // Save progress whenever it changes
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  // Sync SFX volume setting into playSound helper
  useEffect(() => {
    playSound.setSoundVolume(progress.soundVolume);
  }, [progress.soundVolume]);

  // Background Music sync
  useEffect(() => {
    if (currentScreen !== 'SPLASH') {
      bgmPlayer.setVolume(progress.musicVolume, progress.musicEnabled);
    }
  }, [progress.musicEnabled, progress.musicVolume, currentScreen]);

  // Audio Toggle Handlers
  const handleToggleSound = () => {
    setProgress((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  };

  const handleToggleMusic = () => {
    const nextState = !progress.musicEnabled;
    setProgress((prev) => ({
      ...prev,
      musicEnabled: nextState
    }));
    bgmPlayer.setVolume(progress.musicVolume, nextState);
  };

  const handleChangeSoundVolume = (vol: number) => {
    setProgress((prev) => ({
      ...prev,
      soundVolume: vol
    }));
  };

  const handleChangeMusicVolume = (vol: number) => {
    setProgress((prev) => ({
      ...prev,
      musicVolume: vol
    }));
    bgmPlayer.setVolume(vol, progress.musicEnabled);
  };

  // Level Selection
  const handleSelectLevel = (levelId: number) => {
    setActiveLevelId(levelId);
    setProgress((prev) => ({
      ...prev,
      lastPlayedLevel: levelId
    }));
    setCurrentScreen('GAMEPLAY');
  };

  // Level Finish Handler
  const handleFinishLevel = (result: LevelResult) => {
    setLatestResult(result);

    setProgress((prev) => {
      const updatedCompleted = prev.completedLevels.includes(result.levelId)
        ? prev.completedLevels
        : [...prev.completedLevels, result.levelId];

      const nextLvlId = result.levelId + 1;
      const updatedUnlocked =
        nextLvlId <= 16 && !prev.unlockedLevels.includes(nextLvlId)
          ? [...prev.unlockedLevels, nextLvlId]
          : prev.unlockedLevels;

      const currentStar = prev.levelStars[result.levelId] || 0;
      const updatedStars = {
        ...prev.levelStars,
        [result.levelId]: Math.max(currentStar, result.stars)
      };

      const currentBestScore = prev.levelHighScores[result.levelId] || 0;
      const updatedHighScores = {
        ...prev.levelHighScores,
        [result.levelId]: Math.max(currentBestScore, result.score)
      };

      const newTotalScore = prev.totalScore + result.score;

      return {
        ...prev,
        completedLevels: updatedCompleted,
        unlockedLevels: updatedUnlocked,
        levelStars: updatedStars,
        levelHighScores: updatedHighScores,
        totalScore: newTotalScore,
        lastPlayedLevel: result.levelId
      };
    });

    setCurrentScreen('REWARD');
  };

  // Reward Screen Actions
  const handleNextLevelFromReward = () => {
    const nextLvl = activeLevelId + 1;
    if (nextLvl <= 16) {
      setActiveLevelId(nextLvl);
      setCurrentScreen('GAMEPLAY');
    } else {
      setCurrentScreen('LEVEL_SELECT');
    }
  };

  const handlePlayAgainFromReward = () => {
    setCurrentScreen('GAMEPLAY');
  };

  // Full reset from Settings
  const handleResetAllProgress = () => {
    clearUserProgress();
    setProgress({
      ...INITIAL_PROGRESS,
      soundEnabled: progress.soundEnabled,
      musicEnabled: progress.musicEnabled,
      soundVolume: progress.soundVolume,
      musicVolume: progress.musicVolume
    });
    setActiveLevelId(1);
    setCurrentScreen('MENU');
  };

  // Total stars
  const totalStarsCount = Object.values(progress.levelStars).reduce(
    (sum, val) => sum + val,
    0
  );

  const currentLevelData =
    LEVELS_DATA.find((l) => l.id === activeLevelId) || LEVELS_DATA[0];

  return (
    <div className="w-full min-h-screen text-slate-900 bg-sky-200">
      {currentScreen === 'SPLASH' && (
        <SplashScreen
          onStart={() => {
            setCurrentScreen('MENU');
            if (progress.musicEnabled) {
              bgmPlayer.start(true, progress.musicVolume);
            }
          }}
          soundEnabled={progress.soundEnabled}
          soundVolume={progress.soundVolume}
        />
      )}

      {currentScreen === 'MENU' && (
        <MainMenu
          onPlay={() => setCurrentScreen('LEVEL_SELECT')}
          onGuide={() => setCurrentScreen('GUIDE')}
          onAbout={() => setCurrentScreen('ABOUT')}
          onSettings={() => setCurrentScreen('SETTINGS')}
          soundEnabled={progress.soundEnabled}
          musicEnabled={progress.musicEnabled}
          soundVolume={progress.soundVolume}
          onToggleSound={handleToggleSound}
          onToggleMusic={handleToggleMusic}
          totalScore={progress.totalScore}
          totalStars={totalStarsCount}
        />
      )}

      {currentScreen === 'LEVEL_SELECT' && (
        <LevelSelectScreen
          unlockedLevels={progress.unlockedLevels}
          completedLevels={progress.completedLevels}
          levelStars={progress.levelStars}
          onSelectLevel={handleSelectLevel}
          onHome={() => setCurrentScreen('MENU')}
          soundEnabled={progress.soundEnabled}
          musicEnabled={progress.musicEnabled}
          soundVolume={progress.soundVolume}
          onToggleSound={handleToggleSound}
          onToggleMusic={handleToggleMusic}
          totalScore={progress.totalScore}
          lastPlayedLevel={progress.lastPlayedLevel}
        />
      )}

      {currentScreen === 'GAMEPLAY' && (
        <GameplayScreen
          key={`gameplay-level-${activeLevelId}`}
          levelData={currentLevelData}
          onBack={() => setCurrentScreen('LEVEL_SELECT')}
          onFinishLevel={handleFinishLevel}
          onHome={() => setCurrentScreen('MENU')}
          soundEnabled={progress.soundEnabled}
          musicEnabled={progress.musicEnabled}
          soundVolume={progress.soundVolume}
          musicVolume={progress.musicVolume}
          onToggleSound={handleToggleSound}
          onToggleMusic={handleToggleMusic}
          onChangeSoundVolume={handleChangeSoundVolume}
          onChangeMusicVolume={handleChangeMusicVolume}
          globalTotalScore={progress.totalScore}
        />
      )}

      {currentScreen === 'REWARD' && latestResult && (
        <RewardScreen
          result={latestResult}
          onNextLevel={handleNextLevelFromReward}
          onPlayAgain={handlePlayAgainFromReward}
          onLevelSelect={() => setCurrentScreen('LEVEL_SELECT')}
          onMenu={() => setCurrentScreen('MENU')}
          soundEnabled={progress.soundEnabled}
          soundVolume={progress.soundVolume}
          hasNextLevel={activeLevelId < 16}
        />
      )}

      {currentScreen === 'GUIDE' && (
        <GuideScreen
          onBack={() => setCurrentScreen('MENU')}
          soundEnabled={progress.soundEnabled}
          soundVolume={progress.soundVolume}
        />
      )}

      {currentScreen === 'ABOUT' && (
        <AboutScreen
          onBack={() => setCurrentScreen('MENU')}
          soundEnabled={progress.soundEnabled}
          soundVolume={progress.soundVolume}
        />
      )}

      {currentScreen === 'SETTINGS' && (
        <SettingsScreen
          onBack={() => setCurrentScreen('MENU')}
          musicEnabled={progress.musicEnabled}
          soundEnabled={progress.soundEnabled}
          musicVolume={progress.musicVolume}
          soundVolume={progress.soundVolume}
          onToggleMusic={handleToggleMusic}
          onToggleSound={handleToggleSound}
          onChangeMusicVolume={handleChangeMusicVolume}
          onChangeSoundVolume={handleChangeSoundVolume}
          onResetAllProgress={handleResetAllProgress}
          totalScore={progress.totalScore}
          totalStars={totalStarsCount}
          completedCount={progress.completedLevels.length}
        />
      )}
    </div>
  );
}
