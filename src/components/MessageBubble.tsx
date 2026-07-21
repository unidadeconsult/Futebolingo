import type { ChatMessage } from '../types';
import { renderHighlightedText } from './WordHighlight';
import { VocabCard } from './VocabCard';
import { Button } from './Button';
import './MessageBubble.css';

interface MessageBubbleProps {
  message: ChatMessage;
  onQuickAction: (action: string) => void;
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function MessageBubble({ message, onQuickAction }: MessageBubbleProps) {
  const isAI = message.sender === 'ai';

  return (
    <div className={`message-row ${isAI ? 'from-ai' : 'from-user'}`}>
      <div className={`message-bubble ${isAI ? 'bubble-ai' : 'bubble-user'}`}>
        <p className="message-text">
          {isAI ? renderHighlightedText(message.text, message.highlights ?? []) : message.text}
        </p>

        {message.translation && (
          <div className="translation-bar">
            <span className="translation-lang">{message.translation.from}</span>
            <span className="translation-text">{message.translation.text}</span>
            <span className="translation-lang">{message.translation.to}</span>
          </div>
        )}

        {message.vocabCard && <VocabCard title={message.vocabCard.title} words={message.vocabCard.words} />}
      </div>
      <span className="message-timestamp">{formatTime(message.timestamp)}</span>

      {isAI && message.quickActions && (
        <div className="quick-actions">
          {message.quickActions.map((action) => (
            <Button key={action} variant="chip" onClick={() => onQuickAction(action)}>
              {action}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
