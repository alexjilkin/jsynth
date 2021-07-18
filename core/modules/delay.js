import {sampleRate} from '@jsynth/core/consts'
import createModule from './createModule'

const time = 0.4;
const depth = 6;
const gain = 0.6;
const feedbackSize = sampleRate * 4 * depth;
const feedback = new Array(feedbackSize).fill(0)

function delay(u, n) {
    const delayAmountBySamples = time * sampleRate;
    const cyclicN = n % feedbackSize
    feedback[cyclicN] = u;
    
    for(let i = 1; i < depth; i++) {     
        const feedbackIndex = Math.abs(cyclicN - (i * delayAmountBySamples))
        const feedbackValue = feedback[feedbackIndex]
        
        u += (Math.pow(gain, i) * feedbackValue)
    }

    return u;
}

export default createModule(delay, 'transform')