import React, {useState, useEffect, useCallback} from 'react';
import {throttle} from 'lodash';
import './Sequencer.scss';


const sequenceSize = 8;
const bpm = 130;
const bps = bpm / 60;

const Sequencer = ({addFunction, removeFunction, sampleRate}) => {
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
      const barInSampleRate = ((sampleRate / bps) * 4);

      const sectionSizeInSampleRate = Math.floor(barInSampleRate / sequenceSize);
      console.log(sectionSizeInSampleRate)
      addFunction((y, x) => {
        const currentStepInPlaying = Math.floor(x / sectionSizeInSampleRate) % sequenceSize
        
        if (x % sectionSizeInSampleRate === 0 && currentStepInPlaying === 0) {
          sequenceAnimation()
        }
        
        if (x === y) {
          return 0;
        }
        if (sequence[currentStepInPlaying]) {
          return y
        } else {
          return 0;
        }
      })

  }, [sequence])

  return (
      <div styleName="container">
        The Sequenciator
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