import React, {useState, useEffect, useRef} from 'react';
import debounce from 'lodash/debounce'
import Cube from './Cube'
import {addModule, updateArgs} from '../../output/browserPlayer'
import './Oscillator.scss'

const useOscillator = () => {
    const [squareAmount, setSquareAmount] = useState(0.1)
    const [sawAmount, setSawAmount] = useState(0.1)
    const [sineAmount, setSineAmount] = useState(1)

    const id = useRef()

    useEffect(() => {
        id.current = addModule('oscillator', 'generator', {squareAmount, sawAmount, sineAmount})
    }, [])

    useEffect(() => {
        updateArgs(id.current, {squareAmount, sawAmount, sineAmount})
    }, [squareAmount, sawAmount, sineAmount])

    return {squareAmount, setSquareAmount, sawAmount, setSawAmount, sineAmount, setSineAmount}
}

const Oscillator = () => {
    const {setSineAmount, setSawAmount, setSquareAmount} = useOscillator()

    return(
        <div styleName="container">
            <div styleName="title">Cube of waves</div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Cube onXChange={debounce(setSineAmount, 100)} onYChange={debounce(setSquareAmount, 100)} onZChange={debounce(setSawAmount, 100)}/>
            </div>   
        </div>
    )
}

export default Oscillator;