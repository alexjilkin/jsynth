import React, {useEffect, useRef} from 'react';

const width = 300;
const height = 200;
const yUnit = height / 8;
const xUnit = 1
let lastX = 0;
let lastY = 0;

const Oscilloscope = ({updateModulationFunction}) => {
    const canvasRef = useRef(null)
    let x = useRef(0)

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas.getContext) {

            const context = canvas.getContext('2d');
            updateModulationFunction((y, _x, frequencyModulation) => {
                if (Math.random() > 0.5) {
                    return [y, frequencyModulation];
                }

                const canvasWorldX = x.current % width;
                const canvasWorldY = (height * (3/5)) + (y * yUnit)

                if (canvasWorldX === 0) {
                    context.beginPath();
                    lastY = 0;
                }
               
                context.clearRect(canvasWorldX, 0, xUnit, height)
                context.lineTo(canvasWorldX + xUnit, canvasWorldY);
                context.stroke();

                x.current = x.current + xUnit;
                lastY = canvasWorldY;
            
                return [y, frequencyModulation];
            })
        }
        
        
    }, [canvasRef])
    return (
        <canvas ref={canvasRef} {...{height, width}}>

        </canvas>
    )
}

export default Oscilloscope