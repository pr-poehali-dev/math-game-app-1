import { useState, useEffect, useRef } from 'react';
import { GAME_CONTENT, GameData } from '@/data/gameEngine';
import { Game } from '@/data/lessons';
import Icon from '@/components/ui/icon';

interface Props {
  game: Game;
  onComplete: (score: number, maxScore: number, seconds: number) => void;
  onClose: () => void;
}

export default function GamePlayer({ game, onComplete, onClose }: Props) {
  const data: GameData | undefined = GAME_CONTENT[game.id];
  const startRef = useRef(Date.now());

  if (!data) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-muted-foreground">Игра в разработке</p>
          <button onClick={onClose} className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg">Закрыть</button>
        </div>
      </div>
    );
  }

  const elapsed = () => Math.round((Date.now() - startRef.current) / 1000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
      <div className="glass rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="font-bold text-lg text-foreground">{game.title}</h2>
            <p className="text-sm text-muted-foreground">{game.description}</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon name="X" size={20} />
          </button>
        </div>
        <div className="p-6">
          {data.type === 'quiz' && <QuizGame data={data} onComplete={(s, m) => onComplete(s, m, elapsed())} />}
          {data.type === 'match' && <MatchGame data={data} onComplete={(s, m) => onComplete(s, m, elapsed())} />}
          {data.type === 'sort' && <SortGame data={data} onComplete={(s, m) => onComplete(s, m, elapsed())} />}
          {data.type === 'fill' && <FillGame data={data} onComplete={(s, m) => onComplete(s, m, elapsed())} />}
          {data.type === 'binary' && <BinaryGame data={data} onComplete={(s, m) => onComplete(s, m, elapsed())} />}
        </div>
      </div>
    </div>
  );
}

// --- QUIZ ---
function QuizGame({ data, onComplete }: { data: Extract<GameData, { type: 'quiz' }>, onComplete: (s: number, m: number) => void }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = data.questions[current];

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    const correct = i === q.correct;
    if (correct) setScore(s => s + 1);
    setShowResult(true);
  };

  const next = () => {
    if (current + 1 >= data.questions.length) {
      setFinished(true);
      onComplete(score + (selected === q.correct ? 1 : 0), data.questions.length, 0);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  if (finished) return <SuccessScreen score={score} max={data.questions.length} />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Вопрос {current + 1} / {data.questions.length}</span>
        <span className="text-sm font-medium neon-blue">Счёт: {score}</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-1.5 mb-4">
        <div className="progress-bar h-1.5 rounded-full transition-all" style={{ width: `${((current) / data.questions.length) * 100}%` }} />
      </div>
      <h3 className="text-foreground font-semibold text-lg leading-snug">{q.question}</h3>
      <div className="space-y-2 mt-4">
        {q.options.map((opt, i) => {
          let cls = 'w-full text-left px-4 py-3 rounded-xl border transition-all text-sm font-medium ';
          if (selected === null) cls += 'border-border hover:border-primary hover:bg-primary/10 cursor-pointer text-foreground';
          else if (i === q.correct) cls += 'border-green-500 bg-green-500/15 text-green-400';
          else if (i === selected) cls += 'border-red-500 bg-red-500/15 text-red-400';
          else cls += 'border-border text-muted-foreground opacity-50';
          return (
            <button key={i} className={cls} onClick={() => choose(i)}>
              <span className="mr-2 text-muted-foreground">{String.fromCharCode(65 + i)}.</span> {opt}
            </button>
          );
        })}
      </div>
      {showResult && (
        <div className={`rounded-xl p-3 text-sm mt-2 ${selected === q.correct ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-red-500/15 text-red-400 border border-red-500/30'}`}>
          {selected === q.correct ? '✓ Верно! ' : '✗ Неверно. '}{q.explanation}
        </div>
      )}
      {showResult && (
        <button onClick={next} className="w-full mt-2 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors">
          {current + 1 >= data.questions.length ? 'Завершить' : 'Следующий вопрос →'}
        </button>
      )}
    </div>
  );
}

