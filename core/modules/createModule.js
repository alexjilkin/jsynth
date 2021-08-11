export default function(func, type = 'transform') {
    let returnFunc = (u, n, freqModulation) => [u, n, freqModulation]

    if (type === 'generator') {
        returnFunc = (u, n, freqModulation, args) => {
            return func(u, n, freqModulation, args)
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