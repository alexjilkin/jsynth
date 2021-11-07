import React from 'react'
import Keyboard from 'input/Keyboard'
import Delay from './modules/delay/Delay'
import {Lowpass} from './modules/lowpass'
import Oscillator from './modules/oscillator/Oscillator'

const App = () => {
    return (
        <>
            <div style={{display: 'flex', width: '80%', flexWrap: 'wrap'}}>
                <span style={{margin: 10}}>
                    <Oscillator />
                </span>
                <span style={{margin: 10}}>
                    <Delay />
                </span>
                <span style={{margin: 10}}>
                    <Lowpass />
                </span>
            </div>
            <span style={{margin: 10}}>
                <Keyboard  />
            </span>
        </>
    )
}

export default App