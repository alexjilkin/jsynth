import {sampleRate} from '@jsynth/core/consts'
import createModule from './createModule'
import {envelope} from './envelope'

const amplitude = 1;
const PiDividedBySampleRate = Math.PI / sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;


const baseFrequency = 440;

function oscillator(u, n, freqModulation, args) {
    const {sineAmount, sawAmount, squareAmount, nAtStart, nAtStop, shouldGenerate} = args
    
    const totalAmount = Math.abs(sineAmount) + Math.abs(sawAmount) + Math.abs(squareAmount)
    const wave =  ((getSineWave(n, freqModulation) * Math.abs(sineAmount)) + (getSquareWave(n, freqModulation) * Math.abs(squareAmount)) + (getSawWave(n, freqModulation) * Math.abs(sawAmount))) / totalAmount

    return envelope(wave, n, shouldGenerate, nAtStart, nAtStop);
}

export function getSineWave(n, freqModulation) {
    const frequency = baseFrequency * freqModulation
    const cyclicN= n % (~~(sampleRate / frequency));

    return Math.cos(frequency * twoPiDividedBySampleRate * cyclicN) * amplitude
}

export function getSquareWave(n, freqModulation) {
  const frequency = baseFrequency * freqModulation
  const cyclicX = n % (~~(sampleRate / frequency));

  return Math.sign(Math.sin(twoPiDividedBySampleRate* (frequency) * (cyclicX % sampleRate))) * (amplitude / 2);
}

export function getSawWave(n, freqModulation) {
  const frequency = baseFrequency * freqModulation
  const cyclicX = n % (~~(sampleRate / frequency));

  return (-1) * (amplitude / 2)  * arcctg(ctg((cyclicX) * frequency * PiDividedBySampleRate)) / Math.PI
}

function ctg(x) { return 1 / Math.tan(x); }
function arcctg(x) { return Math.PI / 2 - Math.atan(x); }
export default createModule(oscillator, 'generator')