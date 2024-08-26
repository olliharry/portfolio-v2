import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

interface LaptopProps {
  setControlsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  controlsEnabled: boolean;
}

export default function Laptop({
  setControlsEnabled,
  controlsEnabled,
}: LaptopProps) {
  const { scene: laptop } = useGLTF("/objects/Laptop.glb");
  const [hovered, setHovered] = useState(false);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const laptopRef = useRef<THREE.Mesh>(null!);
  const { scene, camera } = useThree();
  const savedCameraPosition = useRef(new THREE.Vector3());

  laptop.traverse(function (node) {
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
        intersects[i].object.name == "ChamferBox017_1_3" ||
        intersects[i].object.name == "ChamferBox017_1_1" ||
        intersects[i].object.name == "ChamferBox017_1_2" ||
        intersects[i].object.name == "ChamferBox017_1_4"
      ) {
        isHovered = true;
      }
    }
    setHovered(isHovered);
  });
  useEffect(() => {
    if (laptopRef.current) {
      laptopRef.current.traverse((node) => {
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

        if (
          intersects[i].object.name == "ChamferBox017_1_3" ||
          intersects[i].object.name == "ChamferBox017_1_1" ||
          intersects[i].object.name == "ChamferBox017_1_2" ||
          intersects[i].object.name == "ChamferBox017_1_4"
        ) {
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
    if (camera.position.x != 1.21) {
      savedCameraPosition.current.copy(camera.position);
      camera.position.set(1.21, 1, 2.007);
      camera.lookAt(new THREE.Vector3(1.277, 0.97, 2.05));
      camera.updateMatrixWorld();
    } else {
      camera.position.copy(savedCameraPosition.current);
      console.log(controlsEnabled);
    }
    return;
  }, [controlsEnabled]);
  return (
    <primitive
      ref={laptopRef}
      scale={[0.0055, 0.004, 0.005]}
      position={[1.26, 0.77, 2]}
      rotation={[0, 237.1 * (Math.PI / 180), 0]}
      object={laptop}
    />
  );
}
