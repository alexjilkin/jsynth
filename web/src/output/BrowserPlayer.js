import {sampleRate} from '@jsynth/core/synth/consts'
import {getTriggers} from '../input/keyboard/KeyboardManager'

export const play = async (waveGenerator) => {
  let isPlaying = false
  window.waveGenerator = waveGenerator;
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