import {sampleRate} from '@jsynth/core/consts'
import {getTriggers} from '../input/KeyboardManager'

export const play = async (waveGenerator) => {
  let isPlaying = false

  const context = new AudioContext({sampleRate})
  await context.audioWorklet.addModule('worklet.js')
  let synth = new AudioWorkletNode(context, 'synth')
  
  synth.connect(context.destination)

  setInterval(() => {
    synth.port.postMessage(JSON.stringify(getTriggers()))
  }, 10)

  isPlaying = true

  return () => isPlaying = false
}

export default {
  play
}