const WaveFile = require('wavefile');
const fs = require('fs') 
const stream = require('stream')
let wav = new WaveFile();
const Speaker = require('speaker')

// Create a mono wave file, 44.1 kHz, 32-bit and 4 samples

const frequencySong = [660, 660, 660, 510, 660, 770, 380, 510, 380, 320, 440, 480, 450, 430, 380, 660, 760, 860, 700, 760, 660, 520]
const sampleRate = 44100;
let amplitude = 10000;

let speaker = new Speaker();
let bufferStream = new stream.PassThrough();

let currentNote = 0;
bufferStream.write(getOneSecondWave2(frequencySong[0]));

//bufferStream.end(wav.toBuffer())
bufferStream.pipe(speaker)

bufferStream.on("data", () => {
  currentNote++
  bufferStream.write(getOneSecondWave2(frequencySong[currentNote]))
  console.log('crao')
})

//fs.writeFileSync('./test.wav', wav.toBuffer());


function getOneSecondWave(frequency) {
  let sound = [];
  let current = 10000;

  for (let i = 0; i < sampleRate; i++) {
    if (i % (sampleRate / frequency) === 0) {
      current = current * -1;
    }

    sound[i] = current;
  }

  wav.fromScratch(1, sampleRate, '16', sound);

  return wav.toBuffer();
}

function getOneSecondWave2(frequency) {
  let sound = [];
  

  for (let i = 0; i < sampleRate; i++) {
    sound[i] = getSineWave(frequency, i) + getSineWave(frequency / 2, i)
  }

  let wav = new WaveFile();
  wav.fromScratch(1, sampleRate, '16', sound);

  return wav.toBuffer();
}

function getSquareWave(frequency, x) {
  return Math.sign(Math.sin(Math.PI * 2 * (frequency) * x / sampleRate)) * amplitude;
}

function getSineWave(frequency, x) {
  return Math.sin(Math.PI * 2 * (frequency) * x / sampleRate) * amplitude
}