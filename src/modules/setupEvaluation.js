import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { setupExamEvaluation, exam, subscribeExam } from './evaluateExam.js';

// update the row status <i> elements based on rowStatuses array
function updateRowStatuses(rowStatuses, iconIdPrefix) {
  rowStatuses.forEach((status, index) => {
    const rowNum = index + 1; // starts at 1
    
    // if iconIdPrefix is set, update the result icons
    if (iconIdPrefix) {
      const failedEl = document.getElementById(`${iconIdPrefix}-failed-${rowNum}`);
      const defaultEl = document.getElementById(`${iconIdPrefix}-default-${rowNum}`);
      const passedEl = document.getElementById(`${iconIdPrefix}-passed-${rowNum}`);

      if (failedEl) failedEl.style.display = status === 'failed' ? 'inline-block' : 'none';
      if (defaultEl) defaultEl.style.display = status === 'default' ? 'inline-block' : 'none';
      if (passedEl) passedEl.style.display = status === 'passed' ? 'inline-block' : 'none';
    }
  });
}

function setupEvaluation(radioButtons, minScore, scoreElement, resultElement, iconIdPrefix) {
  setupExamEvaluation(radioButtons, minScore);
  
  // set initial values
  if (scoreElement) scoreElement.textContent = exam.score;
  if (resultElement) resultElement.textContent = exam.result;

  // listen for changes to exam and update DOM from here
  subscribeExam((key, value, state) => {
    if (key === 'score' && scoreElement) {
      scoreElement.textContent = state.score;
    }
    if (key === 'result' && resultElement) {
      resultElement.textContent = state.result;
    }
    if (key === 'rowStatuses') {
      updateRowStatuses(value, iconIdPrefix);
    }
  });
}

export { setupEvaluation };
