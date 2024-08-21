import React from "react";
import { useGLTF } from "@react-three/drei";

export default function Pc() {
  const { scene } = useGLTF("/objects/GamingComputer.glb");

  scene.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <primitive
      scale={[0.4, 0.4, 0.4]}
      position={[2.35, 1.61, -0.6]}
      object={scene}
    />
  );
}
