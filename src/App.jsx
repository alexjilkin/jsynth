import React, {useState, useEffect, useCallback} from 'react';
import {createBrowserHistory} from 'history';
import pcm from './common/pcm'

import './App.scss'
import Oscillator from "./modules/oscillator/Oscillator"
export const history = createBrowserHistory();
import Sequencer from './modules/Sequencer'
import Oscilloscope from './modules/Oscilloscope'
const sampleRate = 44100;
let gen;
let x = 0;
gen = waveGenerator()

export const play = () => {

  setTimeout(play, 1000)

  const wave = []

  for (let i = 0; i <= sampleRate * 2; i++) {
    wave[i] = gen.next().value
  }
  
  new pcm({channels: 1, rate: sampleRate, depth: 16}).toWav(wave).play()
}
let modulesFunctions = [];
const pushToModulesFunctions = (func, index) => {
  modulesFunctions[index] = func
}
const removeFromModulesFunctions = (name) => {
  const index = modulesFunctions.findIndex((moduleFunction => moduleFunction.name === name))
  if (index !== -1) {
    modulesFunctions[index] = (y, x) => y;
  }
}


function* waveGenerator() {
  while(true) {

    let y = x;

    const wavesInAColumn = []

    modulesFunctions.length && modulesFunctions.forEach(({func, id, isSignalEnd}) => {
      if (!func) {
        return
      }

      // Small hack to make sequencer as the end of the signal
      if (isSignalEnd) {
        y = func(y, x)
        wavesInAColumn.push(y);
        y = x;
      } else {
        y = func ? func(y, x) : y;
      }

      
    });

    x++;
    yield wavesInAColumn.reduce((acc, value) => acc + value, 0);
  }
}

const App = (props) => {
  const [isOn, setIsOn] = useState(false);
  const [modules, setModules] = useState([Oscillator, Oscilloscope, Sequencer]);

  useEffect(() => {
    isOn && play()
  }, [isOn])

  const addOscillator = useCallback(() => {
    setModules([Oscillator, ...modules]);
  })

  const addOscillatorAndSequencer = () => {
    setModules([...modules, Oscillator, Sequencer]);
  }
  return (
    <div styleName="container">
      <div styleName="header">
        <div styleName="button" onClick={play}>Play!</div>
        <div styleName="button" onClick={addOscillatorAndSequencer}>
          Add Oscillator
        </div>
      </div>
      
      <div styleName="modules">
          {modules.map((Module, index) => 
            <Module key={index} sampleRate={sampleRate * 2} addFunction={(func, isSignalEnd = false) => pushToModulesFunctions({id: `${Module.name}-${index}`, func, isSignalEnd}, index)} removeFunction={() => removeFromModulesFunctions(`${Module.name}-${index}`)}/>
            )}
      </div>
    </div>
  );
}



export default App;
