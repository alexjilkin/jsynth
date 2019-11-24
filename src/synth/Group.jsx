import React from 'react';
import {useDrop} from 'react-dnd'
import {ItemTypes, sampleRate} from 'synth/consts'
import ErrorBoundary  from 'common/ErrorBoundary'
import {bypassFunction} from 'synth'
import './Group.scss'
import DragabbleModule from './dnd/DraggableModule'

const Group = ({group, index, updateModuleFunc, addModuleToGroup,removeModuleFromGroup, updateState}) => {
  return (
    <div styleName="group" key={index}>
        {group.map(({module: moduleName, func, persistentState}, moduleIndex) => 
          <span key={`${index}-${moduleIndex}`} styleName="module-and-inbetween">
            <div styleName="module">
              <ErrorBoundary >
                    <DragabbleModule
                      key={`${index}-${moduleIndex}`}
                      theModule={group[moduleIndex]}
                      groupIndex={index}
                      moduleIndex={moduleIndex}
                      sampleRate={sampleRate} 
                      addFunction={(func) => updateModuleFunc(func, index, moduleIndex)}
                      updateState={(nextState) => updateState(nextState, index, moduleIndex)}
                      persistentState={persistentState}
                      moduleName={moduleName}
                    />
              </ErrorBoundary>
            </div>
            <InBetween {...{groupIndex: index, moduleIndex: moduleIndex + 1, addModuleToGroup, removeModuleFromGroup}} />
          </span>
        )}
    </div>
    )
  }

  const InBetween = ({groupIndex, moduleIndex, addModuleToGroup, removeModuleFromGroup}) => {
    const [{isOver}, drop] = useDrop({
      accept: ItemTypes.MODULE,
      collect: monitor => ({
        isOver: monitor.isOver()
      }),
      drop: (item, monitor) => {
        const {groupIndex: sourceGroupIndex, moduleIndex: sourceModuleIndex, name, theModule = {module: name, func: bypassFunction}} = item;

        if (sourceModuleIndex + 1 === moduleIndex) {
          return;
        }

        if (typeof sourceModuleIndex !== "undefined" && typeof sourceGroupIndex !== "undefined") {
          removeModuleFromGroup(sourceGroupIndex, sourceModuleIndex)
        }     

        if (sourceModuleIndex < moduleIndex) {
          moduleIndex--;
        }

        addModuleToGroup(theModule, groupIndex, moduleIndex);        
      },
    });

    return (
      <div ref={drop} style={{width: 80, backgroundColor: isOver ? 'lightgrey' : 'white'}}>

      </div>
    )
  }



  export default Group