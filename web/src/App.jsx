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
            <div style={{display: 'flex', maxWidth: '600px', flexWrap: 'wrap'}}>
                <span style={{margin: 5}}>
                    <Oscillator />
                </span>
                <span style={{margin: 5}}>
                    <Delay />
                </span>
                <span style={{margin: 5}}>
                    <Lowpass />
                </span>
                <span style={{margin: 5}}>
                    <Distortion />
                </span>
                
            </div>
            <div style={{display: 'flex', maxWidth: '80%', flexWrap: 'wrap'}}>
                <span style={{margin: 5}}>
                    <Keyboard  />
                </span>
                <span style={{margin: 5}}>
                    <Oscilloscope />
                </span>
            </div>
            
        </>
    )
}

export default App