import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

export default function DeskLight() {
  const { scene: gltfScene } = useGLTF("/objects/LightDesk.glb");
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const { scene, camera } = useThree();
  const [hovered, setHovered] = useState(false);
  const [isLit, setIsLit] = useState(true);
  const lampRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(new THREE.Group());
  const boxGeometry = new THREE.BoxGeometry(0.001, 0.001, 0.001);
  const boxMesh = new THREE.Mesh(boxGeometry);
  groupRef.current.add(boxMesh);

  gltfScene.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  function onPointerMove(event: MouseEvent) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  useFrame(() => {
    let isHovered = false;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    for (let i = 0; i < intersects.length; i++) {
      if (
        intersects[i].object.name == "Light_Desk_1" ||
        intersects[i].object.name == "Light_Desk_2" ||
        intersects[i].object.name == "Light_Desk_3"
      ) {
        isHovered = true;
      }
    }
    setHovered(isHovered);
  });

  useEffect(() => {
    function onClick(event: MouseEvent) {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(gltfScene.children, true);

      for (let i = 0; i < intersects.length; i++) {
        const intersectedObject = intersects[i].object;

        if (
          intersectedObject.name === "Light_Desk_1" ||
          intersectedObject.name === "Light_Desk_2" ||
          intersectedObject.name === "Light_Desk_3"
        ) {
          setIsLit((prev) => !prev);
          return;
        }
      }
    }

    window.addEventListener("click", onClick);
  }, [camera, gltfScene.children]);
  useEffect(() => {
    if (lampRef.current) {
      lampRef.current.traverse((node) => {
        // Type guard to check if node is a Mesh
        if (node instanceof THREE.Mesh) {
          node.material.emissive = hovered
            ? new THREE.Color(0xffff00)
            : new THREE.Color(0x000000);
          node.material.emissiveIntensity = hovered ? 1 : 0;
        }
      });
    }
  }, [hovered]);
  window.addEventListener("pointermove", onPointerMove);

  return (
    <>
      <primitive position={[2.1, 1.19, -1.7]} object={groupRef.current} />
      <primitive
        ref={lampRef}
        scale={[1, 1, 1]}
        position={[2.5, 1.19, -2.4]}
        rotation={[0, -33 * (Math.PI / 180), 0]}
        object={gltfScene}
      />
      {isLit && (
        <>
          <spotLight
            castShadow
            intensity={5}
            position={[2.4, 1.6, -2.3]}
            angle={-40 * (Math.PI / 180)}
            target={groupRef.current}
            penumbra={1}
            color={0xffffc5}
            shadow-bias={-0.0001}
          />
          <pointLight
            position={[2.3, 1.55, -2.2]}
            intensity={5}
            distance={0.2}
            color={0xffffc5}
          />
        </>
      )}
    </>
  );
}
