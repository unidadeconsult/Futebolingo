# Futbolingo ⚽

Aprenda idiomas através da paixão pelo futebol. Converse com comentaristas de futebol de seis ligas diferentes, cada um com uma persona e sotaque próprios, e aprenda vocabulário no idioma nativo daquele país em tempo real.

## Stack

- React 19 + TypeScript + Vite
- CSS puro seguindo um design system próprio (sem frameworks de UI)
- Estado e progresso persistidos em `localStorage`
- IA simulada (mock) com respostas pré-programadas por liga/tópico

## Rodando localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Estrutura

- `src/data/leagues.ts` — as 6 ligas e as personas dos comentaristas
- `src/data/aiResponses.ts` — motor de respostas mockadas da IA (destaques de vocabulário, cartões de vocabulário, tradução, quick actions)
- `src/context/AppContext.tsx` — estado do usuário e progresso, persistido em `localStorage`
- `src/components/` — componentes reutilizáveis (Button, Card, Input, MessageBubble, WordHighlight, VocabCard, ProgressBar, Avatar, Badge, ChatPanel)
- `src/screens/` — telas de Login/Onboarding e Dashboard
