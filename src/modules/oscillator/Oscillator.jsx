import React, {useState, useEffect} from 'react';
import {play, getSineWave} from "./logic"

import styles from './Oscillator.css'
require('./Oscillator.css')

const Oscillator = ({addFunction}) => {
    const [isOn, setOn] = useState(false);
    
    useEffect(() => {
        isOn && addFunction(getSineWave)
    }, [isOn]);
    return(
        <div className={styles.container}>
            <div>An oscialltor.</div>
            <div className={isOn ? styles.on : styles.off} onClick={() => setOn(!isOn)}></div>
        </div>
    )
}

export default Oscillator;