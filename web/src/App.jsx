import React from 'react'
import Keyboard from 'input/Keyboard'
import Delay from './modules/delay/Delay'
import {Lowpass} from './modules/lowpass'
import Oscillator from './modules/oscillator/Oscillator'

const App = () => {
    return (
        <>
        <div style={{display: 'flex', width: '80%', flexWrap: 'wrap'}}>
            <span style={{margin: 20}}>
                <Oscillator />
            </span>
            <span style={{margin: 20}}>
                <Delay />
            </span>
            <span style={{margin: 20}}>
                <Lowpass />
            </span>
        </div>
        <span style={{margin: 20}}>
                <Keyboard  />
            </span>
        </>
    )
}

export default App