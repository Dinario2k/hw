import { supabase } from './supabase';
import type { DatabaseHabit } from '@/types/database';
import type { CreateHabitInput } from '@/types/habit';

export async function fetchHabits(): Promise<DatabaseHabit[]> {
  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createHabit(
  input: CreateHabitInput
): Promise<DatabaseHabit> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('habits')
    .insert({
      user_id: userData.user.id,
      title: input.title,
      icon: input.icon,
      frequency: input.frequency,
      streak: 0,
      completed_dates: [],
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateHabitStreak(
  id: string,
  streak: number,
  completedDates: string[]
): Promise<void> {
  const { error } = await supabase
    .from('habits')
    .update({ streak, completed_dates: completedDates })
    .eq('id', id);

  if (error) throw new Error(error.message);
}

export async function deleteHabitApi(id: string): Promise<void> {
  const { error } = await supabase.from('habits').delete().eq('id', id);
  if (error) throw new Error(error.message);
}