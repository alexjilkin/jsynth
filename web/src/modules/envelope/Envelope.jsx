import React, {useEffect} from 'react' 
import './Envelope.scss'

const type = "generator"

const Envelope = ({updateModulationFunction, sampleRate}) => { 
    
    useEffect(() => {
        updateModulationFunction((y, x, frequencyModulation, xFromStop) => {
 
            return [envelope(y, x, xFromStop), frequencyModulation]
        }, type)
    }, [])

    return (
        <div styleName="container">
            Envelope.

        </div>
    )
}
const attackSize = 500;
const releaseSize = 10000;

const envelope = (y, xFromStart, xFromStop) => {

    if (xFromStart < attackSize) {
      return envelopeAttack(y, xFromStart, attackSize)
    } 
    
    if (xFromStop) {
      return envelopeRelease(1, xFromStop, releaseSize)
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