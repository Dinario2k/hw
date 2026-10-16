import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHabits } from './useHabits';

describe('useHabits', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Тест 1. Позитивный: добавление привычки
  it('добавляет новую привычку в список', () => {
    const { result } = renderHook(() => useHabits());

    act(() => {
      result.current.addHabit({
        title: 'Пить воду',
        icon: '💧',
        frequency: 'daily',
      });
    });

    expect(result.current.habits).toHaveLength(1);
    expect(result.current.habits[0].title).toBe('Пить воду');
    expect(result.current.habits[0].icon).toBe('💧');
    expect(result.current.habits[0].streak).toBe(0);
  });

  // Тест 2. Позитивный: отметка выполнения увеличивает streak
  it('увеличивает streak при отметке привычки за сегодня', () => {
    const { result } = renderHook(() => useHabits());

    act(() => {
      result.current.addHabit({
        title: 'Пить воду',
        icon: '💧',
        frequency: 'daily',
      });
    });

    const id = result.current.habits[0].id;

    act(() => {
      result.current.toggleToday(id);
    });

    expect(result.current.habits[0].streak).toBe(1);
    expect(result.current.habits[0].completedDates).toHaveLength(1);
  });

  // Тест 3. Негативный: повторная отметка снимает streak
  it('снимает отметку и уменьшает streak при повторном клике', () => {
    const { result } = renderHook(() => useHabits());

    act(() => {
      result.current.addHabit({
        title: 'Пить воду',
        icon: '💧',
        frequency: 'daily',
      });
    });

    const id = result.current.habits[0].id;

    act(() => {
      result.current.toggleToday(id);
    });
    act(() => {
      result.current.toggleToday(id);
    });

    expect(result.current.habits[0].streak).toBe(0);
    expect(result.current.habits[0].completedDates).toHaveLength(0);
  });

  // Тест 4. Удаление привычки
  it('удаляет привычку по id', () => {
    const { result } = renderHook(() => useHabits());

    act(() => {
      result.current.addHabit({
        title: 'Пить воду',
        icon: '💧',
        frequency: 'daily',
      });
    });

    const id = result.current.habits[0].id;

    act(() => {
      result.current.deleteHabit(id);
    });

    expect(result.current.habits).toHaveLength(0);
  });
});