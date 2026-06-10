export const ENT_DATE = new Date('2026-06-15T09:00:00')

export const USER_PROFILE = {
  currentScore: 84,
  targetScore: 115,
  streak: 9,
  completedTasks: 28,
  totalTasks: 42,
  hoursPerDay: 3,
  profileSubjects: ['math', 'physics'],
}

export const PROFILE_COMBOS = [
  { id: 'math-physics', label: 'Математика + Физика', subjects: ['math', 'physics'] },
  { id: 'bio-chem', label: 'Биология + Химия', subjects: ['biology', 'chemistry'] },
  { id: 'geo-math', label: 'География + Математика', subjects: ['geography', 'math'] },
  { id: 'english-history', label: 'Английский + Всемирная история', subjects: ['english', 'world-history'] },
  { id: 'math-info', label: 'Математика + Информатика', subjects: ['math', 'informatics'] },
]

export const SUBJECTS = [
  { id: 'history', name: 'История Казахстана', type: 'mandatory', maxScore: 20, current: 0, duration: '50 мин', questions: 20, pct: 0 },
  { id: 'math-literacy', name: 'Математическая грамотность', type: 'mandatory', maxScore: 10, current: 0, duration: '50 мин', questions: 10, pct: 0 },
  { id: 'reading', name: 'Грамотность чтения', type: 'mandatory', maxScore: 10, current: 0, duration: '50 мин', questions: 10, pct: 0 },
  { id: 'math', name: 'Математика', type: 'profile', maxScore: 50, current: 0, duration: '3 ч 50 мин', questions: 40, pct: 0 },
  { id: 'physics', name: 'Физика', type: 'profile', maxScore: 50, current: 0, duration: '3 ч 50 мин', questions: 40, pct: 0 },
  { id: 'informatics', name: 'Информатика', type: 'profile', maxScore: 50, current: 0, duration: '3 ч 50 мин', questions: 40, pct: 0 },
  { id: 'biology', name: 'Биология', type: 'profile', maxScore: 50, current: 0, duration: '3 ч 50 мин', questions: 40, pct: 0 },
  { id: 'chemistry', name: 'Химия', type: 'profile', maxScore: 50, current: 0, duration: '3 ч 50 мин', questions: 40, pct: 0 },
]

export const SUBJECT_INSIGHTS = {
  reading: {
    focus: 'main idea, inference, text structure',
    advice: 'Фокус на вопросах по главной идее, выводам и структуре текста. Большинство потерь — на comprehension-based задачах.',
    nextStep: '10 текстов с таймером · 15 мин/день',
    priority: 'Medium',
  },
  'math-literacy': {
    focus: 'functions, percentages, probability, word problems',
    advice: 'Начните с high-frequency тем: проценты, вероятность, текстовые задачи. Потом переходите к сложным.',
    nextStep: '20 задач по процентам · сегодня',
    priority: 'Medium',
  },
  history: {
    focus: 'timelines, independence, reforms',
    advice: 'Повторите хронологию, конституционную историю, период независимости и ключевые реформы.',
    nextStep: 'Таймлайн + 15 flashcards',
    priority: 'Medium',
  },
  math: {
    focus: 'functions, trigonometry, derivatives',
    advice: 'Фокус на функциях, тригонометрии и производных. Начните с частых типов задач.',
    nextStep: '15 задач по тригонометрии · ежедневно',
    priority: 'High',
  },
  physics: {
    focus: 'mechanics, electricity, formula-based',
    advice: 'Следующие 2 недели — механика, электричество и задачи на формулы. Это даст +8–12 баллов.',
    nextStep: 'Мок-тест: электричество · завтра',
    priority: 'High',
  },
}

