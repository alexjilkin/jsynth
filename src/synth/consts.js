export const ItemTypes = {
    MODULE: 'module'
}
export const sampleRate = 44100;

export const demoState = [[{"module":"Sequencer","persistentState":{"sequence":[2,2,1,3,null,null,null,null],"bpm":120,"sequenceSize":8,"isEnvelopeOn":true}},{"module":"Oscillator","persistentState":{"frequency":440,"sawAmount":0.5000000000000001,"squareAmount":6.845983728302534e-17,"sineAmount":1}},{"module":"Delay","persistentState":{"isOn":true,"delayAmount":0.25,"delayDepth":5,"gain":0.5}}],[{"module":"Sequencer","persistentState":{"sequence":[0,0,3,null,null,null,null,5],"bpm":120,"sequenceSize":8,"isEnvelopeOn":true}},{"module":"Oscillator","persistentState":{"frequency":440,"sawAmount":0.5000000000000001,"squareAmount":6.845983728302534e-17,"sineAmount":1}}],[{"module":"Oscilloscope"},{"module":"FrequencyView"}]]

export const basicGroup = [{module: 'Oscillator', func: bypassFunction}, {module: 'Sequencer', func: bypassFunction}];
export const basicMasterGroup = [{module: 'Oscilloscope', func: bypassFunction}, {module: 'FrequencyView', func: bypassFunction}];
export const bypassFunction = (y, x) => y;