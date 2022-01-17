import React, { useState, useEffect } from "react";
import Knob from "react-canvas-knob";
import { sampleRate } from "@jsynth/core/synth/consts";

import "./LFO.scss";

const PiDividedBySampleRate = Math.PI / sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;

const type = "generator";

const LFO = ({ updateModulationFunction, sampleRate }) => {
  const [frequency, setFrequency] = useState(1);

  useEffect(() => {
    updateModulationFunction((y, x, frequencyModulation) => {
      const cyclicX = x % Math.floor(sampleRate / frequency);

      const lfo = Math.sin(frequency * twoPiDividedBySampleRate * cyclicX);

      const newFrequencyModulation = 1 - 0.1 * lfo;

      return [y * lfo, frequencyModulation * Number(newFrequencyModulation.toFixed(3))];
    }, type);
  }, [frequency]);

  return (
    <div styleName="container">
      LFO.
      <Knob
        min={0.1}
        max={10}
        width={70}
        height={70}
        step={0.1}
        fgColor="#6ed3cf"
        value={frequency}
        onChange={setFrequency}
        thickness={0.6}
      />
    </div>
  );
};

export default LFO;
