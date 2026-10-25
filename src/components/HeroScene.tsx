import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroSceneProps {
  interactive?: boolean;
}

export const HeroScene: React.FC<HeroSceneProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for zero-gravity floating PCB constellation
    const constellationGroup = new THREE.Group();
    scene.add(constellationGroup);

    // --- 1. Central Silicon Microcontroller Die ---
    // QFP Chip Body
    const chipGeo = new THREE.BoxGeometry(4.2, 4.2, 0.45);
    const isDark = document.documentElement.classList.contains('dark');
    const chipMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x16181f : 0x22262d,
      roughness: 0.35,
      metalness: 0.85,
      wireframe: false
    });
    const chipMesh = new THREE.Mesh(chipGeo, chipMat);
    constellationGroup.add(chipMesh);

    // Silicon Core Window with gold wire-bond aesthetic
    const dieGeo = new THREE.PlaneGeometry(2.2, 2.2);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x1a2130,
      emissive: 0xe07a5f,
      emissiveIntensity: 0.35,
      roughness: 0.1,
      metalness: 0.95
    });
    const dieMesh = new THREE.Mesh(dieGeo, dieMat);
    dieMesh.position.z = 0.235;
    chipMesh.add(dieMesh);

    // Chip Wireframe outline
    const wireframeGeo = new THREE.EdgesGeometry(chipGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xe07a5f,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.7
    });
    const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    chipMesh.add(wireframe);

    // Pin Leads around the chip (QFP-style)
    const pinGeo = new THREE.BoxGeometry(0.12, 0.6, 0.08);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xf4a261,
      metalness: 0.9,
      roughness: 0.2
    });
    const pinsGroup = new THREE.Group();
    for (let i = -7; i <= 7; i++) {
      // Top and bottom
      const pinTop = new THREE.Mesh(pinGeo, pinMat);
      pinTop.position.set(i * 0.24, 2.3, 0);
      pinsGroup.add(pinTop);

      const pinBottom = new THREE.Mesh(pinGeo, pinMat);
      pinBottom.position.set(i * 0.24, -2.3, 0);
      pinsGroup.add(pinBottom);

      // Left and right
      const pinLeft = new THREE.Mesh(pinGeo, pinMat);
      pinLeft.rotation.z = Math.PI / 2;
      pinLeft.position.set(-2.3, i * 0.24, 0);
      pinsGroup.add(pinLeft);

      const pinRight = new THREE.Mesh(pinGeo, pinMat);
      pinRight.rotation.z = Math.PI / 2;
      pinRight.position.set(2.3, i * 0.24, 0);
      pinsGroup.add(pinRight);
    }
    chipMesh.add(pinsGroup);

    // --- 2. Floating SMD Satellite Chips & Capacitors ---
    const satelliteGroup = new THREE.Group();
    const smdGeo = new THREE.BoxGeometry(1.2, 0.8, 0.3);
    const smdMat = new THREE.MeshStandardMaterial({
      color: 0x1f232b,
      metalness: 0.8,
      roughness: 0.3
    });

    const satellites: { mesh: THREE.Mesh; orbitRadius: number; speed: number; angle: number; yOffset: number }[] = [];
    const numSatellites = 7;
    for (let i = 0; i < numSatellites; i++) {
      const smd = new THREE.Mesh(smdGeo, smdMat);
      const orbitRadius = 4.8 + i * 1.1;
      const angle = (i / numSatellites) * Math.PI * 2;
      const speed = (0.2 + (i % 3) * 0.1) * (i % 2 === 0 ? 1 : -1);
      const yOffset = (Math.sin(i * 1.7) * 2);

      smd.position.set(
        Math.cos(angle) * orbitRadius,
        Math.sin(angle) * orbitRadius + yOffset,
        (Math.sin(i) * 2)
      );
      smd.rotation.set(Math.random(), Math.random(), Math.random());
      
      // Wireframe for satellite
      const smdWire = new THREE.LineSegments(new THREE.EdgesGeometry(smdGeo), wireframeMat);
      smd.add(smdWire);

      satelliteGroup.add(smd);
      satellites.push({ mesh: smd, orbitRadius, speed, angle, yOffset });
    }
    constellationGroup.add(satelliteGroup);

    // --- 3. 3D Circuit Copper Traces and Energy Pulses ---
    const traceCurves: THREE.CatmullRomCurve3[] = [];
    const traceCount = 14;
    const tracesMaterial = new THREE.LineBasicMaterial({
      color: 0xe07a5f,
      transparent: true,
      opacity: 0.35
    });

    const tracesGroup = new THREE.Group();
    for (let i = 0; i < traceCount; i++) {
      const theta = (i / traceCount) * Math.PI * 2;
      const p0 = new THREE.Vector3(Math.cos(theta) * 2.1, Math.sin(theta) * 2.1, 0);
      const p1 = new THREE.Vector3(
        Math.cos(theta + 0.3) * 4.5,
        Math.sin(theta + 0.3) * 4.5,
        Math.sin(i) * 1.5
      );
      const p2 = new THREE.Vector3(
        Math.cos(theta - 0.2) * 8.0,
        Math.sin(theta - 0.2) * 8.0,
        Math.cos(i) * 2.5
      );
      const p3 = new THREE.Vector3(
        Math.cos(theta + 0.1) * 12.0,
        Math.sin(theta + 0.1) * 12.0,
        (Math.random() - 0.5) * 4
      );

      const curve = new THREE.CatmullRomCurve3([p0, p1, p2, p3]);
      traceCurves.push(curve);

      const points = curve.getPoints(50);
      const traceGeo = new THREE.BufferGeometry().setFromPoints(points);
      const traceLine = new THREE.Line(traceGeo, tracesMaterial);
      tracesGroup.add(traceLine);
    }
    constellationGroup.add(tracesGroup);

    // Pulse Packets (Glowing photons traveling along the traces)
    const pulseCount = traceCount * 2;
    const pulseGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95
    });

    const pulses: { mesh: THREE.Mesh; curveIndex: number; progress: number; speed: number }[] = [];
    for (let i = 0; i < pulseCount; i++) {
      const pMesh = new THREE.Mesh(pulseGeo, pulseMat);
      const curveIndex = i % traceCurves.length;
      const progress = Math.random();
      const speed = 0.003 + Math.random() * 0.004;

      const pos = traceCurves[curveIndex].getPoint(progress);
      pMesh.position.copy(pos);
      constellationGroup.add(pMesh);
      pulses.push({ mesh: pMesh, curveIndex, progress, speed });
    }

    // --- 4. Interactive Zero-Gravity Starfield Particles ---
    const particleCount = prefersReducedMotion ? 150 : 500;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const terracottaColor = new THREE.Color(0xe07a5f);
    const copperColor = new THREE.Color(0xf4a261);
    const goldColor = new THREE.Color(0xffd166);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      const x = radius * Math.cos(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.cos(phi);
      const z = radius * Math.sin(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      // Color variation between terracotta and copper
      const c = Math.random() > 0.5 ? terracottaColor : (Math.random() > 0.5 ? copperColor : goldColor);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    constellationGroup.add(particles);

    // --- 5. Scene Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xe07a5f, 2.5);
    dirLight.position.set(8, 12, 10);
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0xf4a261, 3.0, 25);
    accentLight.position.set(-6, -6, 6);
    scene.add(accentLight);

    // --- 6. Mouse Interaction & Parallax ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = nx * 0.5;
      targetY = ny * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- 7. Animation Loop ---
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Mouse Parallax Lerp
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Zero-gravity idle rotation and floating bob
        constellationGroup.rotation.y = elapsed * 0.08 + mouseX * 0.8;
        constellationGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.15 - mouseY * 0.8;
        constellationGroup.position.y = Math.sin(elapsed * 0.6) * 0.35;

        // Animate pulse packets
        pulses.forEach(p => {
          p.progress += p.speed;
          if (p.progress > 1) p.progress = 0;
          const pos = traceCurves[p.curveIndex].getPoint(p.progress);
          p.mesh.position.copy(pos);
        });

        // Orbit satellites
        satellites.forEach(s => {
          s.angle += s.speed * delta;
          s.mesh.position.x = Math.cos(s.angle) * s.orbitRadius;
          s.mesh.position.y = Math.sin(s.angle) * s.orbitRadius + Math.sin(elapsed + s.orbitRadius) * 0.6;
          s.mesh.rotation.x += 0.01;
          s.mesh.rotation.y += 0.015;
        });

        // Gentle particle drift and cursor repulsion
        const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3;
          const iy = i * 3 + 1;
          const iz = i * 3 + 2;

          // Subtle breathing drift
          posAttr.array[ix] = initialPositions[ix] + Math.sin(elapsed + i) * 0.2;
          posAttr.array[iy] = initialPositions[iy] + Math.cos(elapsed * 0.8 + i) * 0.2;
          posAttr.array[iz] = initialPositions[iz] + Math.sin(elapsed * 0.5 + i) * 0.15;
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};

export default HeroScene;
