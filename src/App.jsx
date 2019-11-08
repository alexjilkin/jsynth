import React, {useState, useEffect, useCallback} from 'react';
import {createBrowserHistory} from 'history';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import './App.scss'
import {Oscilloscope, Oscillator, Sequencer, Delay, Lowpass, LFO, FrequencyView} from 'modules'
export const history = createBrowserHistory();

import useGroups from './synth/hooks/useGroups'
import {play, basicGroup, basicMasterGroup, waveGenerator} from 'synth'
import { bypassFunction } from './synth';
import Group from 'synth/Group';

import {ItemTypes, demoState} from 'synth/consts'

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const {groups, addGroup, removeGroup, updateModuleFunc, updateModulePersistentState, addModuleToGroup} = useGroups(
    localStorage.getItem('groups') && JSON.parse(localStorage.getItem('groups')) || 
    demoState);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups))
  }, [groups])

  const start = useCallback(() => {
   const waveGen = waveGenerator()

   play(waveGen);
  }, [groups])

  useEffect(() => {
    isOn && start()
  }, [isOn]);

  const addOscillatorAndSequencer = () => {
    addGroup();
  }

  return (
    <div styleName="container">
      <DndProvider backend={HTML5Backend}>
      <header>
        <div styleName="play-button-container">
          <div styleName={`play-button ${isOn ? 'playing' : ''}`} onClick={() => setIsOn(!isOn)}></div>
          Play
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
                {groups.map((group, groupIndex) => 
                  <Group 
                    key={groupIndex} 
                    group={group} 
                    index={groupIndex} 
                    updateModuleFunc={updateModuleFunc} 
                    addModuleToGroup={addModuleToGroup}
                    updateState={updateModulePersistentState}
                  />
                )}
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
      style={{opacity: isDragging ? 0.5 : 1, fontSize: 25, fontWeight: 'bold', cursor: 'move', marginRight: 10}}
      ref={drag}
      onClick={() => addModuleToGroup({module: name, func: bypassFunction}, 0)}
      styleName="module"
    >{name}</div>
  )
}

export default App;