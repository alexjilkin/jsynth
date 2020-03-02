import BrowserPlayer from 'output/BrowserPlayer'

let x = 0; // Master clock

const generator = waveGenerator();
let isFirstTime = true;

const attackSize = 1000;
const releaseSize = 20000;
const instances = {

}

let numOfGeneratingInstances = 0;

// Returns the stop function
export const play = (frequencyModulation, id) => {
  instances[id] = {
    shouldGenerate: true,
    frequencyModulation: frequencyModulation,
    xAtStart: x
  }
  numOfGeneratingInstances++;

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

export const stop = (id) => {
  instances[id].shouldGenerate = false
  instances[id].xAtStop = x
  numOfGeneratingInstances--;
}

let globalGroups = [];

export function* waveGenerator() {
  while(true) {
    const wavesInAColumn = []
    const groups = [...globalGroups]
    const masterGroup = groups.pop()

    Object.keys(instances).forEach(id => {
      if(!instances[id]) 
        return;
      const instancesWaves = []

      groups.forEach((modules, index) => {
        if (modules.length === 0) {
          return; 
        }

        if(!instances[id]) 
          return;

        let y = 1;
        modules.forEach((theModule) => {
          const {func, module:name} = theModule;

          if(!instances[id]) 
            return;
          
          if(func) {
            const result = func(y, x, instances[id].frequencyModulation);
            if (typeof result === 'object') {
              [y, instances[id].frequencyModulation] = result
            } else {
              y = result
            }
            
          }
        })

        instancesWaves.push(y)
      })

      let y = instancesWaves.reduce((acc, value) => acc + value, 0);

      if (!instances[id].shouldGenerate && (x - instances[id].xAtStop) >= releaseSize ) {
        y = 0;
        delete instances[id]
        return;
      } else {
        y = envelope(y, id)
      }

      wavesInAColumn.push(y)
    })
    

    const mixVolume = numOfGeneratingInstances ?  1 / numOfGeneratingInstances : 1

    let wavesSum = wavesInAColumn.reduce((acc, value) => acc + (value * mixVolume), 0);

    masterGroup.forEach(({func}) => {
      [wavesSum] = func(wavesSum, x, 1)
    })

    x++;
    // Decrease volume until I will make a master volume component
    yield wavesSum * 0.5
  }
}

const envelope = (y, id) => {

  const xFromStart = x - instances[id].xAtStart;
  
  if (xFromStart < attackSize) {
    return envelopeAttack(y, xFromStart, attackSize)
  } 
  
  const xFromStop = x - instances[id].xAtStop;
  if (!instances[id].shouldGenerate && xFromStop < releaseSize) {
    return (envelopeRelease(y, xFromStop, releaseSize))
  }
  
  return y;
}

export const setGlobalGroups = (groups) => {
    globalGroups = groups;
}
