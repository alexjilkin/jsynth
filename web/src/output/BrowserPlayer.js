import {sampleRate} from '@jsynth/core/consts'
import {getTriggers} from '../input/KeyboardManager'
import { v4 as uuidv4 } from 'uuid';

export const modules = {}

export const addModule = (name, type, args) => {
  const uuid = uuidv4()
  modules[uuid] = {name, type, args}

  return uuid;
}

export const play = async () => {
  let isPlaying = false

  const context = new AudioContext({sampleRate})
  await context.audioWorklet.addModule('worklet.js')
  let synth = new AudioWorkletNode(context, 'synth')
  
  synth.connect(context.destination)

  setInterval(() => {
    synth.port.postMessage(JSON.stringify({modules: Object.keys(modules).map(key => modules[key]), triggers: getTriggers()}))
  }, 10)

  isPlaying = true

  return () => isPlaying = false
}

export default {
  play
}