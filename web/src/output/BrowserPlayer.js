import { sampleRate } from "@jsynth/core/consts";
import { getTriggers } from "../input/KeyboardManager";
import { v4 as uuidv4 } from "uuid";

export const modules = {};
let isUpdated = false;

export const addModule = (name, type, args) => {
  const id = uuidv4();
  modules[id] = { name, type, args };
  isUpdated = true;

  return id;
};

let isPlaying = false;
export const getIsPlaying = () => isPlaying;

export const updateArgs = (id, args) => {
  modules[id] = {
    ...modules[id],
    args,
  };

  isUpdated = true;
};

let synth;
const cbs = [];
export const subscribeToMessage = (cb) => cbs.push(cb);

export const play = async () => {
  const context = new AudioContext({ sampleRate });
  await context.audioWorklet.addModule("worklet.js");
  synth = new AudioWorkletNode(context, "synth");

  synth.connect(context.destination);

  setInterval(() => {
    synth.port.postMessage(
      JSON.stringify({
        modules: Object.keys(modules).map((key) => modules[key]),
        triggers: getTriggers(),
        isUpdated,
      })
    );

    isUpdated && (isUpdated = false);
  }, 15);

  synth.port.onmessage = cbs[0];

  isPlaying = true;

  return () => (isPlaying = false);
};

export default {
  play,
};
