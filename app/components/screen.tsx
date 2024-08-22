import React from "react";

const Screen = ({ width = "70%", height = "63%", zIndex = 1000 }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -66%)", // Center the element
        width: width,
        height: height,
        zIndex: zIndex,
      }}
    >
      <iframe
        src={"https://three-game-app.vercel.app/"}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        title="Embedded Website"
      />
    </div>
  );
};

export default Screen;