export const EXAM_FORMAT = {
  totalDuration: '3 ч 50 мин',
  maxScore: 140,
  mandatorySubjects: ['История Казахстана', 'Математическая грамотность', 'Грамотность чтения'],
  structure: [
    { title: 'Обязательные предметы', items: ['История — 20 вопросов, до 20 б.', 'Мат. грамотность — 10 вопросов, до 10 б.', 'Чтение — 10 вопросов, до 10 б.'] },
    { title: 'Профильные предметы', items: ['2 предмета на выбор', '40 вопросов каждый', 'До 50 баллов за предмет'] },
    { title: 'Система оценивания', items: ['Макс. 140 баллов', 'Порог прохождения — 50 баллов', 'Грант обычно от 100+ баллов'] },
  ],
  profileCombos: [
    { combo: 'Математика + Физика', directions: 'IT, Engineering, Physics' },
    { combo: 'Биология + Химия', directions: 'Medicine, Pharmacy, Biology' },
    { combo: 'География + Математика', directions: 'Geology, Ecology, Urban planning' },
    { combo: 'Английский + Всемирная история', directions: 'International relations, Journalism' },
    { combo: 'Математика + Информатика', directions: 'Software Engineering, Data Science, Cybersecurity' },
  ],
}

export const VIDEOS = [
  { id: 1, title: 'How I scored 130+ on ENT', thumbnail: 'math', score: '132/140', duration: '8 min', description: 'Стратегия распределения времени и разбор типовых ошибок.' },
  { id: 2, title: '21-day intensive preparation strategy', thumbnail: 'strategy', score: '128/140', duration: '12 min', description: 'Как за 3 недели поднять балл с 80 до 115+.' },
  { id: 3, title: 'Mistakes that cost students 10–15 points', thumbnail: 'reading', score: '—', duration: '6 min', description: 'Топ-5 ошибок на ЕНТ и как их избежать.' },
  { id: 4, title: 'How to choose profile subjects correctly', thumbnail: 'physics', score: '125/140', duration: '9 min', description: 'Как выбрать профиль, который откроет нужные программы.' },
  { id: 5, title: 'From 80 to 115: real preparation plan', thumbnail: 'history', score: '115/140', duration: '14 min', description: 'Реальный план абитуриента: что делал каждый день.' },
  { id: 6, title: 'Физика: 10 тем, которые точно будут', thumbnail: 'physics', score: '45/50', duration: '11 min', description: 'Механика, электричество, оптика — must-know.' },
]

export const PLANNER_TASKS = {
  daily: [
    { id: 1, subject: 'Физика', task: '20 задач: механика + электричество', done: false },
    { id: 2, subject: 'Математика', task: 'Тригонометрия — 15 примеров', done: false },
    { id: 3, subject: 'История', task: 'Хронология независимости РК', done: true },
    { id: 4, subject: 'Чтение', task: '5 текстов с таймером (15 мин)', done: false },
  ],
  calendar: [
    { day: 'Пн', tasks: 3, done: 2, active: false },
    { day: 'Вт', tasks: 4, done: 3, active: false },
    { day: 'Ср', tasks: 3, done: 1, active: true },
    { day: 'Чт', tasks: 4, done: 0, active: false },
    { day: 'Пт', tasks: 3, done: 0, active: false },
    { day: 'Сб', tasks: 2, done: 0, active: false },
    { day: 'Вс', tasks: 1, done: 0, active: false },
  ],
}

export const WEAK_TOPICS = [
  { subject: 'Физика', topic: 'Электричество', priority: 'High', recommendation: 'Формулы Ома + 20 задач ежедневно' },
  { subject: 'Математика', topic: 'Тригонометрия', priority: 'High', recommendation: '15 задач + шпаргалка формул' },
  { subject: 'Математика', topic: 'Производные', priority: 'Medium', recommendation: 'Видео-разбор + 10 примеров' },
  { subject: 'История', topic: 'Независимость РК', priority: 'Medium', recommendation: 'Таймлайн + flashcards' },
  { subject: 'Чтение', topic: 'Inference questions', priority: 'Medium', recommendation: '10 текстов с разбором выводов' },
  { subject: 'Физика', topic: 'Оптика', priority: 'Low', recommendation: '2 мок-теста в неделю' },
]

