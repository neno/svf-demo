let checkboxMatrix = [];

let score = 0;

const exam = {
  score: 0,
  examPassed: false,
};


const examPassed = false;

let myProxy = new Proxy(exam, {
  get(target, key) {
    // console.log(`Getting ${key}`, target[key]);
    return target[key];
  },
});

// increase score for every row that has all checkboxes checked
function checkScore() {
  score = 0; // Reset score before recalculating
  for (let row = 0; row < checkboxMatrix.length; row++) {
    // console.log('row', checkboxMatrix[row], checkboxMatrix[row].every(col => col === true));
    if (checkboxMatrix[row].every(col => col === true)) {
      score+=1;
    }
  }
  myProxy.examPassed = score >= 3;
  // console.log(`score: ${score} examPassed: ${examPassed}`);
  
  // console.log('myProxy - examPassed:', myProxy.examPassed);
}

function checkExamPassed() {
  if (myProxy.examPassed) {
    console.log('exam passed');
  } else {
    console.log('exam failed');
  }
}


function updateCheckboxMatrix(checkboxId, checked) {
  const [row, col] = checkboxId.split('-').filter(item => !isNaN(item)).map(Number);
  checkboxMatrix[row][col] = checked;
  checkScore();
  checkExamPassed();
}

function initCheckboxes(checkboxes) {
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      updateCheckboxMatrix(checkbox.id, checkbox.checked);
    });
    
    if ((index + 1) % 3 === 0) {
      checkboxMatrix.push([false, false, false]);
    }
  });
}


// const checkboxes = document.querySelectorAll('#app input[type="checkbox"]');
// initCheckboxes(checkboxes);

export function setupCheckboxMatrix(querySelector) {
  const checkboxes = document.querySelectorAll(querySelector);
  initCheckboxes(checkboxes);
}

