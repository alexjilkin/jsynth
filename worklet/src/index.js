import {waveGenerator} from '@jsynth/core/synth';
let triggers = {}

class SynthWorklet extends AudioWorkletProcessor {
    constructor(...args) {
      super(...args);

      this.port.onmessage = e => {
        triggers = JSON.parse(e.data);
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