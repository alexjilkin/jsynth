import React, {useState, useEffect} from 'react' 
import Knob from 'react-canvas-knob';
import {sampleRate} from 'synth/consts'

const PiDividedBySampleRate = Math.PI / sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;

const LFO = ({updateModulationFunction, removeFunction, sampleRate}) => { 
    const [frequency, setFrequency] = useState(1);

    useEffect(() => {
        updateModulationFunction((y, x, frequencyModulation) => {
            const cyclicX = x % (Math.floor(sampleRate / frequency));
            return [y * Math.sin(Math.sin(frequency * twoPiDividedBySampleRate * cyclicX)), frequencyModulation];
        })
    }, [frequency])

    return (
        <div>
            LFO.
            <Knob 
                min={0.1}
                max={10}
                width={70}
                height={70}
                step={0.1}
                fgColor="#6ed3cf"
                value={frequency}
                onChange={setFrequency}
            />
        </div>
    )
}

export default LFO