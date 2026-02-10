import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { setupEvaluation } from './modules/setupEvaluation.js';

const radioButtons = document.querySelectorAll('#app input[type="radio"]');
setupEvaluation(radioButtons, 3, document.getElementById('score'), document.getElementById('result'), 'decision');
