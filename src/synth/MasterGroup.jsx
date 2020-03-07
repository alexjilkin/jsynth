import React from 'react';
import {sampleRate} from 'synth/consts'
import ErrorBoundary  from 'common/ErrorBoundary'
import * as Modules from 'modules'

import './ModulesRack.scss'
import DraggableModule from './dnd/DraggableModule'

const MasterGroup = ({group, index, updateModuleFunc, addModule, removeModule, updateState}) => {
  return (
    <div styleName="group" key={index}>
        {group.map(({module: moduleName, func, persistentState}, moduleIndex) => {
        
            const Module = Modules[moduleName]
        
          return (<span key={`${index}-${moduleIndex}`} styleName="module-and-inbetween">
            <div styleName="module">
              <ErrorBoundary >
                    <DraggableModule
                      key={`${index}-${moduleIndex}`}
                      sampleRate={sampleRate}
                      removeModule={removeModule}
                      updateModulationFunction={(func) => updateModuleFunc(func, index, moduleIndex)}
                      updateState={(nextState) => updateState(nextState, index, moduleIndex)}
                      persistentState={persistentState}
                    />
              </ErrorBoundary>
            </div>
          </span>)
        }
        )}
    </div>
    )
  }




  export default MasterGroup