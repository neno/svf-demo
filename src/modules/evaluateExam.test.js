import { describe, it, expect, beforeEach } from 'vitest';
import { exam, subscribeExam } from './evaluateExam.js';

describe('examEvaluation exam state', () => {
  beforeEach(() => {
    exam.score = 0;
    exam.result = "default";
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

  it('notifies subscribers when result changes', () => {
    const events = [];
    const unsubscribe = subscribeExam((key, value, state) => {
      events.push({ key, value, state });
    });

    exam.result = "passed";

    expect(events).toHaveLength(1);
    expect(events[0].key).toBe('result');
    expect(events[0].value).toBe("passed");
    expect(events[0].state.result).toBe("passed");

    unsubscribe();
  });
});
