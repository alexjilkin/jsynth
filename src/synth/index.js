import BrowserPlayer from 'output/BrowserPlayer'

let _shouldGenerate = false;
let _frequencyModulation = 1;

const generator = waveGenerator();
let isFirstTime = true;

// Returns the stop function
export const play = (frequencyModulation) => {
  _shouldGenerate = true;
  _frequencyModulation = frequencyModulation;

  if (isFirstTime) {
    BrowserPlayer.play(generator)
    isFirstTime = false;
  }
}

export const keyUp = () => {
  _shouldGenerate = false;
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

      let y = 1;
      modules.forEach((theModule) => {
        const {func, module:name} = theModule;
        if (!_shouldGenerate && name === 'Oscillator') {
          return;
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

    x++;

    const mixVolume = 1 / wavesInAColumn.length;

    let wavesSum = wavesInAColumn.reduce((acc, value) => acc + (value * mixVolume), 0);
    masterGroup.forEach(({func}) => {
      [wavesSum] = func(wavesSum, x, 1)
    })

    
    // Decrease volume until I will make a master volume component
    yield wavesSum * 0.5
  }
}

export const setGlobalGroups = (groups) => {
    globalGroups = groups;
}
