# HabitFlow — трекер привычек

Веб-приложение (PWA) для отслеживания личных привычек с мотивацией через streak.
Разработано в рамках курса по практическому применению AI-инструментов в разработке (ДЗ №1–6).

![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Free-3ECF8E?logo=supabase)
![Vercel](https://img.shields.io/badge/Vercel-Hobby-000?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 О проекте

**HabitFlow** помогает вырабатывать полезные привычки через визуальную мотивацию:

- Минималистичный интерфейс — ничего лишнего.
- Streak (серия дней подряд) — мотивация не бросать.
- Облачное хранение — данные доступны с любого устройства.
- Вход через email или Google OAuth2.
- Работает как PWA — можно установить на телефон.

### Целевая аудитория

Мужчины и женщины 18–45 лет, интересующиеся саморазвитием и ведущие активный образ жизни.

---

## ✨ Функциональность

### MVP

- ✅ **Создание привычек** — название, эмодзи-иконка, периодичность (ежедневно / по дням недели).
- ✅ **Отметка выполнения** — клик по карточке за сегодня.
- ✅ **Автоматический подсчёт streak** — увеличивается при отметке, сбрасывается при пропуске.
- ✅ **Удаление привычек** — с мгновенным обновлением UI (оптимистичное обновление).
- ✅ **Прогресс-бар за день** — «Выполнено сегодня: X из Y».
- ✅ **Пустое состояние** — с эмодзи-подсказками для нового пользователя.

### Дополнительно

- ✅ **Аутентификация** — email/password + Google OAuth2.
- ✅ **Защита данных** — Row Level Security в Supabase.
- ✅ **Структурированное логирование** — JSON-формат с уровнями `info/warn/error`.
- ✅ **ErrorBoundary** — перехват ошибок рендера с fallback-UI.
- ✅ **Адаптивная вёрстка** — mobile-first, поддержка 320–1440px.
- ✅ **Аналитика** — Umami (self-hosted на Vercel + Supabase).
- ✅ **CI/CD** — GitHub Actions (lint, type-check, tests, build).
- ✅ **Мониторинг** — UptimeRobot.

---

## 🛠️ Технологический стек

| Слой | Технология | Версия |
|---|---|---|
| **Язык** | TypeScript | 5.x (strict) |
| **UI** | React | 19.x |
| **Сборщик** | Vite | 8.x |
| **Стили** | Tailwind CSS | 4.x (через `@tailwindcss/vite`) |
| **Состояние** | React Hooks (`useState`, `useMemo`, `useCallback`) | — |
| **Backend (BaaS)** | Supabase | Free |
| **БД** | PostgreSQL | 15 (в Supabase) |
| **Аутентификация** | Supabase Auth (email + Google OAuth2) | — |
| **Тестирование** | Vitest + Testing Library | 3.x / 16.x |
| **Линтер** | ESLint | 9.x |
| **CI/CD** | GitHub Actions | — |
| **Деплой** | Vercel | Hobby |
| **Аналитика** | Umami (self-hosted) | — |
| **Мониторинг** | UptimeRobot | Free |

---

## 🚀 Установка и запуск

### Предварительные требования

- **Node.js** 20.11+ ([скачать](https://nodejs.org))
- **npm** 10+
- **Git**

### Клонирование

```bash
git clone https://github.com/Dinario2k/hw.git
cd hw

https://hw-opal-gamma.vercel.app