import type { Habit } from '@/types/habit';
import { HabitCard } from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HabitList({ habits, onToggle, onDelete }: HabitListProps) {
  if (habits.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="text-6xl mb-4" aria-hidden>
          🎯
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Начни с первой привычки
        </h2>
        <p className="text-gray-500 text-sm">
          Пить воду, читать 20 минут или заняться спортом
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}