// --- MATCH ---
function MatchGame({ data, onComplete }: { data: Extract<GameData, { type: 'match' }>, onComplete: (s: number, m: number) => void }) {
  const [leftSel, setLeftSel] = useState<number | null>(null);
  const [matched, setMatched] = useState<[number, number][]>([]);
  const [wrong, setWrong] = useState<number | null>(null);

  const shuffledRight = useRef(data.pairs.map((p, i) => ({ text: p.right, origIdx: i })).sort(() => Math.random() - 0.5));

  const selectLeft = (i: number) => {
    if (matched.some(([l]) => l === i)) return;
    setLeftSel(i);
  };

  const selectRight = (ri: number, origIdx: number) => {
    if (matched.some(([, r]) => r === ri)) return;
    if (leftSel === null) return;
    if (origIdx === leftSel) {
      const newMatched = [...matched, [leftSel, ri] as [number, number]];
      setMatched(newMatched);
      setLeftSel(null);
      setWrong(null);
      if (newMatched.length === data.pairs.length) {
        setTimeout(() => onComplete(data.pairs.length, data.pairs.length, 0), 600);
      }
    } else {
      setWrong(ri);
      setTimeout(() => setWrong(null), 800);
    }
  };

  const isLeftMatched = (i: number) => matched.some(([l]) => l === i);
  const isRightMatched = (ri: number) => matched.some(([, r]) => r === ri);

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">{data.instruction}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {data.pairs.map((p, i) => (
            <button
              key={i}
              onClick={() => selectLeft(i)}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left ${isLeftMatched(i) ? 'border-green-500 bg-green-500/15 text-green-400 opacity-60' : leftSel === i ? 'border-primary bg-primary/15 text-primary' : 'border-border hover:border-primary/50 text-foreground cursor-pointer'}`}
            >
              {p.left}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {shuffledRight.current.map((r, ri) => (
            <button
              key={ri}
              onClick={() => selectRight(ri, r.origIdx)}
              className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all text-left ${isRightMatched(ri) ? 'border-green-500 bg-green-500/15 text-green-400 opacity-60' : wrong === ri ? 'border-red-500 bg-red-500/15 text-red-400' : leftSel !== null ? 'border-border hover:border-primary/50 text-foreground cursor-pointer' : 'border-border text-muted-foreground'}`}
            >
              {r.text}
            </button>
          ))}
        </div>
      </div>
      {matched.length === data.pairs.length && (
        <div className="mt-4 p-3 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-sm font-medium text-center">
          ✓ Все пары найдены!
        </div>
      )}
    </div>
  );
}

// --- SORT ---
function SortGame({ data, onComplete }: { data: Extract<GameData, { type: 'sort' }>, onComplete: (s: number, m: number) => void }) {
  const [items, setItems] = useState(() => [...data.items].sort(() => Math.random() - 0.5));
  const [dragging, setDragging] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    const next = [...items];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setItems(next);
  };
  const moveDown = (idx: number) => {
    if (idx === items.length - 1) return;
    const next = [...items];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    setItems(next);
  };

  const check = () => {
    const isCorrect = items.every((item, i) => item.order === i + 1);
    setChecked(true);
    setCorrect(isCorrect);
    if (isCorrect) setTimeout(() => onComplete(data.items.length, data.items.length, 0), 800);
    else setTimeout(() => onComplete(0, data.items.length, 0), 2000);
  };

  return (
    <div>
      <p className="text-sm text-muted-foreground mb-4">{data.instruction}</p>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={item.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${checked ? (item.order === idx + 1 ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : 'border-border bg-secondary/40'}`}>
            <span className="text-xs text-muted-foreground w-5 text-center">{idx + 1}</span>
            <span className="flex-1 text-sm text-foreground">{item.text}</span>
            {!checked && (
              <div className="flex flex-col gap-1">
                <button onClick={() => moveUp(idx)} className="text-muted-foreground hover:text-primary transition-colors"><Icon name="ChevronUp" size={14} /></button>
                <button onClick={() => moveDown(idx)} className="text-muted-foreground hover:text-primary transition-colors"><Icon name="ChevronDown" size={14} /></button>
              </div>
            )}
          </div>
        ))}
      </div>
      {!checked && (
        <button onClick={check} className="w-full mt-4 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors">
          Проверить порядок
        </button>
      )}
      {checked && (
        <div className={`mt-4 p-3 rounded-xl border text-sm font-medium text-center ${correct ? 'bg-green-500/15 border-green-500/30 text-green-400' : 'bg-red-500/15 border-red-500/30 text-red-400'}`}>
          {correct ? '✓ Правильный порядок!' : '✗ Порядок неверный. Попробуй ещё раз!'}
        </div>
      )}
    </div>
  );
}

// --- FILL ---
function FillGame({ data, onComplete }: { data: Extract<GameData, { type: 'fill' }>, onComplete: (s: number, m: number) => void }) {
  const [answers, setAnswers] = useState<string[]>(data.questions.map(() => ''));
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [showHints, setShowHints] = useState<boolean[]>(data.questions.map(() => false));

  const check = () => {
    let s = 0;
    data.questions.forEach((q, i) => {
      if (answers[i].trim().toLowerCase() === q.blanks[0].toLowerCase()) s++;
    });
    setScore(s);
    setChecked(true);
    setTimeout(() => onComplete(s, data.questions.length, 0), 1000);
  };

  const toggleHint = (i: number) => {
    setShowHints(prev => prev.map((h, idx) => idx === i ? !h : h));
  };

  return (
    <div className="space-y-4">
      {data.questions.map((q, i) => {
        const isCorrect = checked && answers[i].trim().toLowerCase() === q.blanks[0].toLowerCase();
        const isWrong = checked && !isCorrect;
        return (
          <div key={i} className={`p-4 rounded-xl border transition-all ${checked ? (isCorrect ? 'border-green-500/50 bg-green-500/5' : 'border-red-500/50 bg-red-500/5') : 'border-border bg-secondary/30'}`}>
            <div className="flex items-start justify-between gap-2">
              <pre className="font-mono text-sm text-foreground whitespace-pre-wrap flex-1">{q.template}</pre>
              {!checked && (
                <button onClick={() => toggleHint(i)} className="text-xs text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
                  <Icon name="HelpCircle" size={16} />
                </button>
              )}
            </div>
            {showHints[i] && !checked && (
              <p className="text-xs text-primary/70 mt-1 italic">💡 {q.hint}</p>
            )}
            {!checked ? (
              <input
                type="text"
                value={answers[i]}
                onChange={e => setAnswers(prev => prev.map((a, idx) => idx === i ? e.target.value : a))}
                placeholder="Введи ответ..."
                className="mt-2 w-full bg-background border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
                onKeyDown={e => e.key === 'Enter' && i === data.questions.length - 1 && !checked && check()}
              />
            ) : (
              <div className={`mt-2 text-sm font-mono ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                Твой ответ: "{answers[i]}" {isCorrect ? '✓' : `✗ (верно: ${q.blanks[0]})`}
              </div>
            )}
          </div>
        );
      })}
      {!checked && (
        <button onClick={check} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors">
          Проверить ответы
        </button>
      )}
      {checked && <SuccessScreen score={score} max={data.questions.length} />}
    </div>
  );
}

