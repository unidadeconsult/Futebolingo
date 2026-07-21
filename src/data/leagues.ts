import type { LeagueDef } from '../types';

export const LEAGUES: LeagueDef[] = [
  {
    id: 'premier-league',
    name: 'Premier League',
    color: '#3b82f6',
    emoji: '⚽',
    languageName: 'Inglês',
    languageFlag: '🏴',
    speechLang: 'en-GB',
    matchesPlayed: 3,
    matchesTotal: 5,
    persona: {
      name: 'John "The Commentator" Smith',
      title: 'Comentarista da Premier League • Inglês 🏴',
      emoji: '🎙️',
      greeting:
        'Alright mate, welcome to the [PITCH: campo]! I\'m John, and I\'ve been commentating on football for 25 years. Ready to learn some proper English through the beautiful game?',
      vocabLabel: 'Vocabulário do jogo',
      wordTag: 'WORD',
    },
  },
  {
    id: 'la-liga',
    name: 'La Liga',
    color: '#ef4444',
    emoji: '⚽',
    languageName: 'Espanhol',
    languageFlag: '🇪🇸',
    speechLang: 'es-ES',
    matchesPlayed: 2,
    matchesTotal: 5,
    persona: {
      name: 'Miguel "El Comentarista" García',
      title: 'Comentarista de La Liga • Espanhol 🇪🇸',
      emoji: '🎙️',
      greeting:
        '¡Vamos! Bienvenido al [ESTADIO: estádio]. Soy Miguel, fanático del Real Madrid de corazón. ¿Listo para aprender español con la pasión del fútbol?',
      vocabLabel: 'Vocabulario del partido',
      wordTag: 'PALABRA',
    },
  },
  {
    id: 'bundesliga',
    name: 'Bundesliga',
    color: '#dc2626',
    emoji: '⚽',
    languageName: 'Alemão',
    languageFlag: '🇩🇪',
    speechLang: 'de-DE',
    matchesPlayed: 1,
    matchesTotal: 5,
    persona: {
      name: 'Klaus "Der Kommentator" Müller',
      title: 'Kommentator der Bundesliga • Alemão 🇩🇪',
      emoji: '🎙️',
      greeting:
        'Willkommen im [STADION: estádio]. Ich bin Klaus. Lassen Sie uns strukturiert und präzise Deutsch durch Fußball lernen.',
      vocabLabel: 'Wortschatz des Spiels',
      wordTag: 'WORT',
    },
  },
  {
    id: 'serie-a',
    name: 'Serie A',
    color: '#1e40af',
    emoji: '⚽',
    languageName: 'Italiano',
    languageFlag: '🇮🇹',
    speechLang: 'it-IT',
    matchesPlayed: 0,
    matchesTotal: 5,
    persona: {
      name: 'Marco "Il Commentatore" Rossi',
      title: 'Commentatore della Serie A • Italiano 🇮🇹',
      emoji: '🎙️',
      greeting:
        'Benvenuto nello [STADIO: estádio]! *beija os dedos* Sono Marco, e per me il calcio è arte pura. Pronto a imparare l\'italiano con passione?',
      vocabLabel: 'Vocabolario della partita',
      wordTag: 'PAROLA',
    },
  },
  {
    id: 'ligue-1',
    name: 'Ligue 1',
    color: '#1d4ed8',
    emoji: '⚽',
    languageName: 'Francês',
    languageFlag: '🇫🇷',
    speechLang: 'fr-FR',
    matchesPlayed: 0,
    matchesTotal: 5,
    persona: {
      name: 'Pierre "Le Commentateur" Dubois',
      title: 'Commentateur de la Ligue 1 • Francês 🇫🇷',
      emoji: '🎙️',
      greeting:
        'Bienvenue au [STADE: estádio]. Je suis Pierre. Le football est un art, et je vais vous montrer sa beauté à travers la langue française.',
      vocabLabel: 'Vocabulaire du match',
      wordTag: 'MOT',
    },
  },
  {
    id: 'brasileirao',
    name: 'Brasileirão',
    color: '#16a34a',
    emoji: '⚽',
    languageName: 'Português',
    languageFlag: '🇧🇷',
    speechLang: 'pt-BR',
    matchesPlayed: 5,
    matchesTotal: 5,
    persona: {
      name: 'João "O Narrador" Silva',
      title: 'Narrador do Brasileirão • Português 🇧🇷',
      emoji: '🎙️',
      greeting:
        'Ô, seja bem-vindo ao [ESTÁDIO: campo de jogo]! Eu sou o João, narrador lendário! *explode de emoção* Bora aprender português com a emoção do futebol brasileiro, meu filho?',
      vocabLabel: 'Vocabulário do jogo',
      wordTag: 'PALAVRA',
    },
  },
];

export const getLeagueById = (id: string | null): LeagueDef | undefined =>
  LEAGUES.find((l) => l.id === id);
