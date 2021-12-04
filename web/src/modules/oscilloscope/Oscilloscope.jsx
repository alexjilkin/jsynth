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

        if (sample.length > 512 && throttleCount === 10) {
            const canvas = canvasRef.current;

            if (canvas.getContext) {
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, width, height)
                context.beginPath();
                let prevValue;
                const offset = sample.findIndex(y => {
                    if (Math.abs(y) < 0.01 && y > prevValue) {
                        return true;
                    }

                    prevValue = y
                })

                for (let x = offset; x < width + offset; x++) {
                    const canvasWorldX = (x - offset) * xUnit
                    const canvasWorldY = (height * (3/5)) + (sample[x] * yUnit)
                
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
