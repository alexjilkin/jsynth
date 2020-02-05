import BrowserPlayer from 'output/BrowserPlayer'

// Returns the stop function
export const play = (frequencyModulation) => 
  BrowserPlayer.play(waveGenerator(frequencyModulation))

let globalGroups = [];

export function* waveGenerator(frequencyModulation) {
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
      modules.forEach(({func}) => {
        if(func) {
          const result = func(y, x, frequencyModulation);
          if (typeof result === 'object') {
            [y, frequencyModulation] = result
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
