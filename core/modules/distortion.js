import createModule from './createModule'

let prevValue = 0;


const distortion = (u, n, args) => {
    const {gain} = args

    if (gain < 0.2) {
        return u
    }
    return forwardEulerDistortion(u * 2, n, 1 / gain)
}

export const forwardEulerDistortion = (y, x, gain) => {
    // "Normalize" to 9
    let value = (y * 9)

    // Cut
    if (value > 4.5) {
        value = 4.5
    } else if (y < -4.5){
        value = -4.5
    }

    value = prevValue + (circuit(prevValue, value, gain) * (1))
    prevValue = value;

    return value / 9
}


function circuit(x, u, R) {
    return ((u - x) / (R * 10)) - ((0.504) * Math.sinh(x / 45.3)) 
}

export default createModule(distortion, 'transform', {})