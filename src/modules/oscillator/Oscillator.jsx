import React, {useState} from 'react';
import "./logic"


import './Oscillator.css'

const Oscillator = (props) => {
    const [isOn, setOn] = useState(false);

    return(
        <div styleName="container">
            <div>An oscialltor.</div>
            <div styleName={isOn ? "on" : "off"}></div>
        </div>
    )
}

export default Oscillator;