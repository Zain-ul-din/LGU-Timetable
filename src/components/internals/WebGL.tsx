
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useEffect, useRef } from 'react';
import { Flex } from '@chakra-ui/react';
import earthTexture from '../../assets/textures/earthmap1k.jpg'
import earthCloud   from '../../assets/textures/earthCloud.png'
import galaxy       from '../../assets/textures/galaxy.png'
import earthbump    from '../../assets/textures/earthbump.jpg'

export default function WebGL (): JSX.Element 
{
    const mountRef = useRef <HTMLDivElement | null> (null)

    useEffect (()=> {
        // init
        const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.01, 3 );
        camera.position.z = 1;

        const scene = new THREE.Scene();

        // light
        scene.add( new THREE.AmbientLight( 0x222222 ) );
        scene.background = null;

        // Load textures
        const earthMapTex = new THREE.TextureLoader().load(earthTexture);
        const earthCloudTex = new THREE.TextureLoader ().load (earthCloud)
        const galaxyTex = new THREE.TextureLoader ().load (galaxy)
        const bumpTex   = new THREE.TextureLoader ().load (earthbump)
        
        const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);
        
        const earthMaterial = new THREE.MeshPhongMaterial(
            {map: earthMapTex, bumpScale: 0.3, bumpMap: bumpTex}
        )
        
        const mesh = new THREE.Mesh( earthGeometry, earthMaterial );
        scene.add( mesh );

        const cloudMaterial = new THREE.MeshPhongMaterial (
            {map: earthCloudTex, transparent: true}
        )
        
        const starMaterial = new THREE.MeshPhongMaterial (
            {map: galaxyTex, side: THREE.BackSide}
        )
        
        const cloudGeometry = new THREE.SphereGeometry(0.61, 30, 30);
        const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
        scene.add(cloudMesh);
        
        // galaxy geometry
        const starGeometry = new THREE.SphereGeometry(80, 64, 64);
        const starMesh = new THREE.Mesh(starGeometry, starMaterial);
        scene.add(starMesh);    

        // ambient light
        const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
        scene.add(ambientlight);

        const pointLight = new THREE.PointLight(0xffffff, 1)
        pointLight.position.set(5, 3, 5);
        scene.add(pointLight);

        // point light helper
        const pointLightHelper = new THREE.PointLightHelper(pointLight);
        scene.add(pointLightHelper);

        const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true  } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setAnimationLoop( webGlWindow );
        renderer.setClearColor( 0xffffff, 0 );

        // orbit control
        
        // const controls = new OrbitControls(camera, renderer.domElement);


        // document
        
        mountRef.current?.appendChild (renderer.domElement)

        // animation

        starMesh.rotation.y = -3.1219999999998778;
        mesh.rotation.y = -6.543500000000116;  
        cloudMesh.rotation.y = -1.5609999999999389
        
        // event listener
        
        function onWindowResize(){

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        
            renderer.setSize( window.innerWidth, window.innerHeight );
        
        }
        window.addEventListener ('resize', onWindowResize)

        function webGlWindow( time: number ): void {
            starMesh.rotation.y -= 0.002;
            mesh.rotation.y -= 0.0015;
            cloudMesh.rotation.y += 0.001;
            // controls.update();
        	renderer.render( scene, camera );
        }

    } , [])

    return <Flex className="web_gl" ref = {mountRef} display = {{lg: 'flex', md: 'flex', sm: 'none', base: 'none'}}></Flex>
}




