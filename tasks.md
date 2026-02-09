instead of having only a state for passed or failed, we can have a state for each decision.
For example:
- decision-1-c-failed
- decision-1-c-default
- decision-1-c-passed

Therefore we need to adjust the the html index.html and replace the checkbox with the radio groups.


````html
<input
  id="decision-1-a-failed"
  type="radio"
  name="tx_svfasfctocco_evaluatereservation[decision-form][1][a]"
  value="2"
/>
<input
  id="decision-1-a-default"
  type="radio"
  name="tx_svfasfctocco_evaluatereservation[decision-form][1][a]"
  value="0"
  checked
/>
<input
  id="decision-1-a-passed"
  type="radio"
  name="tx_svfasfctocco_evaluatereservation[decision-form][1][a]"
  value="1"
/>
````

For the evaluation we need to adjust the examEvaluation.js to handle the new radio groups. We also need to adjust the main.js to handle the new radio groups.
Besides the passed state we also need to track the failed state.
Please update the html accordingly, replace:
````html
<input type="radio" class="btn-check" name="q-0-0" id="q-0-0-failed" value="2">
<input type="radio" class="btn-check" name="q-4-1" id="q-4-1-default" value="0" checked>
<input type="radio" class="btn-check" name="q-4-1" id="q-4-1-passed" value="1">
`````

Please do so for all other columns and rows


Please add a another column add the end of every row do display the status.

````html
<i id="ecision-1-d-failed" style="display: none">failed</i>
<i id="ecision-1-d-default">default</i>
<i id="ecision-1-d-passed" style="display: none">passed</i>
`````

Please update the javascript to show the correct evaludation per row
