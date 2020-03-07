import React, {useState, useEffect, useRef} from 'react';
import {getSineWave, getSquareWave, getSawWave} from "./waveFunctions"
import debounce from 'lodash/debounce'
import Cube from './Cube'
import './Oscillator.scss'

const defaultState = {
    frequency: 440,
    sineAmount: 1,
    sawAmount: 1.1,
    squareAmount: 0
}

const type = 'generator'

const Oscillator = ({updateModulationFunction, updateState, persistentState = defaultState}) => {
    const [frequency, setFrequency] = useState(persistentState.frequency);

    const [squareAmount, setSquareAmount] = useState(persistentState.squareAmount)
    const [sawAmount, setSawAmount] = useState(persistentState.sawAmount)
    const [sineAmount, setSineAmount] = useState(persistentState.sineAmount)

    useEffect((() => {
        const oscillatorFunc = (y, x, frequencyModulation) => {
            if (y === 0) {
                return [0, frequencyModulation]
            }

            let funcs = [];
            funcs.push((x, f) => getSineWave(x, f) * Math.abs(sineAmount))
            funcs.push((x, f) => getSquareWave(x, f) * Math.abs(squareAmount))
            funcs.push((x, f) => getSawWave(x, f) * Math.abs(sawAmount))

            const wave = funcs.reduce((acc, func) => {
                
                return acc + func(x, frequency * frequencyModulation)
            }, 0)

            return [wave * y, frequencyModulation];
            
        }
        
        updateModulationFunction(oscillatorFunc, type)
        updateState({frequency, sawAmount, squareAmount, sineAmount})
    }), [frequency, squareAmount, sineAmount, sawAmount]);
    
    return(
        <div styleName="container">
            <div styleName="title">Cube of waves</div>

            {/* <div styleName="frequency">
                <Knob 
                    min={0}
                    max={880}
                    width={70}
                    height={70}
                    fgColor="#6ed3cf"
                    value={frequency}
                    onChange={setFrequency}
                />
            </div> */}
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Cube onXChange={debounce(setSineAmount, 100)} onYChange={debounce(setSquareAmount, 100)} onZChange={debounce(setSawAmount, 100)}/>
            </div>   
        </div>
    )
}

export default Oscillator;