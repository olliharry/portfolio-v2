import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

interface RowingProps {
  setControlsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  controlsEnabled: boolean;
}

export default function Rowing({
  setControlsEnabled,
  controlsEnabled,
}: RowingProps) {
  const { scene: rowingFrame } = useGLTF("/objects/frame.glb");
  const [colorMap] = useTexture(["/textures/rowingpic.jpg"]);
  const [hovered, setHovered] = useState(false);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const rowingRef = useRef<THREE.Mesh>(null!);
  const { scene, camera } = useThree();

  const savedCameraPosition = useRef(new THREE.Vector3());

  rowingFrame.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });
  const mat = new THREE.MeshStandardMaterial({
    map: colorMap,
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
      if (intersects[i].object.name == "rowing") {
        isHovered = true;
      }
    }
    setHovered(isHovered);
  });
  useEffect(() => {
    if (rowingRef.current) {
      rowingRef.current.traverse((node) => {
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

  useEffect(() => {
    function onClick(event: MouseEvent) {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      for (let i = 0; i < intersects.length; i++) {
        const intersectedObject = intersects[i].object;

        if (intersectedObject.name == "rowing") {
          setControlsEnabled((prev) => !prev);
          return;
        }
      }
    }
    window.addEventListener("click", onClick);
  }, []);

  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (camera.position.x != 2.4) {
      savedCameraPosition.current.copy(camera.position);
      camera.position.set(2.4, 2.5, 0.5);
      camera.lookAt(new THREE.Vector3(2.88, 2.5, 0.5));
      camera.updateMatrixWorld();
    } else {
      camera.position.copy(savedCameraPosition.current);
      console.log(controlsEnabled);
    }
    return;
  }, [controlsEnabled]);

  return (
    <>
      <primitive
        scale={[2.07, 0.7, 1.4]}
        position={[2.9, 2.5, 0.5]}
        rotation={[0, 90 * (Math.PI / 180), 0]}
        object={rowingFrame.clone()}
      />
      <mesh
        ref={rowingRef}
        name="rowing"
        position={[2.88, 2.5, 0.5]}
        rotation={[-90 * (Math.PI / 180), -90 * (Math.PI / 180), 0]}
        material={mat}
      >
        <planeGeometry args={[0.6, 1]} />
      </mesh>
    </>
  );
}
