"use client";

import { useEffect, useRef, useState } from "react";
import {
  LOCATIONS,
  STREET_CENTER,
  STREET_CONFIG,
  SEVERITY_COLORS,
  STATS,
  getWorstSeverity,
} from "./mystreet-data";

export default function MyStreetMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [filter, setFilter] = useState("All");
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Load Leaflet
  useEffect(() => {
    if (typeof window === "undefined" || mapInstanceRef.current) return;

    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(link);
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Initialize map
  useEffect(() => {
    if (!leafletLoaded || !mapRef.current || mapInstanceRef.current) return;
    const L = window.L;

    const map = L.map(mapRef.current, {
      center: STREET_CENTER,
      zoom: 19,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap',
      maxZoom: 21,
    }).addTo(map);

    mapInstanceRef.current = map;
    renderMarkers(L, map, "All");
  }, [leafletLoaded]);

  // Re-render on filter change
  useEffect(() => {
    if (!mapInstanceRef.current || !leafletLoaded) return;
    const L = window.L;
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });
    renderMarkers(L, mapInstanceRef.current, filter);
  }, [filter, leafletLoaded]);

  function renderMarkers(L, map, activeFilter) {
    const filtered = activeFilter === "All"
      ? LOCATIONS
      : LOCATIONS.filter((loc) => loc.zone === activeFilter);

    filtered.forEach((location) => {
      const severity = getWorstSeverity(location.issues);
      const color = SEVERITY_COLORS[severity];
      const count = location.issues.length;

      const icon = L.divIcon({
        className: "",
        html: `
          <div style="position:relative;cursor:pointer;transform:translateY(-2px);filter:drop-shadow(0 2px 8px rgba(0,0,0,0.15));">
            <svg width="40" height="48" viewBox="0 0 40 48">
              <path d="M20 0C9 0 0 9 0 20C0 35 20 48 20 48C20 48 40 35 40 20C40 9 31 0 20 0Z"
                fill="${color}" stroke="white" stroke-width="3"/>
              <circle cx="20" cy="20" r="12" fill="white" opacity="0.3"/>
            </svg>
            <div style="
              position:absolute;
              top:8px;
              left:50%;
              transform:translateX(-50%);
              color:white;
              font-weight:900;
              font-size:16px;
              font-family:'Poppins',sans-serif;
              text-shadow:0 1px 3px rgba(0,0,0,0.3);
            ">${count}</div>
          </div>
        `,
        iconSize: [40, 48],
        iconAnchor: [20, 48],
      });

      const marker = L.marker(location.coords, { icon }).addTo(map);
      marker.on("click", () => {
        setSelected(location);
        setPhotoIndex(0);
      });
    });
  }

  const severityEmoji = {
    Critical: "🔴",
    High: "🟠",
    Medium: "🟡",
    Low: "🟢",
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <div style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f8f9fc",
        fontFamily: "'Poppins', sans-serif",
      }}>

        {/* ═══════════════════════════════════════════ */}
        {/* HEADER */}
        {/* ═══════════════════════════════════════════ */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "20px 24px",
          boxShadow: "0 4px 20px rgba(102,126,234,0.15)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            
            {/* Logo & Title */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{
                width: "52px",
                height: "52px",
                background: "white",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}>🗺️</div>
              <div>
                <div style={{ fontSize: "28px", fontWeight: "900", color: "white", letterSpacing: "0.5px" }}>
                  MyStreet
                </div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", fontWeight: "500" }}>
                  {STREET_CONFIG.area}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <div style={{
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "12px 20px",
                border: "2px solid rgba(255,255,255,0.3)",
              }}>
                <div style={{ fontSize: "24px", fontWeight: "900", color: "white" }}>{STATS.total}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.9)", fontWeight: "600", letterSpacing: "0.5px" }}>
                  TOTAL ISSUES
                </div>
              </div>
              <div style={{
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "12px 20px",
                border: "2px solid rgba(255,255,255,0.3)",
              }}>
                <div style={{ fontSize: "24px", fontWeight: "900", color: "#ff4757" }}>{STATS.critical}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.9)", fontWeight: "600", letterSpacing: "0.5px" }}>
                  CRITICAL
                </div>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
            {["All", "Stem", "Left Branch", "Entrance"].map((f) => (
              <button
                key={f}
                onClick={() => { setFilter(f); setSelected(null); }}
                style={{
                  padding: "10px 20px",
                  background: filter === f ? "white" : "rgba(255,255,255,0.2)",
                  color: filter === f ? "#667eea" : "white",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: filter === f ? "0 4px 15px rgba(0,0,0,0.1)" : "none",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* MAP CONTAINER */}
        {/* ═══════════════════════════════════════════ */}
        <div style={{ flex: 1, position: "relative", display: "flex" }}>
          
          {/* Map */}
          <div
            ref={mapRef}
            style={{
              flex: 1,
              height: "100%",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          {!leafletLoaded && (
            <div style={{
              position: "absolute",
              inset: 0,
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
              <div style={{ fontSize: "16px", color: "#667eea", fontWeight: "600" }}>
                Loading Map...
              </div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* SIDE PANEL (Selected Location) */}
          {/* ═══════════════════════════════════════════ */}
          {selected && (
            <div style={{
              width: "400px",
              height: "100%",
              background: "white",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              animation: "slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
              <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

              {/* Panel Header */}
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "24px",
                color: "white",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "700", opacity: 0.8, letterSpacing: "1px" }}>
                      {selected.zone.toUpperCase()}
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: "900", marginTop: "4px" }}>
                      {selected.id}
                    </div>
                    <div style={{ fontSize: "14px", opacity: 0.9, marginTop: "2px", fontWeight: "500" }}>
                      {selected.label}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "rgba(255,255,255,0.2)",
                      border: "none",
                      borderRadius: "50%",
                      color: "white",
                      fontSize: "24px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s",
                    }}
                  >×</button>
                </div>

                <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
                  <div style={{
                    background: "rgba(255,255,255,0.25)",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}>
                    {severityEmoji[getWorstSeverity(selected.issues)]} {getWorstSeverity(selected.issues)}
                  </div>
                  <div style={{
                    background: "rgba(255,255,255,0.25)",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "700",
                  }}>
                    {selected.issues.length} Issues
                  </div>
                </div>
              </div>

              {/* Photo Viewer */}
              <div style={{ padding: "24px", borderBottom: "1px solid #e8ebf3" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#667eea", marginBottom: "12px", letterSpacing: "0.5px" }}>
                  📸 PHOTO {photoIndex + 1} / {selected.issues.length}
                </div>

                <a
                  href={selected.issues[photoIndex].photo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    background: "linear-gradient(135deg, #f5f7fa 0%, #e8ebf3 100%)",
                    borderRadius: "16px",
                    height: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textDecoration: "none",
                    gap: "12px",
                    border: "3px dashed #c5d0e8",
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "#667eea"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "#c5d0e8"}
                >
                  <div style={{ fontSize: "48px" }}>📷</div>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "#667eea" }}>
                    View on Google Drive
                  </div>
                  <div style={{ fontSize: "12px", color: "#8894ac", fontWeight: "500" }}>
                    {selected.issues[photoIndex].id}
                  </div>
                </a>

                {/* Navigation */}
                {selected.issues.length > 1 && (
                  <>
                    <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                      <button
                        onClick={() => setPhotoIndex((i) => Math.max(0, i - 1))}
                        disabled={photoIndex === 0}
                        style={{
                          flex: 1,
                          padding: "14px",
                          background: photoIndex === 0 ? "#f1f3f8" : "white",
                          border: "2px solid #e8ebf3",
                          borderRadius: "12px",
                          fontSize: "15px",
                          fontWeight: "700",
                          color: photoIndex === 0 ? "#c5d0e8" : "#667eea",
                          cursor: photoIndex === 0 ? "not-allowed" : "pointer",
                          transition: "all 0.2s",
                        }}
                      >← Previous</button>
                      <button
                        onClick={() => setPhotoIndex((i) => Math.min(selected.issues.length - 1, i + 1))}
                        disabled={photoIndex === selected.issues.length - 1}
                        style={{
                          flex: 1,
                          padding: "14px",
                          background: photoIndex === selected.issues.length - 1 ? "#f1f3f8" : "white",
                          border: "2px solid #e8ebf3",
                          borderRadius: "12px",
                          fontSize: "15px",
                          fontWeight: "700",
                          color: photoIndex === selected.issues.length - 1 ? "#c5d0e8" : "#667eea",
                          cursor: photoIndex === selected.issues.length - 1 ? "not-allowed" : "pointer",
                          transition: "all 0.2s",
                        }}
                      >Next →</button>
                    </div>

                    {/* Dot indicators */}
                    <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "14px" }}>
                      {selected.issues.map((_, i) => (
                        <div
                          key={i}
                          onClick={() => setPhotoIndex(i)}
                          style={{
                            width: i === photoIndex ? "24px" : "8px",
                            height: "8px",
                            borderRadius: "4px",
                            background: i === photoIndex ? "#667eea" : "#e8ebf3",
                            cursor: "pointer",
                            transition: "all 0.3s",
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Issue List */}
              <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#667eea", marginBottom: "16px", letterSpacing: "0.5px" }}>
                  🔍 ALL ISSUES HERE
                </div>

                {selected.issues.map((issue, i) => (
                  <div
                    key={issue.id}
                    onClick={() => setPhotoIndex(i)}
                    style={{
                      padding: "16px",
                      marginBottom: "10px",
                      background: i === photoIndex ? "linear-gradient(135deg, #f0f3ff 0%, #e8ecff 100%)" : "white",
                      border: `2px solid ${i === photoIndex ? "#667eea" : "#e8ebf3"}`,
                      borderRadius: "16px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      display: "flex",
                      gap: "14px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{
                      fontSize: "28px",
                      flexShrink: 0,
                    }}>
                      {severityEmoji[issue.severity]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "#2c3e50" }}>
                        {issue.type}
                      </div>
                      <div style={{ fontSize: "12px", color: "#8894ac", marginTop: "4px", fontWeight: "500" }}>
                        {issue.id} · {issue.severity} · {issue.date}
                      </div>
                    </div>
                    <a
                      href={issue.photo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "#667eea",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        textDecoration: "none",
                        flexShrink: 0,
                      }}
                    >📸</a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════ */}
        {/* FLOATING HINT (when nothing selected) */}
        {/* ═══════════════════════════════════════════ */}
        {!selected && leafletLoaded && (
          <div style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            padding: "16px 28px",
            borderRadius: "50px",
            boxShadow: "0 8px 32px rgba(102,126,234,0.2)",
            fontSize: "15px",
            fontWeight: "600",
            color: "#667eea",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            animation: "bounce 2s infinite",
          }}>
            <span style={{ fontSize: "20px" }}>👆</span>
            Click any pin to see details
            <style>{`
              @keyframes bounce {
                0%, 100% { transform: translateX(-50%) translateY(0); }
                50% { transform: translateX(-50%) translateY(-8px); }
              }
            `}</style>
          </div>
        )}
      </div>
    </>
  );
}