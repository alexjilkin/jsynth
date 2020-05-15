import React from 'react';
import {useDrop} from 'react-dnd'
import {ItemTypes, sampleRate} from 'synth/consts'
import ErrorBoundary  from 'common/ErrorBoundary'
import {bypassFunction} from 'synth/consts'
import './ModulesRack.scss'
import DraggableModule from './dnd/DraggableModule'

const ModulesRack = ({modules, updateModuleFunc, addModule, removeModule, updateState}) => {
  return (
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



  export default ModulesRack