import React, {useState, useEffect} from 'react' 
import Knob from 'react-canvas-knob';
import {useLowpass} from '@jsynth/core/modules'

import './Lowpass.scss';

let prevY = 0;

const Lowpass = ({updateModulationFunction, removeFunction}) => { 
    const [transform, frequency, setFrequency] = useLowpass()

    useEffect(() => {
        updateModulationFunction(transform)
    }, [frequency])

    return (
        <div styleName="container">
            <div styleName="title"> Lowpass. </div>
            <Knob 
                min={0.05}
                max={1}
                width={70}
                height={70}
                step={0.05}
                fgColor="#6ed3cf"
                value={frequency}
                onChange={setFrequency}
            />
        </div>
    )
}

export default Lowpass