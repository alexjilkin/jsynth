import React, {useState, useEffect, useCallback} from 'react';
import './Sequencer.scss';
import Knob from 'react-canvas-knob';

const Sequencer = ({addFunction, removeFunction, sampleRate}) => {
  const [sequenceSize, setSequenceSize] = useState(8)
  const [sequence, setSequence] = useState(Array.from({length: sequenceSize}))
  const [currentStep, setCurrentStep] = useState(-1)
  const [bpm, setBpm] = useState(120)
  const [isEnvelopeOn, setIsEnvelopeOn] = useState(false)

  const noteLength = 60 / bpm * (4 / sequenceSize)
  const sequenceLength = noteLength * sequenceSize;
  
  const toggleMarker = useCallback((index) => {
    setSequence([...sequence.slice(0, index), !sequence[index], ...sequence.slice(index + 1)])
  }, [sequence, sequenceSize])

  const sequenceAnimation = () => {
    for (let i = 0; i < sequenceSize; i++) {
      setTimeout(() => {
        setCurrentStep(i)
      }, noteLength * 1000 * i)
     }
  }

  useEffect(() => {
    setSequence(Array.from({length: sequenceSize}))
  }, [sequenceSize])

  useEffect(() => {
      const bps = bpm / 60;
      const barInSampleRate = ((sampleRate / bps) * 4);

      const sectionSizeInSampleRate = Math.floor(barInSampleRate / sequenceSize);

      addFunction((y, x) => {
        const xRelativeToSection = x % sectionSizeInSampleRate;

        const currentStepInPlaying = Math.floor(x / sectionSizeInSampleRate) % sequenceSize
        
        if (xRelativeToSection === 0 && currentStepInPlaying === 0) {
          sequenceAnimation()
        }
        
        if (x === y) {
          return 0;
        }

        if (sequence[currentStepInPlaying]) {
          if (isEnvelopeOn) {
            return envelope(y, xRelativeToSection, sectionSizeInSampleRate)
          } else {
            return y;
          }
          
        } else {
          return 0;
        }
      })
      

  }, [sequence, bpm, sequenceSize, isEnvelopeOn])

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
        <div>
          <span styleName="beat" style={{cursor: 'pointer'}}onClick={() => setSequenceSize(sequenceSize === 8 ? 16 : 8)}>
            Beat: 1/{sequenceSize}
          </span>
          <span styleName={`envelope ${isEnvelopeOn ? 'on' : 'off'}`} onClick={() => setIsEnvelopeOn(!isEnvelopeOn)}>
            Envelope
          </span>
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

function envelope(y, x, size) {
  const attack =  1 / 3;
  const release = 2 / 3;
  const m1 = 1 / (attack * size)
  const m2 = -1 / (release * size);

  return x < attack * size ? 
    y * (x * m1) : 
    y * ((x * m2) + (1 / release))
}

export default Sequencer;