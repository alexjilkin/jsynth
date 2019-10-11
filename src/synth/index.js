import pcm from 'common/pcm'
import {Oscillator, Sequencer, Delay} from 'modules'
export const sampleRate = 44100;
const pcmObject = new pcm({channels: 1, rate: sampleRate, depth: 16});

export const play = (waveGenerator) => {
  const wave = []
  let i = 1;
  const t0 = performance.now()
  
  // TODO: Prevent "pop" sound
  while (i <= sampleRate * 2) {
    wave[i] = waveGenerator.next().value

    i++;
  }

  pcmObject.toWav(wave).play()
  const t1 = performance.now()
  setTimeout(() => play(waveGenerator), ((1000 / 88200) * i) - (t1 - t0))
}

let globalGroups = [];

export function* waveGenerator() {
  let x = 0;

  while(true) {
    const wavesInAColumn = []
    
    const groups = [...globalGroups]
    
    const oscilloscopeGroup = groups.pop()
    groups.forEach((modules, index) => {
      if (modules.length === 0) {
        return;
      }

      let y = x;

      modules.forEach(({func}) => {
        y = func ? func(y, x) : y;
      })

      wavesInAColumn.push(y)
    })

    x++;
    const wavesSum = wavesInAColumn.reduce((acc, value) => acc + value, 0);
    oscilloscopeGroup[0].func(wavesSum, x)
    yield wavesSum
  }
}

export const setGlobalGroups = (groups) => {
    globalGroups = groups;
}

export const basicGroup = [{Module: Oscillator, func: bypassFunction}, {Module: Sequencer, func: bypassFunction}, {Module: Delay, func: bypassFunction}];

export const bypassFunction = (y, x) => y;
