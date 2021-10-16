
import React, {useEffect, useRef, useState} from 'react';

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'

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

const addFloor = (scene) => {
    const geometry = new THREE.PlaneGeometry(100, 100);
    // geometry.
    const material = new THREE.MeshBasicMaterial({color: 0x0000ff, side: THREE.DoubleSide});
    const plane = new THREE.Mesh( geometry, material );
    plane.rotateX(Math.PI / 4)
    //scene.add( plane );
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

const addText = (scene) => {
    const loader = new FontLoader();
    loader.load('https://threejs.org/examples/fonts/droid/droid_serif_bold.typeface.json', (font) => {
        const textGeometry = new TextGeometry( "TEEEEXT!", {
            font,
            size: 50,
            height: 10,
            curveSegments: 12,
        
            bevelThickness: 1,
            bevelSize: 1,
            bevelEnabled: true
            });
        
            var textMaterial = new THREE.MeshPhongMaterial( 
            { color: 0xff0000, specular: 0xffffff }
            );
        
            var mesh = new THREE.Mesh( textGeometry, textMaterial );
        
            //scene.add( mesh );
        });
}

function Cone({onChange, min = 0, max = 1, step = 0.1, initalValue = 1, color}) {
    const ref = useRef()
    const [value, setValue] = useState(initalValue);

    useEffect(() => {
        onChange(value)
    }, [value])

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xe1e8f0 );
        const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(width, height);
        let font = null;
        

        addLights(scene);
        addFloor(scene)
        addCone(scene, color)
        addText(scene)

        let lastX;
        let lastY;
        let lastZ;

        camera.position.x = orbitRadius;
        camera.position.y = orbitRadius;
        camera.position.z = orbitRadius;
        
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

                setValue(rVal)
            }

            renderer.render(scene, camera);
        }
        animate();
    }, [ref])

    
    return (
        <div>
            <div>
                {value}
            </div>
            <div style={{width, height, cursor: 'grab'}} ref={ref}>

            </div>
        </div>
        
    )
  }
export default Cone