export interface DatabaseHabit {
  id: string;
  user_id: string;
  title: string;
  icon: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  completed_dates: string[];
  created_at: string;
}