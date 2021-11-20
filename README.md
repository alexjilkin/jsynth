# JSynth, a JavaScript web based synthesizer

In pursuit of sound generation and manipulation knowledge, this synth creates 
all the sounds from scratch, from sine/square/saw waves creation to lowpass filtering, delay and distortion.

[Checkout the demo here](https://alexjilkin.github.io/jsynth/)
Rotate the cube of waves to mix different type of waves, while controlling
delay and lowpass filtering with the 3d knob.

### Core

Decoupled from browser specific code, this contains all the synth logic and different modules used which can be reused later in other projects;

### Worklet

Uses AudioWorklet to run all core calculation.

### Web

A UI to control the synth in a nice manner.