export const UNIVERSITIES = [
  {
    id: 'kbtu', name: 'KBTU', city: 'Алматы', fullName: 'Казахстанско-Британский технический университет', deadline: '1 августа 2026',
    programs: [
      { id: 'kbtu-cs', name: 'Computer Science', profileSubjects: ['Математика', 'Физика'], minPaidScore: 80, avgPaidScore: 96, avgGrantScore: 124 },
      { id: 'kbtu-se', name: 'Software Engineering', profileSubjects: ['Математика', 'Физика'], minPaidScore: 80, avgPaidScore: 98, avgGrantScore: 126 },
    ],
  },
  {
    id: 'aitu', name: 'AITU', city: 'Астана', fullName: 'Astana IT University', deadline: '15 июля 2026',
    programs: [
      { id: 'aitu-se', name: 'Software Engineering', profileSubjects: ['Математика', 'Информатика'], minPaidScore: 80, avgPaidScore: 91, avgGrantScore: 123 },
      { id: 'aitu-cs', name: 'Cybersecurity', profileSubjects: ['Математика', 'Информатика'], minPaidScore: 82, avgPaidScore: 93, avgGrantScore: 125 },
    ],
  },
  {
    id: 'kimep', name: 'KIMEP', city: 'Алматы', fullName: 'KIMEP University', deadline: '20 июля 2026',
    programs: [
      { id: 'kimep-ba', name: 'Business Administration', profileSubjects: ['Математика', 'История Казахстана'], minPaidScore: 75, avgPaidScore: 82, avgGrantScore: 118 },
      { id: 'kimep-fin', name: 'Finance', profileSubjects: ['Математика', 'История Казахстана'], minPaidScore: 78, avgPaidScore: 85, avgGrantScore: 120 },
    ],
  },
  {
    id: 'mnu', name: 'MNU', city: 'Астана', fullName: 'Nazarbayev University', deadline: '10 июля 2026',
    programs: [
      { id: 'mnu-cs', name: 'Computer Science', profileSubjects: ['Математика', 'Физика'], minPaidScore: 90, avgPaidScore: 105, avgGrantScore: 130 },
      { id: 'mnu-law', name: 'Law', profileSubjects: ['История Казахстана', 'Грамотность чтения'], minPaidScore: 88, avgPaidScore: 95, avgGrantScore: 125 },
    ],
  },
  {
    id: 'almau', name: 'AlmaU', city: 'Алматы', fullName: 'Almaty Management University', deadline: '25 июля 2026',
    programs: [
      { id: 'almau-bus', name: 'Business', profileSubjects: ['Математика', 'История Казахстана'], minPaidScore: 70, avgPaidScore: 78, avgGrantScore: 110 },
    ],
  },
  {
    id: 'sdu', name: 'SDU', city: 'Караганда', fullName: 'Suleyman Demirel University', deadline: '1 августа 2026',
    programs: [
      { id: 'sdu-it', name: 'IT', profileSubjects: ['Математика', 'Информатика'], minPaidScore: 70, avgPaidScore: 88, avgGrantScore: 115 },
      { id: 'sdu-law', name: 'Law', profileSubjects: ['История Казахстана', 'Грамотность чтения'], minPaidScore: 72, avgPaidScore: 90, avgGrantScore: 118 },
    ],
  },
  {
    id: 'kaznu', name: 'KazNU', city: 'Алматы', fullName: 'КазНУ им. аль-Фараби', deadline: '5 августа 2026',
    programs: [
      { id: 'kaznu-med', name: 'Medicine', profileSubjects: ['Биология', 'Химия'], minPaidScore: 85, avgPaidScore: 110, avgGrantScore: 132 },
      { id: 'kaznu-it', name: 'IT', profileSubjects: ['Математика', 'Информатика'], minPaidScore: 80, avgPaidScore: 100, avgGrantScore: 128 },
    ],
  },
  {
    id: 'enu', name: 'ENU', city: 'Павлодар', fullName: 'Евразийский национальный университет', deadline: '10 августа 2026',
    programs: [
      { id: 'enu-eng', name: 'Engineering', profileSubjects: ['Математика', 'Физика'], minPaidScore: 65, avgPaidScore: 80, avgGrantScore: 108 },
    ],
  },
]

