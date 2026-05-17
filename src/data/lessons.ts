export interface Game {
  id: number;
  title: string;
  description: string;
  type: 'quiz' | 'match' | 'sort' | 'fill' | 'binary' | 'code';
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
  lessonId: number;
}

export interface Lesson {
  id: number;
  title: string;
  topic: string;
  grade: '7' | '8' | '9';
  color: string;
  icon: string;
  games: Game[];
}

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: 'Информация и информационные процессы',
    topic: 'Основы',
    grade: '7',
    color: '#3b82f6',
    icon: '💡',
    games: [
      { id: 1, title: 'Виды информации', description: 'Определи тип информации по примеру', type: 'quiz', difficulty: 'easy', xp: 50, lessonId: 1 },
      { id: 2, title: 'Свойства информации', description: 'Сопоставь свойство с определением', type: 'match', difficulty: 'easy', xp: 60, lessonId: 1 },
      { id: 3, title: 'Единицы измерения', description: 'Переведи байты и биты', type: 'fill', difficulty: 'medium', xp: 80, lessonId: 1 },
    ]
  },
  {
    id: 2,
    title: 'Системы счисления',
    topic: 'Математика',
    grade: '7',
    color: '#8b5cf6',
    icon: '🔢',
    games: [
      { id: 4, title: 'Двоичная система', description: 'Переведи числа в двоичную систему', type: 'fill', difficulty: 'medium', xp: 90, lessonId: 2 },
      { id: 5, title: 'Двоичные числа — быстро!', description: 'Найди пары чисел в разных системах', type: 'match', difficulty: 'medium', xp: 100, lessonId: 2 },
      { id: 6, title: 'Переводчик чисел', description: 'Переводи числа из 2 в 10 и обратно', type: 'binary', difficulty: 'hard', xp: 120, lessonId: 2 },
    ]
  },
  {
    id: 3,
    title: 'Алгоритмы и программирование',
    topic: 'Алгоритмы',
    grade: '7',
    color: '#10b981',
    icon: '⚙️',
    games: [
      { id: 7, title: 'Что такое алгоритм?', description: 'Выбери признаки алгоритма', type: 'quiz', difficulty: 'easy', xp: 50, lessonId: 3 },
      { id: 8, title: 'Порядок шагов', description: 'Восстанови правильный порядок алгоритма', type: 'sort', difficulty: 'medium', xp: 80, lessonId: 3 },
    ]
  },
  {
    id: 4,
    title: 'Ветвление и циклы',
    topic: 'Алгоритмы',
    grade: '8',
    color: '#f59e0b',
    icon: '🔀',
    games: [
      { id: 9, title: 'Условные операторы', description: 'Заполни пропуски в коде', type: 'fill', difficulty: 'medium', xp: 90, lessonId: 4 },
      { id: 10, title: 'Циклы for и while', description: 'Найди ошибку в цикле', type: 'quiz', difficulty: 'hard', xp: 110, lessonId: 4 },
      { id: 11, title: 'Блок-схемы', description: 'Сопоставь элемент блок-схемы с действием', type: 'match', difficulty: 'medium', xp: 80, lessonId: 4 },
    ]
  },
  {
    id: 5,
    title: 'Компьютерные сети',
    topic: 'Сети',
    grade: '8',
    color: '#06b6d4',
    icon: '🌐',
    games: [
      { id: 12, title: 'Топологии сетей', description: 'Определи топологию по схеме', type: 'quiz', difficulty: 'medium', xp: 80, lessonId: 5 },
      { id: 13, title: 'Протоколы', description: 'Сопоставь протокол с его назначением', type: 'match', difficulty: 'hard', xp: 100, lessonId: 5 },
      { id: 14, title: 'IP-адреса', description: 'Определи класс IP-адреса', type: 'fill', difficulty: 'hard', xp: 120, lessonId: 5 },
    ]
  },
  {
    id: 6,
    title: 'Операционные системы',
    topic: 'ПО',
    grade: '8',
    color: '#ef4444',
    icon: '🖥️',
    games: [
      { id: 15, title: 'Функции ОС', description: 'Выбери задачи операционной системы', type: 'quiz', difficulty: 'easy', xp: 60, lessonId: 6 },
      { id: 16, title: 'Файловая система', description: 'Сопоставь расширение с типом файла', type: 'match', difficulty: 'easy', xp: 70, lessonId: 6 },
      { id: 17, title: 'Команды терминала', description: 'Упорядочи команды для выполнения задачи', type: 'sort', difficulty: 'medium', xp: 90, lessonId: 6 },
    ]
  },
  {
    id: 7,
    title: 'Базы данных',
    topic: 'Данные',
    grade: '9',
    color: '#ec4899',
    icon: '🗄️',
    games: [
      { id: 18, title: 'Структура таблицы', description: 'Определи первичный ключ таблицы', type: 'quiz', difficulty: 'medium', xp: 90, lessonId: 7 },
      { id: 19, title: 'SQL-запросы', description: 'Заполни пропуски в SQL-запросе', type: 'fill', difficulty: 'hard', xp: 130, lessonId: 7 },
      { id: 20, title: 'Связи таблиц', description: 'Определи тип связи между таблицами', type: 'match', difficulty: 'hard', xp: 120, lessonId: 7 },
    ]
  },
  {
    id: 8,
    title: 'Основы Python',
    topic: 'Программирование',
    grade: '9',
    color: '#3b82f6',
    icon: '🐍',
    games: [
      { id: 21, title: 'Типы данных Python', description: 'Угадай тип переменной', type: 'quiz', difficulty: 'easy', xp: 70, lessonId: 8 },
      { id: 22, title: 'Функции Python', description: 'Восстанови функцию по описанию', type: 'fill', difficulty: 'medium', xp: 100, lessonId: 8 },
      { id: 23, title: 'Синтаксис', description: 'Найди синтаксическую ошибку', type: 'code', difficulty: 'hard', xp: 140, lessonId: 8 },
    ]
  },
  {
    id: 9,
    title: 'Кибербезопасность',
    topic: 'Безопасность',
    grade: '9',
    color: '#f97316',
    icon: '🔐',
    games: [
      { id: 24, title: 'Виды угроз', description: 'Определи тип кибератаки', type: 'quiz', difficulty: 'medium', xp: 80, lessonId: 9 },
      { id: 25, title: 'Защита данных', description: 'Выбери правильные меры защиты', type: 'quiz', difficulty: 'medium', xp: 90, lessonId: 9 },
    ]
  },
  {
    id: 10,
    title: 'Логика и множества',
    topic: 'Математика',
    grade: '9',
    color: '#a855f7',
    icon: '🧮',
    games: [
      { id: 26, title: 'Логические операции', description: 'Вычисли результат логического выражения', type: 'fill', difficulty: 'hard', xp: 120, lessonId: 10 },
      { id: 27, title: 'Таблицы истинности', description: 'Заполни таблицу истинности', type: 'fill', difficulty: 'hard', xp: 130, lessonId: 10 },
      { id: 28, title: 'Теория множеств', description: 'Определи результат операции над множеством', type: 'quiz', difficulty: 'medium', xp: 100, lessonId: 10 },
    ]
  },
  {
    id: 11,
    title: 'Компьютерная графика',
    topic: 'Мультимедиа',
    grade: '7',
    color: '#14b8a6',
    icon: '🎨',
    games: [
      { id: 29, title: 'Растр vs Вектор', description: 'Определи тип изображения', type: 'quiz', difficulty: 'easy', xp: 60, lessonId: 11 },
      { id: 30, title: 'Форматы файлов', description: 'Сопоставь формат с его особенностями', type: 'match', difficulty: 'easy', xp: 70, lessonId: 11 },
    ]
  }
];

export const ALL_GAMES: Game[] = LESSONS.flatMap(l => l.games);
