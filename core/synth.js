let masterClock = 0;

export const getMasterClock = () => masterClock

let modules = []
let generatingModules = []
let monoTransformModules = []

export const subscribeModule = (type, module) => {
  switch (type) {
    case 'generator': 
      subscribeGeneratingModule(module)
      break
    case 'monoTransform':
      subscribeMonoTransformModule(module)
      break
    case 'transform':
      subscribeTransformingModule(module)
      break
  }
}
  
const subscribeTransformingModule = (module) => {
  modules.push(module)

  return () => {
    const index = modules.findIndex(_module => _module === module);
    modules = [...modules.slice(0, index), ...modules.slice(index + 1)]
  }
}

const subscribeMonoTransformModule = (module) => {
  monoTransformModules.push(module)
  console.log(monoTransformModules)
  return () => {
    const index = monoTransformModules.findIndex(_module => _module === module);
    monoTransformModules = [...monoTransformModules.slice(0, index), ...monoTransformModules.slice(index + 1)]
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
  monoTransformModules = []
}

const times = {}

export function waveGenerator(triggers) {
  let wave = 0;

  Object.keys(triggers).forEach((id) => {
    const {frequencyModulation, shouldGenerate} = triggers[id]
    if (!times[id]) {
      times[id] = {}
    }

    if (shouldGenerate && !times[id].isPressed) {
      times[id].nAtStart = masterClock
      console.log('nAtStart', times[id].nAtStart)
      times[id].isPressed = true
    }

    if (!shouldGenerate && times[id].isPressed) {
      times[id].nAtStop = masterClock
      console.log('nAtStop', times[id].nAtStop)
      times[id].isPressed = false
    } 

    wave = generatingModules.reduce((acc, {func, args}) => {
      return acc + func(acc, masterClock, frequencyModulation, {...args, nAtStart: times[id].nAtStart, nAtStop: times[id].nAtStop, shouldGenerate})
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