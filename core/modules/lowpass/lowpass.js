import createModule from '../createModule'

let previousResult = 0;
let frequency = 100;

function lowpass(u, n) {
    const result = previousResult + ((frequency) * (u - previousResult))
    this.previousResult = result

    return result
}

export default createModule(lowpass, 'transform', {})