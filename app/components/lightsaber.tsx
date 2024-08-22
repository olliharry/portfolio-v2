import React from "react";
import { useGLTF } from "@react-three/drei";
import { useEffect, useState, useRef, useCallback } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";

export default function LightSaber() {
  const { scene: saber } = useGLTF("/objects/lightsaber.glb");
  const [length, setLength] = useState(0);
  const saberRef = useRef<THREE.Mesh>(null!);
  const pointer = new THREE.Vector2();
  const [hovered, setHovered] = useState(false);
  const raycaster = new THREE.Raycaster();
  const { scene, camera } = useThree();
  const [isLit, setIsLit] = useState(false);

  //const [lightPos, setLightPos] = useState([new THREE.Vector3(-0.5, 2.5, 2.8)]);

  saber.traverse(function (node) {
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
      const intersects = raycaster.intersectObjects(saber.children, true);

      for (let i = 0; i < intersects.length; i++) {
        if (
          intersects[i].object.name == "mesh646054588_1" ||
          intersects[i].object.name == "mesh646054588_2" ||
          intersects[i].object.name == "mesh646054588_3" ||
          intersects[i].object.name == "mesh646054588_4" ||
          intersects[i].object.name == "mesh646054588"
        ) {
          setIsLit((prev) => !prev);

          return;
        }
      }
    }

    window.addEventListener("click", onClick);
  }, [camera, saber.children]);

  useFrame(() => {
    let isHovered = false;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    for (let i = 0; i < intersects.length; i++) {
      if (
        intersects[i].object.name == "mesh646054588_1" ||
        intersects[i].object.name == "mesh646054588_2" ||
        intersects[i].object.name == "mesh646054588_3" ||
        intersects[i].object.name == "mesh646054588_4" ||
        intersects[i].object.name == "mesh646054588"
      ) {
        isHovered = true;
      }
    }
    setHovered(isHovered);
    console.log(isLit);
    if (isLit) {
      setLength((current) => Math.min(current + 0.03, 1.2));
    } else {
      setLength((current) => Math.max(current - 0.03, 0.001));
    }
  });
  useEffect(() => {
    if (saberRef.current) {
      saberRef.current.traverse((node) => {
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
        scale={[3, 3, 3]}
        position={[-1.3, 2.6, 2.8]}
        rotation={[0, -4 * (Math.PI / 180), 90 * (Math.PI / 180)]}
        object={saber}
        ref={saberRef}
      />
      {length > 0.05 && (
        <>
          <mesh
            position={[-1.51 - length / 2, 2.593, 2.795]}
            rotation={[-90 * (Math.PI / 180), 0, 90 * (Math.PI / 180)]}
          >
            <capsuleGeometry args={[0.012, length]} />
            <meshStandardMaterial
              color={0xff0000}
              emissive={0xff0000}
              emissiveIntensity={20}
            />
          </mesh>
        </>
      )}

      <rectAreaLight
        width={length}
        height={0.1}
        color={0xff0000}
        intensity={10}
        position={[-1.51 - length / 2, 2.593, 2.795]}
        rotation={[-90 * (Math.PI / 180), 0, 0]}
      />
      <rectAreaLight
        width={length}
        height={0.1}
        color={0xff0000}
        intensity={10}
        position={[-1.51 - length / 2, 2.593, 2.795]}
        rotation={[90 * (Math.PI / 180), 0, 0]}
      />
      <rectAreaLight
        width={length}
        height={0.1}
        color={0xff0000}
        intensity={10}
        position={[-1.51 - length / 2, 2.593, 2.795]}
        rotation={[0 * (Math.PI / 180), 0, 0]}
      />
      <rectAreaLight
        width={length}
        height={0.1}
        color={0xff0000}
        intensity={10}
        position={[-1.51 - length / 2, 2.593, 2.795]}
        rotation={[180 * (Math.PI / 180), 0, 0]}
      />
      <mesh position={[-1.06, 2.565, 2.83]} receiveShadow castShadow>
        <boxGeometry args={[0.04, 0.02, 0.17]} />
        <meshStandardMaterial color={0x3e1c00} />
      </mesh>
      <mesh position={[-1.45, 2.563, 2.83]} receiveShadow castShadow>
        <boxGeometry args={[0.04, 0.02, 0.17]} />
        <meshStandardMaterial color={0x3e1c00} />
      </mesh>
    </>
  );
}
