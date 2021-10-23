import React, {useState, useEffect, useRef} from 'react' 
import Cone from './ConeKnob';
import {addModule, updateArgs} from '../../output/browserPlayer'
import './Lowpass.scss';

const useLowpass = () => {
    const [frequency, setFrequency] = useState(0.2)
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
            <div styleName="title">  </div>
            <Cone title="Lowpass" onChange={setFrequency} min={0} max={1} value={frequency} color="orange" />
        </div>
    )
}

export default Lowpass