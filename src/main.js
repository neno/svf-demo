import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { setupExamEvaluation, exam } from './examEvaluation.js';

setupExamEvaluation('#app input[type="checkbox"]', 'score', 'passed');

console.log(`exam: ${exam.score} / ${exam.passed}`);

// document.getElementById('score').textContent = exam.score;
// document.getElementById('passed').textContent = exam.passed;





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
