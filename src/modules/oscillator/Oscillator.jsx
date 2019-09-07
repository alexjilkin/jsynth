import React, {useState, useEffect, useCallback} from 'react';
import {getSineWave, getSquareWave, getSawWave} from "./logic"
import Slider from 'react-slider-simple';

import './Oscillator.scss'

const Oscillator = ({addFunction, removeFunction}) => {
    const [isOn, setOn] = useState(true);
    const [isSquareOn, setIsSquareOn] = useState(false);
    const [isSineOn, setIsSineOn] = useState(true);
    const [isSawOn, setIsSawOn] = useState(false);
    const [frequency, setFrequency] = useState(440);

    
    useEffect(() => {
        removeFunction()
        if (isOn) {
            let funcs = [];
            isSineOn && funcs.push(getSineWave)
            isSquareOn && funcs.push(getSquareWave)
            isSawOn && funcs.push(getSawWave);

            const oscillatorFunc = (y, x) => {
                return funcs.reduce((acc, func) => {
                    return acc + func(y, frequency)
                }, 0)
            }

            addFunction(oscillatorFunc)
        }
    }, [isOn, frequency, isSquareOn, isSineOn, isSawOn]);
    return(
        <div styleName="container">
            <div>An oscialltor.</div>
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
            <div>
                Frequency
                <Slider 
                    value={frequency * 100 / 440}
                    onChange={(percentage) => setFrequency(Math.round(440 * percentage / 100))}
                />
            </div>
            Frequency: {frequency}
            <div styleName={isOn ? "on" : "off"} onClick={() => setOn(!isOn)}></div>
        </div>
    )
}

export default Oscillator;