import BrowserPlayer from 'output/BrowserPlayer'

export const play = (waveGenerator) => {
  BrowserPlayer.play(waveGenerator)
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
