import React, {useState, useEffect, useRef} from 'react' 
import Knob from 'react-non-conformist-knob';
import {addModule, updateArgs} from '../../output/browserPlayer'
import './Distortion.scss';

const useDistortion = () => {
    const [gain, setGain] = useState(0.1)
    const id = useRef()

    useEffect(() => {
         id.current = addModule('distortion', 'transform', {gain})
    }, [])

    useEffect(() => {
        updateArgs(id.current, {gain})
    }, [gain])

    return {gain, setGain}
}
const Distortion = () => { 
    const {gain, setGain} = useDistortion()

    return (
        <div styleName="container">
            <div styleName="title"> Distortion  </div>
            <Knob onChange={setGain} min={0.1} max={10} value={gain} color={0x000000} />
        </div>
    )
}

export default Distortion