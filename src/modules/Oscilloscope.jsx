import React, {useState, useEffect, useRef} from 'react';

const width = 400;
const height = 200;
const xUnit = width / (2000) 
const yUnit = height / 100;
let lastX = 0;
let lastY = 0;
const Oscilloscope = ({addFunction, removeFunction}) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current;

        addFunction((y, x) => {
            if (canvas.getContext) {
                const context = canvas.getContext('2d')
                const canvasWorldX = (x * xUnit) % width;
                const canvasWorldY = (height * (3/5)) + (y * yUnit)
                context.fillRect(canvasWorldX, canvasWorldY , 1, 1);

                if (canvasWorldX % width === 0) {
                    context.clearRect(0, 0, width, height)
                }

                if (Math.abs(canvasWorldY - lastY) > 5 && canvasWorldX !== 0) {
                    context.beginPath();
                    context.moveTo(lastX, lastY);
                    context.lineTo(canvasWorldX, canvasWorldY);
                    context.stroke();
                }
                lastX = canvasWorldX;
                lastY = canvasWorldY;
            }

            return y;
        })
        
    }, [canvasRef])
    return (
        <canvas ref={canvasRef} {...{height, width}}>

        </canvas>
    )
}

export default Oscilloscope