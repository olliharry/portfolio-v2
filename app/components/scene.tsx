"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
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

export default function Scene() {
  return (
    <div className="w-screen h-screen">
      <Canvas shadows style={{ background: "black" }}>
        <OrbitControls />
        <pointLight
          castShadow
          intensity={10}
          position={[0, 3.5, 0]}
          shadow-bias={-0.0001}
        />
        <ambientLight intensity={0.6} />
        <Floor />
        <Walls />
        <Footer />
        <Bed />
        <Desk />
        <Monitor />
        <Pc />
        <Board />
        <Mouse />
        <DeskLight />
        <Chair />
        <Shelf />
        <Bin />
        <LightSaber />
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
