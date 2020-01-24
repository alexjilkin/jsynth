import {sampleRate} from 'synth/consts'
let master;
const bufSize = 4096;
let buffer;
let source;

let isPlaying = false;

const play = (waveGenerator) => {
  master = new AudioContext({sampleRate: 44100});
  buffer = master.createBuffer(1, bufSize, sampleRate)
  source = master.createScriptProcessor(bufSize, 1, 1);

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
}

const stop = () => {
  isPlaying = false;
}

export default {
  play,
  stop
}