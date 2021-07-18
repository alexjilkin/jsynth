import {sampleRate} from '@jsynth/core/consts'
import {getTriggers} from '../input/KeyboardManager'

export const modules = []

export const addModule = (name, type, values) => {
  modules.push({name, type, values})
}

export const play = async () => {
  let isPlaying = false

  const context = new AudioContext({sampleRate})
  await context.audioWorklet.addModule('worklet.js')
  let synth = new AudioWorkletNode(context, 'synth')
  
  synth.connect(context.destination)

  setInterval(() => {
    synth.port.postMessage(JSON.stringify({modules, triggers: getTriggers()}))
  }, 10)

  isPlaying = true

  return () => isPlaying = false
}

export default {
  play
}