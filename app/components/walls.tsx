import React, { useMemo, useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Walls() {
  const [colorMap, normalMap, roughnessMap] = useTexture([
    "/textures/paintedWood/Color.jpg",
    "/textures/paintedWood/NormalGL.jpg",
    "/textures/paintedWood/Roughness.jpg",
  ]);

  const mat = new THREE.MeshStandardMaterial({
    map: colorMap,
    normalMap: normalMap,
    roughnessMap: roughnessMap,
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
      <mesh
        receiveShadow
        material={mat}
        rotation={[
          -180 * (Math.PI / 180),
          0 * (Math.PI / 180),
          90 * (Math.PI / 180),
        ]}
        position={[2.955, 1.795, 0]}
      >
        <boxGeometry args={[3.5, 0.09, 6]} ref={geoRef} />
      </mesh>
      <mesh
        receiveShadow
        material={mat}
        rotation={[
          180 * (Math.PI / 180),
          90 * (Math.PI / 180),
          90 * (Math.PI / 180),
        ]}
        position={[0, 1.795, 2.95]}
      >
        <boxGeometry args={[3.5, 0.09, 6]} ref={geoRef} />
      </mesh>
    </>
  );
}
