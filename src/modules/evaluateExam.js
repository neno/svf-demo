const decisionMatrix = []
let minScoreToPass = 3

const examProps = {
   score: 0,
   result: 'failed', // "passed" or "failed" (no default state)
   rowStatuses: [], // "failed", "default", or "passed" per row
}

// listeners that get notified whenever a property on exam changes
const examListeners = new Set()

function subscribeExam(listener) {
   examListeners.add(listener)
   return () => examListeners.delete(listener)
}

// turn examProps into reactive elements with a proxy object
const exam = new Proxy(examProps, {
   get(target, key) {
      return target[key]
   },
   set(target, key, value) {
      target[key] = value

      // notify all subscribers (e.g. main.js) about the change
      examListeners.forEach(listener => listener(key, value, { ...target }))

      return true
   },
})

// evaluate each row's status and compute overall result
function evaluateExam() {
   let score = 0
   const statuses = []

   for (let row = 0; row < decisionMatrix.length; row++) {
      if (decisionMatrix[row].every(col => col === 1)) {
         // all columns passed → row is passed
         statuses.push('passed')
         score += 1
      } else if (decisionMatrix[row].some(col => col === 0)) {
         // at least one column still at default → row is not yet decided
         statuses.push('default')
      } else {
         // all columns evaluated, at least one failed → row is failed
         statuses.push('failed')
      }
   }

   exam.score = score

   if (exam.score >= minScoreToPass) {
      exam.result = 'passed'
   } else {
      exam.result = 'failed'
   }
   exam.rowStatuses = statuses
}

// parse a radio ID and write the value into the matrix (no re-evaluation)
function setMatrixEntry(radioId, value) {
   // id format: decision-{row}-{col}-{state}
   const parts = radioId.split('-')
   const row = parseInt(parts[1]) - 1 // convert 1-indexed to 0-indexed
   const colLetter = parts[2]
   const colMap = { a: 0, b: 1, c: 2 }
   const col = colMap[colLetter]

   decisionMatrix[row][col] = parseInt(value)
}

function updateDecisionMatrix(radioId, value) {
   setMatrixEntry(radioId, value)
   evaluateExam()
}

function initRadioGroups(radioButtons) {
   // determine matrix dimensions from radio IDs
   let maxRow = 0
   radioButtons.forEach(radio => {
      const parts = radio.id.split('-')
      const row = parseInt(parts[1])
      if (row > maxRow) maxRow = row
   })

   // reset and initialize matrix with default values (0)
   decisionMatrix.length = 0
   for (let i = 0; i < maxRow; i++) {
      decisionMatrix.push([0, 0, 0])
   }

   // read initial checked state of radio buttons into the matrix
   radioButtons.forEach(radio => {
      if (radio.checked) {
         setMatrixEntry(radio.id, radio.value)
      }
   })

   // attach change listeners
   radioButtons.forEach(radio => {
      radio.addEventListener('change', () => {
         updateDecisionMatrix(radio.id, radio.value)
      })
   })

   // evaluate initial state so subscribers receive the computed values
   evaluateExam()
}

function setupExamEvaluation(radioButtons, _minScore) {
   minScoreToPass = _minScore
   initRadioGroups(radioButtons) // reads checked radios, populates matrix, evaluates
}

export { setupExamEvaluation, subscribeExam }
