import * as THREE from 'https://unpkg.com/three@0.166.1/build/three.module.js';

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
const BANNER_HEIGHT = 500;

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / BANNER_HEIGHT, 0.1, 1000);
renderer.setSize(window.innerWidth, BANNER_HEIGHT);

document.getElementById("panorama-background").appendChild(renderer.domElement);

const loader = new THREE.CubeTextureLoader();
const cubemap = loader.load([
    'images/panorama/panorama_0.png',
    'images/panorama/panorama_2.png',
    'images/panorama/panorama_4.png',
    'images/panorama/panorama_5.png',
    'images/panorama/panorama_3.png',
    'images/panorama/panorama_1.png',
]);

cubemap.colorSpace = THREE.SRGBColorSpace;
scene.background = cubemap;

let rotation = 0;

function animate() {
    requestAnimationFrame(animate);
    rotation += 0.00025;
    camera.lookAt(Math.sin(rotation) * 10, 0, Math.cos(rotation) * 10);
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / BANNER_HEIGHT;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, BANNER_HEIGHT);
});