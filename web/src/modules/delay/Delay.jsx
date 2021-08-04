import React, {useEffect, useState, useCallback} from 'react'
import Knob from 'react-canvas-knob';
import './Delay.scss'
import delay from '@jsynth/core/modules/delay'
import {addModule} from '../../output/browserPlayer'

const knobSize = 80;

const useDelay = (initialValue = {time: 0.5, depth: 3, gain: 0.6}) => {
    const [time, setTime] = useState(initialValue.time);
    const [depth, setDepth] = useState(initialValue.depth);
    const [gain, setGain] = useState(initialValue.gain); 

    useEffect(() => {
        addModule('delay', 'transforming', {time, depth, gain})
    }, [])

    useEffect(() => {
        //addModule('delay', 'transforming', {time, depth, gain})
    }, [time, depth, gain])
    

    return [time, setTime,
        depth, setDepth,
        gain, setGain
    ]
}


const Delay = ({}) => {
    const [isOn, setIsOn] = useState(true);
    const [time, setTime, depth, setDepth, gain, setGain] = useDelay()

    const toggleDelay = useCallback(() => {
        setIsOn(!isOn)
    }, [isOn])

    return (
        <div styleName="container">
            <div styleName="title">Delay.</div>
            <div styleName="knobs">
                <div styleName="knob">
                    Time
                    <Knob 
                        min={0}
                        max={3}
                        step={0.1}
                        width={knobSize}
                        height={knobSize}
                        fgColor="#9068be"
                        value={time}
                        onChange={setTime}
                        thickness={0.5}
                    />
                </div>

                <div styleName="knob">
                    Depth
                    <Knob 
                        min={0}
                        max={15}
                        step={1}
                        width={knobSize}
                        height={knobSize}
                        fgColor="#9068be"
                        value={depth}
                        onChange={setDepth}
                        thickness={0.5}
                    />
                </div>

                <div styleName="knob">
                    Gain
                    <Knob 
                        min={0}
                        max={0.6}
                        step={0.1}
                        width={knobSize}
                        height={knobSize}
                        fgColor="#9068be"
                        value={gain}
                        onChange={setGain}
                        thickness={0.5}
                    />
                </div>
            
            </div>
            <div onClick={toggleDelay} styleName={isOn ? 'on' : 'off'}></div>

        </div>
    )
}

export default Delay