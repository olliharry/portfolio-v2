"use client";
import { Loader, OrbitControls, useProgress } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import React, { Suspense } from "react";
import Floor from "./floor";
import Walls from "./walls";
import Footer from "./footer";
import Bed from "./bed";
import Desk from "./desk";
import Monitor from "./monitor";
import Pc from "./pc";
import Board from "./keyboard";
import Mouse from "./mouse";
import DeskLight from "./deskLight";
import Chair from "./chair";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import Shelf from "./shelf";
import Bin from "./bin";
import LightSaber from "./lightsaber";
import Degree from "./degree";
import { useState, useEffect } from "react";
import * as THREE from "three";
import Screen from "./screen";
import Saxophone from "./saxophone";
import Rug from "./rug";
import Weights from "./weights";
import Rowing from "./rowing";
import Candle from "./candle";
import NightStand from "./nightstand";
import Laptop from "./laptop";
import LaptopScreen from "./laptopScreen";
import MyLoader from "./myLoader";

export default function Scene() {
  const [rowingControlsEnabled, setRowingControlsEnabled] = useState(true);
  const [screenControlsEnabled, setScreenControlsEnabled] = useState(true);
  const [degreeControlsEnabled, setDegreeControlsEnabled] = useState(true);
  const [laptopControlsEnabled, setLaptopControlsEnabled] = useState(true);
  const [showScreen, setShowScreen] = useState(false);
  const [target, setTarget] = useState(new THREE.Vector3(0, 0, 0));

  return (
    <div className="w-screen h-screen">
      <Canvas shadows style={{ background: "black" }}>
        <CameraSetup />
        <OrbitControls
          target={target}
          enabled={
            rowingControlsEnabled &&
            screenControlsEnabled &&
            degreeControlsEnabled &&
            laptopControlsEnabled
          }
        />
        <pointLight
          castShadow
          intensity={22}
          position={[0, 3.5, 0]}
          shadow-bias={-0.0001}
        />
        <ambientLight intensity={0.2} />
        <Suspense fallback={<MyLoader />}>
          <Floor />
          <Walls />
          <Footer />
          <Bed />
          <Desk />
          <Candle />
          <NightStand />
          <Monitor
            setControlsEnabled={setScreenControlsEnabled}
            controlsEnabled={screenControlsEnabled}
            setShowScreen={setShowScreen}
          />
          <Pc />
          <Board />
          <Mouse />
          <DeskLight />
          <Chair />
          <Shelf />
          <Bin />
          <Laptop
            setControlsEnabled={setLaptopControlsEnabled}
            controlsEnabled={laptopControlsEnabled}
          />
          <LightSaber />
          <Saxophone />
          <Rug />
          <Weights />
          {showScreen && (
            <>
              <Screen />
            </>
          )}
          {!laptopControlsEnabled && <LaptopScreen />}

          <Rowing
            setControlsEnabled={setRowingControlsEnabled}
            controlsEnabled={rowingControlsEnabled}
          />
          <Degree
            setControlsEnabled={setDegreeControlsEnabled}
            controlsEnabled={degreeControlsEnabled}
          />
        </Suspense>
        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            intensity={0.15} // Adjust the intensity of the bloom effect
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(-3, 4, -5);

    camera.lookAt(new THREE.Vector3(0, 0, 0));
  }, [camera]);

  return null;
}
