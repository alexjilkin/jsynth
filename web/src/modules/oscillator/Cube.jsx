
import React, {useEffect, useRef} from 'react';

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const orbitRadius = 12;
const height = 168
const width = 168

const addLights = (scene) => {
    const light1 = new THREE.DirectionalLight( 0xff00ff, 0.55 );
    light1.position.set( 50, 400, 40 )
    scene.add( light1 );

    const light2 = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
    light2.position.set( -30, -50, -30 )
    scene.add( light2 );

    return light1
}

const setControls = (camera, element) => {
    const controls = new OrbitControls( camera, element );
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.2;
    controls.update();
}
const color = 0xff0000
const borderBottom = (color) => ({borderBottom: `solid 3px #${color.toString(16)}`, borderRadius: 1, textAlign: 'center', padding: 2})
const addCube = (scene) => {
    const geometry = new THREE.BoxGeometry( 8, 8, 8 );
        const cube = new THREE.Mesh( geometry, new THREE.MeshPhysicalMaterial({color}))
        cube.rotateX(10)
        cube.rotateX(10)
        scene.add(cube);
}
function Cube({onXChange, onYChange, onZChange, x, y, z}) {
    const ref = useRef()

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xe1e8f0 );
        const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 20);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);

        const light = addLights(scene);
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
                onXChange(Math.abs(Math.floor(lastX / orbitRadius * 10) / 10))
            }

            if (camera.position.y !== lastY) {
                lastY = camera.position.y;
                onYChange(Math.abs(Math.floor(lastY / orbitRadius * 10) / 10))
            }

            if (camera.position.z !== lastZ) {
                lastZ = camera.position.z;
                onZChange(Math.abs(Math.floor(lastZ / orbitRadius * 10) / 10))
            }
            light.position.copy(camera.position)
            renderer.render(scene, camera);
        }
        animate();
    }, [ref])

    const borderStyle = borderBottom(color)
    
    return (
      <div>
        <div style={{width, height, cursor: 'grab'}} ref={ref}>

        </div>
          
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={borderBottom(color)}>
              {x}
            </div>
            <div style={borderStyle}>
              {y}
            </div>
            <div style={borderStyle}>
              {z}
            </div>
          </div>
        </div>
    )
  }
export default Cube