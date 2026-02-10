import { describe, it, expect, beforeEach } from 'vitest';
import { exam, subscribeExam } from './examEvaluation.js';

describe('examEvaluation exam state', () => {
  beforeEach(() => {
    exam.score = 0;
    exam.passed = false;
  });

  it('notifies subscribers when score changes', () => {
    const events = [];
    const unsubscribe = subscribeExam((key, value, state) => {
      events.push({ key, value, state });
    });

    exam.score = 2;

    expect(events).toHaveLength(1);
    expect(events[0].key).toBe('score');
    expect(events[0].value).toBe(2);
    expect(events[0].state.score).toBe(2);

    unsubscribe();
  });

  it('notifies subscribers when passed changes', () => {
    const events = [];
    const unsubscribe = subscribeExam((key, value, state) => {
      events.push({ key, value, state });
    });

    exam.passed = true;

    expect(events).toHaveLength(1);
    expect(events[0].key).toBe('passed');
    expect(events[0].value).toBe(true);
    expect(events[0].state.passed).toBe(true);

    unsubscribe();
  });
});
