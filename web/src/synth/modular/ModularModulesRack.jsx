import React from 'react';
import {useDrop} from 'react-dnd'
import {ItemTypes, sampleRate, bypassFunction} from '@jsynth/core/synth/consts'
import ErrorBoundary  from 'common/ErrorBoundary'
import { DndProvider, useDrag } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'
import './ModularModulesRack.scss'
import DraggableModule from './dnd/DraggableModule'
import useModules from 'synth/modular/hooks/useModules'
const dndBackend = isMobile ? TouchBackend : HTML5Backend

const initialModules = localStorage.getItem('modules') && JSON.parse(localStorage.getItem('modules')) || demoState

const ModularModulesRack = () => {
  const {modules, addModule, removeModule, updateModuleFunc, updateModulePersistentState} = useModules(initialModules);

  useEffect(() => {
    localStorage.setItem('modules', JSON.stringify(modules))
  }, [modules])

  return (
    <DndProvider backend={dndBackend}>
      <div styleName="group">
        <InBetween {...{index: 0, addModule, removeModule}} />
          {modules.map(({module: moduleName, persistentState}, index) => 
            <span key={index} styleName="module-and-inbetween">
              <div styleName="module">
                <ErrorBoundary >
                      <DraggableModule
                        theModule={modules[index]}
                        index={index}
                        sampleRate={sampleRate}
                        removeModule={removeModule}
                        updateModulationFunction={(func, type) => updateModuleFunc(func, type, index)}
                        updateState={(nextState) => updateState(nextState, index)}
                        persistentState={persistentState}
                        moduleName={moduleName}
                      />
                </ErrorBoundary>
              </div>
              <InBetween {...{index: index + 1, addModule, removeModule}} />
            </span>
          )}
      </div>
    </DndProvider>
    )
  }

  const InBetween = ({index, addModule, removeModule}) => {
    const [{isOver}, drop] = useDrop({
      accept: ItemTypes.MODULE,
      collect: monitor => ({
        isOver: monitor.isOver()
      }),
      drop: (item, monitor) => {
        const {index: sourceIndex, name, moduleType, theModule = {module: name, func: bypassFunction, type: moduleType}} = item;

        if (sourceIndex + 1 === index || sourceIndex === index) {
          return;
        }

        if (typeof sourceIndex !== "undefined") {
          removeModule(sourceIndex)
        }     

        if (sourceIndex < index) {
          index--;
        }

        addModule(theModule, index);        
      },
    });

    return (
      <div ref={drop} style={{width: isOver ? 60 : 20, backgroundColor: isOver ? '#e1e8f0' : 'white'}}>

      </div>
    )
  }

  const Header = ({setShowKeyboard}) => {
    return (
        <header>
          <div onClick={() => setShowKeyboard(true)}>Open keyboard</div>
          <div styleName="modules">
            <AddModule name="Oscillator" type="generator"/>
            <AddModule name="Sequencer" type="generator"/>
            <AddModule name="Delay" />
            <AddModule name="LFO" />
            <AddModule name="Lowpass" />
            <AddModule name="Distortion" />
            <AddModule name="Envelope" />
          </div>
        </header> 
    )
  }


  export default ModularModulesRack