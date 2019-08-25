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
const amplitude = 100;

export const play = () => setTimeout(() => new pcm({channels: 1, rate: sampleRate, depth: 8}).toWav(getOneSecondWave()).play(), 0)

const electricity = (x) => x
const modulesFunctions = [electricity];
const pushToModulesFunctions = (func) => modulesFunctions.push(func)

function getOneSecondWave() {
  let sound = [];
  
  for (let i = 0; i < sampleRate; i++) {
    sound[i] = modulesFunctions.reduce((acc, func, index) => func(acc), i)
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
            <Oscillator addFunction={pushToModulesFunctions} />
          </div>
        </div>
      </Provider>
    </div>
  );
}



export default App;
