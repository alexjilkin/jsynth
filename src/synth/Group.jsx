import React from 'react';
import {useDrop} from 'react-dnd'
import {ItemTypes, sampleRate} from 'synth/consts'
import ErrorBoundary  from 'common/ErrorBoundary'
import {bypassFunction} from 'synth'
import './Group.scss'

const Group = ({group, index, updateModuleFunc, addModuleToGroup}) => {

    const [, drop] = useDrop({
      accept: ItemTypes.MODULE,
      drop: monitor => addModuleToGroup({Module: monitor.Module, func: bypassFunction}, index),
    })
  
    return (
      <div styleName="group" key={index} ref={drop}>
          {group.map(({Module, func}, moduleIndex) => 
            <span styleName="module" key={`${index}-${moduleIndex}`}>
              <ErrorBoundary >
                <Module key={`${index}-${moduleIndex}`} sampleRate={sampleRate * 2} addFunction={(func) => updateModuleFunc(func, index, moduleIndex)} removeFunction={(func) => updateModuleFunc(bypassFunction , index, moduleIndex)} />
              </ErrorBoundary>
            </span>
          )}
      </div>
      )
  }

  export default Group