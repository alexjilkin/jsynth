import React from 'react'
import Keyboard from 'input/Keyboard'
import Delay from './modules/delay/Delay'
import {Lowpass} from './modules/lowpass'
import Oscillator from './modules/oscillator/Oscillator'

const App = () => {
    return (
        <div>
            <Delay />
            <Lowpass />
            <Oscillator />
            <Keyboard  />
        </div>
    )
}

export default App