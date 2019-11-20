const frequencySong = [660, 660, 660, 510, 660, 770, 380, 510, 380, 320, 440, 480, 450, 430, 380, 660, 760, 860, 700, 760, 660, 520]
const sampleRate = 22050 * 2;
const amplitude = Math.pow(2, 3);

const PiDividedBySampleRate = Math.PI / sampleRate;
const twoPiDividedBySampleRate = PiDividedBySampleRate * 2;

export function getSquareWave(x, frequency = 440) {
  return Math.sign(Math.sin(twoPiDividedBySampleRate* (frequency) * (x % sampleRate))) * (amplitude / 2);
}

let sawWaveCache = {}

export function getSawWave(x, frequency = 440) {
  const cyclicX = x % (~~(sampleRate / frequency));

  if (sawWaveCache[frequency]) {
    return sawWaveCache[frequency][cyclicX]
  } else {
    sawWaveCache[frequency] = [];

    // Create lookup array;
    for (let i = 0; i < sampleRate; i++) {
      sawWaveCache[frequency].push((-1) * (amplitude / 2)  * arcctg(ctg((i) * frequency * PiDividedBySampleRate)) / Math.PI)
    }
  }

  return sawWaveCache[frequency][cyclicX];
}

let sineWaveCache = new Map();

export function getSineWave(x, frequency = 440) {
  const cyclicX = x % (~~(sampleRate / frequency));

  if (!sineWaveCache.has(frequency)) {
    
    sineWaveCache.set(frequency, []);

    // Create lookup array;
    for (let i = 0; i < (sampleRate / frequency); i++) {
      sineWaveCache.get(frequency).push(Math.sin(frequency * twoPiDividedBySampleRate * i) * amplitude)
    }
  }

  return sineWaveCache.get(frequency)[cyclicX]
}

function ctg(x) { return 1 / Math.tan(x); }
function arcctg(x) { return Math.PI / 2 - Math.atan(x); }

