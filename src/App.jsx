import React, {useEffect, useState} from 'react';
import {createBrowserHistory} from 'history';
import { DndProvider, useDrag } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'
import {BrowserView, MobileView, isMobile} from "react-device-detect";

export const history = createBrowserHistory();

import useModules from './synth/hooks/useModules'
import {Keyboard} from 'input/keyboard'
import ModulesRack from 'synth/ModulesRack';
import {ItemTypes, demoState} from 'synth/consts'
import './App.scss'
import Oscilloscope from 'modules/oscilloscope/Oscilloscope'

const dndBackend = isMobile ? TouchBackend : HTML5Backend
const initialModules = localStorage.getItem('modules') && JSON.parse(localStorage.getItem('modules')) || demoState

const App = () => {

  const {modules, addModule, removeModule, updateModuleFunc, updateModulePersistentState} = useModules(initialModules);

  useEffect(() => {
    localStorage.setItem('modules', JSON.stringify(modules))
  }, [modules])

  const [showKeyboard, setShowKeyboard] = useState(true)
  return (
    <div styleName="container">
      <DndProvider backend={dndBackend}>
      <header>
        <div onClick={() => setShowKeyboard(true)}>Open keyboard</div>
        <div styleName="modules">
          <AddModule name="Oscillator" type="generator"/>
          <AddModule name="Sequencer" type="generator"/>
          <AddModule name="Delay" />
          <AddModule name="LFO" />
          <AddModule name="Lowpass" />
          <AddModule name="Distortion" />
        </div>
      </header>
        <div styleName="content">
          <div styleName="groups">
              <ModulesRack 
                modules={modules} 
                updateModuleFunc={updateModuleFunc} 
                addModule={addModule}
                removeModule={removeModule}
                updateState={updateModulePersistentState}
              />
          </div>
        </div>
      </DndProvider>
      <MobileView>
        {showKeyboard && 
        <div styleName="mobile-keyboard">
          <div onClick={() => setShowKeyboard(false)}>Switch view</div>
          <Oscilloscope addModule={addModule} updateModulationFunction={(func, type) => updateModuleFunc(func, type, modules.length - 1)}/>
          <Keyboard />
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