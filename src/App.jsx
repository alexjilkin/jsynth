import React, {useState, useEffect, useCallback} from 'react';
import {createBrowserHistory} from 'history';
import './App.scss'
import {Oscilloscope} from 'modules'
export const history = createBrowserHistory();

import ErrorBoundary  from './common/ErrorBoundary'
import useGroups from './synth/hooks/useGroups'
import {play, basicGroup, setGroups, sampleRate, waveGenerator} from 'synth'

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const [groups, addGroup, removeGroup, updateModuleFunc] = useGroups([basicGroup, [{Module: Oscilloscope, func: (y,x) => x}]]);

  const start = useCallback(() => {
   const waveGen = waveGenerator()

   play(waveGen);
  }, [groups])

  useEffect(() => {
    isOn && start()
  }, [isOn]);



  const addOscillatorAndSequencer = () => {
    addGroup(basicGroup);
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
                {group.map(({Module, func}, moduleIndex) => 
                  <ErrorBoundary key={`${groupIndex}-${moduleIndex}`}>
                    <Module key={`${groupIndex}-${moduleIndex}`} sampleRate={sampleRate * 2} addFunction={(func) => updateModuleFunc(func, groupIndex, moduleIndex)} removeFunction={() =>{}} />
                  </ErrorBoundary>
                )}

              </div>
            )}
        </div>
      
        </div>
      </div>
  );
}

export default App;