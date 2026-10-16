import type { Habit } from '@/types/habit';
import { todayISO } from '@/lib/date';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function pluralDays(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return 'день';
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'дня';
  return 'дней';
}

export function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  const completedToday = habit.completedDates.includes(todayISO());

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onToggle(habit.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(habit.id);
        }
      }}
      className={`relative w-full flex items-center gap-3 rounded-2xl p-4 shadow-sm cursor-pointer transition-all ${
        completedToday
          ? 'bg-gradient-to-r from-purple-100 to-pink-100'
          : 'bg-white hover:shadow-md'
      }`}
    >
      <span className="text-3xl flex-shrink-0" aria-hidden>
        {habit.icon}
      </span>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 break-words line-clamp-2">
          {habit.title}
        </p>
        <p className="text-sm text-gray-500">
          🔥 {habit.streak} {pluralDays(habit.streak)}
        </p>
      </div>

      <div
        className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          completedToday ? 'bg-purple-600 border-purple-600' : 'border-gray-300'
        }`}
        aria-hidden
      >
        {completedToday && (
          <svg
            className="w-3.5 h-3.5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 010 1.4l-8 8a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4L8 12.6l7.3-7.3a1 1 0 011.4 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(habit.id);
        }}
        aria-label="Удалить привычку"
        className="absolute top-1 right-1 w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 rounded-full hover:bg-white/60 text-lg leading-none"
      >
        ×
      </button>
    </div>
  );
}