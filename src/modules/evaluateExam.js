const decisionMatrix = [];
let minScoreToPass = 3;

const examProps = {
  score: 0,
  passed: false,
  failed: false,
  rowStatuses: [], // "failed", "default", or "passed" per row
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

// evaluate each row's status and compute overall score/passed/failed
function evaluateExam() {
  exam.score = 0;
  let hasFailed = false;
  const statuses = [];

  for (let row = 0; row < decisionMatrix.length; row++) {
    if (decisionMatrix[row].some(col => col === 2)) {
      // any column failed → row is failed
      statuses.push('failed');
      hasFailed = true;
    } else if (decisionMatrix[row].every(col => col === 1)) {
      // all columns passed → row is passed
      statuses.push('passed');
      exam.score += 1;
    } else {
      statuses.push('default');
    }
  }

  exam.passed = exam.score >= minScoreToPass;
  exam.failed = hasFailed;
  exam.rowStatuses = statuses;
  console.log(`score: ${exam.score} passed: ${exam.passed} failed: ${exam.failed} rowStatuses: ${JSON.stringify(statuses)}`);
}

function updateDecisionMatrix(radioId, value) {
  // id format: decision-{row}-{col}-{state}
  const parts = radioId.split('-');
  const row = parseInt(parts[1]) - 1; // convert 1-indexed to 0-indexed
  const colLetter = parts[2];
  const colMap = { a: 0, b: 1, c: 2 };
  const col = colMap[colLetter];

  decisionMatrix[row][col] = parseInt(value);
  evaluateExam();
}

function initRadioGroups(radioButtons) {
  // determine matrix dimensions from radio IDs
  let maxRow = 0;
  radioButtons.forEach(radio => {
    const parts = radio.id.split('-');
    const row = parseInt(parts[1]);
    if (row > maxRow) maxRow = row;
  });

  // initialize matrix with default values (0)
  for (let i = 0; i < maxRow; i++) {
    decisionMatrix.push([0, 0, 0]);
  }

  // attach change listeners
  radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
      updateDecisionMatrix(radio.id, radio.value);
    });
  });

  console.log(`decisionMatrix: ${JSON.stringify(decisionMatrix)}`);
}

function setupExamEvaluation(radioButtons, _minScore) {
  minScoreToPass = _minScore;
  console.log(`radioButtons: ${radioButtons.length}`);
  initRadioGroups(radioButtons);
}

export { setupExamEvaluation, exam, subscribeExam };
