import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import { setupEvaluation } from './modules/setupEvaluation.js';

const form = document.querySelector('form')
const radioButtons = form.querySelectorAll('input[type="radio"]')
const scoreEl = document.getElementById('score')
const resultDefaultEl = document.getElementById('status-default')
const resultPassedEl = document.getElementById('status-button-passed')
const resultFailedEl = document.getElementById('status-button-failed')
const resultFailedExplanationEl = document.getElementById('reason-text')
const resultInputEl = document.getElementById('decision-form-status')
const submitButtonEl = document.getElementById('saveBtn')
const failedExplanationTextareaEl = document.getElementById('decision-form-reason')

setupEvaluation(
   radioButtons,
   3,
   scoreEl,
   resultDefaultEl,
   resultPassedEl,
   resultFailedEl,
   resultInputEl,
   resultFailedExplanationEl,
   submitButtonEl,
   failedExplanationTextareaEl,
   'decision'
)