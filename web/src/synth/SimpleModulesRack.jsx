import React from 'react';
import {sampleRate} from '@jsynth/core/synth/consts'
import './SimpleModulesRack.scss'
import modules from 'modules'
import useModules from 'synth/modular/useModules'

const {
    Oscillator,
    Oscilloscope,
    Delay,
    Lowpass,
    Distortion,
    Envelope,

} = modules

const simpleMoodules = [Envelope, Oscillator, Delay, Distortion, Lowpass, Oscilloscope]

const SimpleModulesRack = () => {
    const {setModuleFunc, setModulePersistentState} = useModules([]);

  return (
    <div styleName="group">
        {simpleMoodules.map((Module, index) => 
            <div styleName="module" key={index}>
                <Module
                    key={index}
                    sampleRate={sampleRate}
                    updateModulationFunction={(func, type) => setModuleFunc(func, type, index)}
                    updateState={(nextState) => setModulePersistentState(nextState, index)}
                />
            </div>
        )}
    </div>
    )
  }



  export default SimpleModulesRack