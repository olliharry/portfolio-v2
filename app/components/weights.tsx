import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Weights() {
  const { scene: weights } = useGLTF("/objects/Dumbbell.glb");

  weights.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <>
      <primitive
        scale={[1, 1, 1]}
        position={[-1.5, 0.115, 2.45]}
        rotation={[0, -30 * (Math.PI / 180), 0]}
        object={weights}
      />
      <primitive
        scale={[1, 1, 1]}
        position={[-2, 0.115, 2.45]}
        rotation={[0, 50 * (Math.PI / 180), 0]}
        object={weights.clone()}
      />
    </>
  );
}
