export type NativeLanguage = 'pt' | 'en' | 'es';
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface UserProfile {
  name: string;
  nativeLanguage: NativeLanguage;
  level: CEFRLevel;
  isGuest: boolean;
}

export interface LeagueDef {
  id: string;
  name: string;
  color: string;
  emoji: string;
  languageName: string;
  languageFlag: string;
  speechLang: string;
  matchesPlayed: number;
  matchesTotal: number;
  persona: PersonaDef;
}

export interface PersonaDef {
  name: string;
  title: string;
  emoji: string;
  greeting: string;
  vocabLabel: string;
  wordTag: string;
}

export type ChatMode = 'lesson' | 'free';

export interface VocabWord {
  word: string;
  meaning: string;
}

export interface DeckEntry extends VocabWord {
  box: number;
  dueAt: number;
  addedAt: number;
  lang: string;
}

export interface HighlightedWord {
  word: string;
  translation: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  highlights?: HighlightedWord[];
  vocabCard?: {
    title: string;
    words: VocabWord[];
  };
  translation?: {
    from: string;
    to: string;
    text: string;
  };
  quickActions?: string[];
  timestamp: number;
}

export interface Progress {
  xp: number;
  xpGoal: number;
  level: CEFRLevel;
  nextLevel: CEFRLevel;
  streak: number;
  conversations: number;
  wordsLearned: number;
  hoursStudied: number;
  selectedLeagueId: string | null;
  vocabDeck: DeckEntry[];
  leagueMatches: Record<string, number>;
  lastActiveDate: string | null;
  schemaVersion: number;
}
