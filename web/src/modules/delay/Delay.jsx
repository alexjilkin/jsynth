import React, {useEffect, useRef, useState, useCallback} from 'react'
import Knob from 'react-canvas-knob';
import './Delay.scss'
import {useDelay} from '@jsynth/core/modules/delay'

const defaultState = {
    isOn: true,
    time: 0.8,
    depth: 6,
    gain: 0.3
}

const knobSize = 80;

const Delay = ({updateModulationFunction, sampleRate, persistentState = defaultState, updateState}) => {
    
    const [isOn, setIsOn] = useState(persistentState.isOn);
    const [transformFunc, time, setTime, depth, setDepth, gain, setGain] = useDelay(persistentState, sampleRate)
    
    useEffect(() => {
        if(isOn) {
            updateModulationFunction(transformFunc)
        } else {
            updateModulationFunction((y, x, frequencyModulation) => {
                return [y, frequencyModulation];
            })
        }

        updateState({isOn, time, depth, gain})
    }, [isOn, time, depth, gain])

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