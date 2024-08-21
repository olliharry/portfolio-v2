import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Monitor() {
  const { scene } = useGLTF("/objects/Monitor.glb");

  scene.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <primitive
      scale={[2, 2, 2]}
      position={[2.5, 1.195, -1.5]}
      rotation={[0, -90 * (Math.PI / 180), 0]}
      object={scene}
    />
  );
}
