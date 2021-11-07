let masterClock = 0;

export const getMasterClock = () => masterClock

let modules = []
let generatingModules = []

export const subscribeModule = (type, module) => {
  type === 'generator' ? subscribeGeneratingModule(module) : subscribeTransformingModule(module)
}
  

const subscribeTransformingModule = (module) => {
  modules.push(module)

  return () => {
    const index = modules.findIndex(_module => _module === module);
    modules = [...modules.slice(0, index), ...modules.slice(index + 1)]
  }
}

const subscribeGeneratingModule = (module) => {
  generatingModules.push(module)

  return () => {
    const index = generatingModules.findIndex(_module => _module === module);
    generatingModules = [...generatingModules.slice(0, index), ...generatingModules.slice(index + 1)]
  }
}
export const clearModules = () => {
  modules = []
  generatingModules = []
}

export function waveGenerator(triggers) {
  let wave = 0;

  Object.keys(triggers).forEach((id) => {
    const {frequencyModulation, shouldGenerate} = triggers[id]

    if (!shouldGenerate) return;

    wave = generatingModules.reduce((acc, {func, args}) => {
      return acc + func(acc, masterClock, frequencyModulation, args)
    }, wave)
  })

  wave = modules.reduce((acc, {func, args}) => {
    return func(acc, masterClock, args)
  }, wave)
  masterClock++
  
  // Decrease volume 
  const mixVolume =  0.3
  return wave * mixVolume
}