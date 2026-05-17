export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface MatchPair {
  left: string;
  right: string;
}

export interface SortItem {
  id: number;
  text: string;
  order: number;
}

export interface FillQuestion {
  template: string;
  blanks: string[];
  hint: string;
}

export type GameData =
  | { type: 'quiz'; questions: QuizQuestion[] }
  | { type: 'match'; pairs: MatchPair[]; instruction: string }
  | { type: 'sort'; items: SortItem[]; instruction: string }
  | { type: 'fill'; questions: FillQuestion[] }
  | { type: 'binary'; instruction: string; tasks: { decimal: number; binary: string }[] };

export const GAME_CONTENT: Record<number, GameData> = {
  // Game 1 — Виды информации (quiz)
  1: {
    type: 'quiz',
    questions: [
      { question: 'Какой вид информации передаётся по зрению?', options: ['Звуковая', 'Визуальная', 'Тактильная', 'Вкусовая'], correct: 1, explanation: 'Визуальная информация воспринимается глазами' },
      { question: 'Текст в книге — это информация...', options: ['Графическая', 'Числовая', 'Текстовая', 'Звуковая'], correct: 2, explanation: 'Текст относится к текстовому виду информации' },
      { question: 'Что является примером числовой информации?', options: ['Фотография', 'Музыка', 'Таблица с оценками', 'Рисунок'], correct: 2, explanation: 'Таблица с оценками — это числовая информация' },
      { question: 'Информация на экране телевизора — это:', options: ['Только видео', 'Только звук', 'Аудио-визуальная', 'Тактильная'], correct: 2, explanation: 'ТВ передаёт и звук, и изображение — аудио-визуальная' },
    ]
  },
  // Game 2 — Свойства информации (match)
  2: {
    type: 'match',
    instruction: 'Сопоставь свойство информации с его описанием',
    pairs: [
      { left: 'Актуальность', right: 'Важна в данный момент' },
      { left: 'Достоверность', right: 'Соответствует реальности' },
      { left: 'Полнота', right: 'Достаточна для принятия решения' },
      { left: 'Доступность', right: 'Может быть получена и использована' },
    ]
  },
  // Game 3 — Единицы измерения (fill)
  3: {
    type: 'fill',
    questions: [
      { template: '1 байт = ___ бит', blanks: ['8'], hint: 'Один байт состоит из 8 бит' },
      { template: '1 Кбайт = ___ байт', blanks: ['1024'], hint: '1 Кбайт = 2^10 = 1024 байт' },
      { template: '1 Мбайт = ___ Кбайт', blanks: ['1024'], hint: '1 Мбайт = 1024 Кбайт' },
      { template: '1 Гбайт = ___ Мбайт', blanks: ['1024'], hint: '1 Гбайт = 1024 Мбайт' },
    ]
  },
  // Game 4 — Двоичная система (fill)
  4: {
    type: 'fill',
    questions: [
      { template: 'Число 5 в двоичной: ___', blanks: ['101'], hint: '5 = 4+1 = 2²+2⁰ = 101' },
      { template: 'Число 10 в двоичной: ___', blanks: ['1010'], hint: '10 = 8+2 = 1010' },
      { template: 'Двоичное 1111 = ___ в десятичной', blanks: ['15'], hint: '8+4+2+1 = 15' },
      { template: 'Двоичное 1000 = ___ в десятичной', blanks: ['8'], hint: '2³ = 8' },
    ]
  },
  // Game 5 — Двоичные числа — быстро! (match)
  5: {
    type: 'match',
    instruction: 'Сопоставь двоичное число с десятичным',
    pairs: [
      { left: '0001', right: '1' },
      { left: '0010', right: '2' },
      { left: '0100', right: '4' },
      { left: '1000', right: '8' },
      { left: '1111', right: '15' },
    ]
  },
  // Game 6 — Переводчик чисел (binary)
  6: {
    type: 'binary',
    instruction: 'Переведи числа из десятичной в двоичную систему',
    tasks: [
      { decimal: 3, binary: '11' },
      { decimal: 7, binary: '111' },
      { decimal: 12, binary: '1100' },
      { decimal: 25, binary: '11001' },
      { decimal: 42, binary: '101010' },
    ]
  },
  // Game 7 — Что такое алгоритм (quiz)
  7: {
    type: 'quiz',
    questions: [
      { question: 'Какое свойство алгоритма означает, что он должен завершаться за конечное число шагов?', options: ['Дискретность', 'Конечность', 'Точность', 'Массовость'], correct: 1, explanation: 'Конечность — алгоритм должен завершиться' },
      { question: 'Что означает свойство "массовость" алгоритма?', options: ['Алгоритм занимает много памяти', 'Подходит для класса задач', 'Имеет много шагов', 'Работает быстро'], correct: 1, explanation: 'Массовость — применим к классу однотипных задач' },
      { question: 'Какой из следующих НЕ является типом алгоритма?', options: ['Линейный', 'Разветвляющийся', 'Циклический', 'Параллельный'], correct: 3, explanation: 'Параллельный — не стандартный тип в базовом курсе' },
    ]
  },
  // Game 8 — Порядок шагов (sort)
  8: {
    type: 'sort',
    instruction: 'Восстанови правильный порядок алгоритма приготовления чая',
    items: [
      { id: 1, text: 'Вскипятить воду', order: 1 },
      { id: 2, text: 'Взять чашку', order: 2 },
      { id: 3, text: 'Положить чайный пакетик', order: 3 },
      { id: 4, text: 'Залить кипятком', order: 4 },
      { id: 5, text: 'Подождать 3 минуты', order: 5 },
      { id: 6, text: 'Достать пакетик', order: 6 },
    ]
  },
  // Game 9 — Условные операторы (fill)
  9: {
    type: 'fill',
    questions: [
      { template: 'if x > 0:\n    print("___")', blanks: ['положительное'], hint: 'Если x больше 0, число положительное' },
      { template: 'Ключевое слово условия в Python: ___', blanks: ['if'], hint: 'Условный оператор в Python' },
      { template: 'Альтернативная ветка условия: ___', blanks: ['else'], hint: 'Иначе... в Python' },
    ]
  },
  // Game 10 — Циклы (quiz)
  10: {
    type: 'quiz',
    questions: [
      { question: 'Сколько раз выполнится цикл: for i in range(5)?', options: ['4', '5', '6', '0'], correct: 1, explanation: 'range(5) генерирует 0,1,2,3,4 — 5 итераций' },
      { question: 'Что означает "бесконечный цикл"?', options: ['Цикл с 1000 итераций', 'Цикл без условия остановки', 'Очень быстрый цикл', 'Вложенный цикл'], correct: 1, explanation: 'Бесконечный цикл никогда не завершается' },
      { question: 'Какой цикл проверяет условие ДО выполнения тела?', options: ['do-while', 'for', 'while', 'foreach'], correct: 2, explanation: 'while проверяет условие перед каждой итерацией' },
    ]
  },
  // Game 11 — Блок-схемы (match)
  11: {
    type: 'match',
    instruction: 'Сопоставь элемент блок-схемы с его значением',
    pairs: [
      { left: 'Прямоугольник', right: 'Действие / вычисление' },
      { left: 'Ромб', right: 'Условие / ветвление' },
      { left: 'Овал', right: 'Начало / Конец' },
      { left: 'Параллелограмм', right: 'Ввод / вывод данных' },
    ]
  },
  // Game 12 — Топологии сетей (quiz)
  12: {
    type: 'quiz',
    questions: [
      { question: 'Какая топология использует центральный коммутатор?', options: ['Шина', 'Кольцо', 'Звезда', 'Дерево'], correct: 2, explanation: 'В топологии "Звезда" все устройства подключены к центральному узлу' },
      { question: 'Недостаток топологии "шина"?', options: ['Дорого стоит', 'Выход одного — весь сегмент', 'Сложно настроить', 'Медленно работает'], correct: 1, explanation: 'Обрыв шины отключает всю сеть' },
      { question: 'Что такое LAN?', options: ['Глобальная сеть', 'Локальная сеть', 'Беспроводная сеть', 'Спутниковая сеть'], correct: 1, explanation: 'LAN — Local Area Network — локальная сеть' },
    ]
  },
  // Game 13 — Протоколы (match)
  13: {
    type: 'match',
    instruction: 'Сопоставь протокол с его назначением',
    pairs: [
      { left: 'HTTP', right: 'Передача веб-страниц' },
      { left: 'FTP', right: 'Передача файлов' },
      { left: 'SMTP', right: 'Отправка электронной почты' },
      { left: 'DNS', right: 'Перевод доменных имён в IP' },
    ]
  },
  // Game 14 — IP-адреса (fill)
  14: {
    type: 'fill',
    questions: [
      { template: 'IPv4 адрес состоит из ___ октетов', blanks: ['4'], hint: 'Например: 192.168.1.1' },
      { template: 'Маска подсети класса C: 255.255.255.___', blanks: ['0'], hint: 'Последний октет маски = 0' },
      { template: 'Адрес 127.0.0.1 называется: ___', blanks: ['localhost'], hint: 'Этот адрес означает "сам компьютер"' },
    ]
  },
  // Game 15 — Функции ОС (quiz)
  15: {
    type: 'quiz',
    questions: [
      { question: 'Что является основной функцией ОС?', options: ['Рисование картинок', 'Управление ресурсами компьютера', 'Воспроизведение музыки', 'Редактирование текстов'], correct: 1, explanation: 'ОС управляет памятью, процессами и устройствами' },
      { question: 'К системному ПО относится:', options: ['Word', 'Minecraft', 'Windows', 'Photoshop'], correct: 2, explanation: 'Windows — операционная система, системное ПО' },
      { question: 'Что такое драйвер?', options: ['Программист', 'Программа управления устройством', 'Вирус', 'Файловая система'], correct: 1, explanation: 'Драйвер — программа для управления аппаратным устройством' },
    ]
  },
  // Game 16 — Файловая система (match)
  16: {
    type: 'match',
    instruction: 'Сопоставь расширение файла с его типом',
    pairs: [
      { left: '.docx', right: 'Текстовый документ Word' },
      { left: '.mp3', right: 'Аудиофайл' },
      { left: '.jpg', right: 'Изображение' },
      { left: '.exe', right: 'Исполняемая программа' },
      { left: '.xlsx', right: 'Таблица Excel' },
    ]
  },
  // Game 17 — Команды терминала (sort)
  17: {
    type: 'sort',
    instruction: 'Упорядочи команды для создания папки и файла в ней',
    items: [
      { id: 1, text: 'Открыть терминал', order: 1 },
      { id: 2, text: 'mkdir новая_папка', order: 2 },
      { id: 3, text: 'cd новая_папка', order: 3 },
      { id: 4, text: 'touch файл.txt', order: 4 },
      { id: 5, text: 'ls (проверить содержимое)', order: 5 },
    ]
  },
  // Game 18 — Структура таблицы (quiz)
  18: {
    type: 'quiz',
    questions: [
      { question: 'Что такое первичный ключ?', options: ['Пароль к БД', 'Уникальный идентификатор записи', 'Первая колонка таблицы', 'Главная таблица'], correct: 1, explanation: 'Первичный ключ — уникально идентифицирует каждую запись' },
      { question: 'Что такое СУБД?', options: ['Язык программирования', 'Система управления БД', 'Тип данных', 'Алгоритм сортировки'], correct: 1, explanation: 'СУБД — Система Управления Базами Данных' },
      { question: 'Строка в таблице БД называется:', options: ['Поле', 'Запись', 'Индекс', 'Ключ'], correct: 1, explanation: 'Строка таблицы = запись (record)' },
    ]
  },
  // Game 19 — SQL-запросы (fill)
  19: {
    type: 'fill',
    questions: [
      { template: '___ * FROM students;', blanks: ['SELECT'], hint: 'Команда выборки данных' },
      { template: 'SELECT name FROM students ___ age > 14;', blanks: ['WHERE'], hint: 'Условие фильтрации' },
      { template: 'SELECT name FROM students ORDER BY age ___;', blanks: ['DESC'], hint: 'Убывающий порядок сортировки' },
    ]
  },
  // Game 20 — Связи таблиц (match)
  20: {
    type: 'match',
    instruction: 'Сопоставь тип связи таблиц с примером',
    pairs: [
      { left: 'Один-к-одному', right: 'Человек и паспорт' },
      { left: 'Один-ко-многим', right: 'Учитель и его ученики' },
      { left: 'Многие-ко-многим', right: 'Студенты и курсы' },
    ]
  },
  // Game 21 — Типы данных Python (quiz)
  21: {
    type: 'quiz',
    questions: [
      { question: 'Какой тип у значения True в Python?', options: ['str', 'int', 'bool', 'float'], correct: 2, explanation: 'True и False — булевый тип bool' },
      { question: 'Чему равен тип "Hello"?', options: ['int', 'str', 'list', 'char'], correct: 1, explanation: 'Строки в кавычках — тип str (string)' },
      { question: 'Какой тип у [1, 2, 3]?', options: ['tuple', 'dict', 'set', 'list'], correct: 3, explanation: 'Квадратные скобки — тип list (список)' },
      { question: 'Тип у значения 3.14:', options: ['int', 'str', 'float', 'double'], correct: 2, explanation: 'Числа с точкой — тип float' },
    ]
  },
  // Game 22 — Функции Python (fill)
  22: {
    type: 'fill',
    questions: [
      { template: '___ greet(name):\n    print("Привет,", name)', blanks: ['def'], hint: 'Ключевое слово для определения функции' },
      { template: 'greet("Анна")  # ___ функции', blanks: ['вызов'], hint: 'Мы обращаемся к функции — это...' },
      { template: 'def add(a, b):\n    ___ a + b', blanks: ['return'], hint: 'Возвращение значения из функции' },
    ]
  },
  // Game 23 — Синтаксис Python (quiz)
  23: {
    type: 'quiz',
    questions: [
      { question: 'Найди ошибку: if x = 5:', options: ['Нет ошибки', 'Нужно ==', 'Нужно ===', 'Нужно :='], correct: 1, explanation: 'В условии сравнение == а не присваивание =' },
      { question: 'Что выведет: print(10 // 3)?', options: ['3.33', '3', '4', '1'], correct: 1, explanation: '// — целочисленное деление, 10//3 = 3' },
      { question: 'Как создать пустой список?', options: ['list()', '{}', 'new List()', 'array()'], correct: 0, explanation: 'list() или [] создают пустой список' },
    ]
  },
  // Game 24 — Виды угроз (quiz)
  24: {
    type: 'quiz',
    questions: [
      { question: 'Что такое фишинг?', options: ['Вид вируса', 'Мошеннические сайты/письма для кражи данных', 'Атака на сервер', 'Шифрование файлов'], correct: 1, explanation: 'Фишинг — вид мошенничества для кражи паролей' },
      { question: 'DDoS-атака — это:', options: ['Кража паролей', 'Перегрузка сервера запросами', 'Внедрение вируса', 'Слежка за пользователем'], correct: 1, explanation: 'DDoS — распределённый отказ в обслуживании' },
      { question: 'Какой файл наиболее опасен для загрузки?', options: ['.txt', '.png', '.exe', '.pdf'], correct: 2, explanation: '.exe — исполняемый файл, может содержать вирус' },
    ]
  },
  // Game 25 — Защита данных (quiz)
  25: {
    type: 'quiz',
    questions: [
      { question: 'Хороший пароль должен:', options: ['Быть коротким', 'Содержать только буквы', 'Иметь буквы, цифры и символы', 'Быть словом из словаря'], correct: 2, explanation: 'Надёжный пароль — длинный и сложный' },
      { question: 'Двухфакторная аутентификация — это:', options: ['Два пароля', 'Пароль + дополнительное подтверждение', 'Биометрия', 'Очень длинный пароль'], correct: 1, explanation: '2FA требует пароль и код из SMS/приложения' },
      { question: 'Что делает антивирус?', options: ['Ускоряет ПК', 'Ищет и удаляет вредоносное ПО', 'Шифрует файлы', 'Создаёт резервные копии'], correct: 1, explanation: 'Антивирус защищает от вредоносных программ' },
    ]
  },
  // Game 26 — Логические операции (fill)
  26: {
    type: 'fill',
    questions: [
      { template: 'TRUE AND FALSE = ___', blanks: ['FALSE'], hint: 'AND (И) — оба должны быть TRUE' },
      { template: 'TRUE OR FALSE = ___', blanks: ['TRUE'], hint: 'OR (ИЛИ) — хотя бы одно TRUE' },
      { template: 'NOT TRUE = ___', blanks: ['FALSE'], hint: 'NOT (НЕ) — инверсия значения' },
      { template: 'FALSE AND FALSE = ___', blanks: ['FALSE'], hint: 'AND даёт TRUE только при TRUE AND TRUE' },
    ]
  },
  // Game 27 — Таблицы истинности (fill)
  27: {
    type: 'fill',
    questions: [
      { template: '1 AND 1 = ___', blanks: ['1'], hint: 'Конъюнкция: оба 1 → 1' },
      { template: '1 OR 0 = ___', blanks: ['1'], hint: 'Дизъюнкция: хотя бы одно 1' },
      { template: 'NOT 0 = ___', blanks: ['1'], hint: 'Инверсия нуля' },
      { template: '0 XOR 1 = ___', blanks: ['1'], hint: 'Исключающее ИЛИ: разные → 1' },
    ]
  },
  // Game 28 — Теория множеств (quiz)
  28: {
    type: 'quiz',
    questions: [
      { question: 'A = {1,2,3}, B = {2,3,4}. Что такое A ∩ B?', options: ['{1,2,3,4}', '{2,3}', '{1,4}', '{}'], correct: 1, explanation: 'Пересечение — общие элементы: {2,3}' },
      { question: 'A = {1,2,3}, B = {2,3,4}. Что такое A ∪ B?', options: ['{2,3}', '{1,4}', '{1,2,3,4}', '{1}'], correct: 2, explanation: 'Объединение — все элементы: {1,2,3,4}' },
      { question: 'Пустое множество обозначается:', options: ['{}', 'Ø', 'Оба варианта верны', 'N'], correct: 2, explanation: 'Пустое множество: {} или Ø' },
    ]
  },
  // Game 29 — Растр vs Вектор (quiz)
  29: {
    type: 'quiz',
    questions: [
      { question: 'Растровое изображение состоит из:', options: ['Кривых и линий', 'Пикселей', 'Формул', 'Слоёв'], correct: 1, explanation: 'Растр = сетка пикселей' },
      { question: 'Векторное изображение при масштабировании:', options: ['Теряет качество', 'Не теряет качество', 'Меняет цвет', 'Исчезает'], correct: 1, explanation: 'Вектор — математические формы, не зависят от размера' },
      { question: 'Формат JPG — это:', options: ['Векторный', 'Растровый', 'Аудио', '3D-модель'], correct: 1, explanation: 'JPG — растровый формат изображения' },
    ]
  },
  // Game 30 — Форматы файлов (match)
  30: {
    type: 'match',
    instruction: 'Сопоставь формат с его особенностями',
    pairs: [
      { left: 'PNG', right: 'Растр, поддерживает прозрачность' },
      { left: 'SVG', right: 'Векторный, масштабируемый' },
      { left: 'GIF', right: 'Растр, поддерживает анимацию' },
      { left: 'BMP', right: 'Растр, без сжатия, большой размер' },
    ]
  },
};
