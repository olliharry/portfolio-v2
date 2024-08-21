import React from "react";
import { useGLTF } from "@react-three/drei";
import DeskLight from "./deskLight";

export default function Shelf() {
  const { scene: shelf } = useGLTF("/objects/shelf.glb");
  const { scene: starDestroyer } = useGLTF("/objects/stardestroyer.glb");
  const { scene: xWing } = useGLTF("/objects/xwing.glb");
  const { scene: tiefighter } = useGLTF("/objects/tiefighter.glb");

  shelf.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  starDestroyer.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  xWing.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  tiefighter.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  return (
    <>
      <primitive
        scale={[1.7, 1.3, 1.3]}
        rotation={[0, 90 * (Math.PI / 180), 0]}
        position={[-2, 0.88, 2.43]}
        object={shelf}
      />
      <primitive
        scale={[0.09, 0.09, 0.09]}
        rotation={[0, 70 * (Math.PI / 180), 0]}
        position={[-2, 2.12, 2.45]}
        object={starDestroyer}
      />
      <primitive
        scale={[0.3, 0.3, 0.3]}
        rotation={[0, -125 * (Math.PI / 180), 0]}
        position={[-1.75, 1.658, 2.53]}
        object={xWing}
      />
      <primitive
        scale={[0.023, 0.023, 0.023]}
        rotation={[0, 145 * (Math.PI / 180), 0]}
        position={[-2.35, 1.705, 2.53]}
        object={tiefighter}
      />
    </>
  );
}
