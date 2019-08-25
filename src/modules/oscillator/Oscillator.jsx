import React, {useState} from 'react';
import "./logic"

import styles from './Oscillator.css'
require('./Oscillator.css')
console.log(styles)
const Oscillator = (props) => {
    const [isOn, setOn] = useState(false);

    return(
        <div className={styles.container}>
            <div>An oscialltor.</div>
            <div className={isOn ? styles.on : styles.off} onClick={() => setOn(!isOn)}></div>
        </div>
    )
}

export default Oscillator;