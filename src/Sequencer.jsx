import React, {useState, useEffect, useCallback} from 'react';
import {throttle} from 'lodash';
import './Sequencer.scss';


const sequenceSize = 8;
const sampleRate = 44100 * 2;
const bpm = 180;

const Sequencer = ({addFunction, removeFunction}) => {
  const [sequence, setSequence] = useState(Array.from({length: sequenceSize}))
  const [currentStep, setCurrentStep] = useState(-1)

  const noteLength = 60 / bpm * (4 / sequenceSize)
  const sequenceLength = noteLength * sequenceSize;
  
  const toggleMarker = useCallback((index) => {
    setSequence([...sequence.slice(0, index), !sequence[index], ...sequence.slice(index + 1)])
  }, [sequence])

  const sequenceAnimation = () => {
    for (let i = 0; i < sequenceSize; i++) {
      setTimeout(() => {
        setCurrentStep(i)
      }, noteLength * 1000 * i)
     }
  }

  useEffect(() => {
      removeFunction();
      const sectionSizeInSampleRate = sampleRate / sequenceSize;
      addFunction((y, x) => {

        const currentStepInPlaying = Math.floor(x / sectionSizeInSampleRate) % sequenceSize
        
        if (x % sampleRate === 0) {
          sequenceAnimation()
        }
        
        if (sequence[currentStepInPlaying]) {
          return y
        } else {
          return 0;
        }
      })

    console.log(sequence)
  }, [sequence])

  return (
      <div styleName="container">
          <div styleName="markers">
            {sequence.map((value, index) => 
              <div styleName={`marker ${currentStep === index  ? 'playing' : sequence[index] ? 'on' : ''}`} key={index} onClick={() => toggleMarker(index)}>

              </div>
            )}
          </div>
    </div>
  )
}

export default Sequencer;