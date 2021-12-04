import React, {useEffect, useRef} from 'react';
import {subscribeToMessage} from '../../output/BrowserPlayer'

const width = 320;
const height = 150;
const yUnit = height;
const xUnit = 1

let sample = []
let count = 1;
let throttleCount = 1;

export const Oscilloscope = () => {
    const canvasRef = useRef(null)

    const handleMessage = ({data}) => {
        sample = [...sample, ...Array.from(data)]

        if (sample.length > 512 && throttleCount === 5) {
            const canvas = canvasRef.current;

            if (canvas.getContext) {
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, width, height)
                context.beginPath();

                let firstZeroIndex;

                for (let i = 1; i < sample.length; i++) {
                    if (Math.abs(sample[i]) < 0.1 && sample[i] > sample[i - 1]) {
                        firstZeroIndex = i;
                        break;
                    }
                }

                for (let x = 0; x < width; x++) {
                    const canvasWorldX = x * xUnit
                    const canvasWorldY = (height * (3/5)) + (sample[firstZeroIndex + x] * yUnit)
                
                    context.lineTo(canvasWorldX + xUnit, canvasWorldY);
                }
                context.stroke();    
            }
            sample = [];
            throttleCount = 0;
        }
        throttleCount++
        count++
    }
    useEffect(() => {
        subscribeToMessage(handleMessage)
    }, [canvasRef])
    return (
        <canvas ref={canvasRef} {...{height, width}}>

        </canvas>
    )
}
