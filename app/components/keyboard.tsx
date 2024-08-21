import React from "react";
import { useGLTF } from "@react-three/drei";
import DeskLight from "./deskLight";

export default function Board() {
  const { scene } = useGLTF("/objects/Keyboard.glb");

  scene.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <>
      <primitive
        scale={[0.0015, 0.0015, 0.0015]}
        rotation={[0, -100 * (Math.PI / 180), 0]}
        position={[2.1, 1.19, -1.7]}
        object={scene}
      />
      
    </>
  );
}
