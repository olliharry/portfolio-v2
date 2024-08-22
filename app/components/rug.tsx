import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Rug() {
  const { scene: basket } = useGLTF("/objects/Rug.glb");

  basket.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <>
      <primitive
        scale={[0.8, 0.8, 0.8]}
        position={[-1.5, 0.05, -1]}
        rotation={[0, 5 * (Math.PI / 180), 0]}
        object={basket}
      />
    </>
  );
}
