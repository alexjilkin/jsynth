import pcm from './pcm'


const frequencySong = [660, 660, 660, 510, 660, 770, 380, 510, 380, 320, 440, 480, 450, 430, 380, 660, 760, 860, 700, 760, 660, 520]
const sampleRate = 44100;
const amplitude = Math.pow(2, 4);
let currentNote = 0;

const frequency = 440;



export function getSquareWave(x) {
  return Math.sign(Math.sin(Math.PI * 2 * (frequency) * x / sampleRate)) * amplitude;
}

export function getSineWave(x, frequency = 440) {
  return  Math.sin(Math.PI * 2 * (frequency) * x / sampleRate) * amplitude
}