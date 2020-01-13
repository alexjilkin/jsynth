import React, {useState, useEffect, useRef} from 'react';
import {getSineWave, getSquareWave, getSawWave} from "./waveFunctions"
import Knob from 'react-canvas-knob';
import debounce from 'lodash/debounce'

import './Oscillator.scss'

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const defaultState = {
    frequency: 440,
    sineAmount: 1,
    sawAmount: 1.1,
    squareAmount: 0
}

const orbitRadius = 12;

const addLights = (scene) => {
    let light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 50, 20, 40 )
    scene.add( light );

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( -10, 0, -10 )
    scene.add( light );
}

const setControls = (camera, element) => {
    const controls = new OrbitControls( camera, element );
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.1;
    controls.update();
}
const addCube = (scene) => {
    const geometry = new THREE.BoxGeometry( 7, 7, 7 );
        const cube = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xff0000 } ) )
        cube.rotateX(1)
        cube.rotateX(1)
        scene.add(cube);
}
function Cube({onXChange, onYChange, onZChange}) {
    const ref = useRef()

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x6ed3cf );
        const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 20);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( 150,150 );

        addLights(scene);
        addCube(scene)

        camera.position.x = orbitRadius;
        camera.position.z = orbitRadius / 2;
        ref.current.appendChild( renderer.domElement );

        setControls(camera, renderer.domElement);
        
        let lastX;
        let lastY;
        let lastZ;

        function animate() {
            requestAnimationFrame( animate );
            if (camera.position.x !== lastX) {
                lastX = camera.position.x;
                onXChange(lastX / orbitRadius)
            }

            if (camera.position.y !== lastY) {
                lastY = camera.position.y;
                onYChange(lastY / orbitRadius)
            }

            if (camera.position.z !== lastZ) {
                lastZ = camera.position.z;
                onZChange(lastZ / orbitRadius)
            }

            renderer.render(scene, camera);
        }
        animate();
    }, [ref])

    
    return (
      <div style={{width: 150, height: 150}} ref={ref}>

      </div>
    )
  }

const Oscillator = ({updateModulationFunction, removeFunction, updateState, persistentState = defaultState}) => {
    const [frequency, setFrequency] = useState(persistentState.frequency);

    const [squareAmount, setSquareAmount] = useState(persistentState.squareAmount)
    const [sawAmount, setSawAmount] = useState(persistentState.sawAmount)
    const [sineAmount, setSineAmount] = useState(persistentState.sineAmount)

    useEffect((() => {
        const oscillatorFunc = (y, x, frequencyModulation) => {
            if (y === 0) {
                return [0, frequencyModulation]
            }

            let funcs = [];
            funcs.push((x, f) => getSineWave(x, f) * Math.abs(sineAmount))
            funcs.push((x, f) => getSquareWave(x, f) * Math.abs(squareAmount))
            funcs.push((x, f) => getSawWave(x, f) * Math.abs(sawAmount))

            const wave = funcs.reduce((acc, func) => {
                
                return acc + func(x, frequency * frequencyModulation)
            }, 0)

            return [wave, frequencyModulation];
            
        }
        
        updateModulationFunction(oscillatorFunc)
        updateState({frequency, sawAmount, squareAmount, sineAmount})
    }), [frequency, squareAmount, sineAmount, sawAmount]);
    
    return(
        <div styleName="container">
            <div styleName="title">An osciallator.</div>

            <div styleName="frequency">
                <Knob 
                    min={0}
                    max={880}
                    width={70}
                    height={70}
                    fgColor="#6ed3cf"
                    value={frequency}
                    onChange={setFrequency}
                />
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Cube onXChange={debounce(setSineAmount, 100)} onYChange={debounce(setSquareAmount, 100)} onZChange={debounce(setSawAmount, 100)}/>
            </div>   
        </div>
    )
}

export default Oscillator;