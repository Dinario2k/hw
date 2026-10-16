export type HabitFrequency = 'daily' | 'weekly';

export interface Habit {
  id: string;
  title: string;
  icon: string;
  frequency: HabitFrequency;
  streak: number;
  completedDates: string[];
  createdAt: string;
}

export interface CreateHabitInput {
  title: string;
  icon: string;
  frequency: HabitFrequency;
}