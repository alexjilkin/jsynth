import React, {useEffect, useRef, useState, useCallback} from 'react'
import Knob from 'react-canvas-knob';
import './Delay.scss'
const sampleRate = 44100;

const Delay = ({addFunction, removeFunction}) => {
    const feedback = useRef([]);
    const [isOn, setIsOn] = useState(false);
    const [delayAmount, setDelayAmount] = useState(0.25);
    const [delayDepth, setDelayDepth] = useState(5);
    const [gain, setGain] = useState(0.5);

    const delayFunc = useCallback((y, cyclicX, feedback) => {
        const feedbackSize = sampleRate * 4 * delayDepth;
        
        const delayAmountBySamples = delayAmount * sampleRate;

        for(let i = 1; i < delayDepth; i++) {     
            const currentFeedbackIndex = cyclicX - (i * delayAmountBySamples) < 0 ? feedbackSize - (i * delayAmountBySamples) : cyclicX - (i * delayAmountBySamples)

            const currentFeedback = feedback[currentFeedbackIndex]
            y += Math.pow(gain, i) * (y + currentFeedback)
        }
    
        return y;
    }, [delayAmount, feedback, delayDepth, gain])


    useEffect(() => {
        // TODO: dont save feedback forever.

        const feedbackSize = sampleRate * 4 * delayDepth;

        if(isOn) {
            addFunction((y, x) => {
                const cyclicX = x % feedbackSize
                feedback.current[cyclicX] = y;
                if (y !== 0) {
                    return y;
                }
                
                return delayFunc(y, cyclicX, feedback.current);
            })
        } else {
            addFunction((y, x) => {
                const cyclicX = x % feedbackSize
                feedback.current[cyclicX] = y;

                return y;
            })
        }
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
                        max={1}
                        step={0.1}
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