import * as browserPlayer from '../output/browserPlayer'
import {getMasterClock} from '@jsynth/core/synth'

const triggers = {}

let isPlayingByIndex = {}
let isFirstTime = true;
let numOfGeneratingInstances = 0;

export const getTriggers = () => triggers
export const press = (frequencyModulation, id) => {
    triggers[id] = {
        shouldGenerate: true,
        frequencyModulation: frequencyModulation,
        xAtStart: getMasterClock()
    }
    numOfGeneratingInstances++;

    if (isFirstTime) {
        browserPlayer.play()
        isFirstTime = false;
    }
}

export const release = (id) => {
    triggers[id].shouldGenerate = false
    triggers[id].xAtStop = getMasterClock()
    numOfGeneratingInstances--;
}


const keyIndexToFrequencyModulation = (index) => {
    return Math.pow(2, -1 + index/12);
}

export const virtualKeyboardKeyDown = (index) => {
    if (isPlayingByIndex[index]) {
        return;
    }
    
    const frequencyModulation = keyIndexToFrequencyModulation(index)

    if (!frequencyModulation) {
        return;
    }

    press(frequencyModulation, index)
    isPlayingByIndex[index] = true;
}

export const virtualKeyboardKeyUp = (index) => {

    if (!isPlayingByIndex[index]) {
        return;
    }
    isPlayingByIndex[index] = false;

    release(index);
}

export const keyCodeToFrequencyModulation = {
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
    85: Math.pow(2, -2/12),
    //J
    74: Math.pow(2, -1/12),
    //K
    75: Math.pow(2, 0/12),
    //O
    79: Math.pow(2, 1/12),
    //L
    76: Math.pow(2, 2/12)
}