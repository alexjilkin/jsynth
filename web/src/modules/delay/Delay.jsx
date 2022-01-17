import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Delay.scss";
import { addModule, updateArgs } from "../../output/BrowserPlayer";
import Knob from "react-non-conformist-knob";

const useDelay = (initialValue = { time: 0.4, depth: 4, gain: 0.4 }) => {
  const [time, setTime] = useState(initialValue.time);
  const [depth, setDepth] = useState(initialValue.depth);
  const [gain, setGain] = useState(initialValue.gain);
  const id = useRef();

  useEffect(() => {
    id.current = addModule("delay", "transform", { time, depth, gain });
  }, []);

  useEffect(() => {
    updateArgs(id.current, { time, depth, gain });
  }, [time, depth, gain]);

  return {
    time,
    setTime,
    depth,
    setDepth,
    gain,
    setGain,
  };
};

const Delay = ({}) => {
  const [isOn, setIsOn] = useState(true);
  const { time, setTime, depth, setDepth, gain, setGain } = useDelay();

  const toggleDelay = useCallback(() => {
    setIsOn(!isOn);
  }, [isOn]);

  return (
    <div styleName="container">
      <div styleName="header">
        <div styleName="title">Delay.</div>
      </div>

      <div styleName="knobs">
        <div styleName="knob">
          <Knob
            width={120}
            height={120}
            title="Time"
            value={time}
            onChange={setTime}
            max={3}
            min={0.1}
            color={0x66ff66}
          />
        </div>

        <div styleName="knob">
          <Knob
            width={120}
            height={120}
            title="Depth"
            value={depth}
            onChange={(v) => setDepth(Math.round(v))}
            max={6}
            min={1}
            color={0x77ff77}
          />
        </div>

        <div styleName="knob">
          <Knob
            width={120}
            height={120}
            title="Gain"
            value={gain}
            onChange={setGain}
            max={0.8}
            min={0.2}
            color={0x66ff66}
          />
        </div>
      </div>
    </div>
  );
};

export default Delay;
