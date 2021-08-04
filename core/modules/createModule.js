export default function(func, type = 'transform') {
    let returnFunc = (u, n, freqModulation) => [u, n, freqModulation]

    if (type === 'generator') {
        returnFunc = (u, n, freqModulation, a) => {
            return func(u, n, freqModulation)
        }
    } else if (type === 'transform') {
        returnFunc = (u, n, args) => {
            return func(u, n, args)
        }
    }

    return {
        func: returnFunc,
        type
    }
}