import React, {useState, useEffect, useCallback} from 'react';
import './Sequencer.scss'


const sequenceLength = 8;

// Time to play each note
const time = 0.2;

const Sequencer = ({playBySeconds}) => {
  const [sequence, setSequence] = useState(Array.from({length: sequenceLength}))

  const toggleMarker = useCallback((index) => {
    setSequence([...sequence.slice(0, index), !sequence[index], ...sequence.slice(index + 1)])
  }, [sequence])

  const play = useCallback(() => {
    sequence.forEach((marker, index) => setTimeout(() => {
      sequence[index] && playBySeconds(time)
    }, time * 1000 * index))
  }, [playBySeconds, sequence])

  return (
      <div styleName="container">
          <div styleName="markers">
            {sequence.map((value, index) => 
              <div styleName={`marker ${sequence[index] ? 'on' : ''}`} key={index} onClick={() => toggleMarker(index)}>

              </div>
            )}
          </div>
          <div onClick={play}> play </div>
    </div>
  )
}

export default Sequencer;