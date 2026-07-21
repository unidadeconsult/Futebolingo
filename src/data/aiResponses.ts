import type { ChatMode, VocabWord } from '../types';

export interface TopicContent {
  text: string;
  vocab?: { title: string; words: VocabWord[] };
  translation?: { from: string; to: string; text: string };
}

export type TopicKey =
  | 'greeting'
  | 'yesterday'
  | 'predictions'
  | 'transfers'
  | 'teach5'
  | 'trophies'
  | 'rules'
  | 'grammar'
  | 'fallback';

export const QUICK_ACTIONS = ['🏆 Fala de troféus', '⚽ Regras do jogo', '🎓 Gramática de futebol'];

export const TOPIC_SUGGESTIONS = [
  '📅 Fala do jogo de ontem',
  '🏆 Previsões da rodada',
  '📰 Notícias de transferência',
  '✨ Me ensina 5 palavras novas',
];

const SUGGESTION_TO_TOPIC: Record<string, TopicKey> = {
  '📅 Fala do jogo de ontem': 'yesterday',
  '🏆 Previsões da rodada': 'predictions',
  '📰 Notícias de transferência': 'transfers',
  '✨ Me ensina 5 palavras novas': 'teach5',
  '🏆 Fala de troféus': 'trophies',
  '⚽ Regras do jogo': 'rules',
  '🎓 Gramática de futebol': 'grammar',
};

const KEYWORD_TOPIC: Array<{ topic: TopicKey; keywords: string[] }> = [
  { topic: 'yesterday', keywords: ['ontem', 'jogo de ontem', 'partida de ontem', 'yesterday'] },
  { topic: 'predictions', keywords: ['previs', 'rodada', 'próximo jogo', 'prediction'] },
  { topic: 'transfers', keywords: ['transfer', 'contrata', 'mercado da bola', 'reforço'] },
  { topic: 'teach5', keywords: ['ensina', 'palavras novas', 'vocabulário', 'ensinar'] },
  { topic: 'trophies', keywords: ['troféu', 'trofeu', 'título', 'copa', 'campeão'] },
  { topic: 'rules', keywords: ['regra', 'impedimento', 'var', 'pênalti', 'falta'] },
  { topic: 'grammar', keywords: ['gramática', 'gramatica', 'grammar', 'verbo', 'conjuga'] },
];

export function classifyTopic(userMessage: string): TopicKey {
  const mapped = SUGGESTION_TO_TOPIC[userMessage.trim()];
  if (mapped) return mapped;
  const lower = userMessage.toLowerCase();
  for (const entry of KEYWORD_TOPIC) {
    if (entry.keywords.some((k) => lower.includes(k))) return entry.topic;
  }
  return 'fallback';
}

interface LeagueContentBank {
  teachingNote: string;
  greeting: TopicContent;
  topics: Record<Exclude<TopicKey, 'greeting'>, TopicContent>;
  fallbackBank: { word: string; meaning: string }[];
}

