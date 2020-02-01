import {sampleRate} from 'synth/consts'


const amplitude = 1

const PiDividedBySampleRate = Math.PI / sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;

export function getSquareWave(x, frequency = 440) {
  return Math.sign(Math.sin(twoPiDividedBySampleRate* (frequency) * (x % sampleRate))) * (amplitude / 2);
}

let sawWaveCache = {}

export function getSawWave(x, frequency = 440) {
  const cyclicX = x % (~~(sampleRate / frequency));

  if (sawWaveCache[frequency]) {
    return sawWaveCache[frequency][cyclicX]
  } else {
    sawWaveCache[frequency] = [];

    // Create lookup array;
    for (let i = 0; i < sampleRate; i++) {
      sawWaveCache[frequency].push((-1) * (amplitude / 2)  * arcctg(ctg((i) * frequency * PiDividedBySampleRate)) / Math.PI)
    }
  }

  return sawWaveCache[frequency][cyclicX];
}

let sineWaveCache = new Map();

export function getSineWave(x, frequency = 440) {
  const cyclicX = x % (~~(sampleRate / frequency));

  if (!sineWaveCache.has(frequency)) {
    
    sineWaveCache.set(frequency, []);

    // Create lookup array;
    for (let i = 0; i < (sampleRate / frequency); i++) {
      sineWaveCache.get(frequency).push(Math.sin(frequency * twoPiDividedBySampleRate * i) * amplitude)
    }
  }

  return sineWaveCache.get(frequency)[cyclicX]
}

export const envelope = (y, x, size) => {
  const attack =  1 / 3;
  const release = 2 / 3;
  const m1 = 1 / (attack * size)
  const m2 = -1 / (release * size);

  return x < attack * size ? 
    y * (x * m1) : 
    y * ((x * m2) + (1 / release))
}

function ctg(x) { return 1 / Math.tan(x); }
function arcctg(x) { return Math.PI / 2 - Math.atan(x); }

