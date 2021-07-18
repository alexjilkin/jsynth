import React, {useEffect, useRef} from 'react';

const width = 300;
const height = 200;
const yUnit = height / 4;
const xUnit = 2
let lastX = 0;
let lastY = 0;

let sample = []

const Oscilloscope = ({updateModulationFunction}) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas.getContext) {

            const context = canvas.getContext('2d');
            updateModulationFunction((y, _x, frequencyModulation) => {

                sample.push(y)

                if (sample.length > 1000) {
                    
                    lastY = 0;
                    context.clearRect(0, 0, width, height)
                    context.beginPath();
                    for (let x = 0; x < width; x++) {
                        const canvasWorldX = x
                        const canvasWorldY = (height * (3/5)) + (sample[x * 3] * yUnit)
                    
                        context.lineTo(canvasWorldX + xUnit, canvasWorldY);
                        

                        lastY = canvasWorldY;
                    }
                    context.stroke();
                    sample = [];
                }

                
            
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