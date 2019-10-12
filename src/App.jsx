import React, {useState, useEffect, useCallback} from 'react';
import {createBrowserHistory} from 'history';
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import './App.scss'
import {Oscilloscope, Oscillator, Sequencer, Delay} from 'modules'
export const history = createBrowserHistory();

import useGroups from './synth/hooks/useGroups'
import {play, basicGroup, setGroups, sampleRate, waveGenerator} from 'synth'
import { bypassFunction } from './synth';
import Group from 'synth/Group';

import {ItemTypes} from 'synth/consts'

const App = () => {
  const [isOn, setIsOn] = useState(false);
  const [groups, addGroup, removeGroup, updateModuleFunc, addModuleToGroup] = useGroups([[], [{Module: Oscilloscope, func: (y,x) => x}]]);

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
      <header>
        <div styleName="button" onClick={start}>Play!</div>
        <div styleName="button" onClick={addOscillatorAndSequencer}>
          Add Group 
        </div>
      </header>
      
      
        <DndProvider backend={HTML5Backend}>
          <div styleName="content">
            <div styleName="add-modules">
              <AddModule Module={Oscillator} name="Oscillator" />
              <AddModule Module={Sequencer} name="Sequencer" />
            </div>
            <div styleName="groups">
                {groups.map((group, groupIndex) => 
                  <Group key={groupIndex} group={group} index={groupIndex} updateModuleFunc={updateModuleFunc} addModuleToGroup={addModuleToGroup}/>
                )}
              </div>
            </div>
          </DndProvider>
        
      </div>
  );
}


const AddModule = ({Module, name}) => {
  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.MODULE, Module },
		collect: monitor => ({
      isDragging: !!monitor.isDragging()
		}),
  })

  return (
    <div
    style={{
      opacity: isDragging ? 0.5 : 1,
      fontSize: 25,
      fontWeight: 'bold',
      cursor: 'move',
    }}
    ref={drag}
    styleName="button" 
    onClick={() => addModuleToGroup({Module, func: bypassFunction}, 0)}
    >{name}</div>
  )
}

export default App;