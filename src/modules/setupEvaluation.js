import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { setupExamEvaluation, exam, subscribeExam } from './evaluateExam.js';

let iconIdPrefix;
let scoreElement;
let passedElement;
let failedElement;

// update the row status <i> elements based on rowStatuses array
function updateRowStatuses(rowStatuses) {
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


function setupEvaluation(radioButtons, minScore, scoreEl, passedEl, failedEl, iconPrefix) {
  iconIdPrefix = iconPrefix;
  setupExamEvaluation(radioButtons, minScore);
  scoreElement = scoreEl;
  passedElement = passedEl;
  failedElement = failedEl;
  
  // set initial values
  if (scoreElement) scoreElement.textContent = exam.score;
  if (passedElement) passedElement.textContent = exam.passed;
  if (failedElement) failedElement.textContent = exam.failed;


  // listen for changes to exam and update DOM from here
  subscribeExam((key, value, state) => {
    if (key === 'score' && scoreElement) {
      scoreElement.textContent = state.score;
    }
  });
}

export { setupEvaluation };
