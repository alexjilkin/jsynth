import {play, stop} from 'synth'

let isPlayingByKey = {};
let isPlayingByIndex = {}

const keyCodeToFrequencyModulation = {
    //A
    65: Math.pow(2, -12/12),
    //W
    87:  Math.pow(2, -11/12),
    //S
    83: Math.pow(2, -10/12),
    //E
    69: Math.pow(2, -9/12),
    //D
    68: Math.pow(2, -8/12),
    //F
    70: Math.pow(2, -7/12),
    //T
    84: Math.pow(2, -6/12),
    //G
    71: Math.pow(2, -5/12),
    //Y
    89: Math.pow(2, -4/12),
    //H
    72: Math.pow(2, -3/12),
    //U
    85: Math.pow(2, -2/12)
}

const keyIndexToFrequencyModulation = (index) => {
    return Math.pow(2, -1 + index/12);
}

export const keyDown = (keyCode) => {
    if (isPlayingByKey[keyCode]) {
        return;
    }
    
    const frequencyModulation = keyCodeToFrequencyModulation[keyCode]

    if (!frequencyModulation) {
        return;
    }

    play(frequencyModulation, keyCode)
    isPlayingByKey[keyCode] = true;
}

export const keyUp = (keyCode) => {

    if (!isPlayingByKey[keyCode]) {
        return;
    }
    isPlayingByKey[keyCode] = false;
    stop(keyCode);
}

export const virtualKeyboardKeyDown = (index) => {
    if (isPlayingByIndex[index]) {
        return;
    }
    
    const frequencyModulation = keyIndexToFrequencyModulation(index)

    if (!frequencyModulation) {
        return;
    }

    console.log('playing', index)
    play(frequencyModulation, index)
    isPlayingByIndex[index] = true;
}

export const virtualKeyboardKeyUp = (index) => {

    if (!isPlayingByIndex[index]) {
        return;
    }
    isPlayingByIndex[index] = false;
    console.log('stopping', index)
    stop(index);
}

export const initKeyboardInput = () => {
    window.addEventListener('keydown', (e) => {
        keyDown(e.keyCode)
    });

    window.addEventListener('keyup', (e) => {
        keyUp(e.keyCode)
    });
}

  // navigator.requestMIDIAccess()
  //   .then(function(access) {

  //     // Get lists of available MIDI controllers
  //     const inputs = access.inputs.values();
  //     const outputs = access.outputs.values();

  //     console.log(inputs)
  //     console.log(outputs)
  //     access.onstatechange = function(e) {

  //       // Print information about the (dis)connected MIDI controller
  //       console.log(e.port.name, e.port.manufacturer, e.port.state);
  //     };
  //   });