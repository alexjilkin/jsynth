import {waveGenerator, subscribeModule, clearModules} from '@jsynth/core/synth';
import delay from '@jsynth/core/modules/delay'
import lowpass from '@jsynth/core/modules/lowpass'
import oscillator from '@jsynth/core/modules/oscillator'

const availableModules = {delay, lowpass, oscillator}
let triggers = {}

class SynthWorklet extends AudioWorkletProcessor {
    constructor(...args) {
      super(...args);

      this.port.onmessage = e => {
        const data = JSON.parse(e.data)
        triggers = data.triggers
        
        if (data.isUpdated) {
          clearModules()
          data.modules.forEach(({name, args, type}) => {
            subscribeModule(type, {...availableModules[name], args})
          })
        }
      }
    }
  
    process(inputs, outputs, parameters) {
      const input = inputs[0];
      const output = outputs[0];

      for (let channel = 0; channel < output.length; ++channel) {
          for (let i = 0; i < output[channel].length; ++i) {
            try {
              output[channel][i] = waveGenerator(triggers)
            } catch (err) {
              console.log(err)
            }
            
          }
      }
  
      return true;
    }
  }
  
  registerProcessor('synth', SynthWorklet);