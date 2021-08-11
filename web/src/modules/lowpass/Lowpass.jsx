import React, {useState, useEffect, useRef} from 'react' 
import Knob from 'react-canvas-knob';
import {addModule, updateArgs} from '../../output/browserPlayer'
import './Lowpass.scss';

const useLowpass = () => {
    const [frequency, setFrequency] = useState(0.05)
    const id = useRef()

    useEffect(() => {
        id.current = addModule('lowpass', 'transforming', {frequency})
    }, [])

    useEffect(() => {
        updateArgs(id.current, {frequency})
    }, [frequency])

    return {frequency, setFrequency}
}
const Lowpass = () => { 
    const {frequency, setFrequency} = useLowpass()

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