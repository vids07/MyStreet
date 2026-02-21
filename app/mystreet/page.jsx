"use client";

import dynamic from "next/dynamic";

const MyStreetMap = dynamic(() => import("./MyStreetMap"), {
  ssr: false,
  loading: () => (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#f8f9fc",
      gap: "16px",
    }}>
      <div style={{
        width: "60px",
        height: "60px",
        border: "6px solid #e0e4f0",
        borderTopColor: "#667eea",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        fontSize: "18px",
        color: "#667eea",
        fontWeight: "600",
        fontFamily: "'Poppins', sans-serif",
      }}>
        Loading MyStreet...
      </div>
    </div>
  ),
});

export default function MyStreetPage() {
  return <MyStreetMap />;
}