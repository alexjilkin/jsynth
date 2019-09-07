import React, {useState, useEffect, useCallback} from 'react';
import {createBrowserHistory} from 'history';
import pcm from './common/pcm'

import './App.scss'
import Oscillator from "./modules/oscillator/Oscillator"
export const history = createBrowserHistory();
import Sequencer from './Sequencer'

const sampleRate = 44100;
let gen;
let x = 0;
gen = waveGenerator()

export const play = () => {

  setTimeout(play, 1000)

  const wave = []

  for (let i = 0; i <= sampleRate * 2; i++) {
    wave[i] = waveGenerator().next().value
  }
  
  new pcm({channels: 1, rate: sampleRate, depth: 16}).toWav(wave).play()
}

let modulesFunctions = [];
const pushToModulesFunctions = (func, index) => {
  modulesFunctions[index] = func
}
const removeFromModulesFunctions = (name) => 
  modulesFunctions = modulesFunctions.filter((moduleFunction => moduleFunction.name !== name))


function* waveGenerator() {
  let sound = [];

  while(true) {

    let y = x;

    modulesFunctions.length && modulesFunctions.forEach(({func}) => {
      y = func ? func(y, x) : y;
    });

    x++;
    yield y;
  }
}

const App = (props) => {
  const [isOn, setIsOn] = useState(false);
  const [modules, setModules] = useState([Sequencer]);

  useEffect(() => {
    isOn && play()
  }, [isOn])

  const addOscillator = useCallback(() => {
    setModules([Oscillator, ...modules]);
  })
  return (
    <div styleName="container">
      <div styleName="header">
        <div styleName="button" onClick={play}>Play!</div>
        <div styleName="button" onClick={addOscillator}>
          Add Oscillator
        </div>
      </div>
      
      <div styleName="modules">
          {modules.map((Module, index) => 
            <Module key={index} sampleRate={sampleRate} addFunction={(func) => pushToModulesFunctions({name: `${Module.componentName}-${index}`, func}, index)} removeFunction={() => removeFromModulesFunctions(`oscillator-${index}`)}/>
            )}
      </div>
    </div>
  );
}



export default App;
