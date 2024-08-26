import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Candle() {
  const { scene: candle } = useGLTF("/objects/candle.glb");
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const { scene, camera } = useThree();
  const [isLit, setIsLit] = useState(true);
  const [hovered, setHovered] = useState(false);
  const lampRef = useRef<THREE.Mesh>(null!);

  candle.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  function onPointerMove(event: MouseEvent) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  useFrame(() => {
    let isHovered = false;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.name == "candle_triple") {
        isHovered = true;
      }
    }
    setHovered(isHovered);
  });
  useEffect(() => {
    function onClick(event: MouseEvent) {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(candle.children, true);

      for (let i = 0; i < intersects.length; i++) {
        const intersectedObject = intersects[i].object;

        if (intersectedObject.name === "candle_triple") {
          setIsLit((prev) => !prev);
          return;
        }
      }
    }

    window.addEventListener("click", onClick);
  }, [candle.children]);

  useEffect(() => {
    if (lampRef.current) {
      lampRef.current.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          node.material.emissive = hovered
            ? new THREE.Color(0xffff00)
            : new THREE.Color(0x000000);
          node.material.emissiveIntensity = hovered ? 1 : 0;
        }
      });
    }
  }, [hovered]);
  window.addEventListener("pointermove", onPointerMove);

  const particlesRef1 = useRef<THREE.Points>(null!);
  const particlesRef2 = useRef<THREE.Points>(null!);
  const particlesRef3 = useRef<THREE.Points>(null!);
  const smokeRef1 = useRef<THREE.Points>(null!);
  const smokeRef2 = useRef<THREE.Points>(null!);
  const smokeRef3 = useRef<THREE.Points>(null!);
  const mat = new THREE.PointsMaterial({
    color: 0xee9911,
    size: 0.015,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  const smokeMat = new THREE.PointsMaterial({
    color: 0x848884,
    size: 0.015,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  useFrame(() => {
    if (!isLit) {
      return;
    }
    let vertices = [];
    for (let i = 0; i < 10; i++) {
      const x = THREE.MathUtils.randFloatSpread(0.01);
      const y = THREE.MathUtils.randFloatSpread(0.02) + i / 200;
      const z = THREE.MathUtils.randFloatSpread(0.01);

      vertices.push(x, y, z);
    }
    particlesRef1.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    particlesRef1.current.geometry.computeBoundingSphere();
    particlesRef1.current.material = mat;
    particlesRef2.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    particlesRef2.current.material = mat;
    particlesRef2.current.geometry.computeBoundingSphere();
    particlesRef3.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );

    particlesRef3.current.material = mat;
    particlesRef3.current.geometry.computeBoundingSphere();
  });

  let smokeVertices = [];
  for (let i = 0; i < 30; i++) {
    const x = 0;
    const y = Math.random() * 1;
    const z = 0;
    smokeVertices.push(x, y, z);
  }
  if (smokeRef1.current) {
    smokeRef1.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(smokeVertices, 3)
    );
    smokeRef1.current.geometry.computeBoundingSphere();
    smokeRef1.current.material = smokeMat;
  }
  if (smokeRef2.current) {
    smokeRef2.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(smokeVertices, 3)
    );
    smokeRef2.current.geometry.computeBoundingSphere();
    smokeRef2.current.material = smokeMat;
  }
  if (smokeRef3.current) {
    smokeRef3.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(smokeVertices, 3)
    );
    smokeRef3.current.geometry.computeBoundingSphere();
    smokeRef3.current.material = smokeMat;
  }

  useFrame(() => {
    if (!isLit) {
      return;
    }
    for (let i = 0; i < smokeVertices.length; i += 3) {
      if (smokeVertices[i + 1] > 1) {
        smokeVertices[i] = 0;
        smokeVertices[i + 1] = 0;
        smokeVertices[i + 2] = 0;
        continue;
      }

      smokeVertices[i] += THREE.MathUtils.randFloatSpread(0.004);
      smokeVertices[i + 1] += Math.random() * 0.008;
      smokeVertices[i + 2] += THREE.MathUtils.randFloatSpread(0.004);
    }
    smokeRef1.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(smokeVertices, 3)
    );
    smokeRef1.current.material = smokeMat;
    smokeRef2.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(smokeVertices, 3)
    );
    smokeRef2.current.material = smokeMat;
    smokeRef3.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(smokeVertices, 3)
    );
    smokeRef3.current.material = smokeMat;
  });

  return (
    <>
      <primitive
        ref={lampRef}
        scale={[0.3, 0.3, 0.3]}
        position={[2.7, 0.75, 0.35]}
        rotation={[0, -60 * (Math.PI / 180), 0]}
        object={candle}
      />
      {isLit && (
        <>
          <points position={[2.743, 0.99, 0.398]} ref={particlesRef1} />
          <points position={[2.696, 0.93, 0.415]} ref={particlesRef2} />
          <points position={[2.697, 0.95, 0.348]} ref={particlesRef3} />

          <pointLight
            castShadow
            position={[2.7, 1, 0.35]}
            color={0xee9911}
            intensity={0.5}
            decay={1.6}
          />
          <points position={[2.743, 0.99, 0.398]} ref={smokeRef1} />
          <points position={[2.696, 0.93, 0.415]} ref={smokeRef2} />
          <points position={[2.697, 0.95, 0.348]} ref={smokeRef3} />
        </>
      )}
    </>
  );
}
