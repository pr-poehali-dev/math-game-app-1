import { useState, useEffect } from 'react';

export interface GameResult {
  gameId: number;
  score: number;
  maxScore: number;
  date: string;
  timeSeconds: number;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  grade: string;
  avatar: string;
  completedGames: number[];
  gameResults: GameResult[];
  totalXp: number;
  createdAt: string;
}

const DEFAULT_PROFILE: UserProfile = {
  firstName: '',
  lastName: '',
  grade: '7',
  avatar: '🎓',
  completedGames: [],
  gameResults: [],
  totalXp: 0,
  createdAt: new Date().toISOString(),
};

const STORAGE_KEY = 'infograd_user';

export function loadProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('load error', e);
  }
  return { ...DEFAULT_PROFILE };
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function useUserStore() {
  const [profile, setProfileState] = useState<UserProfile>(loadProfile);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfileState(prev => {
      const next = { ...prev, ...updates };
      saveProfile(next);
      return next;
    });
  };

  const recordGameResult = (result: GameResult) => {
    setProfileState(prev => {
      const alreadyCompleted = prev.completedGames.includes(result.gameId);
      const prevResult = prev.gameResults.find(r => r.gameId === result.gameId);
      const xpGain = !alreadyCompleted ? result.maxScore : Math.max(0, result.score - (prevResult?.score ?? 0));

      const updatedResults = prev.gameResults.filter(r => r.gameId !== result.gameId);
      updatedResults.push(result);

      const next: UserProfile = {
        ...prev,
        completedGames: alreadyCompleted ? prev.completedGames : [...prev.completedGames, result.gameId],
        gameResults: updatedResults,
        totalXp: prev.totalXp + xpGain,
      };
      saveProfile(next);
      return next;
    });
  };

  const isGameCompleted = (gameId: number) => profile.completedGames.includes(gameId);

  const getGameResult = (gameId: number) => profile.gameResults.find(r => r.gameId === gameId);

  return { profile, updateProfile, recordGameResult, isGameCompleted, getGameResult };
}