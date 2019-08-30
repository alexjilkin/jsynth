import React, {useState, useEffect} from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux/store/configureStore';
import {createBrowserHistory} from 'history';
import { syncHistoryWithStore } from 'react-router-redux'
import pcm from './common/pcm'

import './App.css'
import Oscillator from "./modules/oscillator/Oscillator"
const store = configureStore();
export const history = createBrowserHistory();

syncHistoryWithStore(history, store);

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
    sound[i] = modulesFunctions.length ? modulesFunctions.reduce((acc, moduleFunction, index) => moduleFunction.func(acc), i) : 0
  }

  return sound;
}

const App = (props) => {
  const [isOn, setIsOn] = useState(false);
 
  useEffect(() => {
    isOn && play()
  }, [isOn])

  return (
    <div styleName="container">
      <Provider store={store}>
        <div styleName="modules">
          <div styleName="play" onClick={() => {
            setIsOn(true)
            setTimeout(() => setIsOn(false, 1000))
          }}>Play!</div>
          <div styleName="module">
            <Oscillator sampleRate={sampleRate} addFunction={(func) => pushToModulesFunctions({name: 'oscillator', func})} removeFunction={() => removeFromModulesFunctions('oscillator')}/>
          </div>
        </div>
      </Provider>
    </div>
  );
}



export default App;
