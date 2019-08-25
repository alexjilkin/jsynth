import pcm from './pcm'

// Create a mono wave file, 44.1 kHz, 32-bit and 4 samples

const frequencySong = [660, 660, 660, 510, 660, 770, 380, 510, 380, 320, 440, 480, 450, 430, 380, 660, 760, 860, 700, 760, 660, 520]
const sampleRate = 44100;
const amplitude = 100;
let currentNote = 0;
const wave = getOneSecondWave2(frequencySong[0])
const frequency = 440;

function getOneSecondWave2(frequency) {
  let sound = [];
  
  for (let i = 0; i < sampleRate; i++) {
    sound[i] = getSineWave(frequency, i) + getSquareWave(frequency / 2, i);
  }

  return sound;
}

export const play = () => setTimeout(() => new pcm({channels: 1, rate: sampleRate, depth: 8}).toWav(wave).play(), 0)

export function getSquareWave(x) {
  return Math.sign(Math.sin(Math.PI * 2 * (frequency) * x / sampleRate)) * amplitude;
}

export function getSineWave(x) {
  return  Math.sin(Math.PI * 2 * (frequency) * x / sampleRate) * amplitude
}