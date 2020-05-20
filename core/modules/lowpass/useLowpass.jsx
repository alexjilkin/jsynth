import {useState, useRef, useEffect} from 'react'
import Lowpass from './Lowpass'

const useLowpass = (initialValue = {frequency: 0.5}, sampleRate) => {
    const [frequency, setFrequency] = useState(initialValue.frequency);

    const lowpass = useRef(new Lowpass(frequency))

    useEffect(() => {
        lowpass.current.frequency.subscribe(setFrequency)
    }, [])
    

    return [lowpass.current.transform, frequency, (frequency) => {lowpass.current.frequency = frequency}]
}

export default useLowpass