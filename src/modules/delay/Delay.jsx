import React, {useEffect, useRef, useState, useCallback} from 'react'
import Knob from 'react-canvas-knob';
import './Delay.scss'
const sampleRate = 44100;
const gain = 0.7;

const Delay = ({addFunction, removeFunction}) => {
    const feedback = useRef([]);
    const [isOn, setIsOn] = useState(false);
    const [delayAmount, setDelayAmount] = useState(0.25);
    const [delayDepth, setDelayDepth] = useState(10);

    const feedbackSize = sampleRate * 4 * delayDepth;

    useEffect(() => {
        // TODO: dont save feedback forever.

        if(isOn) {
            addFunction((y, x) => {
                const cyclicX = x % feedbackSize
                feedback.current[cyclicX] = y;

                return delayFunc(y, cyclicX, feedback.current);
            })
        } else {
            addFunction((y, x) => {
                const cyclicX = x % feedbackSize
                feedback.current[cyclicX] = y;;

                return y;
            })
        }
    }, [isOn, delayAmount, delayDepth])

    const delayFunc = useCallback((y, cyclicX, feedback) => {
        let result = y;
        const delayAmountBySamples = delayAmount * sampleRate;

        for(let i = 1; i < delayDepth; i++) {     
            const currentFeedbackIndex = cyclicX - (i * delayAmountBySamples) < 0 ? feedbackSize - (i * delayAmountBySamples) : cyclicX - (i * delayAmountBySamples)

            const currentFeedback = feedback[ currentFeedbackIndex]
            result += Math.pow(gain, i) * (y + currentFeedback)
        }
    
        return result;
    }, [delayAmount, feedback, delayDepth])

    const toggleDelay = useCallback(() => {
        setIsOn(!isOn)
    }, [isOn])

    return (
        <div styleName="container">
            Delay.
            <Knob 
                min={0}
                max={3}
                step={0.1}
                width={100}
                height={100}
                fgColor="#9068be"
                value={delayAmount}
                onChange={setDelayAmount}
                />
            <div onClick={toggleDelay} styleName={isOn ? 'on' : 'off'}></div>

        </div>
    )
}

export default Delay