export const CONTENT_BANK: Record<string, LeagueContentBank> = {
  'premier-league': {
    teachingNote:
      'In Lesson Mode I like to break down phrasal verbs and point out the difference between British and American English, mate.',
    greeting: {
      text:
        'Alright mate, welcome to the {{PITCH|campo}}! I\'ve been commentating for 25 years, so trust me on this one. What do you fancy talking about — yesterday\'s {{MATCH|partida}}, transfers, or shall I teach you some proper English?',
    },
    topics: {
      yesterday: {
        text:
          'What a {{FIXTURE|confronto}} that was yesterday! City absolutely battered United 4-1, and Haaland scored a brilliant {{HEADER|cabeceio}} in the 63rd minute. Proper brilliant stuff, mate!',
        vocab: {
          title: 'Vocabulário do jogo',
          words: [
            { word: 'Fixture', meaning: 'partida/confronto agendado' },
            { word: 'Header', meaning: 'cabeceio' },
            { word: 'Battered', meaning: 'goleou/destruiu (informal)' },
          ],
        },
        translation: { from: '🇬🇧 EN', to: '🇧🇷 PT', text: 'What a fixture that was → Que confronto foi aquele' },
      },
      predictions: {
        text:
          'For this {{MATCHWEEK|rodada}}, I reckon Arsenal will edge it against Liverpool — it\'s going to be a proper {{THRILLER|jogo emocionante}}, mate. My money is on a 2-1 scoreline!',
        vocab: {
          title: 'Vocabulário do jogo',
          words: [
            { word: 'Matchweek', meaning: 'rodada' },
            { word: 'Thriller', meaning: 'jogo emocionante' },
          ],
        },
      },
      transfers: {
        text:
          'Big news on the {{TRANSFER WINDOW|janela de transferências}}! Chelsea are closing in on a new {{STRIKER|atacante}} — rumour has it, brilliant boy, tremendous pace.',
        vocab: {
          title: 'Notícias de transferência',
          words: [
            { word: 'Transfer window', meaning: 'janela de transferências' },
            { word: 'Striker', meaning: 'atacante' },
          ],
        },
      },
      teach5: {
        text:
          'Right, five proper football words for you, mate: {{PITCH|campo}}, {{REFEREE|árbitro}}, {{OFFSIDE|impedimento}}, {{CLEAN SHEET|jogo sem sofrer gols}}, {{NUTMEG|caneta/lençol}}. Use them in a sentence and I\'ll check your work!',
        vocab: {
          title: 'Novas palavras',
          words: [
            { word: 'Pitch', meaning: 'campo' },
            { word: 'Referee', meaning: 'árbitro' },
            { word: 'Offside', meaning: 'impedimento' },
            { word: 'Clean sheet', meaning: 'jogo sem sofrer gols' },
            { word: 'Nutmeg', meaning: 'caneta / lençol' },
          ],
        },
      },
      trophies: {
        text:
          'Ah, silverware talk — my favourite! Man City have lifted the {{TROPHY|troféu}} more times than I can count these days. Winning the {{TREBLE|tríplice coroa}} is the ultimate dream for any club, mate.',
        vocab: {
          title: 'Vocabulário do jogo',
          words: [
            { word: 'Trophy', meaning: 'troféu' },
            { word: 'Treble', meaning: 'tríplice coroa (3 títulos na temporada)' },
          ],
        },
      },
      rules: {
        text:
          'Right, let\'s talk laws of the game. {{OFFSIDE|impedimento}} is when an attacker is nearer the goal line than the ball and the last defender at the moment it\'s played. And VAR checks for a {{HANDBALL|mão na bola}} too!',
        vocab: {
          title: 'Vocabulário do jogo',
          words: [
            { word: 'Offside', meaning: 'impedimento' },
            { word: 'Handball', meaning: 'mão na bola' },
          ],
        },
      },
      grammar: {
        text:
          'Lesson time! Notice the phrasal verb "to {{PICK UP|melhorar/evoluir}}" — "United need to pick up their game." In American English you\'d more often hear "soccer" instead of "football" too, mate!',
        vocab: {
          title: 'Vocabulário do jogo',
          words: [{ word: 'Pick up (the game)', meaning: 'melhorar/evoluir no jogo' }],
        },
      },
      fallback: {
        text:
          'Brilliant question, mate! In football terms, I\'d say it\'s all about {{MOMENTUM|embalo}} — teams that build confidence tend to keep winning. What else do you want to know?',
        vocab: { title: 'Vocabulário do jogo', words: [{ word: 'Momentum', meaning: 'embalo/ímpeto' }] },
      },
    },
    fallbackBank: [
      { word: 'Squad', meaning: 'elenco' },
      { word: 'Manager', meaning: 'treinador' },
      { word: 'Derby', meaning: 'clássico' },
    ],
  },

  'la-liga': {
    teachingNote:
      'En Modo Aula me encanta explicar los diminutivos y aumentativos españoles — golazo, partidazo — ¡son geniales!',
    greeting: {
      text:
        '¡Vamos! Bienvenido al {{ESTADIO|estádio}}. Llevo toda la vida siguiendo al Real Madrid con el corazón en la mano. ¿De qué quieres hablar — el {{PARTIDO|jogo}} de ayer, fichajes, o unas palabras nuevas?',
    },
    topics: {
      yesterday: {
        text:
          '¡Qué {{PARTIDAZO|partida incrível}} el de ayer! El Madrid ganó 2-1 con un golazo en el último minuto. ¡Qué barbaridad, casi me da un infarto en la grada!',
        vocab: {
          title: 'Vocabulario del partido',
          words: [
            { word: 'Partidazo', meaning: 'partida incrível (aumentativo)' },
            { word: 'Golazo', meaning: 'golaço' },
          ],
        },
        translation: { from: '🇪🇸 ES', to: '🇧🇷 PT', text: 'Qué barbaridad → Que loucura/absurdo' },
      },
      predictions: {
        text:
          'Para esta {{JORNADA|rodada}}, el Barça va a sufrir contra el Atlético — será un partido muy {{REÑIDO|disputado}}. ¡Vamos con el 2-2!',
        vocab: {
          title: 'Vocabulario del partido',
          words: [
            { word: 'Jornada', meaning: 'rodada' },
            { word: 'Reñido', meaning: 'disputado/acirrado' },
          ],
        },
      },
      transfers: {
        text:
          '¡Atención al {{MERCADO|mercado}} de fichajes! El Madrid está cerca de firmar a un {{CRACK|fenômeno}} sudamericano. ¡Qué fichaje, madre mía!',
        vocab: {
          title: 'Vocabulario de fichajes',
          words: [
            { word: 'Mercado', meaning: 'mercado de transferências' },
            { word: 'Crack', meaning: 'fenômeno/jogador excepcional' },
          ],
        },
      },
      teach5: {
        text:
          'Cinco palabras del fútbol para ti: {{BALÓN|bola}}, {{ÁRBITRO|árbitro}}, {{HINCHA|torcedor}}, {{TACO|chuteira}}, {{GOLEADA|goleada}}. ¡Ahora úsalas en una frase!',
        vocab: {
          title: 'Palabras nuevas',
          words: [
            { word: 'Balón', meaning: 'bola' },
            { word: 'Árbitro', meaning: 'árbitro' },
            { word: 'Hincha', meaning: 'torcedor' },
            { word: 'Taco', meaning: 'chuteira' },
            { word: 'Goleada', meaning: 'goleada' },
          ],
        },
      },
      trophies: {
        text:
          '¡Ay, las {{COPAS|copas}}! El Real Madrid es el rey de la Champions, ¡tiene más orejonas que nadie! Ganar un {{TÍTULO|título}} es la gloria máxima, ¡vamos!',
        vocab: {
          title: 'Vocabulario del partido',
          words: [
            { word: 'Copas', meaning: 'copas/troféus' },
            { word: 'Título', meaning: 'título' },
          ],
        },
      },
      rules: {
        text:
          'Vamos con las reglas: el {{FUERA DE JUEGO|impedimento}} ocurre cuando el atacante está más adelantado que el último defensor al recibir el balón. ¡Y el VAR siempre está vigilando!',
        vocab: {
          title: 'Vocabulario del partido',
          words: [{ word: 'Fuera de juego', meaning: 'impedimento' }],
        },
      },
      grammar: {
        text:
          '¡Lección de gramática! Los aumentativos como "-azo" intensifican todo: gol → golazo, partido → partidazo. ¡Así hablamos de fútbol en español!',
        vocab: {
          title: 'Vocabulario del partido',
          words: [{ word: '-azo (sufijo)', meaning: 'sufixo aumentativo (golazo, partidazo)' }],
        },
      },
      fallback: {
        text:
          '¡Qué buena pregunta! Yo creo que todo depende de la {{AFICIÓN|torcida}} — cuando el estadio empuja, el equipo vuela. ¿Qué más quieres saber?',
        vocab: { title: 'Vocabulario del partido', words: [{ word: 'Afición', meaning: 'torcida' }] },
      },
    },
    fallbackBank: [
      { word: 'Plantilla', meaning: 'elenco' },
      { word: 'Entrenador', meaning: 'treinador' },
      { word: 'Clásico', meaning: 'clássico' },
    ],
  },

  bundesliga: {
    teachingNote:
      'Im Lektionsmodus erkläre ich strukturiert zusammengesetzte Wörter und die Grammatik — sehr präzise, wie es sich gehört.',
    greeting: {
      text:
        'Willkommen im {{STADION|estádio}}. Ich bin Klaus. Lassen Sie uns strukturiert vorgehen: Möchten Sie über das gestrige {{SPIEL|jogo}}, Transfers, oder neue Wörter sprechen?',
    },
    topics: {
      yesterday: {
        text:
          'Das {{SPIEL|jogo}} gestern war SPANNEND. Bayern gewann 3-0 mit einer sehr präzisen {{TAKTIK|tática}}. Effizient und methodisch, wie erwartet.',
        vocab: {
          title: 'Wortschatz des Spiels',
          words: [
            { word: 'Spannend', meaning: 'emocionante' },
            { word: 'Taktik', meaning: 'tática' },
          ],
        },
        translation: { from: '🇩🇪 DE', to: '🇧🇷 PT', text: 'Das Spiel war spannend → O jogo foi emocionante' },
      },
      predictions: {
        text:
          'Für diesen {{SPIELTAG|rodada}} prognostiziere ich einen knappen Sieg für Dortmund. Die {{ABWEHR|defesa}} von Leipzig hat strukturelle Schwächen.',
        vocab: {
          title: 'Wortschatz des Spiels',
          words: [
            { word: 'Spieltag', meaning: 'rodada' },
            { word: 'Abwehr', meaning: 'defesa' },
          ],
        },
      },
      transfers: {
        text:
          'Zum {{TRANSFERMARKT|mercado de transferências}}: Leverkusen verhandelt mit einem talentierten {{MITTELFELDSPIELER|meio-campista}}. Sehr interessante Entwicklung.',
        vocab: {
          title: 'Wortschatz des Spiels',
          words: [
            { word: 'Transfermarkt', meaning: 'mercado de transferências' },
            { word: 'Mittelfeldspieler', meaning: 'meio-campista' },
          ],
        },
      },
      teach5: {
        text:
          'Fünf präzise Fußballwörter: {{DER BALL|a bola}}, {{DAS TOR|o gol}}, {{DER SCHIEDSRICHTER|o árbitro}}, {{DIE MANNSCHAFT|o time}}, {{DAS ABSEITS|o impedimento}}. Bitte bilden Sie einen Satz mit jedem Wort.',
        vocab: {
          title: 'Neue Wörter',
          words: [
            { word: 'Der Ball', meaning: 'a bola' },
            { word: 'Das Tor', meaning: 'o gol' },
            { word: 'Der Schiedsrichter', meaning: 'o árbitro' },
            { word: 'Die Mannschaft', meaning: 'o time' },
            { word: 'Das Abseits', meaning: 'o impedimento' },
          ],
        },
      },
      trophies: {
        text:
          'Zu den {{POKALEN|troféus}}: Bayern München hat die meiste {{MEISTERSCHAFT|conquistas de campeonato}} in der Bundesliga-Geschichte. Sehr konsistent, methodisch aufgebaut.',
        vocab: {
          title: 'Wortschatz des Spiels',
          words: [
            { word: 'Pokale', meaning: 'troféus' },
            { word: 'Meisterschaft', meaning: 'campeonato' },
          ],
        },
      },
      rules: {
        text:
          'Zu den Regeln: {{ABSEITS|impedimento}} liegt vor, wenn ein Angreifer näher an der Torlinie ist als der letzte Verteidiger, sobald der Ball gespielt wird. Sehr strukturiert definiert.',
        vocab: {
          title: 'Wortschatz des Spiels',
          words: [{ word: 'Abseits', meaning: 'impedimento' }],
        },
      },
      grammar: {
        text:
          'Grammatiklektion: Zusammengesetzte Wörter sind zentral im Deutschen. "Fußball" = Fuß (pé) + Ball (bola). "Torwart" = Tor (gol) + Wart (guardião) = goleiro. Sehr logisch, nicht wahr?',
        vocab: {
          title: 'Wortschatz des Spiels',
          words: [{ word: 'Torwart', meaning: 'goleiro (gol + guardião)' }],
        },
      },
      fallback: {
        text:
          'Eine strukturierte Frage. Ich würde sagen, es geht um {{DISZIPLIN|disciplina}} — Teams mit klarer Taktik gewinnen konsistenter. Was möchten Sie noch wissen?',
        vocab: { title: 'Wortschatz des Spiels', words: [{ word: 'Disziplin', meaning: 'disciplina' }] },
      },
    },
    fallbackBank: [
      { word: 'Der Trainer', meaning: 'o treinador' },
      { word: 'Die Liga', meaning: 'a liga' },
      { word: 'Der Sieg', meaning: 'a vitória' },
    ],
  },

  'serie-a': {
    teachingNote:
      'In Modalità Lezione adoro spiegare i superlativi — bellissimo, grandissimo — e i riferimenti culturali italiani.',
    greeting: {
      text:
        'Benvenuto nello {{STADIO|estádio}}! *beija os dedos* Sono Marco, e per me il calcio è arte pura. Parliamo della {{PARTITA|partida}} di ieri, del mercato, o vuoi imparare parole nuove?',
    },
    topics: {
      yesterday: {
        text:
          'Che {{GOLAZZO|golaço}}! *beija os dedos* La Juventus ha vinto 2-0 con una partita {{BELLISSIMA|belíssima}}. Pura arte, amico mio, pura poesia in movimento!',
        vocab: {
          title: 'Vocabolario della partita',
          words: [
            { word: 'Golazzo', meaning: 'golaço' },
            { word: 'Bellissima', meaning: 'belíssima (superlativo)' },
          ],
        },
        translation: { from: '🇮🇹 IT', to: '🇧🇷 PT', text: 'Che golazzo! → Que golaço!' },
      },
      predictions: {
        text:
          'Per questo {{TURNO|rodada}}, il Milan farà una partita {{GRANDISSIMA|grandiosa}} contro l\'Inter. Il derby della Madonnina è sempre pura emozione!',
        vocab: {
          title: 'Vocabolario della partita',
          words: [
            { word: 'Turno', meaning: 'rodada' },
            { word: 'Grandissima', meaning: 'grandiosa (superlativo)' },
          ],
        },
      },
      transfers: {
        text:
          'Nel {{MERCATO|mercado}}, la Roma sta trattando un {{FUOMENO|fenômeno}} brasiliano. Che colpo sarebbe, che spettacolo per i tifosi!',
        vocab: {
          title: 'Vocabolario del mercato',
          words: [
            { word: 'Mercato', meaning: 'mercado de transferências' },
            { word: 'Fenomeno', meaning: 'fenômeno' },
          ],
        },
      },
      teach5: {
        text:
          'Cinque parole del calcio, con passione: {{IL PALLONE|a bola}}, {{LO STADIO|o estádio}}, {{L\'ARBITRO|o árbitro}}, {{LA SQUADRA|o time}}, {{IL FUORIGIOCO|o impedimento}}. Ora crea una frase con ognuna!',
        vocab: {
          title: 'Parole nuove',
          words: [
            { word: 'Il pallone', meaning: 'a bola' },
            { word: 'Lo stadio', meaning: 'o estádio' },
            { word: "L'arbitro", meaning: 'o árbitro' },
            { word: 'La squadra', meaning: 'o time' },
            { word: 'Il fuorigioco', meaning: 'o impedimento' },
          ],
        },
      },
      trophies: {
        text:
          '*beija os dedos* Ah, i {{TROFEI|troféus}}! La Juventus ha il più alto numero di {{SCUDETTI|títulos de campeão italiano}} nella storia. Pura gloria, pura arte del calcio!',
        vocab: {
          title: 'Vocabolario della partita',
          words: [
            { word: 'Trofei', meaning: 'troféus' },
            { word: 'Scudetti', meaning: 'títulos de campeão italiano' },
          ],
        },
      },
      rules: {
        text:
          'Le regole, amico mio: il {{FUORIGIOCO|impedimento}} avviene quando un attaccante è più avanti dell\'ultimo defensore al momento del passaggio. Il VAR controlla sempre, che spettacolo di tecnologia!',
        vocab: {
          title: 'Vocabolario della partita',
          words: [{ word: 'Fuorigioco', meaning: 'impedimento' }],
        },
      },
      grammar: {
        text:
          'Lezione di grammatica! I superlativi assoluti si formano con "-issimo": bello → {{BELLISSIMO|belíssimo}}, grande → grandissimo. Il calcio italiano vive di superlativi, amico!',
        vocab: {
          title: 'Vocabolario della partita',
          words: [{ word: 'Bellissimo', meaning: 'belíssimo (superlativo)' }],
        },
      },
      fallback: {
        text:
          'Che bella domanda! Per me tutto è una questione di {{PASSIONE|paixão}} — senza passione non c\'è vero calcio, non c\'è vera arte. Cosa vuoi sapere ancora?',
        vocab: { title: 'Vocabolario della partita', words: [{ word: 'Passione', meaning: 'paixão' }] },
      },
    },
    fallbackBank: [
      { word: 'Allenatore', meaning: 'treinador' },
      { word: 'Derby', meaning: 'clássico' },
      { word: 'Vittoria', meaning: 'vitória' },
    ],
  },

  'ligue-1': {
    teachingNote:
      'En Mode Cours, j\'aime expliquer le genre grammatical et les expressions élégantes du français.',
    greeting: {
      text:
        'Bienvenue au {{STADE|estádio}}. Je suis Pierre. Le football est un art. Voulez-vous parler du {{MATCH|jogo}} d\'hier, du marché des transferts, ou apprendre des mots nouveaux?',
    },
    topics: {
      yesterday: {
        text:
          'C\'est {{MAGNIFIQUE|magnífico}} ce qui s\'est passé hier! Le PSG a gagné 3-1 avec un {{BUT|gol}} d\'une élégance rare. Le football est vraiment un art, n\'est-ce pas?',
        vocab: {
          title: 'Vocabulaire du match',
          words: [
            { word: 'Magnifique', meaning: 'magnífico' },
            { word: 'But', meaning: 'gol' },
          ],
        },
        translation: { from: '🇫🇷 FR', to: '🇧🇷 PT', text: "C'est magnifique → É magnífico" },
      },
      predictions: {
        text:
          'Pour cette {{JOURNÉE|rodada}}, je pense que Marseille jouera avec une {{ÉLÉGANCE|elegância}} tactique contre Lyon. Un match philosophique, dirais-je.',
        vocab: {
          title: 'Vocabulaire du match',
          words: [
            { word: 'Journée', meaning: 'rodada' },
            { word: 'Élégance', meaning: 'elegância' },
          ],
        },
      },
      transfers: {
        text:
          'Sur le {{MARCHÉ DES TRANSFERTS|mercado de transferências}}, Monaco négocie avec un jeune {{TALENT|talento}} sud-américain. Une signature pleine de promesses artistiques.',
        vocab: {
          title: 'Vocabulaire du marché',
          words: [
            { word: 'Marché des transferts', meaning: 'mercado de transferências' },
            { word: 'Talent', meaning: 'talento' },
          ],
        },
      },
      teach5: {
        text:
          'Cinq mots élégants du football: {{LE BALLON|a bola}}, {{LE STADE|o estádio}}, {{L\'ARBITRE|o árbitro}}, {{L\'ÉQUIPE|o time}}, {{LE HORS-JEU|o impedimento}}. Créez une phrase avec chacun, s\'il vous plaît.',
        vocab: {
          title: 'Nouveaux mots',
          words: [
            { word: 'Le ballon', meaning: 'a bola' },
            { word: 'Le stade', meaning: 'o estádio' },
            { word: "L'arbitre", meaning: 'o árbitro' },
            { word: "L'équipe", meaning: 'o time' },
            { word: 'Le hors-jeu', meaning: 'o impedimento' },
          ],
        },
      },
      trophies: {
        text:
          'Ah, les {{TROPHÉES|troféus}}! Le PSG collectionne les titres nationaux avec une régularité presque philosophique. Soulever une {{COUPE|copa}} est une œuvre d\'art collective.',
        vocab: {
          title: 'Vocabulaire du match',
          words: [
            { word: 'Trophées', meaning: 'troféus' },
            { word: 'Coupe', meaning: 'copa' },
          ],
        },
      },
      rules: {
        text:
          'Parlons des règles: le {{HORS-JEU|impedimento}} survient quand un attaquant est plus proche de la ligne de but que le dernier défenseur au moment de la passe. Une règle d\'une précision presque mathématique.',
        vocab: {
          title: 'Vocabulaire du match',
          words: [{ word: 'Hors-jeu', meaning: 'impedimento' }],
        },
      },
      grammar: {
        text:
          'Leçon de grammaire: en français, tous les noms ont un genre — "le ballon" (masculin), "la victoire" (féminin). Le football français est aussi une question d\'harmonie grammaticale!',
        vocab: {
          title: 'Vocabulaire du match',
          words: [{ word: 'La victoire', meaning: 'a vitória (feminino)' }],
        },
      },
      fallback: {
        text:
          'Quelle belle question philosophique! Je dirais que tout est une question d\'{{HARMONIE|harmonia}} collective sur le terrain. Que voulez-vous savoir de plus?',
        vocab: { title: 'Vocabulaire du match', words: [{ word: 'Harmonie', meaning: 'harmonia' }] },
      },
    },
    fallbackBank: [
      { word: "L'entraîneur", meaning: 'o treinador' },
      { word: 'Le derby', meaning: 'o clássico' },
      { word: 'La victoire', meaning: 'a vitória' },
    ],
  },

  brasileirao: {
    teachingNote:
      'No Modo Aula eu adoro explicar as gírias brasileiras e as diferenças entre o português do Brasil e de Portugal, meu filho!',
    greeting: {
      text:
        'Ô, seja bem-vindo ao {{ESTÁDIO|campo de jogo}}! *explode de emoção* Eu sou o João, narrador lendário! Quer falar do {{JOGO|partida}} de ontem, do mercado da bola, ou aprender palavras novas?',
    },
    topics: {
      yesterday: {
        text:
          'Que {{GOLAÇO|gol incrível}}, meu filho! *explode de emoção* O Flamengo GANHOU de 3 a 1 com uma {{JOGADA|lance de jogo}} de outro mundo aos 45 minutos! GOLAAAÇO!',
        vocab: {
          title: 'Vocabulário do jogo',
          words: [
            { word: 'Golaço', meaning: 'gol muito bonito' },
            { word: 'Jogada', meaning: 'lance/ação do jogo' },
          ],
        },
        translation: { from: '🇧🇷 PT-BR', to: '🇵🇹 PT-PT', text: 'Golaço → em Portugal também se diz "grande golo"' },
      },
      predictions: {
        text:
          'Pra essa {{RODADA|conjunto de jogos da semana}}, eu tô sentindo um {{CLÁSSICO|jogo entre rivais}} elétrico entre Corinthians e Palmeiras! Vai ser fogo, doutor!',
        vocab: {
          title: 'Vocabulário do jogo',
          words: [
            { word: 'Rodada', meaning: 'conjunto de jogos da semana' },
            { word: 'Clássico', meaning: 'jogo entre times rivais' },
          ],
        },
      },
      transfers: {
        text:
          'Ó a novidade do {{MERCADO DA BOLA|mercado de transferências}}! O São Paulo tá quase fechando com uma {{PROMESSA|jovem talento}} da base. Vai ser um estouro, viu!',
        vocab: {
          title: 'Vocabulário do jogo',
          words: [
            { word: 'Mercado da bola', meaning: 'mercado de transferências' },
            { word: 'Promessa', meaning: 'jovem talento em ascensão' },
          ],
        },
      },
      teach5: {
        text:
          'Cinco palavras do futebol brasileiro pra você: {{BOLA|a bola}}, {{TORCIDA|os fãs do time}}, {{CRAQUE|jogador excepcional}}, {{CANETA|dropar a bola entre as pernas do adversário}}, {{ZAGUEIRO|defensor central}}. Agora monta uma frase com cada uma!',
        vocab: {
          title: 'Novas palavras',
          words: [
            { word: 'Bola', meaning: 'a bola' },
            { word: 'Torcida', meaning: 'os fãs do time' },
            { word: 'Craque', meaning: 'jogador excepcional' },
            { word: 'Caneta', meaning: 'dropar a bola entre as pernas do adversário' },
            { word: 'Zagueiro', meaning: 'defensor central' },
          ],
        },
      },
      trophies: {
        text:
          'Ô os {{TROFÉUS|troféus}}, meu filho! O Palmeiras tá aí na frente com o maior número de {{TÍTULOS|conquistas}} do Brasileirão nos últimos anos! É pura emoção levantar a taça!',
        vocab: {
          title: 'Vocabulário do jogo',
          words: [
            { word: 'Troféus', meaning: 'troféus' },
            { word: 'Títulos', meaning: 'conquistas/campeonatos vencidos' },
          ],
        },
      },
      rules: {
        text:
          'Vamos de regra, doutor! O {{IMPEDIMENTO|posição irregular do atacante}} acontece quando o atacante tá na frente do último defensor no momento do passe. E o VAR tá sempre de olho, viu!',
        vocab: {
          title: 'Vocabulário do jogo',
          words: [{ word: 'Impedimento', meaning: 'posição irregular do atacante' }],
        },
      },
      grammar: {
        text:
          'Aula de gramática, meu filho! No Brasil a gente usa muito o gerúndio: "tá jogando", "tá fazendo". Em Portugal, o pessoal fala "está a jogar". Duas formas bonitas da nossa língua!',
        vocab: {
          title: 'Vocabulário do jogo',
          words: [{ word: 'Está a jogar (PT-PT)', meaning: 'equivalente a "tá jogando" no PT-BR' }],
        },
      },
      fallback: {
        text:
          'Ô que pergunta boa, doutor! Eu acho que tudo depende da {{RAÇA|determinação/vontade de vencer}} em campo. É isso que decide os jogos! O que mais você quer saber?',
        vocab: { title: 'Vocabulário do jogo', words: [{ word: 'Raça', meaning: 'determinação/vontade de vencer' }] },
      },
    },
    fallbackBank: [
      { word: 'Técnico', meaning: 'treinador' },
      { word: 'Arquibancada', meaning: 'setor do estádio onde a torcida fica' },
      { word: 'Camisa', meaning: 'uniforme do time' },
    ],
  },
};

export function parseHighlights(raw: string): { text: string; highlights: { word: string; translation: string }[] } {
  const highlights: { word: string; translation: string }[] = [];
  const text = raw.replace(/\{\{([^|]+)\|([^}]+)\}\}/g, (_m, word, translation) => {
    highlights.push({ word, translation });
    return word;
  });
  return { text, highlights };
}

export function buildResponse(leagueId: string, mode: ChatMode, userMessage: string) {
  const bank = CONTENT_BANK[leagueId];
  const topic = classifyTopic(userMessage);
  const content: TopicContent =
    topic === 'greeting' ? bank.greeting : bank.topics[topic];

  const { text, highlights } = parseHighlights(content.text);
  const lessonAddendum = mode === 'lesson' ? `\n\n📘 ${bank.teachingNote}` : '';

  return {
    text: text + lessonAddendum,
    highlights,
    vocabCard: content.vocab,
    translation: content.translation,
    quickActions: QUICK_ACTIONS,
  };
}

export function buildGreeting(leagueId: string) {
  const bank = CONTENT_BANK[leagueId];
  const { text, highlights } = parseHighlights(bank.greeting.text);
  return { text, highlights, quickActions: QUICK_ACTIONS };
}
