import React, {useState, useEffect, useCallback} from 'react';
import {createBrowserHistory} from 'history';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import './App.scss'
export const history = createBrowserHistory();
import useGroups from './synth/hooks/useGroups'
import {play, stop} from 'synth'
import {bypassFunction} from 'synth/consts';
import Group from 'synth/Group';
import {ItemTypes, demoState} from 'synth/consts'

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const {groups, addGroup, masterGroup, removeGroup, updateModuleFunc, updateModulePersistentState, addModuleToGroup, removeModuleFromGroup} = useGroups(
    localStorage.getItem('groups') && JSON.parse(localStorage.getItem('groups')) || 
    demoState);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups))
  }, [groups])

  useEffect(() => {
    isOn ? play() : stop()
  }, [isOn]);

  const addOscillatorAndSequencer = () => {
    addGroup();
  }

  return (
    <div styleName="container">
      <DndProvider backend={HTML5Backend}>
      <header>
        <div styleName="play-button-container">
          <div styleName={`play-button ${isOn ? 'playing' : ''}`} onClick={() => setIsOn(!isOn)}>Play</div>
        </div>
        <div styleName="add-group" onClick={addOscillatorAndSequencer}>
              Add Group 
        </div>
        <div styleName="modules">
          <AddModule name="Oscillator" />
          <AddModule name="Sequencer" />
          <AddModule name="Delay" />
          <AddModule name="LFO" />
          <AddModule name="Lowpass" />
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
          <div styleName="master">
                Master channel
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
        </div>
      </DndProvider>
        
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