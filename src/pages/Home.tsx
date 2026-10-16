import { useAuth } from '@/hooks/useAuth';
import { useHabits } from '@/hooks/useHabits';
import { AddHabitForm } from '@/components/features/AddHabitForm';
import { HabitList } from '@/components/features/HabitList';
import { todayISO } from '@/lib/date';
import { useMemo } from 'react';

export default function Home() {
  const { signOut } = useAuth();
  const { habits, loading, error, addHabit, toggleToday, deleteHabit } = useHabits();

  const total = habits.length;
  const completed = useMemo(
    () => habits.filter((h) => h.completedDates.includes(todayISO())).length,
    [habits]
  );
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Загрузка привычек...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="max-w-[500px] sm:max-w-[600px] w-full mx-auto px-4 sm:px-6 py-6 pb-24">
        <header className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Мои привычки
            </h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">
              Выполнено сегодня: {completed} из {total}
            </p>
          </div>
          <button
            onClick={signOut}
            className="text-sm text-gray-500 hover:text-purple-600"
          >
            Выйти
          </button>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
            {error}
          </div>
        )}

        <section className="mb-6">
          <AddHabitForm onAdd={addHabit} />
        </section>

        <section>
          <HabitList
            habits={habits}
            onToggle={toggleToday}
            onDelete={deleteHabit}
          />
        </section>
      </div>

      {total > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-gray-100">
          <div className="max-w-[500px] sm:max-w-[600px] mx-auto px-4 sm:px-6 py-3">
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>Прогресс дня</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}