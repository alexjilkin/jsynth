import {BehaviorSubject} from 'rxjs'

export default class Lowpass {
    constructor(frequency) {
        this.frequency$ = new BehaviorSubject(frequency)
        this.previousResult = 0

        this.transform = this.transform.bind(this)
    }

    transform(y, x) {
        const result = this.previousResult + ((this.frequency$.value) * (y - this.previousResult))
        this.previousResult = result

        return result
    }

    get frequency() {
        return this.frequency$.asObservable()
    }
    set frequency(frequency) {
        this.frequency$.next(frequency)
    }
}