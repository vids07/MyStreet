"use client";

import { useState, useEffect, useRef } from "react";
import { STATS, TRACKING_INFO, STREET_CONFIG } from "./mystreet-data";

// ── Animated counter hook ──────────────────────────
function useCountUp(target, duration = 1200, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!target) return;
    let start = null;
    let raf;
    const timeout = setTimeout(() => {
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setVal(Math.floor(eased * target));
        if (progress < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [target, duration, delay]);
  return val;
}

// ── Animated fill bar ─────────────────────────────
function AnimBar({ pct, color, delay = 0, overflowColor, height = 8 }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(Math.min(pct, 100)), delay + 100);
    return () => clearTimeout(t);
  }, [pct, delay]);
  const isOver = pct > 100;
  return (
    <div style={{ position: "relative", height: `${height}px`, background: "rgba(0,0,0,0.05)", borderRadius: "8px", overflow: "hidden" }}>
      <div style={{
        position: "absolute", left: 0, top: 0, height: "100%",
        width: `${width}%`,
        background: isOver ? `linear-gradient(90deg, ${color}, ${overflowColor || "#ef4444"})` : color,
        borderRadius: "8px",
        transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        boxShadow: `0 0 12px ${color}40`,
      }} />
    </div>
  );
}

export default function MyStreetLanding() {
  const [daysSince, setDaysSince] = useState(0);
  
  const rtiDays   = Math.floor((new Date() - new Date("2025-11-20")) / 86400000);
  const app1Days  = Math.floor((new Date() - new Date("2026-01-22")) / 86400000);
  const app2Days  = Math.floor((new Date() - new Date("2026-02-25")) / 86400000);

  const heroCount = useCountUp(rtiDays, 1600, 300);
  const c1 = useCountUp(rtiDays, 1000, 600);
  const c2 = useCountUp(app1Days, 1000, 750);
  const c3 = useCountUp(app2Days, 1000, 900);
  const criticalCount = useCountUp(STATS.critical, 1000, 400);
  const highCount = useCountUp(STATS.high, 1000, 500);
  const totalCount = useCountUp(STATS.total, 1000, 600);

  useEffect(() => {
    const rtiDate = new Date("2025-11-20");
    const days = Math.floor((new Date() - rtiDate) / (1000 * 60 * 60 * 24));
    setDaysSince(days);
  }, []);

  const steps = [
    {
      emoji: "📝", label: "RTI Filed", date: "Nov 20, 2025",
      days: c1, actualDays: rtiDays, deadline: 30,
      color: "#ef4444", 
      status: "NO REPLY",
    },
    {
      emoji: "📢", label: "1st Appeal", date: "Jan 22, 2026",
      days: c2, actualDays: app1Days, deadline: 30,
      color: "#ef4444",
      status: "NO REPLY",
    },
    {
      emoji: "⚖️", label: "2nd Appeal", date: "Feb 25, 2026",
      days: c3, actualDays: app2Days, deadline: 90,
      color: "#9c27b0",
      status: "PENDING",
    },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Poppins', sans-serif; background: #f8f9fc; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .f1 { animation: fadeUp 0.6s ease both; }
        .f2 { animation: fadeUp 0.6s ease 0.15s both; }
        .f3 { animation: fadeUp 0.6s ease 0.3s both; }
        .f4 { animation: fadeUp 0.6s ease 0.45s both; }
        .f5 { animation: fadeUp 0.6s ease 0.6s both; }
        .slide-right { animation: slideRight 0.8s ease both; }
        .slide-left { animation: slideLeft 0.8s ease both; }
        @keyframes pulse { 
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .cta-btn {
          transition: all 0.3s ease;
        }
        .cta-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 16px 48px rgba(102,126,234,0.5) !important;
        }
        .cta-btn:active { 
          transform: translateY(-1px) scale(1.01); 
        }
        .stat-card {
          transition: all 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
        }
        
        /* Responsive utilities */
        .responsive-grid-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }
        .responsive-grid-timeline {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }
        .responsive-grid-two-col {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }
        .responsive-grid-explainer {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }
        
        @media (max-width: 768px) {
          .responsive-grid-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .responsive-grid-timeline {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .responsive-grid-two-col {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .responsive-grid-explainer {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        
        @media (max-width: 480px) {
          .responsive-grid-stats {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f8f9fc", fontFamily: "'Poppins', sans-serif" }}>

        {/* ─── HEADER ─── */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "clamp(16px, 4vw, 24px) clamp(16px, 5vw, 32px)",
          boxShadow: "0 4px 24px rgba(102,126,234,0.2)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", alignItems: "center", gap: "clamp(12px, 3vw, 16px)" }}>
            <div style={{
              width: "clamp(48px, 10vw, 56px)", 
              height: "clamp(48px, 10vw, 56px)", 
              background: "white", 
              borderRadius: "18px",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              fontSize: "clamp(24px, 6vw, 32px)", 
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}>🗺️</div>
            <div>
              <div style={{ fontSize: "clamp(22px, 5vw, 30px)", fontWeight: "900", color: "white", letterSpacing: "0.5px" }}>MyStreet</div>
              <div style={{ fontSize: "clamp(11px, 2.5vw, 14px)", color: "rgba(255,255,255,0.9)", fontWeight: "500" }}>{STREET_CONFIG.area}</div>
            </div>
          </div>
        </div>

        {/* ─── HERO SECTION ─── */}
        <div style={{ 
          background: "linear-gradient(180deg, #f8f9fc 0%, #ffffff 100%)",
          padding: "clamp(40px, 10vw, 80px) clamp(16px, 5vw, 32px) clamp(50px, 12vw, 100px)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Decorative elements */}
          <div style={{
            position: "absolute",
            top: "10%",
            right: "5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(102,126,234,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 6s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(118,75,162,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "float 8s ease-in-out infinite",
          }} />

          <div style={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
            
            {/* Live badge */}
            <div className="f1" style={{ display: "flex", justifyContent: "center", marginBottom: "32px" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "white", color: "#c62828",
                padding: "10px 24px", borderRadius: "40px",
                fontSize: "14px", fontWeight: "700",
                border: "2px solid #ffcdd2",
                boxShadow: "0 4px 16px rgba(239,68,68,0.15)",
              }}>
                <span style={{ 
                  width: "10px", 
                  height: "10px", 
                  borderRadius: "50%", 
                  background: "#ef4444", 
                  display: "inline-block", 
                  animation: "pulse 2s infinite" 
                }} />
                RTI ignored for {daysSince} days — still unresolved
              </div>
            </div>

            {/* Headline */}
            <div className="f2" style={{ textAlign: "center", marginBottom: "48px" }}>
              <h1 style={{ 
                fontSize: "clamp(36px, 6vw, 56px)", 
                fontWeight: "900", 
                color: "#1e1e2e", 
                lineHeight: "1.15", 
                marginBottom: "24px",
                maxWidth: "900px",
                margin: "0 auto 24px"
              }}>
                Our street in Roorkee has{" "}
                <span style={{ 
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  {STATS.total} problems.
                </span>
                <br />Nobody is fixing them.
              </h1>
              <p style={{ 
                fontSize: "18px", 
                color: "#5a6c88", 
                lineHeight: "1.7", 
                fontWeight: "400", 
                maxWidth: "640px", 
                margin: "0 auto" 
              }}>
                Every pothole, crack, and broken section has been{" "}
                <strong style={{ color: "#2c3e50", fontWeight: "600" }}>photographed and pinned on a map</strong>{" "}
                so anyone can see exactly what the government has ignored.
              </p>
            </div>

            {/* Stat cards - horizontal showcase */}
            <div className="f3 responsive-grid-stats" style={{ 
              maxWidth: "1000px",
              margin: "0 auto clamp(32px, 8vw, 48px)"
            }}>
              <div className="stat-card" style={{ 
                background: "linear-gradient(135deg, #fff5f5, #ffe5e5)", 
                border: "3px solid #ffcdd2", 
                borderRadius: "clamp(16px, 4vw, 24px)", 
                padding: "clamp(20px, 5vw, 32px) clamp(16px, 4vw, 24px)",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(239,68,68,0.12)",
              }}>
                <div style={{ fontSize: "clamp(40px, 10vw, 56px)", fontWeight: "900", color: "#d32f2f", lineHeight: 1 }}>{criticalCount}</div>
                <div style={{ fontSize: "clamp(12px, 3vw, 14px)", fontWeight: "700", color: "#e57373", marginTop: "8px" }}>CRITICAL</div>
                <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: "#aaa", marginTop: "4px" }}>Urgent repairs needed</div>
              </div>
              
              <div className="stat-card" style={{ 
                background: "linear-gradient(135deg, #fff9e6, #fff3cd)", 
                border: "3px solid #ffe0a3", 
                borderRadius: "clamp(16px, 4vw, 24px)", 
                padding: "clamp(20px, 5vw, 32px) clamp(16px, 4vw, 24px)",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(255,152,0,0.12)",
              }}>
                <div style={{ fontSize: "clamp(40px, 10vw, 56px)", fontWeight: "900", color: "#f57c00", lineHeight: 1 }}>{highCount}</div>
                <div style={{ fontSize: "clamp(12px, 3vw, 14px)", fontWeight: "700", color: "#ffb74d", marginTop: "8px" }}>HIGH SEVERITY</div>
                <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: "#aaa", marginTop: "4px" }}>Serious damage</div>
              </div>
              
              <div className="stat-card" style={{ 
                background: "linear-gradient(135deg, #f0f3ff, #e8ecff)", 
                border: "3px solid #c5d0e8", 
                borderRadius: "clamp(16px, 4vw, 24px)", 
                padding: "clamp(20px, 5vw, 32px) clamp(16px, 4vw, 24px)",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(102,126,234,0.12)",
              }}>
                <div style={{ fontSize: "clamp(40px, 10vw, 56px)", fontWeight: "900", color: "#667eea", lineHeight: 1 }}>{totalCount}</div>
                <div style={{ fontSize: "clamp(12px, 3vw, 14px)", fontWeight: "700", color: "#667eea", marginTop: "8px" }}>TOTAL ISSUES</div>
                <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: "#aaa", marginTop: "4px" }}>All documented</div>
              </div>
              
              <div className="stat-card" style={{ 
                background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)", 
                border: "3px solid #a5d6a7", 
                borderRadius: "clamp(16px, 4vw, 24px)", 
                padding: "clamp(20px, 5vw, 32px) clamp(16px, 4vw, 24px)",
                textAlign: "center",
                boxShadow: "0 4px 20px rgba(76,175,80,0.12)",
              }}>
                <div style={{ fontSize: "clamp(40px, 10vw, 56px)", fontWeight: "900", color: "#2e7d32", lineHeight: 1 }}>
                  {TRACKING_INFO.privateRepairHouses}/{TRACKING_INFO.totalHouses}
                </div>
                <div style={{ fontSize: "clamp(12px, 3vw, 14px)", fontWeight: "700", color: "#66bb6a", marginTop: "8px" }}>SELF-REPAIRED</div>
                <div style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: "#aaa", marginTop: "4px" }}>Paid from pocket</div>
              </div>
            </div>

            {/* PRIMARY CTA */}
            <div className="f4" style={{ textAlign: "center" }}>
              <button
                className="cta-btn"
                onClick={() => { window.location.href = "/mystreet/map"; }}
                style={{
                  padding: "clamp(18px, 4vw, 24px) clamp(40px, 10vw, 64px)",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white", 
                  border: "none", 
                  borderRadius: "clamp(16px, 4vw, 20px)",
                  fontSize: "clamp(16px, 4vw, 20px)", 
                  fontWeight: "800", 
                  cursor: "pointer",
                  boxShadow: "0 8px 32px rgba(102,126,234,0.4)",
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: "clamp(10px, 3vw, 14px)",
                }}
              >
                <span style={{ fontSize: "clamp(20px, 5vw, 24px)" }}>📍</span> 
                View the Evidence Map 
                <span style={{ fontSize: "clamp(20px, 5vw, 24px)" }}>→</span>
              </button>
              <div style={{ marginTop: "16px", fontSize: "clamp(12px, 3vw, 14px)", color: "#8894ac", fontWeight: "500" }}>
                Tap any coloured pin to see photos and details
              </div>
            </div>
          </div>
        </div>

        {/* ─── GOVERNMENT RESPONSE TRACKER SECTION ─── */}
        <div style={{ 
          background: "white",
          padding: "clamp(50px, 12vw, 100px) clamp(16px, 5vw, 32px)",
          position: "relative"
        }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            
            {/* Section Header */}
            <div className="f1" style={{ textAlign: "center", marginBottom: "64px" }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                padding: "12px 32px",
                borderRadius: "40px",
                marginBottom: "24px",
                boxShadow: "0 4px 20px rgba(102,126,234,0.3)",
              }}>
                <span style={{ fontSize: "24px" }}>🏛️</span>
                <span style={{ fontSize: "16px", fontWeight: "900", color: "white", letterSpacing: "0.5px" }}>
                  GOVERNMENT RESPONSE TRACKER
                </span>
              </div>
              <h2 style={{ 
                fontSize: "clamp(28px, 5vw, 42px)", 
                fontWeight: "900", 
                color: "#1e1e2e", 
                lineHeight: "1.3",
                marginBottom: "16px"
              }}>
                We asked legally. They stayed silent.
              </h2>
              <p style={{ fontSize: "18px", color: "#5a6c88", maxWidth: "700px", margin: "0 auto" }}>
                Watch the numbers grow while accountability disappears
              </p>
            </div>

            {/* Main Counter - Full Width Impact */}
            <div className="f2" style={{
              background: "linear-gradient(135deg, #fff0f0 0%, #ffe5e5 50%, #fff5f5 100%)",
              border: "clamp(2px, 0.5vw, 4px) solid #ffcdd2",
              borderRadius: "clamp(20px, 5vw, 32px)",
              padding: "clamp(40px, 10vw, 64px) clamp(24px, 6vw, 48px)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              marginBottom: "clamp(40px, 10vw, 64px)",
              boxShadow: "0 8px 40px rgba(239,68,68,0.15)",
            }}>
              {/* Animated background */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "500px",
                height: "500px",
                background: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, transparent 70%)",
                animation: "pulse-glow 4s ease-in-out infinite",
              }} />
              
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  fontSize: "15px",
                  fontWeight: "800",
                  color: "#e57373",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}>
                  Days of Government Silence
                </div>
                <div style={{
                  fontSize: "clamp(96px, 20vw, 140px)",
                  fontWeight: "900",
                  background: "linear-gradient(135deg, #c62828 0%, #ef4444 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1,
                  marginBottom: "16px",
                  filter: "drop-shadow(0 8px 24px rgba(198,40,40,0.3))",
                }}>
                  {heroCount}
                </div>
                <div style={{
                  fontSize: "16px",
                  color: "#d32f2f",
                  fontWeight: "600",
                  marginBottom: "24px",
                }}>
                  Since Nov 20, 2025 · RTI Act deadline was 30 days
                </div>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "#ffcdd2",
                  padding: "10px 28px",
                  borderRadius: "30px",
                  fontSize: "13px",
                  fontWeight: "900",
                  color: "#c62828",
                  boxShadow: "0 4px 12px rgba(198,40,40,0.2)",
                }}>
                  <span style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#c62828",
                    animation: "pulse 1.5s infinite",
                  }} />
                  STILL COUNTING
                </div>
              </div>
            </div>

            {/* Timeline Cards - Modern Layout */}
            <div className="f3" style={{ marginBottom: "clamp(40px, 10vw, 64px)" }}>
              <div className="responsive-grid-timeline">
                {steps.map((s, i) => {
                  const barPct = (s.actualDays / s.deadline) * 100;
                  const isOverdue = barPct > 100;
                  
                  return (
                    <div
                      key={i}
                      style={{
                        background: isOverdue 
                          ? "linear-gradient(135deg, #fff5f5 0%, #ffe5e5 100%)"
                          : "linear-gradient(135deg, #f3e5f5 0%, #f8f0ff 100%)",
                        border: `clamp(2px, 0.5vw, 3px) solid ${isOverdue ? "#ffcdd2" : "#ce93d8"}`,
                        borderRadius: "clamp(16px, 4vw, 24px)",
                        padding: "clamp(24px, 6vw, 36px) clamp(20px, 5vw, 32px)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "clamp(16px, 4vw, 24px)", gap: "12px", flexWrap: "wrap" }}>
                        <div>
                          <div style={{ fontSize: "clamp(36px, 8vw, 48px)", marginBottom: "8px" }}>{s.emoji}</div>
                          <div style={{ fontSize: "clamp(15px, 3.5vw, 18px)", fontWeight: "800", color: "#2c3e50" }}>{s.label}</div>
                          <div style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: "#8894ac", marginTop: "4px" }}>{s.date}</div>
                        </div>
                        <div style={{
                          background: isOverdue ? "#ffcdd2" : "#e1bee7",
                          color: isOverdue ? "#c62828" : "#7b1fa2",
                          padding: "clamp(6px, 1.5vw, 8px) clamp(12px, 3vw, 16px)",
                          borderRadius: "20px",
                          fontSize: "clamp(10px, 2.2vw, 11px)",
                          fontWeight: "900",
                          letterSpacing: "0.5px",
                          whiteSpace: "nowrap",
                        }}>
                          {s.status}
                        </div>
                      </div>

                      <div style={{ marginBottom: "clamp(16px, 4vw, 20px)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px", gap: "12px" }}>
                          <span style={{ fontSize: "clamp(11px, 2.5vw, 12px)", color: "#8894ac", fontWeight: "600" }}>Days waiting</span>
                          <span style={{ fontSize: "clamp(36px, 8vw, 48px)", fontWeight: "900", color: s.color, lineHeight: 1 }}>
                            {s.days}
                          </span>
                        </div>
                        <AnimBar pct={barPct} color={s.color} delay={i * 150} overflowColor="#7f0000" height={10} />
                        <div style={{ 
                          display: "flex", 
                          justifyContent: "space-between", 
                          marginTop: "8px",
                          fontSize: "11px",
                          fontWeight: "700"
                        }}>
                          <span style={{ color: "#aaa" }}>Deadline: {s.deadline} days</span>
                          <span style={{ color: s.color }}>
                            {isOverdue ? `${Math.round(barPct - 100)}% OVERDUE` : `${Math.round(100 - barPct)}% remaining`}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Two Column Layout - Journey & Comparison */}
            <div className="f4 responsive-grid-two-col" style={{ 
              marginBottom: "clamp(40px, 10vw, 64px)"
            }}>
              
              {/* Journey Stepper */}
              <div style={{
                background: "linear-gradient(135deg, #f8f9fc 0%, #f0f3f8 100%)",
                borderRadius: "clamp(16px, 4vw, 24px)",
                padding: "clamp(28px, 6vw, 40px) clamp(20px, 5vw, 36px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}>
                <h3 style={{ 
                  fontSize: "18px", 
                  fontWeight: "800", 
                  color: "#2c3e50", 
                  marginBottom: "32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <span style={{ fontSize: "24px" }}>📍</span> 
                  The Legal Journey
                </h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {[
                    { label: "RTI Filed", sub: "Nov 2025", done: true },
                    { label: "1st Appeal", sub: "Jan 2026", done: true },
                    { label: "2nd Appeal", sub: "Feb 2026", done: true },
                    { label: "CIC Hearing", sub: "Pending", done: false },
                  ].map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: step.done ? "linear-gradient(135deg,#667eea,#764ba2)" : "#e8ebf3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "20px",
                        flexShrink: 0,
                        boxShadow: step.done ? "0 4px 16px rgba(102,126,234,0.4)" : "none",
                        color: step.done ? "white" : "#c5d0e8",
                        fontWeight: "900",
                      }}>
                        {step.done ? "✓" : "○"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: step.done ? "#2c3e50" : "#aaa" }}>
                          {step.label}
                        </div>
                        <div style={{ fontSize: "12px", color: "#8894ac", marginTop: "2px" }}>
                          {step.sub}
                        </div>
                      </div>
                      {i < 3 && (
                        <div style={{
                          width: "4px",
                          height: "24px",
                          background: step.done ? "linear-gradient(180deg,#667eea,#764ba2)" : "#e8ebf3",
                          borderRadius: "2px",
                          position: "absolute",
                          left: "59px",
                          marginTop: "60px",
                        }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Government vs Citizens */}
              <div style={{
                background: "linear-gradient(135deg, #fff 0%, #f8f9fc 100%)",
                borderRadius: "clamp(16px, 4vw, 24px)",
                padding: "clamp(28px, 6vw, 40px) clamp(20px, 5vw, 36px)",
                border: "2px solid #f0f3f8",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}>
                <h3 style={{ 
                  fontSize: "18px", 
                  fontWeight: "800", 
                  color: "#2c3e50", 
                  marginBottom: "32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px"
                }}>
                  <span style={{ fontSize: "24px" }}>⚡</span> 
                  The Accountability Gap
                </h3>

                <div style={{ marginBottom: "32px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "28px" }}>🏛️</span>
                      <span style={{ fontSize: "15px", fontWeight: "700", color: "#c62828" }}>Government</span>
                    </div>
                    <span style={{ fontSize: "32px", fontWeight: "900", color: "#c62828" }}>0%</span>
                  </div>
                  <AnimBar pct={0} color="#ef4444" delay={500} height={12} />
                  <div style={{ fontSize: "12px", color: "#d32f2f", marginTop: "10px", fontWeight: "600" }}>
                    📄 Documents shared: 0 · 💬 Replies: 0 · ⏱️ {rtiDays} days silent
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "28px" }}>🙋</span>
                      <span style={{ fontSize: "15px", fontWeight: "700", color: "#2e7d32" }}>Citizens</span>
                    </div>
                    <span style={{ fontSize: "32px", fontWeight: "900", color: "#2e7d32" }}>100%</span>
                  </div>
                  <AnimBar pct={100} color="#4caf50" delay={700} height={12} />
                  <div style={{ fontSize: "12px", color: "#2e7d32", marginTop: "10px", fontWeight: "600" }}>
                    📸 Issues mapped: 67 · ✅ Transparency: 100% · ⚡ Time: 14 days
                  </div>
                </div>
              </div>
            </div>

            {/* Empty Inbox - Centered */}
            <div className="f5" style={{
              maxWidth: "600px",
              margin: "0 auto",
              border: "clamp(2px, 0.5vw, 3px) dashed #e0e4f0",
              borderRadius: "clamp(16px, 4vw, 24px)",
              padding: "clamp(32px, 8vw, 56px) clamp(24px, 6vw, 40px)",
              textAlign: "center",
              background: "linear-gradient(135deg, #fafbff 0%, #f5f7fb 100%)",
            }}>
              <div style={{ fontSize: "clamp(48px, 12vw, 72px)", marginBottom: "20px", opacity: 0.3 }}>📭</div>
              <div style={{ fontSize: "clamp(14px, 3.5vw, 18px)", fontWeight: "900", color: "#c5d0e8", marginBottom: "12px", letterSpacing: "0.5px" }}>
                Official Responses Received
              </div>
              <div style={{ fontSize: "clamp(56px, 14vw, 80px)", fontWeight: "900", color: "#dde2f0", lineHeight: 1, marginBottom: "16px" }}>
                0
              </div>
              <div style={{ fontSize: "clamp(12px, 3vw, 14px)", color: "#c5d0e8", lineHeight: "1.6", fontWeight: "500" }}>
                Waiting since Nov 20, 2025<br />
                When they finally reply, it will appear here
              </div>
            </div>

          </div>
        </div>

        {/* ─── WHAT IS THIS WEBSITE ─── */}
        <div style={{ 
          background: "linear-gradient(180deg, #ffffff 0%, #f8f9fc 100%)",
          padding: "clamp(50px, 12vw, 100px) clamp(16px, 5vw, 32px)"
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            <div className="f1" style={{ textAlign: "center", marginBottom: "64px" }}>
              <h2 style={{ 
                fontSize: "clamp(32px, 5vw, 48px)", 
                fontWeight: "900", 
                color: "#1e1e2e", 
                marginBottom: "16px"
              }}>
                What is this website?
              </h2>
              <p style={{ fontSize: "18px", color: "#5a6c88", maxWidth: "700px", margin: "0 auto" }}>
                Public accountability through transparency and documentation
              </p>
            </div>

            <div className="responsive-grid-explainer">
              {[
                { 
                  icon: "📸", 
                  title: "Photo proof of every issue", 
                  body: "Every broken road, crack, and pothole has been photographed and placed on a map with its exact location on our street." 
                },
                { 
                  icon: "📋", 
                  title: "A legal RTI was filed & ignored", 
                  body: "On Nov 20, 2025, an RTI was filed asking Nagar Nigam Roorkee for details about the road work. They have not replied in " + daysSince + " days — which is against the law." 
                },
                { 
                  icon: "⚖️", 
                  title: "This is public evidence", 
                  body: "This site is being used to escalate the matter to the Uttarakhand State Information Commission in Dehradun." 
                },
              ].map((item, i) => (
                <div 
                  key={i}
                  className="f3"
                  style={{ 
                    background: "white",
                    borderRadius: "clamp(16px, 4vw, 24px)",
                    padding: "clamp(28px, 6vw, 40px) clamp(24px, 5vw, 36px)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    border: "2px solid #f0f3f8",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
                  }}
                >
                  <div style={{ fontSize: "clamp(44px, 10vw, 56px)", marginBottom: "20px" }}>{item.icon}</div>
                  <h3 style={{ fontSize: "clamp(17px, 4vw, 20px)", fontWeight: "800", color: "#2c3e50", marginBottom: "12px" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "clamp(13px, 3vw, 15px)", color: "#5a6c88", lineHeight: "1.7" }}>
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── SHARE SECTION ─── */}
        <div style={{ 
          background: "white",
          padding: "clamp(50px, 10vw, 80px) clamp(16px, 5vw, 32px)",
          textAlign: "center"
        }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h3 style={{ fontSize: "clamp(22px, 5vw, 28px)", fontWeight: "800", color: "#2c3e50", marginBottom: "16px" }}>
              Share this with your neighbours
            </h3>
            <p style={{ fontSize: "clamp(14px, 3.5vw, 16px)", color: "#8894ac", marginBottom: "clamp(24px, 6vw, 32px)" }}>
              The more people know, the harder it is to ignore
            </p>
            <a
              href={`https://wa.me/?text=${encodeURIComponent("Our street in Yoganand Vihar, Roorkee has " + STATS.total + " documented road problems — potholes, cracks, broken road. Nagar Nigam has ignored the RTI for " + daysSince + " days. See the proof: " + (typeof window !== "undefined" ? window.location.origin + "/mystreet" : "https://mystreet.vercel.app/mystreet"))}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "clamp(10px, 2.5vw, 12px)",
                padding: "clamp(14px, 3.5vw, 18px) clamp(28px, 7vw, 40px)",
                background: "#25D366",
                color: "white",
                borderRadius: "clamp(14px, 3.5vw, 16px)",
                fontSize: "clamp(15px, 3.5vw, 18px)",
                fontWeight: "700",
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.3)";
              }}
            >
              <span style={{ fontSize: "clamp(20px, 5vw, 24px)" }}>📲</span> Share on WhatsApp
            </a>
          </div>
        </div>

        {/* ─── FOOTER ─── */}
        <div style={{
          borderTop: "2px solid #f0f3f8",
          background: "#fafbff",
          padding: "clamp(24px, 6vw, 32px) clamp(16px, 4vw, 24px)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "clamp(11px, 2.5vw, 13px)", color: "#8894ac", fontWeight: "500", lineHeight: "1.8" }}>
            Last verified: {TRACKING_INFO.lastVerified}<br />
            RTI Act, 2005 · Ward No. 5, Roorkee · Built with transparency
          </div>
        </div>

      </div>
    </>
  );
}