export const PROFESSIONS = [
  { id: 'software-engineer', name: 'Software Engineer', nameRu: 'Инженер-программист', subjects: ['Математика', 'Физика'], recommendedScore: 110, grantCompetitiveness: 'High', paidCompetitiveness: 'Medium', universities: ['kbtu', 'aitu', 'sdu', 'kaznu'] },
  { id: 'doctor', name: 'Doctor', nameRu: 'Врач', subjects: ['Биология', 'Химия'], recommendedScore: 125, grantCompetitiveness: 'Very High', paidCompetitiveness: 'High', universities: ['kaznu', 'mnu'] },
  { id: 'lawyer', name: 'Lawyer', nameRu: 'Юрист', subjects: ['История Казахстана', 'Грамотность чтения'], recommendedScore: 105, grantCompetitiveness: 'Medium', paidCompetitiveness: 'Low', universities: ['kaznu', 'sdu', 'mnu'] },
  { id: 'business-analyst', name: 'Business Analyst', nameRu: 'Бизнес-аналитик', subjects: ['Математика', 'История Казахстана'], recommendedScore: 100, grantCompetitiveness: 'Medium', paidCompetitiveness: 'Low', universities: ['kimep', 'almau'] },
  { id: 'architect', name: 'Architect', nameRu: 'Архитектор', subjects: ['Математика', 'Физика'], recommendedScore: 108, grantCompetitiveness: 'High', paidCompetitiveness: 'Medium', universities: ['kaznu', 'enu'] },
  { id: 'teacher', name: 'Teacher', nameRu: 'Учитель', subjects: ['История Казахстана', 'Грамотность чтения'], recommendedScore: 95, grantCompetitiveness: 'Low', paidCompetitiveness: 'Low', universities: ['enu', 'sdu'] },
  { id: 'civil-engineer', name: 'Civil Engineer', nameRu: 'Инженер-строитель', subjects: ['Математика', 'Физика'], recommendedScore: 105, grantCompetitiveness: 'Medium', paidCompetitiveness: 'Medium', universities: ['kbtu', 'enu', 'kaznu'] },
  { id: 'data-analyst', name: 'Data Analyst', nameRu: 'Data Analyst', subjects: ['Математика', 'Информатика'], recommendedScore: 112, grantCompetitiveness: 'High', paidCompetitiveness: 'Medium', universities: ['aitu', 'kbtu', 'kaznu'] },
  { id: 'finance', name: 'Finance Specialist', nameRu: 'Финансовый специалист', subjects: ['Математика', 'История Казахстана'], recommendedScore: 102, grantCompetitiveness: 'Medium', paidCompetitiveness: 'Low', universities: ['kimep', 'almau'] },
  { id: 'marketing', name: 'Marketing Manager', nameRu: 'Маркетолог', subjects: ['История Казахстана', 'Грамотность чтения'], recommendedScore: 98, grantCompetitiveness: 'Low', paidCompetitiveness: 'Low', universities: ['almau', 'kimep'] },
]

export const LEADERBOARD = {
  cities: [
    { name: 'Алматы', avgScore: 94, students: 12400 },
    { name: 'Астана', avgScore: 91, students: 9800 },
    { name: 'Шымкент', avgScore: 88, students: 7600 },
    { name: 'Караганда', avgScore: 84, students: 4200 },
  ],
  schools: [
    { name: 'NIS Astana', city: 'Астана', avgScore: 118, rank: 1 },
    { name: 'БИЛ Алматы', city: 'Алматы', avgScore: 113, rank: 2 },
    { name: 'РФМШ', city: 'Алматы', avgScore: 111, rank: 3 },
    { name: 'Школа №165', city: 'Алматы', avgScore: 105, rank: 4 },
  ],
  students: [
    { name: 'Айгерим', school: 'NIS Astana', score: 134, rank: 1 },
    { name: 'Диас', school: 'БИЛ Алматы', score: 129, rank: 2 },
    { name: 'Аружан', school: 'РФМШ', score: 126, rank: 3 },
    { name: 'Ерлан', school: 'NIS Astana', score: 124, rank: 4 },
    { name: 'Дана', school: 'БИЛ Алматы', score: 122, rank: 5 },
  ],
  universities: [
    { name: 'KBTU', targetStudents: 2400, avgScore: 108 },
    { name: 'AITU', targetStudents: 1800, avgScore: 112 },
    { name: 'KazNU', targetStudents: 5200, avgScore: 115 },
    { name: 'KIMEP', targetStudents: 1600, avgScore: 98 },
  ],
  subjects: [
    { name: 'Математика', avgScore: 32, maxScore: 50 },
    { name: 'Физика', avgScore: 28, maxScore: 50 },
    { name: 'История', avgScore: 15, maxScore: 20 },
    { name: 'Чтение', avgScore: 7, maxScore: 10 },
  ],
  growth: [
    { name: 'Айгерим', from: 98, to: 134, growth: 36 },
    { name: 'Диас', from: 95, to: 129, growth: 34 },
    { name: 'Аружан', from: 102, to: 126, growth: 24 },
    { name: 'Ерлан', from: 88, to: 124, growth: 36 },
  ],
}

