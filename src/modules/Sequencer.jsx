import React, {useState, useEffect, useCallback} from 'react';
import './Sequencer.scss';
import Knob from 'react-canvas-knob';

const sequenceSize = 8;

const Sequencer = ({addFunction, removeFunction, sampleRate}) => {
  const [sequence, setSequence] = useState(Array.from({length: sequenceSize}))
  const [currentStep, setCurrentStep] = useState(-1)
  const [bpm, setBpm] = useState(120)

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
      const bps = bpm / 60;
      const barInSampleRate = ((sampleRate / bps) * 4);

      const sectionSizeInSampleRate = Math.floor(barInSampleRate / sequenceSize);

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
      }, true)

  }, [sequence, bpm])

  return (
      <div styleName="container">
        The Sequenciator
        <div styleName="bpm-container">
          <div styleName="bpm">
            {bpm}
          </div>
          <Knob 
            min={0}
            max={300}
            width={70}
            height={70}
            fgColor="black"
            displayInput={false}
            thickness={1}
            value={bpm}
            onChange={setBpm}
          />
        </div>
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