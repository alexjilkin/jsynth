import React, {useState, useEffect, useCallback} from 'react';
import {createBrowserHistory} from 'history';
import pcm from './common/pcm'

import './App.scss'
import Oscillator from "./modules/oscillator/Oscillator"
export const history = createBrowserHistory();
import Sequencer from './modules/Sequencer'
import Oscilloscope from './modules/Oscilloscope'

import useGroups from './useGroups'

const sampleRate = 44100;
const pcmObject = new pcm({channels: 1, rate: sampleRate, depth: 16});

export const play = (waveGenerator) => {
  const wave = []
  let i = 1;
  const t0 = performance.now()
  
  // TODO: Prevent "pop" sound
  while (i <= sampleRate * 2) {
    wave[i] = waveGenerator.next().value

    i++;
  }

  pcmObject.toWav(wave).play()
  const t1 = performance.now()
  setTimeout(() => play(waveGenerator), ((1000 / 88200) * i) - (t1 - t0))
}

let globalGroups = [];

function* waveGenerator() {
  let x = 0;

  while(true) {
    const wavesInAColumn = []

    globalGroups.forEach((modules, index) => {
      let y = x;

      modules.forEach(({func}) => {
        y = func ? func(y, x) : y;
      })

      wavesInAColumn.push(y)
    })

    x++;
    yield wavesInAColumn.reduce((acc, value) => acc + value, 0);
  }
}

const bypassFunction = (y, x) => y;
const basicGroup = [{Module: Oscillator, func: bypassFunction}, {Module: Sequencer, func: bypassFunction}];

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const [groups, addGroup, removeGroup, updateModuleFunc] = useGroups([basicGroup]);

  const start = useCallback(() => {
   const waveGen = waveGenerator()

   play(waveGen);
  }, [groups])

  useEffect(() => {
    isOn && start()
  }, [isOn]);

  useEffect(() => {
    globalGroups = groups;
  }, [groups])

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
                  <Module key={`${groupIndex}-${moduleIndex}`} sampleRate={sampleRate * 2} addFunction={(func) => updateModuleFunc(func, groupIndex, moduleIndex)} removeFunction={() =>{}} />
                )}
              </div>
            )}
        </div>
      
        </div>
      </div>
  );
}

export default App;