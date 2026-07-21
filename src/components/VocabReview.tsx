import { useMemo, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { speak, canSpeak } from '../utils/speech';
import { Button } from './Button';
import './VocabReview.css';

interface VocabReviewProps {
  onClose: () => void;
}

function formatRelative(ms: number): string {
  const diff = ms - Date.now();
  if (diff <= 0) return 'agora';
  const hours = Math.round(diff / (60 * 60 * 1000));
  if (hours < 1) return 'em menos de 1h';
  if (hours < 24) return `em ${hours}h`;
  const days = Math.round(hours / 24);
  return `em ${days} ${days === 1 ? 'dia' : 'dias'}`;
}

export function VocabReview({ onClose }: VocabReviewProps) {
  const { progress, reviewWord } = useApp();
  const startXpRef = useRef(progress.xp);

  const [queue] = useState(() => progress.vocabDeck.filter((w) => w.dueAt <= Date.now()));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const nextDue = useMemo(() => {
    if (progress.vocabDeck.length === 0) return null;
    return Math.min(...progress.vocabDeck.map((w) => w.dueAt));
  }, [progress.vocabDeck]);

  const current = queue[index];
  const done = index >= queue.length;

  const handleAnswer = (correct: boolean) => {
    reviewWord(current.word, correct);
    setRevealed(false);
    setIndex((i) => i + 1);
  };

  return (
    <div className="review-overlay" onClick={onClose}>
      <div className="review-card" onClick={(e) => e.stopPropagation()}>
        <header className="review-header">
          <h3>📚 Revisão de Vocabulário</h3>
          <button className="review-close-btn" onClick={onClose} aria-label="Fechar revisão">
            ✕
          </button>
        </header>

        {progress.vocabDeck.length === 0 && (
          <div className="review-empty">
            <div className="review-empty-emoji">🗒️</div>
            <p>Você ainda não tem palavras salvas.</p>
            <p className="review-empty-hint">Converse com os comentaristas e adicione palavras ao seu deck!</p>
          </div>
        )}

        {progress.vocabDeck.length > 0 && queue.length === 0 && (
          <div className="review-empty">
            <div className="review-empty-emoji">🎉</div>
            <p>Tudo revisado por hoje!</p>
            <p className="review-empty-hint">
              Você tem {progress.vocabDeck.length} {progress.vocabDeck.length === 1 ? 'palavra' : 'palavras'} no
              deck. Próxima revisão {nextDue ? formatRelative(nextDue) : ''}.
            </p>
          </div>
        )}

        {queue.length > 0 && !done && current && (
          <>
            <div className="review-progress-label">
              Carta {index + 1} de {queue.length}
            </div>
            <div className={`review-flashcard ${revealed ? 'revealed' : ''}`} onClick={() => setRevealed(true)}>
              {canSpeak() && (
                <button
                  className="review-speak-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(current.word, current.lang);
                  }}
                  aria-label={`Ouvir pronúncia de ${current.word}`}
                  type="button"
                >
                  🔊
                </button>
              )}
              <div className="review-flashcard-front">
                <span className="review-word">{current.word}</span>
                {!revealed && <span className="review-tap-hint">Toque para ver o significado</span>}
              </div>
              {revealed && <div className="review-flashcard-meaning">{current.meaning}</div>}
            </div>

            {revealed && (
              <div className="review-answer-buttons">
                <button className="review-btn-wrong" onClick={() => handleAnswer(false)}>
                  ❌ Errei
                </button>
                <button className="review-btn-right" onClick={() => handleAnswer(true)}>
                  ✅ Acertei
                </button>
              </div>
            )}
          </>
        )}

        {queue.length > 0 && done && (
          <div className="review-empty">
            <div className="review-empty-emoji">🏅</div>
            <p>Revisão concluída!</p>
            <p className="review-empty-hint">
              Você revisou {queue.length} {queue.length === 1 ? 'palavra' : 'palavras'}
              {progress.xp - startXpRef.current > 0 ? ` e ganhou +${progress.xp - startXpRef.current} XP` : ''}.
            </p>
            <Button onClick={onClose} fullWidth>
              Fechar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
