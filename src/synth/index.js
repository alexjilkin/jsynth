import pcm from 'common/pcm'
import {Oscillator, Sequencer, Delay} from 'modules'
import {sampleRate} from './consts'

const pcmObject = new pcm({channels: 1, rate: sampleRate, depth: 16});

export const play = (waveGenerator) => {
  const wave = []
  let i = 1;
  const t0 = performance.now()
  
  const samplesPerWav = sampleRate * 2
  // TODO: Prevent "pop" sound
  while (i <= samplesPerWav) {
    wave[i] = waveGenerator.next().value

    i++;
  }

  for (let j = wave.length - 100; j < wave.length; j++) {
    wave[j] = wave[j] / Math.pow(2, (j - (wave.length - 100)))
  }

  pcmObject.toWav(wave).play()
  const t1 = performance.now()
  setTimeout(() => play(waveGenerator), (samplesPerWav / (sampleRate * 2) * 1000) - (t1 - t0))
}

let globalGroups = [];

export function* waveGenerator() {
  let x = 0;

  while(true) {
    const wavesInAColumn = []
    
    const groups = [...globalGroups]
    
    const masterGroup = groups.pop()
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

    let wavesSum = wavesInAColumn.reduce((acc, value) => acc + value, 0);
    masterGroup.forEach(({func}) => {
      wavesSum = func(wavesSum, x)
    })


    yield wavesSum
  }
}

export const setGlobalGroups = (groups) => {
    globalGroups = groups;
}

export const basicGroup = [{Module: Oscillator, func: bypassFunction}, {Module: Sequencer, func: bypassFunction}, {Module: Delay, func: bypassFunction}];

export const bypassFunction = (y, x) => y;
