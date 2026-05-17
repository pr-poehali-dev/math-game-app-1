import { useRef } from 'react';
import { UserProfile } from '@/store/userStore';
import { ALL_GAMES } from '@/data/lessons';
import Icon from '@/components/ui/icon';

interface Props {
  profile: UserProfile;
  onClose: () => void;
}

export default function Certificate({ profile, onClose }: Props) {
  const certRef = useRef<HTMLDivElement>(null);
  const completedCount = profile.completedGames.length;
  const totalGames = ALL_GAMES.length;
  const pct = Math.round((completedCount / totalGames) * 100);
  const today = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl animate-scale-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-foreground font-bold text-lg">Сертификат достижений</h2>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <Icon name="Download" size={14} />
              Скачать
            </button>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-2">
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        <div ref={certRef} className="cert-appear rounded-2xl overflow-hidden" style={{
          background: 'linear-gradient(135deg, #0a0f1e 0%, #0d1a35 50%, #0a1228 100%)',
          border: '2px solid hsl(217 91% 60% / 0.4)',
          boxShadow: '0 0 60px hsl(217 91% 60% / 0.2), inset 0 0 60px hsl(217 91% 60% / 0.03)',
          padding: '48px',
        }}>
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
              <span className="text-2xl">🎓</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary/70 font-semibold mb-2">Образовательная платформа</p>
            <h1 className="text-3xl font-black text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>ИнфоГрад</h1>
            <p className="text-primary/60 text-sm mt-1">Информатика 7–9 класс</p>
          </div>

          {/* Certificate body */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-sm uppercase tracking-widest mb-4">Настоящим удостоверяется, что</p>
            <div className="py-4 px-8 rounded-xl mb-4" style={{ background: 'hsl(217 91% 60% / 0.08)', border: '1px solid hsl(217 91% 60% / 0.2)' }}>
              <h2 className="text-3xl font-black text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {profile.firstName || 'Имя'} {profile.lastName || 'Фамилия'}
              </h2>
              {profile.grade && <p className="text-primary/70 text-sm mt-1">{profile.grade} класс</p>}
            </div>
            <p className="text-muted-foreground text-sm">успешно прошёл(а) обучение на платформе</p>
            <p className="text-white font-semibold mt-1">«ИнфоГрад — Основы информатики»</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Игр пройдено', value: `${completedCount} / ${totalGames}` },
              { label: 'Прогресс', value: `${pct}%` },
              { label: 'Очков XP', value: profile.totalXp.toString() },
            ].map((s, i) => (
              <div key={i} className="text-center p-3 rounded-xl" style={{ background: 'hsl(220 18% 14% / 0.8)', border: '1px solid hsl(217 91% 60% / 0.15)' }}>
                <div className="text-xl font-black" style={{ color: 'hsl(217, 91%, 60%)' }}>{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Дата выдачи</p>
              <p className="text-sm text-white font-medium">{today}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px w-16 bg-primary/30" />
              <span className="text-primary text-lg">⬡</span>
              <div className="h-px w-16 bg-primary/30" />
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Подпись платформы</p>
              <p className="text-sm text-white font-medium">ИнфоГрад</p>
            </div>
          </div>
        </div>

        {(profile.firstName === '' || profile.lastName === '') && (
          <p className="text-center text-xs text-yellow-400/70 mt-3">
            ⚠ Укажи имя и фамилию в профиле, чтобы они появились в сертификате
          </p>
        )}
      </div>
    </div>
  );
}
