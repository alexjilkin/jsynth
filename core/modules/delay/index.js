import {BehaviorSubject} from 'rxjs';

export default class Delay {
    constructor(depth, time, gain, sampleRate) {
        this.depth$ = new BehaviorSubject(depth)
        this.time$ = new BehaviorSubject(time)
        this.gain$ = new BehaviorSubject(gain)
        this.sampleRate = sampleRate
        this.feedbackSize = this.sampleRate * 4 * depth;
        this.feedback = []
        this.depth$.subscribe(this.setFeedbackSize)

        this.setTime = this.setTime.bind(this)
        this.setDepth = this.setDepth.bind(this)
        this.setGain = this.setGain.bind(this)
        this.transform = this.transform.bind(this)
    }

    transform(y, x) {
        const time = this.time$.value, depth = this.depth$.value, gain = this.gain$.value

        const delayAmountBySamples = time * this.sampleRate;
        const cyclicX = x % this.feedbackSize
        this.feedback[cyclicX] = y;
        
        for(let i = 1; i < depth; i++) {     
            const currentFeedbackIndex = cyclicX - (i * delayAmountBySamples) < 0 ? this.feedbackSize - (i * delayAmountBySamples) : cyclicX - (i * delayAmountBySamples)
            const currentFeedback = this.feedback[currentFeedbackIndex]

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
       return this.time$.asObservable()
    }

    getGain() {
       return this.gain$.asObservable()
    }

    getDepth() {
       return this.depth$.asObservable()
    }
    
    setFeedbackSize(depth) {
        this.feedbackSize = this.sampleRate * 4 * depth;
    }
} 