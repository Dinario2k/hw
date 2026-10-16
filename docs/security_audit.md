# Аудит безопасности HabitFlow

## Методология

- `npm audit` — уязвимости в зависимостях.
- Snyk — глубокое сканирование.
- Ручной review OWASP Top 10.

## Найденные уязвимости

| # | Уязвимость | Критичность | Исправление |
|---|---|---|---|
| 1 | [если есть] | Low/Medium/High | Обновление пакета / патч |

## Проверка OWASP Top 10

| Угроза | Статус | Комментарий |
|---|---|---|
| A01: Broken Access Control | ✅ | RLS настроен для habits и profiles |
| A02: Cryptographic Failures | ✅ | HTTPS + JWT |
| A03: Injection | ✅ | Supabase использует параметризованные запросы |
| A04: Insecure Design | ✅ | Схема с user_id |
| A05: Security Misconfiguration | ✅ | Нет дефолтных паролей, `.env.local` в `.gitignore` |
| A06: Vulnerable Components | ✅ | `npm audit` — 0 уязвимостей |
| A07: Auth Failures | ✅ | Supabase Auth + JWT |
| A08: Data Integrity | ✅ | Валидация на клиенте + check-констрейнты в БД |
| A09: Logging Failures | ✅ | Supabase Logs + ErrorBoundary |
| A10: SSRF | N/A | Нет серверных запросов к внешним URL |

## Рекомендации

- Настроить Content Security Policy (CSP) в production.
- Включить rate limiting в Supabase (Settings → Auth → Rate Limits).
- Регулярно обновлять зависимости (`npm update`).