import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Mouse() {
  const { scene } = useGLTF("/objects/ComputerMouse.glb");

  scene.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <primitive
      scale={[0.04, 0.04, 0.04]}
      position={[2.1, 1.19, -1.1]}
      rotation={[0, 110 * (Math.PI / 180), 0]}
      object={scene}
    />
  );
}
