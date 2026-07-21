import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LEAGUES } from '../data/leagues';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { ChatPanel } from '../components/ChatPanel';
import './Dashboard.css';

export function Dashboard() {
  const { user, progress, selectLeague } = useApp();
  const [chatOpen, setChatOpen] = useState(false);

  const selectedLeague = LEAGUES.find((l) => l.id === progress.selectedLeagueId) ?? null;
  const initial = (user?.name ?? 'V').charAt(0).toUpperCase();

  const handleOpenChat = () => {
    if (selectedLeague) setChatOpen(true);
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-header-inner">
          <div className="dashboard-header-left">
            <div className="dashboard-logo">⚽</div>
            <span className="dashboard-title">Futbolingo</span>
          </div>
          <div className="dashboard-header-right">
            <Badge variant="streak">🔥 {progress.streak} dias</Badge>
            <Avatar size={38} gradient="gold">
              {initial}
            </Avatar>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <Card className="card-progress">
          <div className="progress-card-header">
            <h3>📈 Seu Progresso</h3>
            <Badge variant="level">{progress.level}</Badge>
          </div>
          <ProgressBar value={progress.xp} max={progress.xpGoal} />
          <div className="progress-stats">
            <span>
              {progress.xp} / {progress.xpGoal} XP
            </span>
            <span>Próximo: {progress.nextLevel}</span>
          </div>
        </Card>

        <div className="stats-grid">
          <Card className="card-stat">
            <div className="stat-emoji">💬</div>
            <div className="stat-value">{progress.conversations}</div>
            <div className="stat-label">Conversas</div>
          </Card>
          <Card className="card-stat">
            <div className="stat-emoji">📚</div>
            <div className="stat-value">{progress.wordsLearned}</div>
            <div className="stat-label">Palavras</div>
          </Card>
          <Card className="card-stat">
            <div className="stat-emoji">⏱️</div>
            <div className="stat-value">{progress.hoursStudied}h</div>
            <div className="stat-label">Estudando</div>
          </Card>
        </div>

        <section className="league-section">
          <h3 className="league-section-title">🏆 Escolha sua Liga</h3>
          <div className="league-grid">
            {LEAGUES.map((league) => {
              const active = league.id === progress.selectedLeagueId;
              const played = progress.leagueMatches[league.id] ?? league.matchesPlayed;
              return (
                <Card
                  key={league.id}
                  className={`card-league ${active ? 'active' : ''}`}
                  style={
                    {
                      '--league-color': league.color,
                      borderTopColor: active ? league.color : undefined,
                    } as React.CSSProperties
                  }
                  role="button"
                  tabIndex={0}
                  aria-pressed={active}
                  onClick={() => selectLeague(league.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') selectLeague(league.id);
                  }}
                >
                  <div className="league-emoji">{league.emoji}</div>
                  <div className="league-name">{league.name}</div>
                  <div className="league-lang">
                    {league.languageFlag} {league.languageName}
                  </div>
                  <div className="league-progress">
                    {played}/{league.matchesTotal}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      <button
        className="chat-fab"
        onClick={handleOpenChat}
        disabled={!selectedLeague}
        aria-label="Abrir chat com o comentarista"
        title={selectedLeague ? 'Abrir chat' : 'Escolha uma liga primeiro'}
      >
        💬
        <span className="chat-fab-badge">3</span>
      </button>

      {chatOpen && selectedLeague && <ChatPanel league={selectedLeague} onClose={() => setChatOpen(false)} />}
    </div>
  );
}
