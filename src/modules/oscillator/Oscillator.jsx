import React, {useState, useEffect, useCallback} from 'react';
import {getSineWave, getSquareWave, getSawWave} from "./logic"
import Knob from 'react-canvas-knob';

import './Oscillator.scss'

const Oscillator = ({addFunction, removeFunction}) => {
    const [isSquareOn, setIsSquareOn] = useState(false);
    const [isSineOn, setIsSineOn] = useState(true);
    const [isSawOn, setIsSawOn] = useState(false);
    const [frequency, setFrequency] = useState(440);
    const [is3rdOn, setIs3rdOn] = useState(false);
    const [is5thOn, setIs5thOn] = useState(false);
    
    useEffect(() => {
        removeFunction()

        let funcs = [];
        isSineOn && funcs.push(getSineWave)
        isSquareOn && funcs.push(getSquareWave)
        isSawOn && funcs.push(getSawWave);

        const oscillatorFunc = (y, x) => {
            const wave = funcs.reduce((acc, func) => {
                acc += func(x, frequency)
                if (is3rdOn) {
                    acc += func(x, frequency * 1.2);
                }
                
                if (is5thOn) {
                    acc += func(x, frequency * 1.5);
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
        
    }, [frequency, isSquareOn, isSineOn, isSawOn, is3rdOn, is5thOn]);

    return(
        <div styleName="container">
            <div styleName="title">An oscialltor.</div>

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