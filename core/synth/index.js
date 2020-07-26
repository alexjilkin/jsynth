import {BehaviorSubject} from 'rxjs'

const modules$ = new BehaviorSubject([])
const attackSize = 500;
const releaseSize = 10000;
const instances = {

}
const generator = waveGenerator();
let isFirstTime = true;


let postFrequencyModulation = 1;
let numOfGeneratingInstances = 0;
let x = 0; // Master clock

export const getModules = () => {
  return modules$.asObservable()
}

export const setModules = (modules) => {
  return modules$.next(modules)
}

export const play = (player, frequencyModulation, id) => {
  instances[id] = {
    shouldGenerate: true,
    frequencyModulation: frequencyModulation,
    xAtStart: x
  }
  numOfGeneratingInstances++;

  if (isFirstTime) {
    player.play(generator)
    isFirstTime = false;
  }
}

export const stop = (id) => {
  instances[id].shouldGenerate = false
  instances[id].xAtStop = x
  numOfGeneratingInstances--;
}

export function* waveGenerator() {
  while(true) {
    const modules = [...modules$.value]
    const generatingModules = modules.filter(({type}) => type === 'generator')
    const postModules = modules.filter(({type}) => type !== 'generator')

    let wave = 0;
    let inputs = []

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

      inputs.push({y, xAtStart: instances[id].xAtStart, xAtStop: instances[id].xAtStop, frequencyModulation})
    });

    inputs = inputs.map(({y, frequencyModulation, xAtStart, xAtStop}) => {
      generatingModules.forEach(({func, module:name}) => {
        if(func) {
          [y, frequencyModulation] = func(y, x - xAtStart, frequencyModulation, xAtStop ? x - xAtStop : 0);
        }
      })

      return {y, frequencyModulation, xAtStart}
    })

    // Provide headroom
    wave += inputs.reduce((acc, {y}) => acc + y, 0) * 0.6

    postModules.forEach(({func, module:name}) => {
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
