export const ItemTypes = {
    MODULE: 'module'
}
export const sampleRate = 22050;

export const demoState = [{type: 'generator', "module":"Oscillator","persistentState":{"frequency":440,"sawAmount":0.5000000000000001,"squareAmount":6.845983728302534e-17,"sineAmount":1}},{"module":"Delay","persistentState":{"isOn":true,"time":0.8,"depth":6,"gain":0.3}},{"module": "Oscilloscope"}]


export const basicGroup = [{module: 'Oscillator', func: bypassFunction, type: 'generator'}, {module: 'Sequencer', func: bypassFunction}];
export const basicMasterGroup = [{module: 'Oscilloscope', func: bypassFunction}, {module: 'FrequencyView', func: bypassFunction}];
export const bypassFunction = (y, x) => y;