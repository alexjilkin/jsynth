import React, {useState, useEffect, useCallback} from 'react';
import {createBrowserHistory} from 'history';
import './App.scss'
import {Oscilloscope, Oscillator, Sequencer, Delay} from 'modules'
export const history = createBrowserHistory();

import ErrorBoundary  from './common/ErrorBoundary'
import useGroups from './synth/hooks/useGroups'
import {play, basicGroup, setGroups, sampleRate, waveGenerator} from 'synth'
import { bypassFunction } from './synth';

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const [groups, addGroup, removeGroup, updateModuleFunc, addModuleToGroup] = useGroups([[], [{Module: Oscilloscope, func: (y,x) => x}]]);

  const start = useCallback(() => {
   const waveGen = waveGenerator()

   play(waveGen);
  }, [groups])

  useEffect(() => {
    isOn && start()
  }, [isOn]);

  const addOscillatorAndSequencer = () => {
    addGroup();
  }

  return (
    <div styleName="container">
      <header>
        <div styleName="button" onClick={start}>Play!</div>
        <div styleName="button" onClick={addOscillatorAndSequencer}>
          Add Group 
        </div>
      </header>
      
      <div styleName="content">
        <div styleName="groups">
            {groups.map((group, groupIndex) => 
              <div styleName="group" key={groupIndex}>
                <div styleName="add-modules">
                  <div styleName="button" onClick={() => addModuleToGroup({Module: Oscillator, func: bypassFunction}, groupIndex)}>Oscillator</div>
                  <div styleName="button" onClick={() => addModuleToGroup({Module: Sequencer, func: bypassFunction}, groupIndex)}>Sequencer</div>
                  <div styleName="button" onClick={() => addModuleToGroup({Module: Delay, func: bypassFunction}, groupIndex)}>Delay</div>
                </div>
                <div styleName="modules"> 
                  {group.map(({Module, func}, moduleIndex) => 
                    <div styleName="module">
                      <ErrorBoundary key={`${groupIndex}-${moduleIndex}`}>
                        <Module key={`${groupIndex}-${moduleIndex}`} sampleRate={sampleRate * 2} addFunction={(func) => updateModuleFunc(func, groupIndex, moduleIndex)} removeFunction={(func) => updateModuleFunc(bypassFunction , groupIndex, moduleIndex)} />
                      </ErrorBoundary>
                    </div>
                  )}
                </div>
                
                
              </div>
            )}
        </div>
        </div>
      </div>
  );
}

export default App;