import type { VocabWord } from '../types';
import { useApp } from '../context/AppContext';
import { speak, canSpeak } from '../utils/speech';
import './VocabCard.css';

interface VocabCardProps {
  title: string;
  words: VocabWord[];
  speechLang: string;
}

export function VocabCard({ title, words, speechLang }: VocabCardProps) {
  const { addVocabWord, isWordSaved } = useApp();

  return (
    <div className="vocab-card">
      <div className="vocab-card-title">📝 {title}</div>
      <ul className="vocab-card-list">
        {words.map((w) => {
          const saved = isWordSaved(w.word);
          return (
            <li key={w.word}>
              <div className="vocab-word-line">
                {canSpeak() && (
                  <button
                    className="vocab-speak-btn"
                    onClick={() => speak(w.word, speechLang)}
                    aria-label={`Ouvir pronúncia de ${w.word}`}
                    type="button"
                  >
                    🔊
                  </button>
                )}
                <div>
                  <strong>{w.word}</strong>
                  <span className="vocab-meaning">{w.meaning}</span>
                </div>
              </div>
              <button
                className={`vocab-add-btn ${saved ? 'saved' : ''}`}
                onClick={() => !saved && addVocabWord(w, speechLang)}
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
