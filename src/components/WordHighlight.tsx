import { useState } from 'react';
import './WordHighlight.css';

interface WordHighlightProps {
  word: string;
  translation: string;
}

export function WordHighlight({ word, translation }: WordHighlightProps) {
  const [show, setShow] = useState(false);

  return (
    <span
      className="word-highlight"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={() => setShow((s) => !s)}
      tabIndex={0}
    >
      {word}
      {show && <span className="word-tooltip">{translation}</span>}
    </span>
  );
}

export function renderHighlightedText(text: string, highlights: { word: string; translation: string }[]) {
  if (!highlights.length) return text;
  const pattern = highlights.map((h) => h.word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'g');
  const parts = text.split(regex);

  return parts.map((part, i) => {
    const match = highlights.find((h) => h.word === part);
    if (match) {
      return <WordHighlight key={`${part}-${i}`} word={match.word} translation={match.translation} />;
    }
    return <span key={i}>{part}</span>;
  });
}
