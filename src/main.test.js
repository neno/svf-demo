import { describe, it, expect, beforeEach } from 'vitest';
import { exam } from './modules/evaluateExam.js';

describe('main.js DOM integration', () => {
  beforeEach(async () => {
    // minimal DOM similar to index.html
    document.body.innerHTML = `
      <div id="app">
        <h1>
          <span>Score: <span id="score">0</span></span>
          <span>Passed: <span id="passed">false</span></span>
        </h1>
        <form>
          <input type="checkbox" id="q-0-0">
          <input type="checkbox" id="q-0-1">
          <input type="checkbox" id="q-0-2">
        </form>
      </div>
    `;

    // Import main.js after DOM is ready so it can wire listeners
    await import('./main.js');
  });

  it('updates DOM when exam changes', () => {
    const scoreElement = document.getElementById('score');
    const passedElement = document.getElementById('passed');

    // initial state from main.js
    expect(scoreElement.textContent).toBe(String(exam.score));
    expect(passedElement.textContent).toBe(String(exam.passed));

    // change exam via proxy – should trigger subscription in main.js
    exam.score = 3;
    exam.passed = true;

    expect(scoreElement.textContent).toBe('3');
    expect(passedElement.textContent).toBe('true');
  });
});

