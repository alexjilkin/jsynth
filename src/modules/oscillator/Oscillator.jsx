import React, {useState, useEffect, useRef} from 'react';
import {getSineWave, getSquareWave, getSawWave} from "./logic"
import Knob from 'react-canvas-knob';
import debounce from 'lodash/debounce'

import './Oscillator.scss'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const debounced = debounce((y) => console.log(y), 1000)

const defaultState = {
    isSquareOn: false,
    isSineOn: true,
    isSawOn: false,
    frequency: 440,
    isFirstOn: true,
    is3rdOn: false,
    is5thOn: false
}

const orbitRadius = 10;

function Cube({onXChange, onYChange, onZChange}) {
    const ref = useRef()
    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x6ed3cf );
        const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 10);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( 150,150 );
        const geometry = new THREE.BoxGeometry( 5, 5, 5 );
        const cube = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xff0000 } ) )
        cube.rotateX(1)
        cube.rotateX(1)
        scene.add(cube);

        var light = new THREE.DirectionalLight( 0xffffff );
		light.position.set( 50, 20, 40 )
        scene.add( light );

        camera.position.z = orbitRadius;
        ref.current.appendChild( renderer.domElement );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.rotateSpeed = 0.1;
        controls.update();
        
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

const Oscillator = ({addFunction, removeFunction, updateState, persistentState = defaultState}) => {
    const [isSquareOn, setIsSquareOn] = useState(persistentState.isSquareOn);
    const [isSineOn, setIsSineOn] = useState(persistentState.isSineOn);
    const [isSawOn, setIsSawOn] = useState(persistentState.isSawOn);
    const [frequency, setFrequency] = useState(persistentState.frequency);
    const [isFirstOn, setIsFirstOn] = useState(persistentState.isFirstOn);
    const [is3rdOn, setIs3rdOn] = useState(persistentState.is3rdOn);
    const [is5thOn, setIs5thOn] = useState(persistentState.is5thOn);

    const [squareAmount, setSquareAmount] = useState(1)
    const [sawAmount, setSawAmount] = useState(1)
    const [sineAmount, setSineAmount] = useState(1)

    useEffect((() => {
        let funcs = [];
        funcs.push((x, f) => getSineWave(x, f) * Math.abs(sineAmount))
        funcs.push((x, f) => getSquareWave(x, f) * Math.abs(squareAmount))
        funcs.push((x, f) => getSawWave(x, f) * Math.abs(sawAmount))

        const oscillatorFunc = (y, x) => {
            const wave = funcs.reduce((acc, func) => {
                isFirstOn && (acc += func(x, frequency));
                is3rdOn && (acc += func(x, frequency * 1.2));
                is5thOn && (acc += func(x, frequency * 1.5));
                
                return acc;
            }, 0)
            if (x !== y) {
                return y + wave;
            } else {
                return wave;
            }
            
        }
        
        addFunction(oscillatorFunc)
        updateState({frequency, isSquareOn, isSineOn, isSawOn, isFirstOn, is3rdOn, is5thOn})
    }), [frequency, isSquareOn, isSineOn, isSawOn, isFirstOn, is3rdOn, is5thOn, squareAmount, sineAmount]);
    
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
            <Cube onXChange={debounce(setSineAmount, 200)} onYChange={debounce(setSquareAmount, 200)} onZChange={debounce(setSawAmount, 200)}/>
            </div>
            
            <div styleName="harmonics">
                <div onClick={() => setIsFirstOn(!isFirstOn)}>
                    root <div styleName={`${isFirstOn ? 'on' : 'off'}`}></div>
                </div>
                <div onClick={() => setIs3rdOn(!is3rdOn)}>
                    3rd <div styleName={`${is3rdOn ? 'on' : 'off'}`}></div>
                </div>
                <div onClick={() => setIs5thOn(!is5thOn)}>
                    5th <div styleName={`${is5thOn ? 'on' : 'off'}`}></div>
                </div>
            </div>
            
        </div>
    )
}

export default Oscillator;