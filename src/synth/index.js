import BrowserPlayer from 'output/BrowserPlayer'


let x = 0; // Master clock

const generator = waveGenerator();
let isFirstTime = true;

const attackSize = 500;
const releaseSize = 10000;
const instances = {

}
let postFrequencyModulation = 1;

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

export const stop = (id) => {
  instances[id].shouldGenerate = false
  instances[id].xAtStop = x
  numOfGeneratingInstances--;
}

let _moduleFunc = [];

export function* waveGenerator() {
  while(true) {
    const wave = 0;
    const modules = [..._moduleFunc]

    const generatingModules = modules.filter(({type}) => type === 'generator')
    const restModules = modules.filter(({type}) => type !== 'generator')

    Object.keys(instances).forEach(id => {
      if(!instances[id]) 
        return;

      let y = 0;
      let baseFrequencyModulation = instances[id].frequencyModulation;

      generatingModules.forEach(({func, module:name}) => {
        if(func) {
          const xFromStart = x - instances[id].xAtStart;
          const result = func(y, xFromStart, baseFrequencyModulation);

          if (typeof result === 'object') {
            [y, baseFrequencyModulation] = result
          } else {
            y = result
          }
        }
      })

      if (!instances[id].shouldGenerate && (x - instances[id].xAtStop) >= releaseSize ) {
        y = 0;
        delete instances[id]
        return;
      } else {
        y = envelope(y, id)
      }
      
      // Provide headroom for instance
      wave += y * 0.8
    })

    restModules.forEach(({func, module:name}) => {
      if(func) {
        const result = func(wave, x, postFrequencyModulation);

        if (typeof result === 'object') {
          [wave, postFrequencyModulation] = result
        } else {
          wave = result
        }
      }
    })

    x++;

    // Decrease volume until I will make a master volume component
    const mixVolume =  0.1;
    yield wave * mixVolume
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

export const envelopeAttack = (y, x, size) => {
  const m = 1 / (size)
  return y * (x * m)
}

export const envelopeRelease = (y, x, size) => {
  const m = -1 / (size);

  return y * ((x * m) + (1))
}

export const setGlobalModules = (modules) => {
  _moduleFunc = modules;
}
