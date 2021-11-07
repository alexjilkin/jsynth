
import React, {useEffect, useRef} from 'react';

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const addLights = (scene) => {
    let light = new THREE.DirectionalLight( 0xffffff, 0.8 );
    light.position.set( -90, 400, 0 )

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

const addCone = (scene, color = 'yellow', width, height) => {
    const geometry = new THREE.ConeGeometry( width / 8, height / 5.4, 9);
    const cone = new THREE.Mesh(geometry, new THREE.MeshPhysicalMaterial( {
        color
    }));
    cone.position.set(0, 5, 0)
    scene.add(cone);
}

const Knob = ({onChange, min = 0, max = 1, value = 1, color, title = '', width = 150, height = 150, radialSegments = 9}) => {
    const ref = useRef()

    useEffect(() => {
        const orbitRadius = width / 8.2 ;

        const scene = new THREE.Scene();
        scene.background = null;
        const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
        renderer.setClearColor( 0xffffff, 0 );
        renderer.setSize(width, height);        

        addLights(scene);
        addCone(scene, color, width, height, radialSegments)

        let lastX;
        let lastY;
        let lastZ;

        camera.position.x = orbitRadius;
        camera.position.y = orbitRadius;
        camera.position.z = orbitRadius;

        const norm = Math.sqrt(2) * orbitRadius;
        camera.position.y = norm
        camera.position.z = (((value - min) / max) - 0.5)  * 2

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
            {title &&<div style={{border: `solid 2px ${color}`, borderRadius: 5, textAlign: 'center', padding: 2}}>
                {title}
            </div>
            }
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{borderBottom: `solid 3px ${color}`, borderRadius: 1, textAlign: 'center', padding: 2}}>
                    {value}
                </div>
            </div>
        </div>
        
    )
  }
  
export default Knob