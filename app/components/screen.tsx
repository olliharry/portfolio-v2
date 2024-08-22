import React, { useRef } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export default function Screen() {
  const planeRef = useRef<THREE.Mesh>(null!);

  return (
    <mesh
      ref={planeRef}
      position={[2.5, 1.554, -1.5]}
      rotation={[0, -90 * (Math.PI / 180), 0]}
    >
      <planeGeometry args={[0.1, 0.1]} />
      <meshBasicMaterial color="white" />

      <Html
        position={[0, 0, 0.01]} // Slightly above the plane to avoid z-fighting
        transform // Allows the HTML element to follow the object's transformations
        distanceFactor={0.145} // Adjust to control size
      >
        <iframe
          src="https://three-game-app.vercel.app/"
          width="2400px" // Adjust the size of the iframe
          height="1080px"
          style={{ border: "none" }}
          title="Embedded Website"
        />
      </Html>
    </mesh>
  );
}
