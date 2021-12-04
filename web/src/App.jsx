import React from 'react'
import Keyboard from 'input/Keyboard'
import Delay from './modules/delay/Delay'
import {Lowpass} from './modules/lowpass'
import {Distortion} from './modules/distortion'
import { Oscilloscope } from './modules/oscilloscope'

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
                <span style={{margin: 10}}>
                    <Distortion />
                </span>
                
            </div>
            <div style={{display: 'flex', width: '80%', flexWrap: 'wrap'}}>
                <span style={{margin: 10}}>
                    <Keyboard  />
                </span>
                <span style={{margin: 10}}>
                    <Oscilloscope />
                </span>
            </div>
            
        </>
    )
}

export default App