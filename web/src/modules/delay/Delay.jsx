import React, {useEffect, useState, useCallback, useRef} from 'react'
import { Donut } from 'react-dial-knob'
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
                    <Donut 
                        min={0}
                        max={3}
                        step={0.1}
                        value={time}
                        onValueChang={setTime}
                    />
                </div>

                <div styleName="knob">
                    Depth
                    <Donut 
                        min={0}
                        max={15}
                        step={1}
                        value={depth}
                        onValueChange={setDepth}
                    />
                </div>

                <div styleName="knob">
                    Gain
                    <Donut 
                        min={0}
                        max={0.5}
                        step={0.1}
                        value={gain}
                        onValueChange={setGain}
                    />
                </div>
            
            </div>
            <div onClick={toggleDelay} styleName={isOn ? 'on' : 'off'}></div>

        </div>
    )
}

export default Delay