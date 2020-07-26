import {BehaviorSubject} from 'rxjs'

const modules$ = new BehaviorSubject([])
const attackSize = 500;
const releaseSize = 10000;
const triggers = {

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
  triggers[id] = {
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
  triggers[id].shouldGenerate = false
  triggers[id].xAtStop = x
  numOfGeneratingInstances--;
}

const createInputsFromTriggers = () => {
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

export function* waveGenerator() {
  while(true) {
    const modules = [...modules$.value]
    const generatingModules = modules.filter(({type}) => type === 'generator')
    const postModules = modules.filter(({type}) => type !== 'generator')

    let wave = 0;

    wave = createInputsFromTriggers()
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

    x++;

    // Decrease volume until I will make a master volume component
    const mixVolume =  0.3;
    yield wave * mixVolume
  }
}
