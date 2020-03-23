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

    const inputs = []

    Object.keys(instances).forEach(id => {
      if(!instances[id]) 
        return;

      let frequencyModulation = instances[id].frequencyModulation;
      let y = 1;

      if (!instances[id].shouldGenerate) {
        y = 0;
        
        if ((x - instances[id].xAtStop) >= releaseSize) {
          delete instances[id]
          return 
        }
      } 

      inputs.push({y, xAtStart: instances[id].xAtStart, frequencyModulation})
    });

    inputs = inputs.map(({y, frequencyModulation, xAtStart}) => {
      generatingModules.forEach(({func, module:name}) => {
        if(func) {
          [y, frequencyModulation] = func(y, x - xAtStart, frequencyModulation);
        }
      })

      return {y, frequencyModulation, xAtStart}
    })

    // Provide headroom for instance
    wave += inputs.reduce((acc, {y}) => acc + y, 0) * 0.8
    

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
    const mixVolume =  0.3;
    yield wave * mixVolume
  }
}


export const setGlobalModules = (modules) => {
  _moduleFunc = modules;
}
