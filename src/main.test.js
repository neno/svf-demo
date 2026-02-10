import { describe, it, expect, beforeEach } from 'vitest';
import { exam } from './modules/evaluateExam.js';

describe('main.js DOM integration', () => {
  beforeEach(async () => {
    // minimal DOM similar to index.html
    document.body.innerHTML = `
      <div id="app">
        <h1>
          <span>Score: <span id="score">0</span></span>
          <span>Result: <span id="result">default</span></span>
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
    const resultElement = document.getElementById('result');

    // initial state from main.js
    expect(scoreElement.textContent).toBe(String(exam.score));
    expect(resultElement.textContent).toBe(String(exam.result));

    // change exam via proxy – should trigger subscription in main.js
    exam.score = 3;
    exam.result = "passed";

    expect(scoreElement.textContent).toBe('3');
    expect(resultElement.textContent).toBe('passed');
  });
});

