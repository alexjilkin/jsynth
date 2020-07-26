import React, {useState} from 'react';
import {createBrowserHistory} from 'history';
import {BrowserView, MobileView, isMobile} from "react-device-detect";
export const history = createBrowserHistory();
import {Keyboard} from 'input/keyboard'
import SimpleModulesRack from 'synth/SimpleModulesRack';
import {ItemTypes} from '@jsynth/core/synth/consts'
import './App.scss'
import Oscilloscope from 'modules/oscilloscope/Oscilloscope'

const App = () => {

  const [showKeyboard, setShowKeyboard] = useState(true)
  return (
    <div styleName="container">
        <div styleName="content">
            <SimpleModulesRack  />
        </div>
      <MobileView>
        {showKeyboard && 
        <div styleName="mobile-keyboard">
          <div onClick={() => setShowKeyboard(false)}>Switch view</div>
          <Keyboard />
          <Oscilloscope updateModulationFunction={(func, type) => updateModuleFunc(func, type, modules.length)}/>
        </div>}
      </MobileView>
      <BrowserView>
        <Keyboard />
      </BrowserView>
    </div>
  );
}

const AddModule = ({name, type}) => {
  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.MODULE, name, moduleType: type },
		collect: monitor => ({
      isDragging: !!monitor.isDragging()
		}),
  })

  return (
    <div
      style={{opacity: isDragging ? 0.5 : 1}}
      ref={drag}
      styleName="module"
    >{name}</div>
  )
}


export default App;