import React from 'react'
import Keyboard from 'input/Keyboard'
import Delay from './modules/delay/Delay'
import {Lowpass} from './modules/lowpass'

const App = () => {
    return (
        <div>
            <Delay />
            <Lowpass />
            <Keyboard  />
        </div>
    )
}

export default App