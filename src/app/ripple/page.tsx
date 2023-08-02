"use client";

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useEffect, useRef } from 'react';

const vertexShader = `
  uniform vec2 uMouse;
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 pos = position;
    float dist = distance(uv, uMouse);
    pos.z = sin(dist * 10.0 - uTime * 4.0) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(vUv, 0.0, 1.0);
  }
`;

const WavesPage = () => {
  const refDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refDiv.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    refDiv.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    const geometry = new THREE.PlaneGeometry(20, 20, 128, 128);

    const uniforms = {
      uMouse: { value: new THREE.Vector2(0, 0) },
      time: { value: 0 }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 5;

    const onMouseMove = (event: MouseEvent) => {
      uniforms.uMouse.value.x = (event.clientX / window.innerWidth) * 2 - 1;
      uniforms.uMouse.value.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <div ref={refDiv} />;
};

export default WavesPage;
