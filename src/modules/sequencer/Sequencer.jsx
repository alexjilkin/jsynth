import React, {useState, useEffect, useCallback} from 'react';
import './Sequencer.scss';
import Knob from 'react-canvas-knob';

const defaultState = {
  sequenceSize: 8,
  sequence: Array.from({length: 8}),
  bpm: 120,
  isEnvelopeOn: false
}
const Sequencer = ({updateModulationFunction, removeFunction, sampleRate, updateState, persistentState = defaultState}) => {
  const [sequenceSize, setSequenceSize] = useState(persistentState.sequenceSize)
  const [sequence, setSequence] = useState(persistentState.sequence)
  const [currentStep, setCurrentStep] = useState(-1)
  const [bpm, setBpm] = useState(persistentState.bpm)
  const [isEnvelopeOn, setIsEnvelopeOn] = useState(persistentState.isEnvelopeOn)

  const noteLength = 60 / bpm * (4 / sequenceSize)
  const sequenceLength = noteLength * sequenceSize;
  
  const changeMarkerValue = useCallback((index, value) => {
    setSequence([...sequence.slice(0, index), value, ...sequence.slice(index + 1)])
  }, [sequence, sequenceSize])

  const sequenceAnimation = () => {
    for (let i = 0; i < sequenceSize; i++) {
      setTimeout(() => {
        setCurrentStep(i)
      }, noteLength * 1000 * i)
     }
  }

  useEffect(() => {
    if (sequence.length !== sequenceSize) {
      setSequence(Array.from({length: sequenceSize}))
    }
  }, [sequenceSize])

  useEffect(() => {
      const bps = bpm / 60;
      const barInSampleRate = ((sampleRate / bps) * 4);

      const sectionSizeInSampleRate = ~~(barInSampleRate / sequenceSize);

      updateState({sequence, bpm, sequenceSize, isEnvelopeOn})
      updateModulationFunction((y, x, frequencyModulation) => {
        const xRelativeToSection = x % sectionSizeInSampleRate;

        const currentStepInPlaying = ~~(x / sectionSizeInSampleRate) % sequenceSize
        
        if (xRelativeToSection === 0 && currentStepInPlaying === 0) {
          sequenceAnimation()
        }

        const interval = sequence[currentStepInPlaying]
        if (interval) {
          const intervalRatio = intervals[sequence[currentStepInPlaying]];
          const result = isEnvelopeOn ? envelope(y, xRelativeToSection, sectionSizeInSampleRate) : y;
          return [result, intervalRatio];
        } else {
          return [0, frequencyModulation];
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
            <Knob 
              key={index}
              min={0}
              max={7}
              step={1}
              width={36}
              height={36}
              fgColor={currentStep === index ? 'white' : '#9068be'}
              value={value || 0}
              onChange={(value) => changeMarkerValue(index, value)}
            />
          )}
        </div>
    </div>
  )
}

function envelope(y, x, size) {
  const attack =  1 / 3;
  const release = 2 / 3;
  const m1 = 1 / (attack * size)
  const m2 = (0 - 1) / (size * release);

  return x < attack * size ? 
    y * (x * m1) : 
    y * ((x * m2) + 1)
}

const intervals =  [1, 1.066, 1.2, 1.333, 1.5, 1.6, 1.75]
function intervalToFrequency(interval, frequency) {
  return frequency * (intervals[interval] || 1)
}

export default Sequencer;