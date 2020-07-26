import {sampleRate} from '@jsynth/core/synth/consts'


const amplitude = 1

const PiDividedBySampleRate = Math.PI / sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;

export function getSquareWave(x, frequency = 440) {
  const cyclicX = x % (~~(sampleRate / frequency));
  return Math.sign(Math.sin(twoPiDividedBySampleRate* (frequency) * (cyclicX % sampleRate))) * (amplitude / 2);
}

export function getSawWave(x, frequency = 440) {
  const cyclicX = x % (~~(sampleRate / frequency));

  return (-1) * (amplitude / 2)  * arcctg(ctg((cyclicX) * frequency * PiDividedBySampleRate)) / Math.PI
}


export function getSineWave(x, frequency = 440) {
  const cyclicX = x % (~~(sampleRate / frequency));
  return Math.sin(frequency * twoPiDividedBySampleRate * cyclicX) * amplitude
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

