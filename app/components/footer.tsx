import React, { useMemo, useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Footer() {
  const [colorMap, normalMap, roughnessMap] = useTexture([
    "/textures/plastic/Color.jpg",
    "/textures/plastic/NormalGL.jpg",
    "/textures/plastic/Roughness.jpg",
  ]);

  const topMat = new THREE.MeshStandardMaterial({
    map: colorMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
  });
  const c = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x4d3309),
  });
  const geoRef = useRef<THREE.BoxGeometry | null>(null);
  useEffect(() => {
    const adjustUVMapping = (geometry: THREE.BoxGeometry) => {
      const uvArray = new Float32Array([
        // Define UVs for each face of the box
        // Front face
        0, 0.03, 1, 0.03, 0, 0, 1, 0,

        // Back face
        0, 0.03, 1, 0.03, 0, 0, 1, 0,

        // Top face (custom UVs for 2x2 repeat)
        0, 0, 0, 1, 1, 0, 1, 1,

        // Bottom face
        0, 0, 0, 1, 1, 0, 1, 1,

        // Left face
        0, 0, 0, 1, 0.02, 0, 0.02, 1,

        // Right face
        0, 0, 0, 1, 0.02, 0, 0.02, 1,
      ]);
      geometry.setAttribute("uv", new THREE.BufferAttribute(uvArray, 2));
      geometry.attributes.uv.needsUpdate = true;
    };

    if (geoRef.current) {
      adjustUVMapping(geoRef.current);
    }
  }, []);

  return (
    <>
      <mesh receiveShadow material={topMat} position={[2.885, 0.12, 0]}>
        <boxGeometry args={[0.05, 0.15, 6]} ref={geoRef} />
      </mesh>
      <mesh
        receiveShadow
        material={topMat}
        position={[0, 0.12, 2.885]}
        rotation={[0, -90 * (Math.PI / 180), 0]}
      >
        <boxGeometry args={[0.05, 0.15, 6]} ref={geoRef} />
      </mesh>
    </>
  );
}
