const checkboxMatrix = [];
let minScoreToPass = 3;

const examProps = {
  score: 0,
  passed: false,
};

// listeners that get notified whenever a property on exam changes
const examListeners = new Set();

function subscribeExam(listener) {
  examListeners.add(listener);
  return () => examListeners.delete(listener);
}

// turn examProps into reactive elements with a proxy object
const exam = new Proxy(examProps, {
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;

    // notify all subscribers (e.g. main.js) about the change
    examListeners.forEach(listener => listener(key, value, { ...target }));

    return true;
  },
});

// increase score for every row that has all checkboxes checked
function evaluateExam() {
  exam.score = 0; // Reset score before recalculating
  for (let row = 0; row < checkboxMatrix.length; row++) {
    if (checkboxMatrix[row].every(col => col === true)) {
      exam.score+=1;
    }
  }
  
  exam.passed = exam.score >= minScoreToPass;
  console.log(`score: ${exam.score} passed: ${exam.passed}`);
}

function updatecheckboxMatrix(checkboxId, checked) {
  const [row, col] = checkboxId.split('-').filter(item => !isNaN(item)).map(Number);
  checkboxMatrix[row][col] = checked;
  evaluateExam();
}

function initcheckboxes(checkboxes) {
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      updatecheckboxMatrix(checkbox.id, checkbox.checked);
    });

    if ((index + 1) % 3 === 0) {
      checkboxMatrix.push([false, false, false]);
    }
  });
  console.log(`checkboxMatrix: ${checkboxMatrix}`);
}

function setupExamEvaluation(checkboxesSelector, _minScore) {
  minScoreToPass = _minScore;
  const checkboxes = document.querySelectorAll(checkboxesSelector);
  console.log(`checkboxes: ${checkboxes.length}`);
  initcheckboxes(checkboxes);
}

export { setupExamEvaluation, exam, subscribeExam };
