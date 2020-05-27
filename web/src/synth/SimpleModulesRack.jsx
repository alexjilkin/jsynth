import React from 'react';
import {sampleRate} from 'synth/consts'
import './SimpleModulesRack.scss'
import modules from 'modules'
import useModules from 'synth/modular/useModules'

const {
    Oscillator,
    Sequencer,
    Oscilloscope,
    Delay,
    Lowpass,
    LFO,
    FrequencyView,
    Distortion,
    Envelope,
    Granular
} = modules

const simpleMoodules = [Envelope, Sequencer,Oscillator, Delay, Oscilloscope, FrequencyView]

const SimpleModulesRack = () => {
    const {updateModuleFunc, updateModulePersistentState} = useModules([]);

  return (
    <div styleName="group">
        {simpleMoodules.map((Module, index) => 
            <div styleName="module" key={index}>
                <Module
                    sampleRate={sampleRate}

                    updateModulationFunction={(func, type) => updateModuleFunc(func, type, index)}
                    updateState={(nextState) => updateModulePersistentState(nextState, index)}
                />
            </div>
        )}
    </div>
    )
  }



  export default SimpleModulesRack