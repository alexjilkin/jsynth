const frequencySong = [660, 660, 660, 510, 660, 770, 380, 510, 380, 320, 440, 480, 450, 430, 380, 660, 760, 860, 700, 760, 660, 520]
const sampleRate = 44100 * 2;
const amplitude = Math.pow(2, 4);

export function getSquareWave(x, frequency = 440) {
  return Math.sign(Math.sin(Math.PI * 2 * (frequency) * x / sampleRate)) * amplitude;
}

export function getSawWave(x, frequency = 440) {
  return (-1) * 2 * amplitude  * arcctg(ctg(x * Math.PI * frequency / sampleRate)) / Math.PI
}

export function getSineWave(x, frequency = 440) {
  return  Math.sin(Math.PI * 2 * (frequency) * x / sampleRate) * amplitude
}
function ctg(x) { return 1 / Math.tan(x); }
function arcctg(x) { return Math.PI / 2 - Math.atan(x); }

