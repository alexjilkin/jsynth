export default function(func, type = 'transform') {
    let returnFunc = (u, n, freqModulation) => [u, n, freqModulation]

    if (type === 'generator') {
        returnFunc = (u, n, freqModulation) => {
            return func(u, n, freqModulation)
        }
    } else if (type === 'transform') {
        returnFunc = (u, n, freqModulation) => {
            return func(u, n, freqModulation)
        }
    }

    return {
        func: returnFunc,
        type
    }
}