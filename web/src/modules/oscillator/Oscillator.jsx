import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import Cube from "./Cube";
import Knob from "react-non-conformist-knob";
import { addModule, updateArgs } from "../../output/BrowserPlayer";
import "./Oscillator.scss";

const useOscillator = () => {
  const [squareAmount, setSquareAmount] = useState(0.1);
  const [sawAmount, setSawAmount] = useState(0.1);
  const [sineAmount, setSineAmount] = useState(1);

  const [algoType, setAlgoType] = useState(1);
  const id = useRef();

  useEffect(() => {
    id.current = addModule("oscillator", "generator", {
      squareAmount,
      sawAmount,
      sineAmount,
      algoType,
    });
  }, []);

  useEffect(() => {
    updateArgs(id.current, { squareAmount, sawAmount, sineAmount });
  }, [squareAmount, sawAmount, sineAmount]);

  return {
    squareAmount,
    setSquareAmount,
    sawAmount,
    setSawAmount,
    sineAmount,
    setSineAmount,
    algoType,
    setAlgoType,
  };
};

const Oscillator = () => {
  const {
    sineAmount,
    sawAmount,
    squareAmount,
    setSineAmount,
    setSawAmount,
    setSquareAmount,
    algoType,
    setAlgoType,
  } = useOscillator();

  return (
    <div styleName="container">
      <div styleName="title">Cube of waves</div>
      <div styleName="controls">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Cube
            onXChange={debounce(setSineAmount, 50)}
            onYChange={debounce(setSquareAmount, 50)}
            onZChange={debounce(setSawAmount, 50)}
            x={sineAmount}
            y={squareAmount}
            z={sawAmount}
          />
        </div>
        <div>
          <Knob
            width={120}
            height={120}
            onChange={(v) => setAlgoType(Math.round(v))}
            min={1}
            max={10}
            value={algoType}
            color={0xcccccc}
          />
        </div>
      </div>
    </div>
  );
};

export default Oscillator;
