import React, {useEffect, useRef, useState, useCallback} from 'react'
import Knob from 'react-canvas-knob';
import './Delay.scss'
import useDelayCore from './useDelayCore'

const defaultState = {
    isOn: true,
    delayAmount: 0.8,
    delayDepth: 6,
    gain: 0.3
}

const knobSize = 80;

const Delay = ({updateModulationFunction, sampleRate, persistentState = defaultState, updateState}) => {
    
    const [isOn, setIsOn] = useState(persistentState.isOn);
    const [transformFunc, amount, setAmount, depth, setDepth, gain, setGain] = useDelayCore(persistentState)
    
    useEffect(() => {
        // TODO: dont save feedback forever.

        const feedbackSize = sampleRate * 4 * delayDepth;

        if(isOn) {
            updateModulationFunction(transformFunc)
        } else {
            updateModulationFunction((y, x, frequencyModulation) => {
                return [y, frequencyModulation];
            })
        }

        updateState({isOn, delayAmount, delayDepth, gain})
    }, [isOn, amount, depth, gain])

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
                        value={amount}
                        onChange={setAmount}
                        thickness={0.6}
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
                        thickness={0.6}
                    />
                </div>

                <div styleName="knob">
                    Gain
                    <Knob 
                        min={0}
                        max={0.5}
                        step={0.05}
                        width={knobSize}
                        height={knobSize}
                        fgColor="#9068be"
                        value={gain}
                        onChange={setGain}
                        thickness={0.6}
                    />
                </div>
            
            </div>
            <div onClick={toggleDelay} styleName={isOn ? 'on' : 'off'}></div>

        </div>
    )
}

export default Delay