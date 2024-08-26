import React, { useRef } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export default function LaptopScreen() {
  const planeRef = useRef<THREE.Mesh>(null!);

  return (
    <mesh
      ref={planeRef}
      position={[1.42, 0.92, 2.106]}
      rotation={[
        33 * (Math.PI / 180),
        232.9 * (Math.PI / 180),
        27.1 * (Math.PI / 180),
      ]}
    >
      <planeGeometry args={[0.1, 0.1]} />
      <meshBasicMaterial color="white" />

      <Html
        position={[0, 0, 0.01]} // Slightly above the plane to avoid z-fighting
        transform // Allows the HTML element to follow the object's transformations
        distanceFactor={0.1} // Adjust to control size
      >
        <iframe
          src="https://sort-app-lovat.vercel.app/"
          width="2175px" // Adjust the size of the iframe
          height="1054px"
          style={{ border: "none" }}
          title="Embedded Website"
        />
      </Html>
    </mesh>
  );
}
