
import React, {useEffect, useRef} from 'react';

import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

const orbitRadius = 12;

const addLights = (scene) => {
    let light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0, 500 )
    scene.add( light );

    // light = new THREE.DirectionalLight( 0xffffff );
    // light.position.set( -10, 0, -10 )
    // scene.add( light );
}

const setControls = (camera, element) => {
    const controls = new OrbitControls( camera, element );
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.1;
    controls.update();
}
const addCone = (scene) => {
    const geometry = new THREE.ConeGeometry( 10, 15, 7 );
    const cone = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial( {color: 0xffff00} ));
    cone.rotateX(10)
    cone.rotateX(10)
    scene.add(cone);
}
function Cone({onChange = (v) => console.log(v)}) {
    const ref = useRef()

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xe1e8f0 );
        const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize( 300,300 );

        addLights(scene);
        addCone(scene)

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
            }

            if (camera.position.y !== lastY) {
                lastY = camera.position.y;
                onChange(lastY / orbitRadius)
            }

            if (camera.position.z !== lastZ) {
                lastZ = camera.position.z;
            }

            renderer.render(scene, camera);
        }
        animate();
    }, [ref])

    
    return (
      <div style={{width: 300, height: 300, cursor: 'grab'}} ref={ref}>

      </div>
    )
  }
export default Cone