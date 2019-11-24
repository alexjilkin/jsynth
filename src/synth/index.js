import {Oscillator, Sequencer, Delay} from 'modules'
import {sampleRate} from './consts'

let master;
const bufSize = 4096;
let buffer;
let source;

let isPlaying = false;

export const play = (waveGenerator) => {
  master = new AudioContext({sampleRate: 44100});
  buffer = master.createBuffer(1, bufSize, sampleRate)
  source = master.createScriptProcessor(bufSize, 1, 1);

  isPlaying = true;

  const func = () => {
    return waveGenerator.next().value
  }

  const createBuffer = (output) => {
    for (let i = 0; i < buffer.length; i++) {
      const value = func();
  
      output[i] = value
    }
  }

  
  source.buffer = buffer;

  source.connect(master.destination);
  

  source.addEventListener('audioprocess', (e) => {
    isPlaying && createBuffer(e.outputBuffer.getChannelData(0));
  })
  
}

export const stop = () => {
  isPlaying = false;
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

export const basicGroup = [{module: 'Oscillator', func: bypassFunction}, {module: 'Sequencer', func: bypassFunction}];
export const basicMasterGroup = [{module: 'Oscilloscope', func: bypassFunction}, {module: 'FrequencyView', func: bypassFunction}];
export const bypassFunction = (y, x) => y;
