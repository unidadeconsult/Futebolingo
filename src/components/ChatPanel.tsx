import { useEffect, useRef, useState } from 'react';
import type { ChatMessage, ChatMode, LeagueDef } from '../types';
import { buildGreeting, buildResponse, TOPIC_SUGGESTIONS } from '../data/aiResponses';
import { useApp } from '../context/AppContext';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { Button } from './Button';
import { AutoTextarea } from './Input';
import './ChatPanel.css';

interface ChatPanelProps {
  league: LeagueDef;
  onClose: () => void;
}

let idCounter = 0;
function nextId() {
  idCounter += 1;
  return `msg-${Date.now()}-${idCounter}`;
}

export function ChatPanel({ league, onClose }: ChatPanelProps) {
  const { incrementConversations, addXp, progress } = useApp();
  const [closing, setClosing] = useState(false);
  const [mode, setMode] = useState<ChatMode>('free');
  const [messagesByLeague, setMessagesByLeague] = useState<Record<string, ChatMessage[]>>({});
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [recap, setRecap] = useState<{ xp: number; words: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionStartRef = useRef({ xp: progress.xp, words: progress.vocabDeck.length });

  const messages = messagesByLeague[league.id] ?? [];

  useEffect(() => {
    if (messages.length > 0) return;
    setIsTyping(true);
    const delay = 900 + Math.random() * 600;
    const timer = setTimeout(() => {
      const greeting = buildGreeting(league.id);
      setMessagesByLeague((prev) => ({
        ...prev,
        [league.id]: [
          {
            id: nextId(),
            sender: 'ai',
            text: greeting.text,
            highlights: greeting.highlights,
            quickActions: greeting.quickActions,
            timestamp: Date.now(),
          },
        ],
      }));
      setIsTyping(false);
    }, delay);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [league.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const finishClose = () => {
    setClosing(true);
    setTimeout(onClose, 250);
  };

  const handleClose = () => {
    const deltaXp = progress.xp - sessionStartRef.current.xp;
    const deltaWords = progress.vocabDeck.length - sessionStartRef.current.words;
    if (deltaXp > 0 || deltaWords > 0) {
      setRecap({ xp: deltaXp, words: deltaWords });
    } else {
      finishClose();
    }
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: nextId(),
      sender: 'user',
      text: trimmed,
      timestamp: Date.now(),
    };

    setMessagesByLeague((prev) => ({ ...prev, [league.id]: [...(prev[league.id] ?? []), userMsg] }));
    setInput('');
    setIsTyping(true);
    incrementConversations();

    const delay = 1500 + Math.random() * 1000;
    setTimeout(() => {
      const response = buildResponse(league.id, mode, trimmed);
      const aiMsg: ChatMessage = {
        id: nextId(),
        sender: 'ai',
        text: response.text,
        highlights: response.highlights,
        vocabCard: response.vocabCard,
        translation: response.translation,
        quickActions: response.quickActions,
        timestamp: Date.now(),
      };
      setMessagesByLeague((prev) => ({ ...prev, [league.id]: [...(prev[league.id] ?? []), aiMsg] }));
      setIsTyping(false);
      addXp(5);
    }, delay);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className={`chat-overlay ${closing ? 'closing' : ''}`} onClick={recap ? undefined : handleClose}>
      <div className="chat-panel" onClick={(e) => e.stopPropagation()}>
        <header className="chat-header">
          <div className="chat-header-avatar">{league.persona.emoji}</div>
          <div className="chat-header-info">
            <div className="chat-header-name">{league.persona.name}</div>
            <div className="chat-header-desc">{league.persona.title}</div>
          </div>
          <button className="chat-close-btn" onClick={handleClose} aria-label="Fechar chat">
            ✕
          </button>
        </header>

        {recap ? (
          <div className="chat-recap">
            <div className="chat-recap-emoji">🏅</div>
            <h3>Boa! Sessão concluída</h3>
            <div className="chat-recap-stats">
              {recap.xp > 0 && (
                <div className="chat-recap-stat">
                  <span className="chat-recap-value">+{recap.xp}</span>
                  <span className="chat-recap-label">XP ganho</span>
                </div>
              )}
              {recap.words > 0 && (
                <div className="chat-recap-stat">
                  <span className="chat-recap-value">+{recap.words}</span>
                  <span className="chat-recap-label">{recap.words === 1 ? 'palavra nova' : 'palavras novas'}</span>
                </div>
              )}
            </div>
            <Button onClick={finishClose} fullWidth>
              Voltar ao Dashboard
            </Button>
          </div>
        ) : (
          <>
            <div className="chat-mode-toggle-wrap">
              <div className="chat-mode-toggle">
                <button
                  className={mode === 'lesson' ? 'active' : ''}
                  onClick={() => setMode('lesson')}
                  type="button"
                >
                  📚 Modo Aula
                </button>
                <button className={mode === 'free' ? 'active' : ''} onClick={() => setMode('free')} type="button">
                  💬 Conversa Livre
                </button>
              </div>
            </div>

            <div className="chat-suggestions">
              {TOPIC_SUGGESTIONS.map((chip) => (
                <Button key={chip} variant="chip" onClick={() => sendMessage(chip)}>
                  {chip}
                </Button>
              ))}
            </div>

            <div className="chat-messages" ref={scrollRef}>
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} onQuickAction={sendMessage} speechLang={league.speechLang} />
              ))}
              {isTyping && (
                <div className="message-row from-ai">
                  <TypingIndicator />
                </div>
              )}
            </div>

            <form className="chat-input-area" onSubmit={handleSubmit}>
              <AutoTextarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite sua mensagem..."
                aria-label="Mensagem"
              />
              <Button variant="icon" type="submit" disabled={!input.trim()} aria-label="Enviar mensagem">
                ➤
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
