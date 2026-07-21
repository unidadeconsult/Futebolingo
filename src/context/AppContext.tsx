import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CEFRLevel, NativeLanguage, Progress, UserProfile, VocabWord } from '../types';
import { LEAGUES } from '../data/leagues';

const USER_KEY = 'futbolingo:user';
const PROGRESS_KEY = 'futbolingo:progress';

const XP_GOAL_BY_LEVEL: Record<CEFRLevel, { xp: number; next: CEFRLevel }> = {
  A1: { xp: 500, next: 'A2' },
  A2: { xp: 1000, next: 'B1' },
  B1: { xp: 1600, next: 'B2' },
  B2: { xp: 2300, next: 'C1' },
  C1: { xp: 3100, next: 'C2' },
  C2: { xp: 4000, next: 'C2' },
};

function defaultProgress(level: CEFRLevel): Progress {
  const goal = XP_GOAL_BY_LEVEL[level];
  const leagueMatches: Record<string, number> = {};
  LEAGUES.forEach((l) => (leagueMatches[l.id] = l.matchesPlayed));
  return {
    xp: 650,
    xpGoal: goal.xp,
    level,
    nextLevel: goal.next,
    streak: 7,
    conversations: 142,
    wordsLearned: 89,
    hoursStudied: 12,
    selectedLeagueId: null,
    vocabDeck: [],
    leagueMatches,
  };
}

function loadJSON<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

interface AppContextValue {
  user: UserProfile | null;
  progress: Progress;
  login: (name: string, nativeLanguage: NativeLanguage, level: CEFRLevel) => void;
  loginAsGuest: () => void;
  logout: () => void;
  selectLeague: (leagueId: string) => void;
  addXp: (amount: number) => void;
  addVocabWord: (word: VocabWord) => void;
  isWordSaved: (word: string) => boolean;
  incrementConversations: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => loadJSON<UserProfile>(USER_KEY));
  const [progress, setProgress] = useState<Progress>(() => {
    const stored = loadJSON<Progress>(PROGRESS_KEY);
    return stored ?? defaultProgress('A2');
  });

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  const login = (name: string, nativeLanguage: NativeLanguage, level: CEFRLevel) => {
    setUser({ name: name.trim() || 'Craque', nativeLanguage, level, isGuest: false });
    const goal = XP_GOAL_BY_LEVEL[level];
    setProgress((p) => ({ ...p, level, xpGoal: goal.xp, nextLevel: goal.next }));
  };

  const loginAsGuest = () => {
    setUser({ name: 'Visitante', nativeLanguage: 'pt', level: 'A2', isGuest: true });
  };

  const logout = () => {
    setUser(null);
  };

  const selectLeague = (leagueId: string) => {
    setProgress((p) => ({ ...p, selectedLeagueId: leagueId }));
  };

  const addXp = (amount: number) => {
    setProgress((p) => {
      let xp = p.xp + amount;
      let level = p.level;
      let goal = XP_GOAL_BY_LEVEL[level];
      let nextLevel = goal.next;
      let xpGoal = goal.xp;
      if (xp >= xpGoal && level !== 'C2') {
        level = nextLevel;
        goal = XP_GOAL_BY_LEVEL[level];
        nextLevel = goal.next;
        xpGoal = goal.xp;
      }
      return { ...p, xp, level, nextLevel, xpGoal };
    });
  };

  const addVocabWord = (word: VocabWord) => {
    setProgress((p) => {
      if (p.vocabDeck.some((w) => w.word === word.word)) return p;
      return { ...p, vocabDeck: [...p.vocabDeck, word], wordsLearned: p.wordsLearned + 1 };
    });
    addXp(10);
  };

  const isWordSaved = (word: string) => progress.vocabDeck.some((w) => w.word === word);

  const incrementConversations = () => {
    setProgress((p) => ({ ...p, conversations: p.conversations + 1 }));
  };

  const value = useMemo<AppContextValue>(
    () => ({
      user,
      progress,
      login,
      loginAsGuest,
      logout,
      selectLeague,
      addXp,
      addVocabWord,
      isWordSaved,
      incrementConversations,
    }),
    [user, progress],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
