import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { setupExamEvaluation, exam, subscribeExam } from './examEvaluation.js';
const checkboxes = document.querySelectorAll('#app input[type="checkbox"]');

setupExamEvaluation(checkboxes, 3);

// get DOM elements for displaying exam state
const scoreElement = document.getElementById('score');
const passedElement = document.getElementById('passed');

// set initial values
if (scoreElement) scoreElement.textContent = exam.score;
if (passedElement) passedElement.textContent = exam.passed;

// listen for changes to exam and update DOM from here
subscribeExam((key, value, state) => {
  if (key === 'score' && scoreElement) {
    scoreElement.textContent = state.score;
  }
  if (key === 'passed' && passedElement) {
    passedElement.textContent = state.passed;
  }
});
