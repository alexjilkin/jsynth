export const ItemTypes = {
    MODULE: 'module'
}
export const sampleRate = 44100;

export const demoState = [
    [{"module":"Oscillator","persistentState":{"frequency":440,"isSquareOn":false,"isSineOn":true,"isSawOn":true,"isFirstOn":false,"is3rdOn":false,"is5thOn":true}},{"module":"Sequencer","persistentState":{"sequence":[true,true,false,null,null,null,true,null],"bpm":120,"sequenceSize":8,"isEnvelopeOn":true}},{"module":"Delay"}]
    ,[{"module":"Oscillator","persistentState":{"frequency":440,"isSquareOn":false,"isSineOn":true,"isSawOn":true,"isFirstOn":true,"is3rdOn":false,"is5thOn":false}},{"module":"Sequencer","persistentState":{"sequence":[false,false,false,true,null,true,true,null],"bpm":120,"sequenceSize":8,"isEnvelopeOn":true}}]
,[{"module":"Oscilloscope"}, {"module": "FrequencyView"}]]

export const basicGroup = [{module: 'Oscillator', func: bypassFunction}, {module: 'Sequencer', func: bypassFunction}];
export const basicMasterGroup = [{module: 'Oscilloscope', func: bypassFunction}, {module: 'FrequencyView', func: bypassFunction}];
export const bypassFunction = (y, x) => y;