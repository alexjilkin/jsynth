let prevValue = 0;

export const forwardEulerDistortion = (y, x, frequencyModulation) => {

    let value = (y * 9)
    if (y > 4.5) {
        value = 4.5
    } else if (y < -4.5){
        value = -4.5
    }

    value = prevValue + (circuit(prevValue, value) * (1))
    prevValue = value;

    return value / 4.5
}

const R = 1.2

function circuit(x, u) {
    return ((u - x) / (R * 10)) - ((0.504) * Math.sinh(x / 45.3)) 
}