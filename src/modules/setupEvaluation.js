import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { setupExamEvaluation, subscribeExam } from './evaluateExam.js'

// update the row status <i> elements based on rowStatuses array
function updateRowStatuses(rowStatuses, iconIdPrefix) {
   rowStatuses.forEach((status, index) => {
      const rowNum = index + 1 // starts at 1

      // if iconIdPrefix is set, update the result icons
      if (iconIdPrefix) {
         const failedEl = document.getElementById(`${iconIdPrefix}-failed-${rowNum}`)
         const defaultEl = document.getElementById(`${iconIdPrefix}-default-${rowNum}`)
         const passedEl = document.getElementById(`${iconIdPrefix}-passed-${rowNum}`)

         if (failedEl) failedEl.classList.toggle('d-none', status !== 'failed')
         if (defaultEl) defaultEl.classList.toggle('d-none', status !== 'default')
         if (passedEl) passedEl.classList.toggle('d-none', status !== 'passed')
      }
   })
}


function updateResultStatuses(result, resultDefaultEl, resultPassedEl, resultFailedEl, resultInputEl, resultFailedExplanationEl) {
   if (result === 'passed') {
      if (resultPassedEl) resultPassedEl.classList.remove('d-none') // show passed button
      if (resultDefaultEl) resultDefaultEl.classList.add('d-none') // hide default paragraph
      if (resultFailedEl) resultFailedEl.classList.add('d-none') // hide failed button
      if (resultFailedExplanationEl) resultFailedExplanationEl.classList.add('d-none') // hide failed explanation
      if (resultInputEl) resultInputEl.value = 1 // set result input to 1
   } else if (result === 'failed') {
      if (resultPassedEl) resultPassedEl.classList.add('d-none') // hide passed button
      if (resultDefaultEl) resultDefaultEl.classList.add('d-none') // hide default paragraph
      if (resultFailedEl) resultFailedEl.classList.remove('d-none') // show failed button
      if (resultFailedExplanationEl) resultFailedExplanationEl.classList.remove('d-none') // show failed explanation
      if (resultInputEl) resultInputEl.value = 2 // set result input to 2
   } else {
      if (resultDefaultEl) resultDefaultEl.classList.remove('d-none') // show default paragraph
      if (resultPassedEl) resultPassedEl.classList.add('d-none') // hide passed button
      if (resultFailedEl) resultFailedEl.classList.add('d-none') // hide failed button
      if (resultFailedExplanationEl) resultFailedExplanationEl.classList.add('d-none') // hide failed explanation
      if (resultInputEl) resultInputEl.value = 0 // set result input to 0
   }
}

function isFailedExplanationValid(textareaEl) {
   if (!textareaEl) return false
   const length = textareaEl.value.length
   return length > 180 && length <= 1200
}

function setSubmitButtonState(submitButtonEl, result, failedExplanationTextareaEl) {
   if (!submitButtonEl) return

   submitButtonEl.disabled = true

   console.warn('result', result)

   if (!result) {
      submitButtonEl.disabled = false
   }
   if (result === 'passed') {
      submitButtonEl.disabled = false
   }
   if (result === 'failed' && isFailedExplanationValid(failedExplanationTextareaEl)) {
      submitButtonEl.disabled = false
   }
}

function setupEvaluation(
   radioButtons,
   minScore,
   scoreElement,
   resultDefaultEl,
   resultPassedEl,
   resultFailedEl,
   resultInputEl,
   resultFailedExplanationEl,
   submitButtonEl,
   failedExplanationTextareaEl,
   iconIdPrefix
) {
   if (!resultInputEl) {
      return // if there is no result input element, the form does not have to be evaluated
   }

   submitButtonEl.disabled = true // disable submit button initially
   let result = 'default'

   // Subscribe FIRST so we receive events from the initial evaluation
   subscribeExam((key, value, state) => {
      if (key === 'score' && scoreElement) {
         scoreElement.textContent = state.score
      }
      if (key === 'result' && resultInputEl) {
         updateResultStatuses(state.result, resultDefaultEl, resultPassedEl, resultFailedEl, resultInputEl, resultFailedExplanationEl)
      }

      if (key === 'rowStatuses') {
         updateRowStatuses(value, iconIdPrefix)
      }
      if (key === 'result' && submitButtonEl) {
         result = state.result
         setSubmitButtonState(submitButtonEl, state.result, failedExplanationTextareaEl)
      }
   })

   // Setup evaluation — reads initial radio button state, populates the
   // decision matrix, and calls evaluateExam() which triggers subscribers above
   setupExamEvaluation(radioButtons, minScore)

   // re-evaluate submit button when the failed explanation textarea changes
   if (failedExplanationTextareaEl) {
      failedExplanationTextareaEl.addEventListener('input', () => {
         setSubmitButtonState(submitButtonEl, result, failedExplanationTextareaEl)
      })
   }
}

export { setupEvaluation }
