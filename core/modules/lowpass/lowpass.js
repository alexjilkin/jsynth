import createModule from '../createModule'

let previousResult = 0;

function lowpass(u, n, args) {
    const {frequency} = args

    const result = previousResult + ((frequency) * (u - previousResult))
    previousResult = result

    return result
}

export default createModule(lowpass, 'transform', {})