import React, {useEffect, useRef, useState, useCallback} from 'react'
import Knob from 'react-canvas-knob';
import './Delay.scss'

const defaultState = {
    isOn: false,
    delayAmount: 0.8,
    delayDepth: 6,
    gain: 0.3
}

const Delay = ({updateModulationFunction, sampleRate, persistentState = defaultState, updateState}) => {
    const feedback = useRef([]);
    const [isOn, setIsOn] = useState(persistentState.isOn);
    const [delayAmount, setDelayAmount] = useState(persistentState.delayAmount);
    const [delayDepth, setDelayDepth] = useState(persistentState.delayDepth);
    const [gain, setGain] = useState(persistentState.gain);

    const delayFunc = useCallback((y, cyclicX, feedback) => {
        const feedbackSize = sampleRate * 4 * delayDepth;
        
        const delayAmountBySamples = delayAmount * sampleRate;

        for(let i = 1; i < delayDepth; i++) {     
            const currentFeedbackIndex = cyclicX - (i * delayAmountBySamples) < 0 ? feedbackSize - (i * delayAmountBySamples) : cyclicX - (i * delayAmountBySamples)
            const currentFeedback = feedback[currentFeedbackIndex]

            // If still no feedback
            if (currentFeedback === undefined) {
                return y;
            }
            
            y += Math.pow(gain, i) * (y + currentFeedback)
        }
    
        return y;
    }, [delayAmount, feedback, delayDepth, gain])


    useEffect(() => {
        // TODO: dont save feedback forever.

        const feedbackSize = sampleRate * 4 * delayDepth;

        if(isOn) {
            updateModulationFunction((y, x, frequencyModulation) => {
                const cyclicX = x % feedbackSize
                feedback.current[cyclicX] = y;
                
                return [delayFunc(y, cyclicX, feedback.current), frequencyModulation];
            })
        } else {
            updateModulationFunction((y, x, frequencyModulation) => {
                const cyclicX = x % feedbackSize
                feedback.current[cyclicX] = y;

                return [y, frequencyModulation];
            })
        }

        updateState({isOn, delayAmount, delayDepth, gain})
    }, [isOn, delayAmount, delayDepth, gain])

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
                        width={70}
                        height={70}
                        fgColor="#9068be"
                        value={delayAmount}
                        onChange={setDelayAmount}
                    />
                </div>

                <div styleName="knob">
                    Depth
                    <Knob 
                        min={0}
                        max={15}
                        step={1}
                        width={70}
                        height={70}
                        fgColor="#9068be"
                        value={delayDepth}
                        onChange={setDelayDepth}
                    />
                </div>

                <div styleName="knob">
                    Gain
                    <Knob 
                        min={0}
                        max={0.5}
                        step={0.05}
                        width={70}
                        height={70}
                        fgColor="#9068be"
                        value={gain}
                        onChange={setGain}
                    />
                </div>
            
            </div>
            <div onClick={toggleDelay} styleName={isOn ? 'on' : 'off'}></div>

        </div>
    )
}

export default Delay