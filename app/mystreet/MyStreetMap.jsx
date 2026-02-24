"use client";

import { useEffect, useRef, useState } from "react";
import {
  LOCATIONS,
  STREET_CENTER,
  STREET_CONFIG,
  SEVERITY_COLORS,
  STATS,
  TRACKING_INFO,
  ABOUT_TEXT,
  getWorstSeverity,
} from "./mystreet-data";

export default function MyStreetMap() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [selected, setSelected] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [filter, setFilter] = useState("All");
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

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
      attribution: "© OpenStreetMap",
      maxZoom: 21,
    }).addTo(map);

    mapInstanceRef.current = map;
    renderMarkers(L, map, "All");
  }, [leafletLoaded]);

  // Re-render markers on filter change
  useEffect(() => {
    if (!mapInstanceRef.current || !leafletLoaded) return;
    const L = window.L;
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) mapInstanceRef.current.removeLayer(layer);
    });
    renderMarkers(L, mapInstanceRef.current, filter);
  }, [filter, leafletLoaded]);

  function renderMarkers(L, map, activeFilter) {
    const filtered =
      activeFilter === "All"
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
              position:absolute;top:8px;left:50%;transform:translateX(-50%);
              color:white;font-weight:900;font-size:16px;
              font-family:'Poppins',sans-serif;text-shadow:0 1px 3px rgba(0,0,0,0.3);
            ">${count}</div>
          </div>`,
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

  // Share helpers
  function shareOnWhatsApp(location, issue, photoIndex) {
    const daysSince = Math.floor(
      (new Date() - new Date(issue.date.split("-").reverse().join("-"))) /
        (1000 * 60 * 60 * 24)
    );
    const text = `🚨 ${issue.type} at ${location.label} (${location.zone}), Yoganand Vihar, Roorkee — not fixed for ${daysSince} days.\n\nSeverity: ${issue.severity}\nIssue ID: ${issue.id}\nPhoto proof: ${issue.photo}\n\nSee all 67 issues: ${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  }

  function shareOnTwitter(location, issue) {
    const daysSince = Math.floor(
      (new Date() - new Date(issue.date.split("-").reverse().join("-"))) /
        (1000 * 60 * 60 * 24)
    );
    const text = `🚨 ${issue.type} at ${location.zone}, Yoganand Vihar Roorkee — unfixed for ${daysSince} days. ${issue.id} | Severity: ${issue.severity}\n\nNagar Nigam Roorkee has also ignored my RTI for 3 months.\n\nProof 👇`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(issue.photo)}`,
      "_blank"
    );
  }

  const severityEmoji = { Critical: "🔴", High: "🟠", Medium: "🟡", Low: "🟢" };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      <div style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f8f9fc",
        fontFamily: "'Poppins', sans-serif",
      }}>

        {/* ══════════════════════════════════════════ */}
        {/* HEADER */}
        {/* ══════════════════════════════════════════ */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "20px 24px",
          boxShadow: "0 4px 20px rgba(102,126,234,0.15)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>

            {/* Logo & Title */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              {/* Back button */}
              <button
                onClick={() => { window.location.href = "/"; }}
                style={{
                  width: "40px", height: "40px",
                  background: "rgba(255,255,255,0.2)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderRadius: "12px", color: "white",
                  fontSize: "20px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, transition: "all 0.2s",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.35)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.2)"}
                title="Back to home"
              >←</button>
              <div style={{
                width: "52px", height: "52px", background: "white",
                borderRadius: "16px", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "28px",
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

            {/* Right side: stats + About button */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{
                background: "rgba(255,255,255,0.25)", backdropFilter: "blur(10px)",
                borderRadius: "16px", padding: "12px 20px",
                border: "2px solid rgba(255,255,255,0.3)",
              }}>
                <div style={{ fontSize: "24px", fontWeight: "900", color: "white" }}>{STATS.total}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.9)", fontWeight: "600", letterSpacing: "0.5px" }}>
                  TOTAL ISSUES
                </div>
              </div>
              <div style={{
                background: "rgba(255,255,255,0.25)", backdropFilter: "blur(10px)",
                borderRadius: "16px", padding: "12px 20px",
                border: "2px solid rgba(255,255,255,0.3)",
              }}>
                <div style={{ fontSize: "24px", fontWeight: "900", color: "#ff4757" }}>{STATS.critical}</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.9)", fontWeight: "600", letterSpacing: "0.5px" }}>
                  CRITICAL
                </div>
              </div>
              {/* About button */}
              <button
                onClick={() => setShowAbout(!showAbout)}
                style={{
                  padding: "12px 20px",
                  background: showAbout ? "white" : "rgba(255,255,255,0.2)",
                  color: showAbout ? "#667eea" : "white",
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderRadius: "16px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                📖 {showAbout ? "Close" : "About"}
              </button>
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
                  border: "none", borderRadius: "30px",
                  fontSize: "14px", fontWeight: "700",
                  cursor: "pointer", transition: "all 0.3s ease",
                  boxShadow: filter === f ? "0 4px 15px rgba(0,0,0,0.1)" : "none",
                }}
              >{f}</button>
            ))}
          </div>

          {/* Last Verified */}
          <div style={{
            marginTop: "12px",
            fontSize: "12px",
            color: "rgba(255,255,255,0.7)",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
            Last verified: {TRACKING_INFO.lastVerified}
          </div>
        </div>

        {/* ══════════════════════════════════════════ */}
        {/* ══════════════════════════════════════════ */}
        {/* ABOUT MODAL OVERLAY */}
        {/* ══════════════════════════════════════════ */}
        {showAbout && (
          <div
            onClick={() => setShowAbout(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              background: "rgba(0,0,0,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "16px",
              animation: "fadeIn 0.2s ease",
            }}
          >
            <style>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes slideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
              .about-modal::-webkit-scrollbar { width: 6px; }
              .about-modal::-webkit-scrollbar-track { background: #f0f3f8; border-radius: 4px; }
              .about-modal::-webkit-scrollbar-thumb { background: #c5d0e8; border-radius: 4px; }
            `}</style>

            {/* Modal box — stop click from closing */}
            <div
              className="about-modal"
              onClick={(e) => e.stopPropagation()}
              style={{
                background: "white",
                borderRadius: "24px",
                width: "100%",
                maxWidth: "600px",
                maxHeight: "88vh",
                overflowY: "auto",
                boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
                animation: "slideUp 0.3s ease",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {/* Modal header */}
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "24px 24px 0 0",
                padding: "24px",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div>
                  <div style={{ fontSize: "22px", fontWeight: "900", color: "white" }}>
                    📋 Why does this website exist?
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginTop: "4px", fontWeight: "500" }}>
                    The story behind MyStreet
                  </div>
                </div>
                <button
                  onClick={() => setShowAbout(false)}
                  style={{
                    width: "36px", height: "36px",
                    background: "rgba(255,255,255,0.2)", border: "none",
                    borderRadius: "50%", color: "white", fontSize: "22px",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >×</button>
              </div>

              {/* Modal body */}
              <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>

                {/* Intro statement */}
                <div style={{
                  background: "linear-gradient(135deg, #f0f3ff, #e8ecff)",
                  border: "2px solid #c5d0e8",
                  borderRadius: "16px", padding: "20px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "36px", marginBottom: "10px" }}>🏛️</div>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "#2c3e50", lineHeight: "1.6" }}>
                    Nagar Nigam Roorkee was asked a simple question about road work.<br />
                    <span style={{ color: "#667eea" }}>They refused to answer for over 3 months.</span>
                  </div>
                </div>

                {/* What is RTI — simple explainer */}
                <div style={{
                  background: "#f8f9fc", borderRadius: "16px", padding: "18px",
                  border: "2px solid #f0f3f8",
                }}>
                  <div style={{ fontSize: "13px", fontWeight: "800", color: "#667eea", letterSpacing: "0.5px", marginBottom: "12px", textTransform: "uppercase" }}>
                    💡 What is an RTI?
                  </div>
                  <p style={{ fontSize: "14px", color: "#5a6c88", lineHeight: "1.7" }}>
                    The <strong style={{ color: "#2c3e50" }}>Right to Information Act, 2005</strong> is an Indian law that lets any citizen ask the government for information. The government <strong style={{ color: "#2c3e50" }}>must reply within 30 days</strong>. If they don't, it is illegal.
                  </p>
                </div>

                {/* Visual timeline */}
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "800", color: "#667eea", letterSpacing: "0.5px", marginBottom: "14px", textTransform: "uppercase" }}>
                    📅 What happened, step by step
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { icon: "📝", date: "Nov 20, 2025", title: "RTI Filed Online", body: "Asked for work orders, budget & contractor details for the brick paver road work on this street.", color: "#e8f5e9", border: "#a5d6a7", textColor: "#2e7d32", badge: "DONE", badgeColor: "#2e7d32", badgeBg: "#c8e6c9" },
                      { icon: "⏰", date: "Dec 20, 2025", title: "30-Day Deadline Missed", body: "The government officer (PIO) did not reply. By law, this is a violation of the RTI Act.", color: "#fff5f5", border: "#ffcdd2", textColor: "#c62828", badge: "VIOLATION", badgeColor: "#c62828", badgeBg: "#ffcdd2" },
                      { icon: "📵", date: "January 2026", title: "12 Calls — All Ignored", body: "The PIO's office was called 12 times. The officer cut the call and told me to visit in person — which is not allowed under the digital RTI process.", color: "#fff9e6", border: "#ffe0a3", textColor: "#e65100", badge: "MISCONDUCT", badgeColor: "#e65100", badgeBg: "#ffe0b2" },
                      { icon: "🤥", date: "Jan 22, 2026", title: "First Appeal Filed + Lie Told", body: "Filed a formal First Appeal. An official then claimed \"no road work was done here last year.\" Every photo on this map proves that is false.", color: "#fff5f5", border: "#ffcdd2", textColor: "#c62828", badge: "ALSO IGNORED", badgeColor: "#c62828", badgeBg: "#ffcdd2" },
                      { icon: "💻", date: "Feb 8, 2026", title: "This Website Built", body: "Since Nagar Nigam refuses to use a legal government portal, I built my own. The evidence is now public.", color: "#f0f3ff", border: "#c5d0e8", textColor: "#667eea", badge: "LIVE", badgeColor: "#667eea", badgeBg: "#e8ecff" },
                      { icon: "⚖️", date: "In Progress", title: "Escalating to State Commission", body: "This matter is being taken to the Uttarakhand State Information Commission (Dehradun) for a penalty under Section 20 of the RTI Act.", color: "#f3e5f5", border: "#ce93d8", textColor: "#7b1fa2", badge: "NEXT STEP", badgeColor: "#7b1fa2", badgeBg: "#e1bee7" },
                    ].map((step, i) => (
                      <div key={i} style={{
                        display: "flex", gap: "14px", alignItems: "flex-start",
                        background: step.color, border: `2px solid ${step.border}`,
                        borderRadius: "14px", padding: "14px 16px",
                      }}>
                        <div style={{ fontSize: "28px", flexShrink: 0, marginTop: "2px" }}>{step.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                            <span style={{ fontSize: "11px", fontWeight: "700", color: step.textColor, fontFamily: "monospace" }}>{step.date}</span>
                            <span style={{ fontSize: "10px", fontWeight: "800", color: step.badgeColor, background: step.badgeBg, padding: "2px 8px", borderRadius: "20px" }}>{step.badge}</span>
                          </div>
                          <div style={{ fontSize: "14px", fontWeight: "700", color: "#2c3e50", marginBottom: "4px" }}>{step.title}</div>
                          <div style={{ fontSize: "13px", color: "#5a6c88", lineHeight: "1.6" }}>{step.body}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Closing line */}
                <div style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "16px", padding: "20px", textAlign: "center",
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>⚖️</div>
                  <div style={{ fontSize: "16px", fontWeight: "900", color: "white", lineHeight: "1.4" }}>
                    Public money requires public answers.
                  </div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginTop: "6px", fontWeight: "500" }}>
                    Under Section 7(6) of the RTI Act, this information must now be provided free of cost.
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setShowAbout(false)}
                  style={{
                    width: "100%", padding: "14px",
                    background: "#f0f3ff", border: "2px solid #c5d0e8",
                    borderRadius: "12px", fontSize: "15px",
                    fontWeight: "700", color: "#667eea", cursor: "pointer",
                  }}
                >
                  Close ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════ */}
        {/* SUMMARY DASHBOARD */}
        {/* ══════════════════════════════════════════ */}
        <div style={{ background: "white", padding: "24px", borderBottom: "3px solid #f0f3f8" }}>
          <div style={{
            maxWidth: "1200px", margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px",
          }}>
            {/* Urgent Issues */}
            <div style={{
              background: "linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%)",
              border: "2px solid #ffcdd2", borderRadius: "16px", padding: "20px",
            }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#d32f2f", letterSpacing: "0.5px", marginBottom: "8px" }}>
                🚨 URGENT ISSUES
              </div>
              <div style={{ fontSize: "32px", fontWeight: "900", color: "#d32f2f" }}>
                {STATS.critical + STATS.high}
              </div>
              <div style={{ fontSize: "13px", color: "#e57373", fontWeight: "600", marginTop: "4px" }}>
                {STATS.critical} Critical · {STATS.high} High
              </div>
            </div>

            {/* Private Repairs */}
            <div style={{
              background: "linear-gradient(135deg, #fff9e6 0%, #fff3cd 100%)",
              border: "2px solid #ffe0a3", borderRadius: "16px", padding: "20px",
            }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#f57c00", letterSpacing: "0.5px", marginBottom: "8px" }}>
                🏠 PRIVATE REPAIRS
              </div>
              <div style={{ fontSize: "32px", fontWeight: "900", color: "#f57c00" }}>
                {TRACKING_INFO.privateRepairHouses}/{TRACKING_INFO.totalHouses}
              </div>
              <div style={{ fontSize: "13px", color: "#ffb74d", fontWeight: "600", marginTop: "4px" }}>
                Households paid for private fixes
              </div>
            </div>

            {/* Oldest Issue */}
            <div style={{
              background: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
              border: "2px solid #ce93d8", borderRadius: "16px", padding: "20px",
            }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#8e24aa", letterSpacing: "0.5px", marginBottom: "8px" }}>
                ⏰ OLDEST ISSUE
              </div>
              <div style={{ fontSize: "32px", fontWeight: "900", color: "#8e24aa" }}>
                {(() => {
                  const oldest = new Date(TRACKING_INFO.oldestIssueDate.split("-").reverse().join("-"));
                  const days = Math.floor((new Date() - oldest) / (1000 * 60 * 60 * 24));
                  return days < 30 ? `${days}d` : `${Math.floor(days / 30)}mo`;
                })()}
              </div>
              <div style={{ fontSize: "13px", color: "#ba68c8", fontWeight: "600", marginTop: "4px" }}>
                Since {TRACKING_INFO.oldestIssueDate}
              </div>
            </div>

            {/* Last Updated */}
            <div style={{
              background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
              border: "2px solid #a5d6a7", borderRadius: "16px", padding: "20px",
            }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#2e7d32", letterSpacing: "0.5px", marginBottom: "8px" }}>
                📅 LAST UPDATED
              </div>
              <div style={{ fontSize: "26px", fontWeight: "900", color: "#2e7d32", lineHeight: "1.2" }}>
                {TRACKING_INFO.lastUpdated}
              </div>
              <div style={{ fontSize: "13px", color: "#66bb6a", fontWeight: "600", marginTop: "4px" }}>
                {TRACKING_INFO.fixedCount} fixed · {TRACKING_INFO.notFixedCount} pending
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════ */}
        {/* MAP CONTAINER */}
        {/* ══════════════════════════════════════════ */}
        <div style={{ flex: 1, position: "relative", display: "flex" }}>

          <div ref={mapRef} style={{ flex: 1, height: "100%" }} />

          {!leafletLoaded && (
            <div style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", background: "#f8f9fc", gap: "16px",
            }}>
              <div style={{
                width: "60px", height: "60px",
                border: "6px solid #e0e4f0", borderTopColor: "#667eea",
                borderRadius: "50%", animation: "spin 1s linear infinite",
              }} />
              <div style={{ fontSize: "16px", color: "#667eea", fontWeight: "600" }}>Loading Map...</div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* ══════════════════════════════════════════ */}
          {/* SIDE PANEL */}
          {/* ══════════════════════════════════════════ */}
          {selected && (
            <div style={{
              width: "420px", height: "100%", background: "white",
              boxShadow: "-4px 0 24px rgba(0,0,0,0.08)",
              display: "flex", flexDirection: "column",
              animation: "slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}>
              <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>

              {/* Panel Header */}
              <div style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "24px", color: "white",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "700", opacity: 0.8, letterSpacing: "1px" }}>
                      {selected.zone.toUpperCase()}
                    </div>
                    <div style={{ fontSize: "24px", fontWeight: "900", marginTop: "4px" }}>{selected.id}</div>
                    <div style={{ fontSize: "14px", opacity: 0.9, marginTop: "2px", fontWeight: "500" }}>{selected.label}</div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    style={{
                      width: "36px", height: "36px",
                      background: "rgba(255,255,255,0.2)", border: "none",
                      borderRadius: "50%", color: "white", fontSize: "24px",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >×</button>
                </div>
                <div style={{ display: "flex", gap: "8px", marginTop: "16px", flexWrap: "wrap" }}>
                  <div style={{
                    background: "rgba(255,255,255,0.25)", padding: "8px 16px",
                    borderRadius: "20px", fontSize: "13px", fontWeight: "700",
                    display: "flex", alignItems: "center", gap: "6px",
                  }}>
                    {severityEmoji[getWorstSeverity(selected.issues)]} {getWorstSeverity(selected.issues)}
                  </div>
                  <div style={{
                    background: "rgba(255,255,255,0.25)", padding: "8px 16px",
                    borderRadius: "20px", fontSize: "13px", fontWeight: "700",
                  }}>
                    {selected.issues.length} Issues
                  </div>
                </div>
              </div>

              {/* Photo Viewer */}
              <div style={{ padding: "20px", borderBottom: "1px solid #e8ebf3" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#667eea", marginBottom: "12px", letterSpacing: "0.5px" }}>
                  📸 PHOTO {photoIndex + 1} / {selected.issues.length}
                </div>

                <a
                  href={selected.issues[photoIndex].photo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", background: "linear-gradient(135deg, #f5f7fa 0%, #e8ebf3 100%)",
                    borderRadius: "16px", height: "180px", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", textDecoration: "none",
                    gap: "10px", border: "3px dashed #c5d0e8", transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = "#667eea"}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = "#c5d0e8"}
                >
                  <div style={{ fontSize: "40px" }}>📷</div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#667eea" }}>View on Google Drive</div>
                  <div style={{ fontSize: "12px", color: "#8894ac", fontWeight: "500" }}>
                    {selected.issues[photoIndex].id}
                  </div>
                </a>

                {/* Share buttons for current photo */}
                <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                  <button
                    onClick={() => shareOnWhatsApp(selected, selected.issues[photoIndex], photoIndex)}
                    style={{
                      flex: 1, padding: "10px", background: "#25D366", border: "none",
                      borderRadius: "12px", color: "white", fontSize: "13px",
                      fontWeight: "700", cursor: "pointer", display: "flex",
                      alignItems: "center", justifyContent: "center", gap: "6px",
                    }}
                  >
                    <span>📲</span> WhatsApp
                  </button>
                  <button
                    onClick={() => shareOnTwitter(selected, selected.issues[photoIndex])}
                    style={{
                      flex: 1, padding: "10px", background: "#000", border: "none",
                      borderRadius: "12px", color: "white", fontSize: "13px",
                      fontWeight: "700", cursor: "pointer", display: "flex",
                      alignItems: "center", justifyContent: "center", gap: "6px",
                    }}
                  >
                    <span>𝕏</span> Tweet
                  </button>
                </div>

                {/* Navigation */}
                {selected.issues.length > 1 && (
                  <>
                    <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
                      <button
                        onClick={() => setPhotoIndex((i) => Math.max(0, i - 1))}
                        disabled={photoIndex === 0}
                        style={{
                          flex: 1, padding: "12px",
                          background: photoIndex === 0 ? "#f1f3f8" : "white",
                          border: "2px solid #e8ebf3", borderRadius: "12px",
                          fontSize: "14px", fontWeight: "700",
                          color: photoIndex === 0 ? "#c5d0e8" : "#667eea",
                          cursor: photoIndex === 0 ? "not-allowed" : "pointer",
                        }}
                      >← Previous</button>
                      <button
                        onClick={() => setPhotoIndex((i) => Math.min(selected.issues.length - 1, i + 1))}
                        disabled={photoIndex === selected.issues.length - 1}
                        style={{
                          flex: 1, padding: "12px",
                          background: photoIndex === selected.issues.length - 1 ? "#f1f3f8" : "white",
                          border: "2px solid #e8ebf3", borderRadius: "12px",
                          fontSize: "14px", fontWeight: "700",
                          color: photoIndex === selected.issues.length - 1 ? "#c5d0e8" : "#667eea",
                          cursor: photoIndex === selected.issues.length - 1 ? "not-allowed" : "pointer",
                        }}
                      >Next →</button>
                    </div>
                    <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "12px" }}>
                      {selected.issues.map((_, i) => (
                        <div
                          key={i}
                          onClick={() => setPhotoIndex(i)}
                          style={{
                            width: i === photoIndex ? "24px" : "8px", height: "8px",
                            borderRadius: "4px",
                            background: i === photoIndex ? "#667eea" : "#e8ebf3",
                            cursor: "pointer", transition: "all 0.3s",
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Issue List */}
              <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#667eea", marginBottom: "14px", letterSpacing: "0.5px" }}>
                  🔍 ALL ISSUES HERE
                </div>

                {selected.issues.map((issue, i) => (
                  <div
                    key={issue.id}
                    onClick={() => setPhotoIndex(i)}
                    style={{
                      padding: "14px", marginBottom: "10px",
                      background: i === photoIndex ? "linear-gradient(135deg, #f0f3ff 0%, #e8ecff 100%)" : "white",
                      border: `2px solid ${i === photoIndex ? "#667eea" : "#e8ebf3"}`,
                      borderRadius: "14px", cursor: "pointer", transition: "all 0.2s",
                      display: "flex", gap: "12px", alignItems: "flex-start",
                    }}
                  >
                    <div style={{ fontSize: "26px", flexShrink: 0 }}>{severityEmoji[issue.severity]}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#2c3e50" }}>{issue.type}</div>
                      <div style={{ fontSize: "12px", color: "#8894ac", marginTop: "3px", fontWeight: "500" }}>
                        {issue.id} · {issue.severity}
                      </div>
                      <div style={{
                        fontSize: "12px", color: "#5a6c88", marginTop: "6px",
                        padding: "6px 10px",
                        background: i === photoIndex ? "rgba(102,126,234,0.08)" : "#f8f9fc",
                        borderRadius: "8px", lineHeight: "1.5",
                      }}>
                        <div style={{ fontWeight: "600", marginBottom: "4px" }}>📅 {issue.date}</div>
                        <div style={{
                          display: "inline-block", padding: "2px 8px",
                          background: issue.status === "Fixed" ? "#c8e6c9" : "#ffcdd2",
                          color: issue.status === "Fixed" ? "#2e7d32" : "#c62828",
                          borderRadius: "12px", fontSize: "11px", fontWeight: "700",
                        }}>
                          {issue.status === "Fixed" ? "✓ Fixed" : "⏳ Not Fixed"}
                        </div>
                      </div>
                      {/* Per-issue share buttons */}
                      <div style={{ display: "flex", gap: "6px", marginTop: "8px" }} onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => shareOnWhatsApp(selected, issue, i)}
                          style={{
                            padding: "5px 10px", background: "#25D366", border: "none",
                            borderRadius: "8px", color: "white", fontSize: "11px",
                            fontWeight: "700", cursor: "pointer",
                          }}
                        >📲 Share</button>
                        <button
                          onClick={() => shareOnTwitter(selected, issue)}
                          style={{
                            padding: "5px 10px", background: "#000", border: "none",
                            borderRadius: "8px", color: "white", fontSize: "11px",
                            fontWeight: "700", cursor: "pointer",
                          }}
                        >𝕏 Tweet</button>
                      </div>
                    </div>
                    <a
                      href={issue.photo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: "38px", height: "38px", background: "#667eea",
                        borderRadius: "10px", display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: "18px",
                        textDecoration: "none", flexShrink: 0,
                      }}
                    >📸</a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FLOATING HINT */}
        {!selected && leafletLoaded && (
          <div style={{
            position: "absolute", bottom: "32px", left: "50%",
            transform: "translateX(-50%)",
            background: "white", padding: "16px 28px", borderRadius: "50px",
            boxShadow: "0 8px 32px rgba(102,126,234,0.2)",
            fontSize: "15px", fontWeight: "600", color: "#667eea",
            display: "flex", alignItems: "center", gap: "10px",
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