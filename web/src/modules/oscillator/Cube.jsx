
import React, {useEffect, useRef} from 'react';

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const orbitRadius = 12;
const height = 168
const width = 168

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
    const geometry = new THREE.BoxGeometry( 8, 8, 8 );
        const cube = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0xff0000 } ) )
        cube.rotateX(10)
        cube.rotateX(10)
        scene.add(cube);
}
function Cube({onXChange, onYChange, onZChange}) {
    const ref = useRef()

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xe1e8f0 );
        const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 20);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);

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
      <div style={{width, height, cursor: 'grab'}} ref={ref}>

      </div>
    )
  }
export default Cube