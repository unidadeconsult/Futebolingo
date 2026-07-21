import type { VocabWord } from '../types';
import { useApp } from '../context/AppContext';
import './VocabCard.css';

interface VocabCardProps {
  title: string;
  words: VocabWord[];
}

export function VocabCard({ title, words }: VocabCardProps) {
  const { addVocabWord, isWordSaved } = useApp();

  return (
    <div className="vocab-card">
      <div className="vocab-card-title">📝 {title}</div>
      <ul className="vocab-card-list">
        {words.map((w) => {
          const saved = isWordSaved(w.word);
          return (
            <li key={w.word}>
              <div>
                <strong>{w.word}</strong>
                <span className="vocab-meaning">{w.meaning}</span>
              </div>
              <button
                className={`vocab-add-btn ${saved ? 'saved' : ''}`}
                onClick={() => !saved && addVocabWord(w)}
                disabled={saved}
                aria-label={saved ? `${w.word} adicionada ao deck` : `Adicionar ${w.word} ao deck`}
              >
                {saved ? '✓' : '+'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
