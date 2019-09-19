const frequencySong = [660, 660, 660, 510, 660, 770, 380, 510, 380, 320, 440, 480, 450, 430, 380, 660, 760, 860, 700, 760, 660, 520]
const sampleRate = 44100 * 2;
const amplitude = Math.pow(2, 4);


const PiDividedBySampleRate = Math.PI / sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;

export function getSquareWave(x, frequency = 440) {
  return Math.sign(Math.sin(twoPiDividedBySampleRate* (frequency) * (x % sampleRate))) * (amplitude / 2);
}

let sawWaveCache = {}
export function getSawWave(x, frequency = 440) {
  const cyclicX = x % sampleRate;

  if (sawWaveCache[frequency]) {
    return sawWaveCache[frequency][cyclicX]
  } else {
    
    const values = [];
    for (let i = 0; i < sampleRate; i++) {
      values.push((-1) * (amplitude)  * arcctg(ctg((i) * frequency * PiDividedBySampleRate)) / Math.PI)
    }

    sawWaveCache[frequency] = values
  }

  return sawWaveCache[frequency][cyclicX];
}

export function getSineWave(x, frequency = 440) {
  return  (Math.sin(frequency * twoPiDividedBySampleRate * (x % sampleRate)) * amplitude) 
}

function ctg(x) { return 1 / Math.tan(x); }
function arcctg(x) { return Math.PI / 2 - Math.atan(x); }

