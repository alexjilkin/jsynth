import React, {useState, useEffect} from 'react' 
import Knob from 'react-canvas-knob';
import {addModule} from '../../output/browserPlayer'
import './Lowpass.scss';

const useLowpass = () => {
    const [frequency, setFrequency] = useState(200)
    
    useEffect(() => {
        //addModule('lowpass', 'transforming', {frequency})
    }, [])

    return {frequency, setFrequency}
}
const Lowpass = ({updateModulationFunction, removeFunction}) => { 
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