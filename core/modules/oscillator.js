import {sampleRate} from '@jsynth/core/consts'
import createModule from './createModule'

const amplitude = 1;
const PiDividedBySampleRate = Math.PI / sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;

const baseFreq = 440;

export function getSineWave(u, n, freqModulation) {
    const frequency = baseFreq * freqModulation
    const cyclicN= n % (~~(sampleRate / frequency));
    return Math.sin(frequency * twoPiDividedBySampleRate * cyclicN) * amplitude
}

export default createModule(getSineWave, 'generator')