export const FAQ_CONCERNS = [
  {
    id: 'time',
    question: 'Остался только 1 месяц. Не поздно ли?',
    answer: 'Нет. При сфокусированной подготовке 21–30 дней могут дать серьёзный прирост. Цель — не учить всё одинаково, а закрыть частые темы, исправить слабые модули и тренироваться в условиях экзамена.',
    tip: 'Начните с диагностики — QApp покажет, куда направить 80% времени.',
    stat: '67% абитуриентов с планом на 21 день поднимают балл на 15+',
    cta: 'Generate my 21-day plan',
  },
  {
    id: 'subjects',
    question: 'Что если я выбрал не те профильные предметы?',
    answer: 'Проверьте требования вуза и профессии в Career Navigator. Если предметы не совпадают — можно пересдать ЕНТ или выбрать программу с другими требованиями.',
    tip: 'Математика + Физика/Информатика открывают больше IT-направлений.',
    stat: '42% абитуриентов меняют таргет-вуз после проверки предметов',
    cta: 'Check requirements',
  },
  {
    id: 'grant',
    question: 'Можно ли получить грант при низком балле?',
    answer: 'Грант зависит от конкурса и программы. Платное поступление часто доступно от 65–80 баллов. QApp покажет paid vs grant gap для каждой программы.',
    tip: 'Сравните таблицу Paid vs Grant — иногда платное — реалистичный первый шаг.',
    stat: 'Средний grant gap по IT-программам — 28–35 баллов',
    cta: 'Compare scores',
  },
  {
    id: 'hours',
    question: 'Сколько часов в день нужно заниматься?',
    answer: 'При gap 30+ баллов и 30+ днях до экзамена — 2.5–4 часа в день. Главное — регулярность и фокус на слабых темах, а не количество часов.',
    tip: 'Smart Planner рассчитает weekly target под ваш график.',
    stat: 'Оптимально: 3 ч/день × 5 дней + 1 мок в выходные',
    cta: 'Start planning',
  },
  {
    id: 'stuck',
    question: 'Что делать, если теряю баллы в одном предмете?',
    answer: 'Используйте Score Breakdown — система покажет слабые модули и приоритет. 2 недели фокуса на одном предмете дают +8–15 баллов.',
    tip: 'Физика и математика чаще всего дают быстрый прирост при целевой практике.',
    stat: 'Средний прирост за 2 недели фокуса — +11 баллов',
    cta: 'View breakdown',
  },
  {
    id: 'realistic',
    question: 'Как понять, какой вуз мне реалистичен?',
    answer: 'Введите текущий балл — QApp сравнит с paid/grant средними по программам и покажет статус: qualify, paid only, gap.',
    tip: 'Matching связывает профессию и вузы автоматически.',
    stat: 'Средний абитуриент подаёт в 4–6 программ',
    cta: 'Check universities',
  },
]

export const PLAN_21_DAYS = [
  { week: 1, title: 'Диагностика + основы', tasks: ['Пробный ЕНТ (полный)', 'Карта слабых тем по предметам', 'Расписание на 3 недели', 'История: хронология + теория', 'Easy/medium задачи по математике'] },
  { week: 2, title: 'Практика + слабые места', tasks: ['High-frequency темы (физика, матем)', 'Timed practice — 40 мин блоки', 'Разбор повторяющихся ошибок', '40 задач/день по слабым темам', '1 мок-тест в середине недели'] },
  { week: 3, title: 'Моки + скорость + стратегия', tasks: ['2 полных пробника под тайминг', 'Скорость: 1.5 мин/вопрос', 'Финальный review формул', 'Стратегия первых 30 минут', 'Лёгкая практика за 2 дня до ЕНТ'] },
]
