import React, { useState, useEffect } from 'react';
import {useDrop} from 'react-dnd'
import {ItemTypes, sampleRate} from 'synth/consts'
import ErrorBoundary  from 'common/ErrorBoundary'
import {bypassFunction} from 'synth'
import './Group.scss'
import * as Modules from 'modules'

const Group = ({group, index, updateModuleFunc, addModuleToGroup, updateState}) => {
    const [, drop] = useDrop({
      accept: ItemTypes.MODULE,
      drop: monitor => addModuleToGroup({module: monitor.name, func: bypassFunction}, index),
    })
  
    return (
      <div styleName="group" key={index} ref={drop}>
          {group.map(({module: moduleName, func, persistentState}, moduleIndex) => 
            <span styleName="module" key={`${index}-${moduleIndex}`}>
              <ErrorBoundary >
                {(() => {

                  const Module = Modules[moduleName]

                  return (
                    <Module
                      key={`${index}-${moduleIndex}`}
                      sampleRate={sampleRate * 2} 
                      addFunction={(func) => updateModuleFunc(func, index, moduleIndex)}
                      updateState={(nextState) => updateState(nextState, index, moduleIndex)}
                      persistentState={persistentState}
                    />
                  )
                })()}
                
              </ErrorBoundary>
            </span>
          )}
      </div>
      )
  }

  export default Group