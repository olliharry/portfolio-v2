import React from "react";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Bed() {
  const { scene } = useGLTF("/objects/bed.glb");

  scene.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <primitive
      scale={[0.9, 0.9, 0.9]}
      position={[1.08, 0.04, 1.96]}
      rotation={[0, -90 * (Math.PI / 180), 0]}

      object={scene}
    />
  );
}
