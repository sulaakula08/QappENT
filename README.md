# QappENT

Frontend MVP страницы подготовки к ЕНТ (QApp). React + Vite + Tailwind, mock-данные, Gemini AI.

## Запуск

```bash
npm install
cp .env.example .env   # Windows: copy .env.example .env
# добавьте VITE_GEMINI_API_KEY в .env
npm run dev
```

```bash
npm run build   # production-сборка
```

## Секции (по ТЗ)

Hero · Steps (01–03) · Exam Format · Video Tips · Smart Planner · Progress Tracker · Score Breakdown · University Requirements · Career Navigator · Matching · AI Insight · Leaderboard · Paid vs Grant · 21-Day Plan · FAQ

## Интерактивность

- Балл в Hero / Steps масштабирует предметы
- Score Breakdown — ввод по каждому предмету
- Target score, hours/day, profile combo в Planner
- Выбор вуза + программы → AI Insight + статусы
- Выбор профессии → Matching summary
- FAQ concern selector · Generate 21-day plan
- Sticky CTA внизу экрана

## Структура

```
src/data/mockData.js      — universities, professions, videos, FAQ, leaderboard
src/utils/helpers.js      — qualify, planner, matching, AI insight logic
src/components/sections/  — секции страницы
src/pages/ENTPage.jsx     — центральный state
```
