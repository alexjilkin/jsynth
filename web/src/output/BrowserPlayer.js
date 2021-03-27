import {sampleRate} from '@jsynth/core/synth/consts'
import {isMobile} from "react-device-detect";
const bufferSize = 512;

export const play = async (waveGenerator) => {
  let isPlaying = false;

  const context = new AudioContext({sampleRate});
  await context.audioWorklet.addModule('crap.js'); 
  let osc = new AudioWorkletNode(context, 'osc');

  osc.connect(context.destination);

//   const buffer = master.createBuffer(1, bufferSize, sampleRate)
//   const source = master.createScriptProcessor(bufferSize, 1, 1);

//   const createBuffer = (output) => {
//     for (let i = 0; i < buffer.length; i++) {
//       const {value} = waveGenerator.next()
  
//       output[i] = value
//     }
//   }

//   source.buffer = buffer;
//   source.connect(master.destination);
  
//   source.addEventListener('audioprocess', (e) => {
//     isPlaying ? createBuffer(e.outputBuffer.getChannelData(0)) : master.close();
//   })



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

			var buffer = window.audioContext.createBuffer(1, 1, 22050);
			var source = window.audioContext.createBufferSource();
			source.buffer = buffer;

			source.connect(window.audioContext.destination);

			if (source.start) {
				source.start(0);
			} else if (source.play) {
				source.play(0);
			} else if (source.noteOn) {
				source.noteOn(0);
			}
		}

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