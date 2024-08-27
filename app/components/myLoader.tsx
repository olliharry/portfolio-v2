import React from "react";
import { Html, useProgress } from "@react-three/drei";

function MyLoader() {
  const { progress, active } = useProgress();

  return (
    <Html center>
      <div style={{ color: "white", textAlign: "center" }}>
        {active && <p>Loading... {Math.round(progress)}%</p>}
      </div>
    </Html>
  );
}

export default MyLoader;
