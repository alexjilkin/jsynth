import React, {useState, useEffect, useCallback} from 'react';
import './Sequencer.scss'


const sequenceSize = 8;

// Time to play each note
const bpm = 180;

const Sequencer = ({playBySeconds}) => {
  const [sequence, setSequence] = useState(Array.from({length: sequenceSize}))
  const [isOn, setIsOn] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)

  const noteLength = 60 / bpm * (4 / sequenceSize)
  const sequenceLength = noteLength * sequenceSize;
  
  const toggleMarker = useCallback((index) => {
    setSequence([...sequence.slice(0, index), !sequence[index], ...sequence.slice(index + 1)])
  }, [sequence])

  const play = () => {
    sequence.forEach((marker, index) => setTimeout(() => {
      sequence[index] && playBySeconds(noteLength)
      setCurrentStep(index)

    }, noteLength * 1000 * index))
  }

  useEffect(() => {
    if (isOn && !isPlaying) {
      setIsPlaying(true)
      play();
      setTimeout(() => setIsPlaying(false), sequenceLength * 1000)
    }
  }, [isOn, isPlaying])

  return (
      <div styleName="container">
          <div styleName="markers">
            {sequence.map((value, index) => 
              <div styleName={`marker ${currentStep === index  ? 'playing' : sequence[index] ? 'on' : ''}`} key={index} onClick={() => toggleMarker(index)}>

              </div>
            )}
          </div>
          <div onClick={() => setIsOn(true)}> play </div>
    </div>
  )
}

export default Sequencer;