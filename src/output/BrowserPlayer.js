import {sampleRate} from 'synth/consts'
import {isMobile} from "react-device-detect";
const bufferSize = 2048;

export const play = (waveGenerator) => {
  let isPlaying = false;

  const master = new AudioContext({sampleRate: 44100});
  const buffer = master.createBuffer(1, bufferSize, sampleRate)
  const source = master.createScriptProcessor(bufferSize, 1, 1);

  const createBuffer = (output) => {
    for (let i = 0; i < buffer.length; i++) {
      const {value} = waveGenerator.next()
  
      output[i] = value
    }
  }

  source.buffer = buffer;
  source.connect(master.destination);
  
  source.addEventListener('audioprocess', (e) => {
    isPlaying ? createBuffer(e.outputBuffer.getChannelData(0)) : master.close();
  })

  isPlaying = true;

  return () => isPlaying = false
}


const warmUpAudio = () => {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	if (window.AudioContext) {
		window.audioContext = new window.AudioContext();
	}
	var fixAudioContext = function (e) {
		

		if (window.audioContext) {
			// Create empty buffer
			var buffer = window.audioContext.createBuffer(1, 1, 22050);
			var source = window.audioContext.createBufferSource();
			source.buffer = buffer;
			// Connect to output (speakers)
			source.connect(window.audioContext.destination);
			// Play sound
			if (source.start) {
				source.start(0);
			} else if (source.play) {
				source.play(0);
			} else if (source.noteOn) {
				source.noteOn(0);
			}
		}
		// Remove events
		document.removeEventListener('touchstart', fixAudioContext, true);
		document.removeEventListener('touchend', fixAudioContext, true);
		e.stopImmediatePropagation();
	};
	// iOS 6-8
	document.addEventListener('touchstart', fixAudioContext, true);
	// iOS 9
	document.addEventListener('touchend', fixAudioContext, true);
}

isMobile && warmUpAudio();

export default {
  play
}