import './style.css'
import { setupCounter } from './counter.ts'
import {setupThree} from './three.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>

  </div>
<div id="three"></div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)



setupThree()


