import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HabitCard } from './HabitCard';
import type { Habit } from '@/types/habit';
import { todayISO } from '@/lib/date';

const mockHabit: Habit = {
  id: 'test-1',
  title: 'Пить воду',
  icon: '💧',
  frequency: 'daily',
  streak: 3,
  completedDates: [],
  createdAt: '2026-10-01',
};

describe('HabitCard', () => {
  it('отображает название, эмодзи и streak', () => {
    const { getByText } = render(
      <HabitCard habit={mockHabit} onToggle={() => {}} onDelete={() => {}} />
    );
    expect(getByText('Пить воду')).toBeInTheDocument();
    expect(getByText('💧')).toBeInTheDocument();
    expect(getByText(/3/)).toBeInTheDocument();
  });

  it('вызывает onToggle с id при клике на карточку', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const { getByText } = render(
      <HabitCard habit={mockHabit} onToggle={onToggle} onDelete={() => {}} />
    );
    await user.click(getByText('Пить воду'));
    expect(onToggle).toHaveBeenCalledWith('test-1');
  });

  it('вызывает onDelete, но не onToggle при клике на кнопку удаления', async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onDelete = vi.fn();
    const { getByLabelText } = render(
      <HabitCard habit={mockHabit} onToggle={onToggle} onDelete={onDelete} />
    );
    await user.click(getByLabelText('Удалить привычку'));
    expect(onDelete).toHaveBeenCalledWith('test-1');
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('подсвечивает карточку, если привычка отмечена сегодня', () => {
    const completedHabit: Habit = {
      ...mockHabit,
      completedDates: [todayISO()],
    };
    const { container } = render(
      <HabitCard habit={completedHabit} onToggle={() => {}} onDelete={() => {}} />
    );
    const card = container.firstElementChild as HTMLElement;
    expect(card.className).toContain('from-purple-100');
  });
});