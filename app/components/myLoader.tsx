import React from "react";
import { Html, useProgress } from "@react-three/drei";

function MyLoader() {
  const { progress, active } = useProgress();

  return (
    <Html center>
      <div style={{ color: "white", textAlign: "center" }}>
        {active && <p>Loading...</p>}
      </div>
    </Html>
  );
}

export default MyLoader;
