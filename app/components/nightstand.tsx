import React from "react";
import { useGLTF } from "@react-three/drei";

export default function NightStand() {
  const { scene: nightStand } = useGLTF("/objects/nightstand.glb");

  nightStand.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <>
      <primitive
        scale={[1.5, 1.5, 1.5]}
        position={[2.5, 0, 0.6]}
        rotation={[0, -90 * (Math.PI / 180), 0]}
        object={nightStand}
      />
    </>
  );
}
