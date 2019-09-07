import React, {useState, useEffect, useCallback} from 'react';
import {createBrowserHistory} from 'history';
import pcm from './common/pcm'

import './App.scss'
import Oscillator from "./modules/oscillator/Oscillator"
export const history = createBrowserHistory();
import Sequencer from './Sequencer'

const sampleRate = 44100;
let gen;
let count = 0;
gen = waveGenerator()

export const play = () => {

  setTimeout(play, 500)

  const wave = []

  for (let i = 0; i <= sampleRate  ; i++) {
    wave[i] = waveGenerator().next().value
  }

  
  new pcm({channels: 1, rate: sampleRate, depth: 16}).toWav(wave).play()
}


const electricity = (x) => x;

let modulesFunctions = [];
const pushToModulesFunctions = (func) => modulesFunctions.push(func)
const removeFromModulesFunctions = (name) => 
  modulesFunctions = modulesFunctions.filter((moduleFunction => moduleFunction.name !== name))


function* waveGenerator() {
  let sound = [];

  while(true) {

    let value = 0;

    modulesFunctions.length && modulesFunctions.forEach(({func}) => {
      value = value + func(count)
    });

    count++;
    yield value;
  }
}

const App = (props) => {
  const [isOn, setIsOn] = useState(false);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    isOn && play()
  }, [isOn])

  const addOscillator = useCallback(() => {
    setModules([...modules, Oscillator]);
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
            <Module key={index} sampleRate={sampleRate} addFunction={(func) => pushToModulesFunctions({name: `oscillator-${index}`, func})} removeFunction={() => removeFromModulesFunctions(`oscillator-${index}`)}/>
            )}
      </div>
      <Sequencer playBySeconds={() => {}}/>
    </div>
  );
}



export default App;
