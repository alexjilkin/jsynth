import React, {useState, useEffect} from 'react' 
import Knob from 'react-canvas-knob';
import './Lowpass.scss';

let prevY = 0;

const Lowpass = ({addFunction, removeFunction}) => { 
    const [frequency, setFrequency] = useState(1);

    useEffect(() => {
        addFunction((y, x) => {
            const result = prevY + ((frequency) * (y - prevY))

            prevY = result;
            return result;
        })
    }, [frequency])

    return (
        <div styleName="container">
            Lowpass.
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