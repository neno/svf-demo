import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { setupExamEvaluation, exam, subscribeExam } from './examEvaluation.js';

setupExamEvaluation('#app input[type="checkbox"]', 'score', 'passed');

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





// import { setupCheckboxMatrix } from './checkboxMatrix.js';

// setupCheckboxMatrix('#app input[type="checkbox"]');

// let checkboxMatrix = [];

// function updateCheckboxMatrix(checkboxId, checked) {
//   const [row, col] = checkboxId.split('-').filter(item => !isNaN(item)).map(Number);
//   checkboxMatrix[row][col] = checked;
//   console.log(checkboxMatrix);
// }

// function initCheckboxes(checkboxes) {
//   checkboxes.forEach((checkbox, index) => {
//     checkbox.addEventListener('change', () => {
//       updateCheckboxMatrix(checkbox.id, checkbox.checked);
//     });
    
//     if ((index + 1) % 3 === 0) {
//       checkboxMatrix.push([false, false, false]);
//     }
//   });
// }


// const checkboxes = document.querySelectorAll('#app input[type="checkbox"]');
// initCheckboxes(checkboxes);
// console.log(checkboxMatrix);
