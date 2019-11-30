import React, {useState, useEffect, useRef} from 'react';

const width = 300;
const height = 200;
const xUnit = width / (200) 
const yUnit = height / (height / 2);
let lastX = 0;
let lastY = 0;

const FrequencyView = ({updateModulationFunction, removeFunction, sampleRate}) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas.getContext) {

            let amplitudes = [];
            const sampleSize = 512;

            const context = canvas.getContext('2d');
            updateModulationFunction((y, x) => {
                if (y === 0) {
                    return y;
                }

                amplitudes.push(y);

                if (amplitudes.length === sampleRate) {
                    const frequencies = dft(amplitudes.slice(0, sampleSize))

                    for (let x = 0; x < frequencies.length; x++) {
                        const canvasWorldX = (x * xUnit);
                        const canvasWorldY = (height * (1/2)) + (frequencies[x][0] * yUnit)
                        context.fillRect(canvasWorldX, canvasWorldY , 1, 1);
        
                        if (canvasWorldX === 0) {
                            context.clearRect(0, 0, width, height)
                        }
        
                        if (canvasWorldY - lastY > 4 || canvasWorldX - lastX > 1.5) {
                            context.beginPath();
                            context.moveTo(lastX, lastY);
                            context.lineTo(canvasWorldX, canvasWorldY);
                            context.stroke();
                        }
        
                        lastX = canvasWorldX;
                        lastY = canvasWorldY;
                    }

                    amplitudes = [];
                }

                return y;
            })
        }
        
        
    }, [canvasRef])
    return (
        <canvas ref={canvasRef} {...{height, width}}>

        </canvas>
    )
}

function dft(inputAmplitudes) {
    const N = inputAmplitudes.length;
    const signals = [];

    for (let frequency = 0; frequency < N; frequency ++) {
      let real = 0, imaginary = 0;

      for (let n = 0; n < N; n++) {
        const currentAmplitude = inputAmplitudes[n];
  
        const rotationAngle = -1 * (2 * Math.PI * frequency * n) / N;
        
        real += Math.cos(rotationAngle) * currentAmplitude
        imaginary += Math.sin(rotationAngle) * currentAmplitude
      }

      signals[frequency] = [real, imaginary];
    }
  
    return signals;
  }



export default FrequencyView