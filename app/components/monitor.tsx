import React, { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

interface MonitorProps {
  setControlsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  controlsEnabled: boolean;
  setShowScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Monitor({
  setControlsEnabled,
  controlsEnabled,
  setShowScreen,
}: MonitorProps) {
  const { scene: monitor } = useGLTF("/objects/Monitor.glb");
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const [hovered, setHovered] = useState(false);
  const monitorRef = useRef<THREE.Mesh>(null!);
  const { scene, camera } = useThree();
  const savedCameraPosition = useRef(new THREE.Vector3());

  scene.traverse(function (node) {
    if (node.type === "Mesh") {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  function onPointerMove(event: MouseEvent) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  useEffect(() => {
    function onClick(event: MouseEvent) {
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(monitor.children, true);

      for (let i = 0; i < intersects.length; i++) {
        const intersectedObject = intersects[i].object;

        if (intersectedObject.name === "Monitor") {
          setControlsEnabled((prev) => !prev);
          setShowScreen((prev) => !prev);

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
    if (camera.position.x != 2.08) {
      savedCameraPosition.current.copy(camera.position);
      camera.position.set(2.08, 1.5, -1.5);

      camera.lookAt(new THREE.Vector3(2.5, 1.495, -1.5));
      camera.updateMatrixWorld();
    } else {
      camera.position.copy(savedCameraPosition.current);
    }

    return;
  }, [controlsEnabled]);

  useFrame(() => {
    let isHovered = false;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object.name == "Monitor") {
        isHovered = true;
      }
    }
    setHovered(isHovered);
  });
  useEffect(() => {
    if (monitorRef.current) {
      monitorRef.current.traverse((node) => {
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
    <primitive
      ref={monitorRef}
      scale={[2, 2, 2]}
      position={[2.5, 1.195, -1.5]}
      rotation={[0, -90 * (Math.PI / 180), 0]}
      object={monitor}
    />
  );
}
