import React, {useState} from 'react';
import "./logic"

import styles from './Oscillator.css'

console.log(styles)
const Oscillator = (props) => {
    const [isOn, setOn] = useState(false);

    return(
        <div className={styles.container}>
            <div>An oscialltor.</div>
            <div styleName={isOn ? "on" : "off"}></div>
        </div>
    )
}

export default Oscillator;