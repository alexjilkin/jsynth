import React, {useState, useEffect, useCallback} from 'react';
import {getSineWave} from "./logic"
import Slider from 'react-slider-simple';

import './Oscillator.scss'

const Oscillator = ({addFunction, removeFunction}) => {
    const [isOn, setOn] = useState(false);
    const [isSquareOn, setIsSquareOn] = useState(true);
    const [isSineOn, setIsSineOn] = useState(true);
    const [frequency, setFrequency] = useState(440);

    
    useEffect(() => {
        removeFunction()
        isOn && addFunction((x) => getSineWave(x, frequency))
    }, [isOn, frequency]);
    return(
        <div styleName="container">
            <div>An oscialltor.</div>
            <div>Sine wave</div>
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