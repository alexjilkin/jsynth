import React, {useState, useEffect} from 'react' 
import Knob from 'react-canvas-knob';
import {useLowpass} from '@jsynth/core/modules'

import './Granular.scss';

let prevY = 0;
const grains = []

const grainSize = 4000;

const Granular = ({updateModulationFunction, removeFunction}) => { 
 
    useEffect(() => {
        let currentGrain = []
        updateModulationFunction((y, x, frequencyModulation) => {
            const cyclicX = x % grainSize

            if (cyclicX === 0) {
                currentGrain.map((y, n) => {
                    Math.sin((Math.PI * n) / N)
                })
                grains.push(currentGrain)
                currentGrain = []
            } else {
                currentGrain.push(y)
            }
            if (grains.length > 4) {
                return [grains[grains.length - 1][cyclicX] + grains[grains.length - 2][cyclicX] + grains[grains.length - 3][cyclicX], frequencyModulation]
            }

            return [y, frequencyModulation]
        })
    }, [])

    return (
        <div styleName="container">
            <div styleName="title"> Granular. </div>

        </div>
    )
}

export default Granular