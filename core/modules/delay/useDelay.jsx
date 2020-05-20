import {useState, useRef, useEffect} from 'react'
import Delay from './Delay'

const useDelay = (initialValue = {time: 1, depth: 5, gain: 0.5}, sampleRate) => {
    const [time, setTime] = useState(initialValue.time);
    const [depth, setDepth] = useState(initialValue.depth);
    const [gain, setGain] = useState(initialValue.gain); 

    const delay = useRef(new Delay(depth, time, gain, sampleRate))

    useEffect(() => {
        delay.current.getDepth().subscribe(setDepth)
        delay.current.getTime().subscribe(setTime)
        delay.current.getGain().subscribe(setGain)
    }, [])
    

    return [delay.current.transform, time, delay.current.setTime,
        depth, delay.current.setDepth,
        gain, delay.current.setGain
    ]
}

export default useDelay