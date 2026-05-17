import { useState } from 'react';
import { LESSONS, ALL_GAMES, Game, Lesson } from '@/data/lessons';
import { useUserStore } from '@/store/userStore';
import GamePlayer from '@/components/GamePlayer';
import Certificate from '@/components/Certificate';
import Icon from '@/components/ui/icon';

type Screen = 'catalog' | 'lesson' | 'profile' | 'stats';

export default function Index() {
  const { profile, updateProfile, recordGameResult, isGameCompleted, getGameResult } = useUserStore();
  const [screen, setScreen] = useState<Screen>('catalog');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [showCert, setShowCert] = useState(false);
  const [gradeFilter, setGradeFilter] = useState<'all' | '7' | '8' | '9'>('all');

  const completedCount = profile.completedGames.length;
  const totalXp = profile.totalXp;
  const pct = Math.round((completedCount / ALL_GAMES.length) * 100);

  const filteredLessons = gradeFilter === 'all' ? LESSONS : LESSONS.filter(l => l.grade === gradeFilter);

  const handleGameComplete = (score: number, maxScore: number, seconds: number) => {
    if (!activeGame) return;
    recordGameResult({ gameId: activeGame.id, score, maxScore, date: new Date().toISOString(), timeSeconds: seconds });
    setTimeout(() => setActiveGame(null), 1500);
  };

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => { setScreen('catalog'); setSelectedLesson(null); }} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl">⬡</span>
            <span className="font-black text-white text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>ИнфоГрад</span>
          </button>
          <nav className="hidden sm:flex items-center gap-1">
            {(['catalog', 'stats', 'profile'] as Screen[]).map(s => (
              <button
                key={s}
                onClick={() => { setScreen(s); setSelectedLesson(null); }}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${screen === s ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {s === 'catalog' ? 'Уроки' : s === 'stats' ? 'Статистика' : 'Профиль'}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-xs font-bold text-primary">{totalXp}</span>
              <span className="text-xs text-primary/60">XP</span>
            </div>
            <button onClick={() => { setScreen('profile'); setSelectedLesson(null); }} className="w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-sm hover:border-primary/50 transition-colors">
              {profile.avatar}
            </button>
          </div>
        </div>
        <div className="sm:hidden flex border-t border-border">
          {(['catalog', 'stats', 'profile'] as Screen[]).map(s => (
            <button
              key={s}
              onClick={() => { setScreen(s); setSelectedLesson(null); }}
              className={`flex-1 py-2 text-xs font-medium transition-all ${screen === s ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {s === 'catalog' ? '📚 Уроки' : s === 'stats' ? '📊 Статистика' : '👤 Профиль'}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* CATALOG */}
        {screen === 'catalog' && !selectedLesson && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Каталог уроков
              </h1>
              <p className="text-muted-foreground">Информатика для 7–9 классов · {ALL_GAMES.length} игр · {LESSONS.length} тем</p>
            </div>

            <div className="glass rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Общий прогресс</span>
                <span className="text-sm font-bold text-primary">{completedCount} / {ALL_GAMES.length} игр</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="progress-bar h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{pct}% выполнено</p>
            </div>

            <div className="flex gap-2 mb-6">
              {(['all', '7', '8', '9'] as const).map(g => (
                <button
                  key={g}
                  onClick={() => setGradeFilter(g)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${gradeFilter === g ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}
                >
                  {g === 'all' ? 'Все классы' : `${g} класс`}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLessons.map((lesson, idx) => {
                const lessonCompleted = lesson.games.filter(g => isGameCompleted(g.id)).length;
                const lessonPct = Math.round((lessonCompleted / lesson.games.length) * 100);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => { setSelectedLesson(lesson); setScreen('lesson'); }}
                    className="glass rounded-2xl p-5 text-left hover:border-primary/40 transition-all hover:scale-[1.01] group animate-fade-in"
                    style={{ animationDelay: `${idx * 0.05}s`, borderColor: lessonPct === 100 ? lesson.color + '60' : undefined }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-3xl">{lesson.icon}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">{lesson.grade} кл.</span>
                        {lessonPct === 100 && <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">✓</span>}
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm leading-snug mb-1 group-hover:text-white transition-colors">{lesson.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{lesson.topic} · {lesson.games.length} игр</p>
                    <div className="w-full bg-secondary rounded-full h-1">
                      <div className="h-1 rounded-full transition-all" style={{ width: `${lessonPct}%`, background: lesson.color }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{lessonCompleted} / {lesson.games.length}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* LESSON DETAIL */}
        {screen === 'lesson' && selectedLesson && (
          <div className="animate-fade-in">
            <button onClick={() => { setScreen('catalog'); setSelectedLesson(null); }} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm">
              <Icon name="ArrowLeft" size={16} />
              Назад к каталогу
            </button>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl">{selectedLesson.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ background: selectedLesson.color + '80' }}>{selectedLesson.grade} класс</span>
                  <span className="text-xs text-muted-foreground">{selectedLesson.topic}</span>
                </div>
                <h1 className="text-2xl font-black text-white">{selectedLesson.title}</h1>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {selectedLesson.games.map((game, idx) => {
                const done = isGameCompleted(game.id);
                const result = getGameResult(game.id);
                const diffColors: Record<string, string> = { easy: '#10b981', medium: '#f59e0b', hard: '#ef4444' };
                const diffLabels: Record<string, string> = { easy: 'Лёгкий', medium: 'Средний', hard: 'Сложный' };
                return (
                  <div
                    key={game.id}
                    className="glass rounded-2xl p-5 animate-fade-in"
                    style={{ animationDelay: `${idx * 0.08}s`, borderColor: done ? '#10b98140' : undefined }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: diffColors[game.difficulty] + '20', color: diffColors[game.difficulty] }}>{diffLabels[game.difficulty]}</span>
                          <span className="text-xs text-primary">+{game.xp} XP</span>
                          {done && <span className="text-xs text-green-400">✓ Пройдено</span>}
                        </div>
                        <h3 className="font-semibold text-foreground">{game.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{game.description}</p>
                      </div>
                    </div>
                    {result && (
                      <div className="mb-3">
                        <div className="w-full bg-secondary rounded-full h-1 mb-1">
                          <div className="progress-bar h-1 rounded-full" style={{ width: `${Math.round((result.score / result.maxScore) * 100)}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground">{result.score}/{result.maxScore} правильных</p>
                      </div>
                    )}
                    <button
                      onClick={() => setActiveGame(game)}
                      className="w-full py-2 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: done ? 'hsl(142 71% 45% / 0.15)' : `${selectedLesson.color}25`,
                        color: done ? '#10b981' : selectedLesson.color,
                        border: `1px solid ${done ? '#10b98140' : selectedLesson.color + '40'}`,
                      }}
                    >
                      {done ? 'Сыграть снова' : 'Начать игру'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STATS */}
        {screen === 'stats' && (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-black text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Статистика</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { icon: '🎮', label: 'Игр пройдено', val: completedCount },
                { icon: '⭐', label: 'Очков XP', val: totalXp },
                { icon: '📚', label: 'Прогресс', val: `${pct}%` },
                { icon: '🏅', label: 'Лучший результат', val: profile.gameResults.reduce((a, r) => Math.max(a, r.maxScore > 0 ? Math.round((r.score / r.maxScore) * 100) : 0), 0) + '%' },
              ].map((s, i) => (
                <div key={i} className="glass rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <div className="text-2xl font-black text-white">{s.val}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-5 mb-6">
              <h2 className="font-bold text-foreground mb-4">Прогресс по темам</h2>
              <div className="space-y-3">
                {LESSONS.map(lesson => {
                  const done = lesson.games.filter(g => isGameCompleted(g.id)).length;
                  const lp = Math.round((done / lesson.games.length) * 100);
                  return (
                    <div key={lesson.id} className="flex items-center gap-3">
                      <span className="text-lg w-8">{lesson.icon}</span>
                      <div className="flex-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-foreground font-medium">{lesson.title}</span>
                          <span className="text-muted-foreground">{done}/{lesson.games.length}</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-1.5">
                          <div className="h-1.5 rounded-full transition-all" style={{ width: `${lp}%`, background: lesson.color }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => setShowCert(true)}
              className="w-full py-4 rounded-2xl font-bold text-lg transition-all hover:scale-[1.01] flex items-center justify-center gap-3"
              style={{ background: 'linear-gradient(135deg, hsl(217 91% 60% / 0.2), hsl(142 71% 45% / 0.2))', border: '1px solid hsl(217 91% 60% / 0.3)', color: 'hsl(217, 91%, 70%)' }}
            >
              <span>🎓</span>
              Получить сертификат
            </button>
          </div>
        )}

        {/* PROFILE */}
        {screen === 'profile' && (
          <div className="animate-fade-in max-w-lg mx-auto">
            <h1 className="text-3xl font-black text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>Профиль</h1>

            <div className="glass rounded-2xl p-6 mb-4">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-3xl">
                  {profile.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {profile.firstName || profile.lastName ? `${profile.firstName} ${profile.lastName}`.trim() : 'Укажи имя'}
                  </h2>
                  <p className="text-muted-foreground text-sm">{profile.grade ? `${profile.grade} класс` : 'Класс не указан'}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Имя</label>
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={e => updateProfile({ firstName: e.target.value })}
                    placeholder="Введи имя..."
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Фамилия</label>
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={e => updateProfile({ lastName: e.target.value })}
                    placeholder="Введи фамилию..."
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Класс</label>
                  <select
                    value={profile.grade}
                    onChange={e => updateProfile({ grade: e.target.value })}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="7">7 класс</option>
                    <option value="8">8 класс</option>
                    <option value="9">9 класс</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Аватар</label>
                  <div className="flex gap-2 flex-wrap">
                    {['🎓', '🚀', '💻', '🤖', '🧑‍💻', '👩‍💻', '🦾', '⚡'].map(a => (
                      <button
                        key={a}
                        onClick={() => updateProfile({ avatar: a })}
                        className={`w-10 h-10 rounded-xl text-xl transition-all border ${profile.avatar === a ? 'bg-primary/20 border-primary' : 'bg-secondary border-border hover:border-primary/50'}`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'XP', val: profile.totalXp, icon: '⭐' },
                { label: 'Игр', val: profile.completedGames.length, icon: '🎮' },
                { label: 'Прогресс', val: pct + '%', icon: '📊' },
              ].map((s, i) => (
                <div key={i} className="glass rounded-xl p-3 text-center">
                  <div>{s.icon}</div>
                  <div className="font-black text-white text-lg">{s.val}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowCert(true)}
              className="w-full py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 text-sm"
              style={{ background: 'hsl(217 91% 60% / 0.15)', border: '1px solid hsl(217 91% 60% / 0.3)', color: 'hsl(217, 91%, 70%)' }}
            >
              <span>🎓</span> Открыть сертификат
            </button>
          </div>
        )}
      </main>

      {activeGame && (
        <GamePlayer
          game={activeGame}
          onComplete={handleGameComplete}
          onClose={() => setActiveGame(null)}
        />
      )}

      {showCert && (
        <Certificate profile={profile} onClose={() => setShowCert(false)} />
      )}
    </div>
  );
}
