import BrowserPlayer from 'output/BrowserPlayer'

let x = 0; // Master clock

let _shouldGenerate = false;
let _frequencyModulation = 1;
let _xAtStart = 0;
let _xAtStop = 0;

const generator = waveGenerator();
let isFirstTime = true;

const attackSize = 1000;
const releaseSize = 20000;

// Returns the stop function
export const play = (frequencyModulation) => {
  _shouldGenerate = true;
  _frequencyModulation = frequencyModulation;
  _xAtStart = x;
  console.log(_xAtStart, '_xAtStart')
  if (isFirstTime) {
    BrowserPlayer.play(generator)
    isFirstTime = false;
  }
}


export const envelopeAttack = (y, x, size) => {
  const m = 1 / (size)
  return y * (x * m)
}

export const envelopeRelease = (y, x, size) => {
  const m = -1 / (size);

  return y * ((x * m) + (1))
}



export const stop = () => {
  _shouldGenerate = false;
  _xAtStop = x;
}

let globalGroups = [];

export function* waveGenerator() {
  while(true) {

    const wavesInAColumn = []
    const groups = [...globalGroups]
    const masterGroup = groups.pop()

    groups.forEach((modules, index) => {
      if (modules.length === 0) {
        return; 
      }

      let y = 1;
      modules.forEach((theModule) => {
        const {func, module:name} = theModule;

        if (name === 'Oscillator') {
          if (!_shouldGenerate && (x - _xAtStop) >= releaseSize ) {
            y = 0;
          } else {
            y = envelope(y)
          }
        }
        

        if(func) {
          const result = func(y, x, _frequencyModulation);
          if (typeof result === 'object') {
            [y, _frequencyModulation] = result
          } else {
            y = result
          }
          
        }
      })

      wavesInAColumn.push(y)
    })

    

    const mixVolume = 1 / wavesInAColumn.length;

    let wavesSum = wavesInAColumn.reduce((acc, value) => acc + (value * mixVolume), 0);

    masterGroup.forEach(({func}) => {
      [wavesSum] = func(wavesSum, x, 1)
    })

    x++;
    // Decrease volume until I will make a master volume component
    yield wavesSum * 0.5
  }
}

const envelope = (y) => {

  const xFromStart = x - _xAtStart;
  
  if (xFromStart < attackSize) {
    return envelopeAttack(y, xFromStart, attackSize)
  } 
  
  const xFromStop = x - _xAtStop;
  if (!_shouldGenerate && xFromStop < releaseSize) {
    return (envelopeRelease(y, xFromStop, releaseSize))
  }
  
  return y;
}

export const setGlobalGroups = (groups) => {
    globalGroups = groups;
}
