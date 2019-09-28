import React, {useEffect, useRef, useState, useCallback} from 'react'
import './Delay.scss'

const gain = 0.6;
const m = 11025;

const delayFunc = (y, x, feedback) => {
    let result = y;

    for(let i = 1; i < 10; i++) {
        if (feedback.length < (i * m)) {
            break;
        }

        result += Math.pow(gain, i) * (y + feedback[ x - (i * m)])
    }

    return result;
}

const Delay = ({addFunction}) => {
    const feedback = useRef([]);
    const [isOn, setIsOn] = useState(false)

    useEffect(() => {
        if(isOn) {
            addFunction((y, x) => {
                const cyclicX = x % (m * 10);

                feedback.current[cyclicX] = y;

                if (feedback.current.length > m) {
                    return delayFunc(y, cyclicX, feedback.current)
                }

                return y;
            })
        }
    }, [isOn])

    const toggleDelay = useCallback(() => {
        setIsOn(!isOn)
    }, [isOn])

    return (
        <div>
            Delay.

            <div onClick={toggleDelay} styleName={isOn ? 'on' : 'off'}></div>

        </div>
    )
}

export default Delay