import React, {useEffect, useState, useCallback, useRef} from 'react'
import './Delay.scss'
import {addModule, updateArgs} from '../../output/browserPlayer'

const knobSize = 80;

const useDelay = (initialValue = {time: 0.5, depth: 3, gain: 0.4}) => {
    const [time, setTime] = useState(initialValue.time)
    const [depth, setDepth] = useState(initialValue.depth)
    const [gain, setGain] = useState(initialValue.gain)
    const id = useRef()

    useEffect(() => {
        id.current = addModule('delay', 'transforming', {time, depth, gain})
    }, [])
    
    useEffect(() => {
       updateArgs(id.current, {time, depth, gain})
    }, [time, depth, gain])

    return {time, setTime,
        depth, setDepth,
        gain, setGain
    }
}


const Delay = ({}) => {
    const [isOn, setIsOn] = useState(true);
    const {time, setTime, depth, setDepth, gain, setGain} = useDelay()

    const toggleDelay = useCallback(() => {
        setIsOn(!isOn)
    }, [isOn])

    return (
        <div styleName="container">
            <div styleName="title">Delay.</div>
            <div styleName="knobs">
                <div styleName="knob">
                    Time
                    <input 
                        value={time}
                        onChange={({value}) => setTime(value)}
                    />
                </div>

                <div styleName="knob">
                    Depth
                    <input
                        value={depth}
                        onChange={({value}) => setDepth(value)}
                    />
                </div>

                <div styleName="knob">
                    Gain
                    <input
                        value={gain}
                        onChange={({value}) => setDepth(value)}
                    />
                </div>
            
            </div>
            <div onClick={toggleDelay} styleName={isOn ? 'on' : 'off'}></div>

        </div>
    )
}

export default Delay