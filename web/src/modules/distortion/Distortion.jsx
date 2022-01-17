import React, { useState, useEffect, useRef } from "react";
import Knob from "react-non-conformist-knob";
import { addModule, updateArgs } from "../../output/BrowserPlayer";
import "./Distortion.scss";

const useDistortion = () => {
  const [gain, setGain] = useState(0);
  const id = useRef();

  useEffect(() => {
    id.current = addModule("distortion", "transform", { gain });
  }, []);

  useEffect(() => {
    updateArgs(id.current, { gain });
  }, [gain]);

  return { gain, setGain };
};
const Distortion = () => {
  const { gain, setGain } = useDistortion();

  return (
    <div styleName="container">
      <div styleName="title"> Distortion </div>
      <Knob height={120} width={120} onChange={setGain} min={0} max={10} value={gain} color={0x444444} />
    </div>
  );
};

export default Distortion;
