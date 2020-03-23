import React, {useState, useEffect} from 'react' 
import Knob from 'react-canvas-knob';
import {sampleRate} from 'synth/consts'

import './Envelope.scss'

const type = "generator"

const Envelope = ({updateModulationFunction, sampleRate}) => { 
    const [attack, setAttack] = useState(1);
    const [xAtStart, setXAtStart] = useState(-1)
    
    useEffect(() => {
        updateModulationFunction((y, x, frequencyModulation) => {
            if (xAtStart === -1) {
                if (y !== 0) {
                    setXAtStart(x)
                }
                
            } else {
                const res = envelope(y, x - xAtStart);

                if (res === 0) {
                    setXAtStart(-1)
                } else {
                    return [envelope(y, x - xAtStart), frequencyModulation]
                }
            }

            return [y, frequencyModulation]

        }, type)
    }, [xAtStart])

    return (
        <div styleName="container">
            Envelope.

        </div>
    )
}
const attackSize = 500;
const releaseSize = 10000;

const envelope = (y, xFromStart) => {

    if (xFromStart < attackSize) {
      return envelopeAttack(y, xFromStart, attackSize)
    } 
    
    if (y === 0) {
      return envelopeRelease(1, xFromStart, releaseSize)
    }
    
    return y;
  }
  
  export const envelopeAttack = (y, x, size) => {
    const m = 1 / (size)
    return y * (x * m)
  }
  
  export const envelopeRelease = (y, x, size) => {
    const m = -1 / (size);
  
    return y * ((x * m) + (1))
  }

export default Envelope