// --- BINARY ---
function BinaryGame({ data, onComplete }: { data: Extract<GameData, { type: 'binary' }>, onComplete: (s: number, m: number) => void }) {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [finished, setFinished] = useState(false);

  const task = data.tasks[current];

  const check = () => {
    const correct = input.trim() === task.binary;
    if (correct) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
    setTimeout(() => {
      if (current + 1 >= data.tasks.length) {
        setFinished(true);
        onComplete(correct ? score + 1 : score, data.tasks.length, 0);
      } else {
        setCurrent(c => c + 1);
        setInput('');
        setFeedback(null);
      }
    }, 1000);
  };

  if (finished) return <SuccessScreen score={score} max={data.tasks.length} />;

  return (
    <div className="text-center space-y-6">
      <p className="text-sm text-muted-foreground">{data.instruction}</p>
      <div className="text-5xl font-black neon-blue font-mono">{task.decimal}</div>
      <p className="text-muted-foreground text-sm">Запиши в двоичной системе</p>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value.replace(/[^01]/g, ''))}
        placeholder="Например: 1010"
        className="w-full text-center bg-secondary border border-border rounded-xl px-4 py-3 text-lg font-mono text-foreground focus:border-primary focus:outline-none"
        onKeyDown={e => e.key === 'Enter' && input && !feedback && check()}
      />
      {feedback && (
        <div className={`p-3 rounded-xl text-sm font-medium ${feedback === 'correct' ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-red-500/15 text-red-400 border border-red-500/30'}`}>
          {feedback === 'correct' ? `✓ Верно! ${task.decimal} = ${task.binary}₂` : `✗ Неверно. Правильно: ${task.binary}₂`}
        </div>
      )}
      {!feedback && (
        <button onClick={check} disabled={!input} className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40">
          Проверить
        </button>
      )}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Задание {current + 1} / {data.tasks.length}</span>
        <span>Счёт: {score}</span>
      </div>
    </div>
  );
}

function SuccessScreen({ score, max }: { score: number; max: number }) {
  const pct = Math.round((score / max) * 100);
  return (
    <div className="text-center py-6 animate-scale-in">
      <div className="text-5xl mb-4">{pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📚'}</div>
      <h3 className="text-2xl font-black text-foreground mb-2">{pct >= 80 ? 'Отлично!' : pct >= 50 ? 'Хорошо!' : 'Старайся!'}</h3>
      <p className="text-muted-foreground mb-4">Правильных ответов: <span className="font-bold text-foreground">{score} / {max}</span></p>
      <div className="w-full bg-secondary rounded-full h-3">
        <div className="progress-bar h-3 rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-sm text-muted-foreground mt-2">{pct}% выполнено</p>
    </div>
  );
}
