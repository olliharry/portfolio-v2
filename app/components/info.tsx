import React, { useState } from "react";

export default function Info() {
  const [isOverlayVisible, setOverlayVisible] = useState(true);

  const handleOkClick = () => {
    setOverlayVisible(false);
  };

  return (
    <div>
      {isOverlayVisible && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            zIndex: 1000,
            textAlign: "center",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 className="font-bold">Welcome to My Bedroom.</h2>
            <p>
              Explore the room by rotating the camera with the mouse. Interactable objects become hightlighted when the mouse is hovered over them. Click on them to interact.
            </p>
          </div>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={handleOkClick}
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}
