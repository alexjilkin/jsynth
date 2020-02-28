import {sampleRate} from 'synth/consts'
const bufferSize = 2048;



export const play = (waveGenerator) => {
  let isPlaying = false;

  const master = new AudioContext({sampleRate: 44100});
  const buffer = master.createBuffer(1, bufferSize, sampleRate)
  const source = master.createScriptProcessor(bufferSize, 1, 1);

  const createBuffer = (output) => {
    for (let i = 0; i < buffer.length; i++) {
      const {value} = waveGenerator.next()
  
      output[i] = value
    }
  }

  source.buffer = buffer;
  source.connect(master.destination);
  
  source.addEventListener('audioprocess', (e) => {
    isPlaying ? createBuffer(e.outputBuffer.getChannelData(0)) : master.close();
  })

  isPlaying = true;

  return () => isPlaying = false
}

export default {
  play
}