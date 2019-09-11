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
    const [is3rdOn, setIs3rdOn] = useState(false);
    const [is5thOn, setIs5thOn] = useState(false);
    
    useEffect(() => {
        removeFunction()
        if (isOn) {
            let funcs = [];
            isSineOn && funcs.push(getSineWave)
            isSquareOn && funcs.push(getSquareWave)
            isSawOn && funcs.push(getSawWave);

            const oscillatorFunc = (y, x) => {
                const wave = funcs.reduce((acc, func) => {
                    acc += func(x, frequency)
                    if (is3rdOn) {
                        acc += func(x, frequency * Math.pow(1.05946, 3));
                    }
                    if (is5thOn) {
                        acc += func(x, frequency * Math.pow(1.05946, 5));
                    }

                    return acc;
                }, 0)
                if (x !== y) {
                    return y + wave;
                } else {
                    return wave;
                }
                
            }
            
            addFunction(oscillatorFunc)
        }
    }, [isOn, frequency, isSquareOn, isSineOn, isSawOn, is3rdOn, is5thOn]);

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
            <div styleName="harmonics">
                <div onClick={() => setIs3rdOn(!is3rdOn)}>
                    3rd <div styleName={`${is3rdOn ? 'on' : 'off'}`}></div>
                </div>
                <div onClick={() => setIs5thOn(!is5thOn)}>
                    5th <div styleName={`${is5thOn ? 'on' : 'off'}`}></div>
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