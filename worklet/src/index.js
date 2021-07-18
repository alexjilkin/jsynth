import {waveGenerator, subscribeModule, clearModules} from '@jsynth/core/synth';
import delay from '@jsynth/core/modules/delay'

let triggers = {}
let receivedModules = []

class SynthWorklet extends AudioWorkletProcessor {
    constructor(...args) {
      super(...args);

      this.port.onmessage = e => {
        const data = JSON.parse(e.data)
        triggers = data.triggers
        
        if (data.modules.length !== receivedModules.length ) {
          receivedModules = data.modules
          console.log(receivedModules)
          receivedModules.forEach(module => {
            subscribeModule(module.type, delay)
          })
        }
      }
    }
  
    process(inputs, outputs, parameters) {
      const input = inputs[0];
      const output = outputs[0];

      for (let channel = 0; channel < output.length; ++channel) {
          for (let i = 0; i < output[channel].length; ++i) {
            output[channel][i] = waveGenerator(triggers)
          }
      }
  
      return true;
    }
  }
  
  registerProcessor('synth', SynthWorklet);