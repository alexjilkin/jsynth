import oscillator from './modules/oscillator'
import delay from './modules/delay'

let masterClock = 0;

export const getMasterClock = () => masterClock

let modules = []
let generatingModules = []

export const subscribeModule = (module) => {
  modules.push(module)

  return () => {
    const index = modules.findIndex(_module => _module === module);
    modules = [...modules.slice(0, index), ...modules.slice(index + 1)]
  }
}

export const subscribeGeneratingModule = (module) => {
  generatingModules.push(module)

  return () => {
    const index = generatingModules.findIndex(_module => _module === module);
    generatingModules = [...generatingModules.slice(0, index), ...generatingModules.slice(index + 1)]
  }
}

subscribeGeneratingModule(oscillator)
subscribeModule(delay)

export function waveGenerator(triggers) {
  let wave = 0;

  Object.keys(triggers).forEach((id) => {
    const {frequencyModulation, shouldGenerate} = triggers[id]

    if (!shouldGenerate) return;

    wave = generatingModules.reduce((acc, {func}) => {
      return acc + func(acc, masterClock, frequencyModulation)
    }, wave)
  })

  wave = modules.reduce((acc, {func}) => {
    return func(acc, masterClock)
  }, wave)
  masterClock++
  
  // Decrease volume 
  const mixVolume =  0.2
  return wave * mixVolume

   
}