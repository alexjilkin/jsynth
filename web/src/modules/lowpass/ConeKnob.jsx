
import React, {useEffect, useRef, useState} from 'react';

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'

const orbitRadius = 20;

const width = 150;
const height = 150;

const addLights = (scene) => {
    let light = new THREE.DirectionalLight( 0xffffff, 0.8 );
    light.position.set( 90, 500, 0 )

    const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 0.4);
    scene.add( hemiLight );
    scene.add( light );
}

const setControls = (camera, element) => {
    const controls = new OrbitControls( camera, element );
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.4;
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;
    
    controls.update();
}

const addCone = (scene, color = 'yellow') => {
    const geometry = new THREE.ConeGeometry( 19, 23, 9 );
    const cone = new THREE.Mesh(geometry, new THREE.MeshPhysicalMaterial( {
        color
    }));

    scene.add(cone);
}

function Cone({onChange, min = 0, max = 1, step = 0.1, value = 1, color, title = ''}) {
    const ref = useRef()

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = null;
        const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
        renderer.setClearColor( 0xffffff, 0 );
        renderer.setSize(width, height);
        let font = null;
        

        addLights(scene);
        addCone(scene, color)

        let lastX;
        let lastY;
        let lastZ;

        camera.position.x = orbitRadius;
        camera.position.y = orbitRadius;
        camera.position.z = orbitRadius;

        
        const norm = Math.sqrt(2) * orbitRadius;
        camera.position.y = norm 
        camera.position.z = (((value - min) / max) - 0.5)  * 2 
        //console.log(camera.position.z)
        ref.current.appendChild( renderer.domElement );
        
        setControls(camera, renderer.domElement);

        function animate() {
            requestAnimationFrame( animate );
            const norm = Math.sqrt(Math.pow(camera.position.x, 2) + Math.pow(camera.position.z, 2));

            if (camera.position.x !== lastX) {
                lastX = camera.position.x;
            }

            if (camera.position.y !== lastY) {
                lastY = camera.position.y;
            }

            if (camera.position.z !== lastZ) {
                lastZ = camera.position.z;
                const val = min + (0.5 + camera.position.z / (norm * 2)) * max
                const rVal = Math.round(val * 10) / 10

                onChange(rVal)
            }

            renderer.render(scene, camera);
        }
        animate();
    }, [ref])

    
    return (
        <div>
            <div style={{width, height, cursor: 'grab'}} ref={ref}>

            </div>
            <div style={{fontFamily: 'Roboto', fontWeight: 500}}>
                {title}: {value}
            </div>
        </div>
        
    )
  }
export default Cone