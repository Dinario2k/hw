import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    'Не заданы VITE_SUPABASE_URL и VITE_SUPABASE_ANON_KEY. Проверьте .env.local'
  );
}

// Тип для структурированного лога
interface LogEntry {
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
}

// Простой структурированный логгер
function log(
  level: LogEntry['level'],
  message: string,
  context?: Record<string, unknown>
): void {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
  };

  const output = JSON.stringify(entry);

  if (level === 'error') {
    console.error(output);
  } else if (level === 'warn') {
    console.warn(output);
  } else {
    console.info(output);
  }
}

// Создание клиента Supabase
export const supabase = createClient(url, anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

// Отслеживание изменений состояния аутентификации
supabase.auth.onAuthStateChange((event, session) => {
  switch (event) {
    case 'SIGNED_IN':
      log('info', 'Пользователь вошёл в систему', {
        userId: session?.user.id,
        email: session?.user.email,
      });
      break;

    case 'SIGNED_OUT':
      log('info', 'Пользователь вышел из системы');
      break;

    case 'TOKEN_REFRESHED':
      log('info', 'Токен обновлён');
      break;

    case 'USER_UPDATED':
      log('info', 'Данные пользователя обновлены', {
        userId: session?.user.id,
      });
      break;

    case 'PASSWORD_RECOVERY':
      log('warn', 'Запрошено восстановление пароля', {
        email: session?.user.email,
      });
      break;

    default:
      log('info', `Событие аутентификации: ${event}`);
  }
});

// Глобальный перехват ошибок Supabase (если есть)
// Оборачиваем вызовы через хелпер для логирования ошибок запросов
export function logSupabaseError(
  operation: string,
  error: { message: string; code?: string; details?: string }
): void {
  log('error', `Ошибка Supabase: ${operation}`, {
    message: error.message,
    code: error.code,
    details: error.details,
  });
}

// Экспорт логгера для использования в других модулях
export { log };