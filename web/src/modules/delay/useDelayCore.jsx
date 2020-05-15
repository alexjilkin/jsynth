import {useState, useRef, useEffect} from 'react'
import DelayCore from '@jsynth/core/modules/Delay'

const useDelayCore = (persistentState) => {
    const [amount, setAmount] = useState(persistentState.delayAmount);
    const [depth, setDepth] = useState(persistentState.delayDepth);
    const [gain, setGain] = useState(persistentState.gain); 

    const delayCore = userRef(new DelayCore(delayDepth, delayAmount, gain, sampleRate))

    useEffect(() => {
        delayCore.current.getDepth().subscribe(setDepth)
        delayCore.current.getAmount().subscribe(setAmount)
        delayCore.current.getGain().subscribe(setGain)
    }, [])
    

    return [delayCore.current.transformFunc, amount, delayCore.setAmount, depth, delayCore.setAmount, gain, delayCore.setAmount]
}

export default useDelayCore