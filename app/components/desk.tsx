import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Desk() {
  const { scene } = useGLTF("/objects/Desk.glb");

  scene.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <primitive
      scale={[1.3, 1.3, 1.3]}
      position={[2.26, 0, -1.5]}
      rotation={[0, -90 * (Math.PI / 180), 0]}
      object={scene}
    />
  );
}
