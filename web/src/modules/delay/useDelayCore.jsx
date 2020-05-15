import {useState, useRef, useEffect} from 'react'
import DelayCore from '@jsynth/core/modules/delay'

const useDelayCore = (persistentState, sampleRate) => {
    const [time, setTime] = useState(persistentState.time);
    const [depth, setDepth] = useState(persistentState.depth);
    const [gain, setGain] = useState(persistentState.gain); 

    const delayCore = useRef(new DelayCore(depth, time, gain, sampleRate))

    useEffect(() => {
        delayCore.current.getDepth().subscribe(setDepth)
        delayCore.current.getTime().subscribe(setTime)
        delayCore.current.getGain().subscribe(setGain)
    }, [])
    

    return [delayCore.current.transform, time, delayCore.current.setTime,
        depth, delayCore.current.setDepth,
        gain, delayCore.current.setGain
    ]
}

export default useDelayCore