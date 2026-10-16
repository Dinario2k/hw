import { useState, type FormEvent } from 'react';
import type { CreateHabitInput, HabitFrequency } from '@/types/habit';
import { Button } from '@/components/ui/Button';

const ICONS = ['💧', '📚', '🏃', '🧘', '🍎', '🎯'] as const;
const MAX_TITLE = 50;

interface AddHabitFormProps {
  onAdd: (input: CreateHabitInput) => void;
}

export function AddHabitForm({ onAdd }: AddHabitFormProps) {
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState<string>(ICONS[0]);
  const [frequency, setFrequency] = useState<HabitFrequency>('daily');

  const trimmed = title.trim();
  const isTooLong = title.length > MAX_TITLE;
  const isValid = trimmed.length > 0 && !isTooLong;
  const counterClass =
    title.length >= 45 ? 'text-red-500' : 'text-gray-400';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onAdd({ title: trimmed, icon, frequency });
    setTitle('');
    setIcon(ICONS[0]);
    setFrequency('daily');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-4 shadow-sm space-y-3"
    >
      <div>
        <label
          htmlFor="habit-title"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Название
        </label>
        <input
          id="habit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={MAX_TITLE + 10}
          placeholder="Например: Пить воду"
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-gray-900 focus:border-purple-500 focus:outline-none"
        />
        <div className={`text-xs text-right mt-1 ${counterClass}`}>
          {title.length}/{MAX_TITLE}
        </div>
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Иконка
        </span>
        <div className="flex gap-2 flex-wrap">
          {ICONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setIcon(emoji)}
              aria-label={`Иконка ${emoji}`}
              className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition ${
                icon === emoji
                  ? 'bg-purple-100 ring-2 ring-purple-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Периодичность
        </span>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="frequency"
              value="daily"
              checked={frequency === 'daily'}
              onChange={() => setFrequency('daily')}
              className="accent-purple-600"
            />
            Ежедневно
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="frequency"
              value="weekly"
              checked={frequency === 'weekly'}
              onChange={() => setFrequency('weekly')}
              className="accent-purple-600"
            />
            По дням недели
          </label>
        </div>
      </div>

      <Button type="submit" disabled={!isValid} className="w-full">
        Создать
      </Button>
    </form>
  );
}