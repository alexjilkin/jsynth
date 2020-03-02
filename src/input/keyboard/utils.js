import {play, stop} from 'synth'

let isPlayingByKey = {};
let isPlayingByIndex = {}

const keyCodeToFrequencyModulation = (keyCode) => {
    let frequencyModulation = 1;

    // Key H My Middle C
    if (keyCode === 72) {
        frequencyModulation = Math.pow(2, 0/12);
    }
    // Key U
    else if (keyCode === 85) {
        frequencyModulation = Math.pow(2, 1/12);
    // Key J
    } else if (keyCode === 74) {
        frequencyModulation = Math.pow(2, 2/12);
    } 
    // Key I
    else if (keyCode === 73) {
        frequencyModulation = Math.pow(2, 3/12);
    }
    // Key K
    else if (keyCode === 75) {
        frequencyModulation = Math.pow(2, 4/12);
    }


    else if (keyCode === 71) {
        frequencyModulation = Math.pow(2, -1/12);
    } else {
        return;
    }

    return frequencyModulation
}

const keyIndexToFrequencyModulation = (index) => {
    return Math.pow(2, index/12);
}

export const keyDown = (keyCode) => {
    if (isPlayingByKey[keyCode]) {
        return;
    }
    
    const frequencyModulation = keyCodeToFrequencyModulation(keyCode)

    if (!frequencyModulation) {
        return;
    }

    console.log('playing')
    play(frequencyModulation, index)
    isPlayingByKey[keyCode] = true;
}

export const keyUp = (keyCode) => {

    if (!isPlayingByKey[keyCode]) {
        return;
    }
    isPlayingByKey[keyCode] = false;
    console.log('stopping')
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