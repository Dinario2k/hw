import { useState, useEffect, useCallback } from 'react';
import type { Habit, CreateHabitInput } from '@/types/habit';
import {
  fetchHabits,
  createHabit,
  updateHabitStreak,
  deleteHabitApi,
} from '@/lib/habits-api';
import { todayISO } from '@/lib/date';
import type { DatabaseHabit } from '@/types/database';

function mapFromDb(row: DatabaseHabit): Habit {
  return {
    id: row.id,
    title: row.title,
    icon: row.icon,
    frequency: row.frequency,
    streak: row.streak,
    completedDates: row.completed_dates,
    createdAt: row.created_at.slice(0, 10),
  };
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHabits()
      .then((rows) => setHabits(rows.map(mapFromDb)))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const addHabit = useCallback(async (input: CreateHabitInput) => {
    try {
      const row = await createHabit(input);
      setHabits((prev) => [...prev, mapFromDb(row)]);
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  const toggleToday = useCallback(
    async (id: string) => {
      const today = todayISO();
      const habit = habits.find((h) => h.id === id);
      if (!habit) return;

      const isCompleted = habit.completedDates.includes(today);
      const completedDates = isCompleted
        ? habit.completedDates.filter((d) => d !== today)
        : [...habit.completedDates, today];
      const streak = isCompleted
        ? Math.max(0, habit.streak - 1)
        : habit.streak + 1;

      setHabits((prev) =>
        prev.map((h) =>
          h.id === id ? { ...h, completedDates, streak } : h
        )
      );

      try {
        await updateHabitStreak(id, streak, completedDates);
      } catch (e) {
        setError((e as Error).message);
        setHabits((prev) =>
          prev.map((h) => (h.id === id ? habit : h))
        );
      }
    },
    [habits]
  );

  const deleteHabit = useCallback(async (id: string) => {
    try {
      await deleteHabitApi(id);
      setHabits((prev) => prev.filter((h) => h.id !== id));
    } catch (e) {
      setError((e as Error).message);
    }
  }, []);

  return { habits, loading, error, addHabit, toggleToday, deleteHabit };
}