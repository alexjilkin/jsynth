import BrowserPlayer from 'output/BrowserPlayer'

export const play = () => {
  BrowserPlayer.play(waveGenerator())
}

export const stop = () => {
  BrowserPlayer.stop();
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

      let frequencyModulation = 1;
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

    let wavesSum = wavesInAColumn.reduce((acc, value) => acc + value, 0);
    masterGroup.forEach(({func}) => {
      [wavesSum] = func(wavesSum, x, 1)
    })


    yield wavesSum
  }
}

export const setGlobalGroups = (groups) => {
    globalGroups = groups;
}
