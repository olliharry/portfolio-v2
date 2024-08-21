import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Bin() {
  const { scene: basket } = useGLTF("/objects/bucket.glb");

  basket.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <>
      <primitive
        scale={[0.08, 0.08, 0.08]}
        position={[-0.95, 0.18, 2.47]}
        rotation={[0, 0 * (Math.PI / 180), 0]}
        object={basket}
      />
    </>
  );
}
