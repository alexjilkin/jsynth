import React, {useEffect, useState} from 'react';
import {createBrowserHistory} from 'history';
import { DndProvider, useDrag } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'

import {
  BrowserView,
  MobileView,
  isMobile
} from "react-device-detect";

import './App.scss'
export const history = createBrowserHistory();
import useGroups from './synth/hooks/useGroups'

import {Keyboard} from 'input/keyboard'

import {bypassFunction} from 'synth/consts';
import Group from 'synth/Group';
import MasterGroup from 'synth/MasterGroup';
import {ItemTypes, demoState} from 'synth/consts'

const dndBackend = isMobile ? TouchBackend : HTML5Backend

const App = () => {
  // const [isOn, setIsOn] = useState(false);
  const {groups, updateModuleFunc, updateModulePersistentState, addModuleToGroup, removeModuleFromGroup} = useGroups(
    localStorage.getItem('groups') && JSON.parse(localStorage.getItem('groups')) || 
    demoState);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups))
  }, [groups])

  const [showKeyboard, setShowKeyboard] = useState(true)
  return (
    <div styleName="container">
      <DndProvider backend={dndBackend}>
      <header>
        <div onClick={() => setShowKeyboard(true)}>Open keyboard</div>
        <div styleName="modules">
          <AddModule name="Oscillator" />
          <AddModule name="Sequencer" />
          <AddModule name="Delay" />
          <AddModule name="LFO" />
          <AddModule name="Lowpass" />
          <AddModule name="Distortion" />
        </div>
      </header>
        <div styleName="content">
          <div styleName="groups">
              {groups.slice(0, groups.length - 1).map((group, groupIndex) => 
                <Group 
                  key={groupIndex} 
                  group={group} 
                  index={groupIndex} 
                  updateModuleFunc={updateModuleFunc} 
                  addModuleToGroup={addModuleToGroup}
                  removeModuleFromGroup={removeModuleFromGroup}
                  updateState={updateModulePersistentState}
                />
              )}
          </div>
          <BrowserView>
          <div styleName="master">
                <Group
                  key={groups.length - 1} 
                  group={groups[groups.length - 1]} 
                  index={groups.length - 1} 
                  updateModuleFunc={updateModuleFunc} 
                  addModuleToGroup={addModuleToGroup}
                  removeModuleFromGroup={removeModuleFromGroup}
                  updateState={updateModulePersistentState}
                >
                  
                </Group>
          </div>
          </BrowserView>
        </div>
      </DndProvider>
      <MobileView>
        {showKeyboard && 
        <div styleName="mobile-keyboard">
          <div onClick={() => setShowKeyboard(false)}>Switch view</div>
          <Keyboard />
                <MasterGroup
                  key={groups.length - 1} 
                  group={groups[groups.length - 1]} 
                  index={groups.length - 1} 
                  updateModuleFunc={updateModuleFunc} 
                  addModuleToGroup={addModuleToGroup}
                  removeModuleFromGroup={removeModuleFromGroup}
                  updateState={updateModulePersistentState}
                >
                  
                </MasterGroup>

        </div>}
      </MobileView>
      <BrowserView>
        <Keyboard />
      </BrowserView>
      
        
      </div>
  );
}


const AddModule = ({name}) => {
  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.MODULE, name },
		collect: monitor => ({
      isDragging: !!monitor.isDragging()
		}),
  })

  return (
    <div
      style={{opacity: isDragging ? 0.5 : 1}}
      ref={drag}
      onClick={() => addModuleToGroup({module: name, func: bypassFunction}, 0)}
      styleName="module"
    >{name}</div>
  )
}

export default App;