import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

interface DegreeProps {
  setControlsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  controlsEnabled: boolean;
}

export default function Degree({
  setControlsEnabled,
  controlsEnabled,
}: DegreeProps) {
  const { scene: frame } = useGLTF("/objects/frame.glb");
  const [colorMap] = useTexture(["/textures/degree.jpg"]);
  const [hovered, setHovered] = useState(false);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const degreeRef = useRef<THREE.Mesh>(null!);
  const { scene, camera } = useThree();
  //const [isFocused, setIsFocused] = useState(false);
  const savedCameraPosition = useRef(new THREE.Vector3());

  const mat = new THREE.MeshStandardMaterial({
    map: colorMap,
  });

  frame.traverse(function (node) {
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
      if (intersects[i].object.name == "degree") {
        isHovered = true;
      }
    }
    setHovered(isHovered);
  });

  useEffect(() => {
    function onClick(event: MouseEvent) {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      for (let i = 0; i < intersects.length; i++) {
        const intersectedObject = intersects[i].object;

        if (intersectedObject.name == "degree") {
          setControlsEnabled((prev) => !prev);

          if (camera.position.x != 2.3) {
            savedCameraPosition.current.copy(camera.position);
            camera.position.set(2.3, 2.5, -1.5);

            camera.lookAt(new THREE.Vector3(2.885, 2.495, -1.505));

            camera.updateMatrixWorld();
          } else {
            camera.position.copy(savedCameraPosition.current);
          }

          return;
        }
      }
    }

    window.addEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (degreeRef.current) {
      degreeRef.current.traverse((node) => {
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
      <primitive
        scale={[1.1, 0.8, 1.1]}
        position={[2.9, 2.5, -1.5]}
        rotation={[0, 90 * (Math.PI / 180), 0]}
        object={frame}
      />
      <mesh
        name="degree"
        ref={degreeRef}
        position={[2.885, 2.495, -1.505]}
        rotation={[0, -90 * (Math.PI / 180), 0]}
        material={mat}
      >
        <planeGeometry args={[0.531, 0.666]} />
      </mesh>
    </>
  );
}
