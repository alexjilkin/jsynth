import React, {useState, useEffect, useCallback} from 'react';
import {createBrowserHistory} from 'history';
import pcm from './common/pcm'

import './App.css'
import Oscillator from "./modules/oscillator/Oscillator"
export const history = createBrowserHistory();


const sampleRate = 44100;

export const play = () => {
  setTimeout(play, 1000)
  new pcm({channels: 1, rate: sampleRate, depth: 16}).toWav(get1sWave()).play()
  
}

const electricity = (x) => x;

let modulesFunctions = [];
const pushToModulesFunctions = (func) => modulesFunctions.push(func)
const removeFromModulesFunctions = (name) => 
  modulesFunctions = modulesFunctions.filter((moduleFunction => moduleFunction.name !== name))

function get1sWave() {
  let sound = [];
  
  for (let i = 0; i < sampleRate * 2; i++) {

    sound[i] = 0;

    modulesFunctions.length && modulesFunctions.forEach(({func}) => {
      sound[i] = sound[i] + func(i)
    });

  }

  return sound;
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
    </div>
  );
}



export default App;
