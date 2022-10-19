import React from "react";

function Index({ onClose, children }) {
  return (
    <div
      style={{
        display: "inline-flex",
        fontSize: 11,
        backgroundColor: "#ccc",
        borderRadius: 12,
        textTransform: "none",
        alignItems: "center",
        padding: 3
      }}
      className="px-2"
    >
      {children}{" "}
      <div
        onClick={onClose}
        style={{ fontSize: 18, marginLeft: 10, cursor: "pointer" }}
      >
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
}

export default Index;
