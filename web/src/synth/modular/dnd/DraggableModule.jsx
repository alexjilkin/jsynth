import React from 'react';
import {useDrag} from 'react-dnd'
import {ItemTypes} from '@jsynth/core/synth/consts'
import Modules from 'modules'
import './DraggableModule.scss'

const DraggableModule = ({moduleName, index, theModule, ...props}) => {
  const {removeModule} = props;

  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.MODULE, index, theModule },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    }),
  })

  const Module = Modules[moduleName]

  return (
    <div styleName="container">
      <div styleName="drag-container"  ref={drag}>
        <div styleName="drag">

        </div>
        <div styleName="remove" onClick={() => removeModule(index)}>
          x
        </div>
      </div>
      <Module {...props} />
      {isDragging && <div styleName="overlay"></div>}
    </div>
  )
  }

  export default DraggableModule;