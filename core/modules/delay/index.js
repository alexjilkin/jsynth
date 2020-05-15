import {BehaviorSubject} from 'rxjs';

export default class Delay {
    constructor(depth, time, gain, sampleRate) {
        this.depth$ = new BehaviorSubject(depth)
        this.time$ = new BehaviorSubject(time)
        this.gain$ = new BehaviorSubject(gain)
        this.feedbackSize = this.sampleRate * 4 * depth;
        this.depth$.subscribe(this.setFeedbackSize)
    }

    transform(y, x) {
        const amount = this.amount$.value, depth = this.depth$.value, gain = this.gain$.value

        const delayAmountBySamples = amount * sampleRate;
        const cyclicX = x % this.feedbackSize
        feedback[cyclicX] = y;
        
        for(let i = 1; i < depth; i++) {     
            const currentFeedbackIndex = cyclicX - (i * delayAmountBySamples) < 0 ? this.feedbackSize - (i * delayAmountBySamples) : cyclicX - (i * delayAmountBySamples)
            const currentFeedback = feedback[currentFeedbackIndex]

            // If still no feedback
            if (currentFeedback === undefined) {
                return y;
            }
            
            y = (y * 0.9) +  Math.pow(gain, i) * (y + currentFeedback)
        }
    
        return y;
    }

    setTime(time) {
        this.time$.next(time)
    }

    setGain(gain) {
        this.gain$.next(gain)
    }

    setDepth(depth) {
        this.depth$.next(depth)
    }

    getTime() {
        this.time$.asObservable()
    }

    getGain() {
        this.gain$.asObservable()
    }

    getDepth() {
        this.depth$.asObservable()
    }
    
    setFeedbackSize(depth) {
        this.feedbackSize = this.sampleRate * 4 * depth;
    }
} 