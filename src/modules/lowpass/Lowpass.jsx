import React, {useState, useEffect} from 'react' 
import Knob from 'react-canvas-knob';
import {sampleRate} from 'synth/consts'

const PiDividedBySampleRate = Math.PI / sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;
let prevY = 0;

const Lowpass = ({addFunction, removeFunction}) => { 
    const [frequency, setFrequency] = useState(10);

    useEffect(() => {
        addFunction((y, x) => {
            const result = prevY + ((frequency / 10) * (y - prevY))

            prevY = result;
            return result;
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

export default Lowpass