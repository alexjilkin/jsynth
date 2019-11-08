import React, {useState, useEffect} from 'react';
import {getSineWave, getSquareWave, getSawWave} from "./logic"
import Knob from 'react-canvas-knob';
import debounce from 'lodash/debounce'
import './Oscillator.scss'


const defaultState = {
    isSquareOn: false,
    isSineOn: true,
    isSawOn: false,
    frequency: 440,
    isFirstOn: true,
    is3rdOn: false,
    is5thOn: false
}

const Oscillator = ({addFunction, removeFunction, updateState, persistentState = defaultState}) => {
    const [isSquareOn, setIsSquareOn] = useState(persistentState.isSquareOn);
    const [isSineOn, setIsSineOn] = useState(persistentState.isSineOn);
    const [isSawOn, setIsSawOn] = useState(persistentState.isSawOn);
    const [frequency, setFrequency] = useState(persistentState.frequency);
    const [isFirstOn, setIsFirstOn] = useState(persistentState.isFirstOn);
    const [is3rdOn, setIs3rdOn] = useState(persistentState.is3rdOn);
    const [is5thOn, setIs5thOn] = useState(persistentState.is5thOn);

    useEffect(debounce(() => {
        let funcs = [];
        isSineOn && funcs.push(getSineWave)
        isSquareOn && funcs.push(getSquareWave)
        isSawOn && funcs.push(getSawWave);

        const oscillatorFunc = (y, x) => {
            const wave = funcs.reduce((acc, func) => {
                isFirstOn && (acc += func(x, frequency));
                is3rdOn && (acc += func(x, frequency * 1.2));
                is5thOn && (acc += func(x, frequency * 1.5));
                
                return acc;
            }, 0)
            if (x !== y) {
                return y + wave;
            } else {
                return wave;
            }
            
        }
        
        addFunction(oscillatorFunc)
        updateState({frequency, isSquareOn, isSineOn, isSawOn, isFirstOn, is3rdOn, is5thOn})
    }, 200), [frequency, isSquareOn, isSineOn, isSawOn, isFirstOn, is3rdOn, is5thOn]);
    
    return(
        <div styleName="container">
            <div styleName="title">An osciallator.</div>

            <div styleName="frequency">
                <Knob 
                    min={0}
                    max={880}
                    width={70}
                    height={70}
                    fgColor="#6ed3cf"
                    value={frequency}
                    onChange={setFrequency}
                />
            </div>
            <div styleName="wave-types">
                <div styleName="wave-type" onClick={() => setIsSquareOn(!isSquareOn)}>
                    square
                    <div styleName={`${isSquareOn ? 'on' : 'off'}`}></div>
                </div>
                <div styleName="wave-type" onClick={() => setIsSineOn(!isSineOn)}>
                    sine
                    <div styleName={`${isSineOn ? 'on' : 'off'}`}></div>
                </div>
                <div styleName="wave-type" onClick={() => setIsSawOn(!isSawOn)}>
                    saw
                    <div styleName={`${isSawOn ? 'on' : 'off'}`}></div>
                </div>
            </div>
            <div styleName="harmonics">
                <div onClick={() => setIsFirstOn(!isFirstOn)}>
                    root <div styleName={`${isFirstOn ? 'on' : 'off'}`}></div>
                </div>
                <div onClick={() => setIs3rdOn(!is3rdOn)}>
                    3rd <div styleName={`${is3rdOn ? 'on' : 'off'}`}></div>
                </div>
                <div onClick={() => setIs5thOn(!is5thOn)}>
                    5th <div styleName={`${is5thOn ? 'on' : 'off'}`}></div>
                </div>
            </div>
        </div>
    )
}

export default Oscillator;