import React, {useState, useEffect} from 'react' 
import Knob from 'react-canvas-knob';
import './Distortion.scss';
import {forwardEulerDistortion} from './distortions'

const Distortion = ({updateModulationFunction, removeFunction}) => { 
    const [gain, setGain] = useState(0);

    useEffect(() => {
        updateModulationFunction((y, x, frequencyModulation) => {
            if (gain === 0) {
                return  [y, frequencyModulation]
            }
            // const q = y * gain;
            // const result = Math.sign(q) * (1 - Math.exp((-1) * Math.abs(q)))

            const result = forwardEulerDistortion(y * 9, x, frequencyModulation) / 9

            return [result, frequencyModulation];
        })
    }, [gain])

    return (
        <div styleName="container">
            <div styleName="title"> Distortion </div>
            <Knob 
                min={0}
                max={10}
                width={70}
                height={70}
                step={0.5}
                fgColor="#6ed3cf"
                value={gain}
                onChange={setGain}
            />
        </div>
    )
}

export default Distortion