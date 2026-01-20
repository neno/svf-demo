const checkboxMatrix = [];

let scoreElement = null;
let passedElement = null;

const examProps = {
  score: 0,
  passed: false,
};

// turn examProps into reactive elements with a proxy object
const exam = new Proxy(examProps, {
  get(target, key) {
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;

    if (key === 'score') {
      if (scoreElement) {
        scoreElement.textContent = value;
      }
    }

    if (key === 'passed') {
      if (passedElement) {
        passedElement.textContent = value;
      }
    }

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
  exam.passed = exam.score >= 3;
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

function setupExamEvaluation(checkboxesSelector, scoreIdSelector, passedIdSelector) {
  const checkboxes = document.querySelectorAll(checkboxesSelector);
  scoreElement = document.getElementById(scoreIdSelector);
  passedElement = document.getElementById(passedIdSelector);
  console.log(`checkboxes: ${checkboxes.length}`);
  initcheckboxes(checkboxes);
}

export { setupExamEvaluation, exam };
