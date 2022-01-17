import { sampleRate } from "@jsynth/core/consts";
import createModule from "./createModule";
import { envelope } from "./envelope";

const amplitude = 1;
const PiDividedBySampleRate = Math.PI / sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;

const baseFrequency = 440;

const algoTypeToFunc = {
  1: (x) => 0,
  2: (x) => 0,
  3: (x) => Math.sin(x * 20),
  4: (x) => Math.tan(x * 10),
  5: (x) => Math.sin(x * 2),
  6: (x) => (Math.sin(x) + Math.cos(x)),
}

const getModulator = (algoType, x) => {
  return algoTypeToFunc[algoType] ? algoTypeToFunc[algoType](x) : 0
}

function oscillator(u, n, freqModulation, args) {
  const { sineAmount, sawAmount, squareAmount, algoType, nAtStart, nAtStop, shouldGenerate } = args;

  const totalAmount = Math.abs(sineAmount) + Math.abs(sawAmount) + Math.abs(squareAmount);
  const wave =
    (
      getSineWave(n, freqModulation, algoType) * Math.abs(sineAmount) +
      getSquareWave(n, freqModulation, algoType) * Math.abs(squareAmount) +
      getSawWave(n, freqModulation, algoType) * Math.abs(sawAmount)
    ) /
    totalAmount;

  return envelope(wave, n, shouldGenerate, nAtStart, nAtStop);
}

export function getSineWave(n, freqModulation, algoType) {
  const frequency = baseFrequency * freqModulation;
  const cyclicN = n % ~~(sampleRate / frequency);

  const x = frequency * twoPiDividedBySampleRate * cyclicN;

  return Math.cos(x + getModulator(algoType, x)) * amplitude;
}

export function getSquareWave(n, freqModulation, algoType) {
  const frequency = baseFrequency * freqModulation;
  const cyclicN = n % ~~(sampleRate / frequency);

  const x = twoPiDividedBySampleRate * frequency * (cyclicN % sampleRate)
  return Math.sign(Math.sin(x + getModulator(algoType, x))) * amplitude;
}

export function getSawWave(n, freqModulation, algoType) {
  const frequency = baseFrequency * freqModulation;
  const cyclicN = n % ~~(sampleRate / frequency);

  const x = cyclicN * frequency * PiDividedBySampleRate;

  return (-amplitude * arcctg(ctg(x) + getModulator(algoType, x))) / Math.PI;
}

function ctg(x) {
  return 1 / Math.tan(x);
}
function arcctg(x) {
  return Math.PI / 2 - Math.atan(x);
}
export default createModule(oscillator, "generator");
