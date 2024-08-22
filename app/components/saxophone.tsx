import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Saxophone() {
  const { scene } = useGLTF("/objects/Saxophone.glb");

  scene.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <>
      <primitive
        scale={[0.05, 0.05, 0.05]}
        position={[-2.98, 0.04, 2.5]}
        rotation={[0, 0 * (Math.PI / 180), -10 * (Math.PI / 180)]}
        object={scene}
      />
    </>
  );
}
