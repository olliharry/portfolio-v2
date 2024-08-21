import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Chair() {
  const { scene } = useGLTF("/objects/Chair.glb");

  scene.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <>
      <primitive
        scale={[1.4, 1.6, 1.4]}
        position={[0.8, 0.04, -1.8]}
        rotation={[0, 60 * (Math.PI / 180), 0]}
        object={scene}
      />
    </>
  );
}
