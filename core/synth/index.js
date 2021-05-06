import {BehaviorSubject} from 'rxjs'

const modules$ = new BehaviorSubject([])
const attackSize = 500;
const releaseSize = 10000;

let isFirstTime = true;


let postFrequencyModulation = 1;

let x = performance.now() // Master clock

export const getMasterClock = () => performance.now() - x;
export const getModules = () => {
  return modules$.asObservable()
}

export const setModules = (modules) => {
  return modules$.next(modules)
}

const createInputsFromTriggers = (triggers) => {
  let inputs = []

    Object.keys(triggers).forEach(id => {
      const trigger = triggers[id];

      if(!triggers[id]) return;

      const {frequencyModulation, shouldGenerate, xAtStart, xAtStop} = trigger;
      let y = 1;

      if (!shouldGenerate) {
        y = 0;
        if ((x - xAtStop) >= releaseSize) {
          
          delete triggers[id];
          return 
        }
      } 

      inputs.push({y, xAtStart, xAtStop, frequencyModulation})
    });

    return inputs
}

export function waveGenerator(triggers) {
  const modules = [...modules$.value]
  const generatingModules = modules.filter(({type}) => type === 'generator')
  const postModules = modules.filter(({type}) => type !== 'generator')

  let wave = 0;

  wave = createInputsFromTriggers(triggers)
    .map(({y, frequencyModulation, xAtStart, xAtStop}) => {
      generatingModules.forEach(({func, module:name}) => {
        if(func) {
          [y, frequencyModulation] = func(y, x - xAtStart, frequencyModulation, xAtStop ? x - xAtStop : 0);
        }
      })

      return y;
    })
    .reduce((acc, y) => acc + y, 0) * 0.6

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

  // Decrease volume until I will make a master volume component
  const mixVolume =  0.3;
  return wave * mixVolume

}
