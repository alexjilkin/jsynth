import {sampleRate} from '@jsynth/core/consts'
import createModule from './createModule'

let feedbackSize = sampleRate * 4 * 3;
let feedback = new Array(feedbackSize).fill(0)

function delay(u, n, args) {
    const {time, depth, gain} = args;

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

// export const setValues = (time, depth, gain) => (
//     time = time
//     depth = depth

// )

export const setTime = v => time = v;
export const setDepth = v => depth = v;

export default createModule(delay, 'transform')