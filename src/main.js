import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { setupExamEvaluation, exam, subscribeExam } from './examEvaluation.js';
const radioButtons = document.querySelectorAll('#app input[type="radio"]');

setupExamEvaluation(radioButtons, 3);

// get DOM elements for displaying exam state
const scoreElement = document.getElementById('score');
const passedElement = document.getElementById('passed');
const failedElement = document.getElementById('failed');

// set initial values
if (scoreElement) scoreElement.textContent = exam.score;
if (passedElement) passedElement.textContent = exam.passed;
if (failedElement) failedElement.textContent = exam.failed;

// update the row status <i> elements based on rowStatuses array
function updateRowStatuses(rowStatuses) {
  rowStatuses.forEach((status, index) => {
    const rowNum = index + 1; // 1-indexed
    const failedEl = document.getElementById(`decision-${rowNum}-d-failed`);
    const defaultEl = document.getElementById(`decision-${rowNum}-d-default`);
    const passedEl = document.getElementById(`decision-${rowNum}-d-passed`);

    if (failedEl) failedEl.style.display = status === 'failed' ? '' : 'none';
    if (defaultEl) defaultEl.style.display = status === 'default' ? '' : 'none';
    if (passedEl) passedEl.style.display = status === 'passed' ? '' : 'none';
  });
}

// listen for changes to exam and update DOM from here
subscribeExam((key, value, state) => {
  if (key === 'score' && scoreElement) {
    scoreElement.textContent = state.score;
  }
  if (key === 'passed' && passedElement) {
    passedElement.textContent = state.passed;
  }
  if (key === 'failed' && failedElement) {
    failedElement.textContent = state.failed;
  }
  if (key === 'rowStatuses') {
    updateRowStatuses(value);
  }
});
