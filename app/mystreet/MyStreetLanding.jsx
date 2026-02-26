"use client";

import { useState, useEffect } from "react";
import { STATS, TRACKING_INFO, STREET_CONFIG } from "./mystreet-data";

export default function MyStreetLanding() {
  const [daysSince, setDaysSince] = useState(0);

  useEffect(() => {
    const rtiDate = new Date("2025-11-20");
    const days = Math.floor((new Date() - rtiDate) / (1000 * 60 * 60 * 24));
    setDaysSince(days);
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Poppins', sans-serif; background: #f8f9fc; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .f1 { animation: fadeUp 0.5s ease both; }
        .f2 { animation: fadeUp 0.5s ease 0.12s both; }
        .f3 { animation: fadeUp 0.5s ease 0.24s both; }
        .f4 { animation: fadeUp 0.5s ease 0.36s both; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .cta-btn:hover {
          transform: translateY(-3px) !important;
          box-shadow: 0 14px 40px rgba(102,126,234,0.5) !important;
        }
        .cta-btn:active { transform: translateY(0) !important; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#f8f9fc", fontFamily: "'Poppins', sans-serif", display: "flex", flexDirection: "column" }}>

        {/* ─── HEADER — same as map ─── */}
        <div style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "20px 24px",
          boxShadow: "0 4px 20px rgba(102,126,234,0.15)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              width: "52px", height: "52px", background: "white", borderRadius: "16px",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "28px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}>🗺️</div>
            <div>
              <div style={{ fontSize: "28px", fontWeight: "900", color: "white", letterSpacing: "0.5px" }}>MyStreet</div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", fontWeight: "500" }}>{STREET_CONFIG.area}</div>
            </div>
          </div>
        </div>

        {/* ─── BODY ─── */}
        <div style={{ flex: 1, maxWidth: "680px", width: "100%", margin: "0 auto", padding: "40px 20px 60px", display: "flex", flexDirection: "column", gap: "28px" }}>

          {/* Live badge */}
          <div className="f1" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#fff0f0", color: "#c62828",
              padding: "7px 18px", borderRadius: "30px",
              fontSize: "13px", fontWeight: "700",
              border: "2px solid #ffcdd2",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", display: "inline-block", animation: "pulse 2s infinite" }} />
              RTI ignored for {daysSince} days — still unresolved
            </div>
          </div>

          {/* Headline */}
          <div className="f1" style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "clamp(26px, 5.5vw, 42px)", fontWeight: "900", color: "#1e1e2e", lineHeight: "1.2", marginBottom: "14px" }}>
              Our street in Roorkee has{" "}
              <span style={{ color: "#667eea" }}>{STATS.total} problems.</span>
              <br />Nobody is fixing them.
            </h1>
            <p style={{ fontSize: "16px", color: "#5a6c88", lineHeight: "1.75", fontWeight: "400", maxWidth: "520px", margin: "0 auto" }}>
              Every pothole, crack, and broken section has been{" "}
              <strong style={{ color: "#2c3e50", fontWeight: "600" }}>photographed and pinned on a map</strong>{" "}
              so anyone can see exactly what the government has ignored.
            </p>
          </div>

          {/* Stat cards — same colour style as the map */}
          <div className="f2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
            <div style={{ background: "linear-gradient(135deg, #fff5f5, #ffe5e5)", border: "2px solid #ffcdd2", borderRadius: "16px", padding: "20px" }}>
              <div style={{ fontSize: "38px", fontWeight: "900", color: "#d32f2f" }}>{STATS.critical}</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#e57373" }}>CRITICAL issues</div>
              <div style={{ fontSize: "12px", color: "#aaa", marginTop: "3px" }}>Need urgent repair</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, #fff9e6, #fff3cd)", border: "2px solid #ffe0a3", borderRadius: "16px", padding: "20px" }}>
              <div style={{ fontSize: "38px", fontWeight: "900", color: "#f57c00" }}>{STATS.high}</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#ffb74d" }}>HIGH severity</div>
              <div style={{ fontSize: "12px", color: "#aaa", marginTop: "3px" }}>Serious damage</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, #f0f3ff, #e8ecff)", border: "2px solid #c5d0e8", borderRadius: "16px", padding: "20px" }}>
              <div style={{ fontSize: "38px", fontWeight: "900", color: "#667eea" }}>{STATS.total}</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#667eea" }}>TOTAL documented</div>
              <div style={{ fontSize: "12px", color: "#aaa", marginTop: "3px" }}>All with photo proof</div>
            </div>
            <div style={{ background: "linear-gradient(135deg, #e8f5e9, #c8e6c9)", border: "2px solid #a5d6a7", borderRadius: "16px", padding: "20px" }}>
              <div style={{ fontSize: "38px", fontWeight: "900", color: "#2e7d32" }}>{TRACKING_INFO.privateRepairHouses}/{TRACKING_INFO.totalHouses}</div>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#66bb6a" }}>HOUSES self-repaired</div>
              <div style={{ fontSize: "12px", color: "#aaa", marginTop: "3px" }}>Paid from own pocket</div>
            </div>
          </div>

          {/* PRIMARY CTA */}
          <div className="f3" style={{ textAlign: "center" }}>
            <button
              className="cta-btn"
              onClick={() => { window.location.href = "/mystreet/map"; }}
              style={{
                padding: "20px 52px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white", border: "none", borderRadius: "16px",
                fontSize: "18px", fontWeight: "800", cursor: "pointer",
                boxShadow: "0 8px 28px rgba(102,126,234,0.4)",
                transition: "all 0.25s ease",
                display: "inline-flex", alignItems: "center", gap: "12px",
              }}
            >
              <span>📍</span> View the Evidence Map <span>→</span>
            </button>
            <div style={{ marginTop: "10px", fontSize: "13px", color: "#8894ac", fontWeight: "500" }}>
              Tap any coloured pin to see photos and details
            </div>
          </div>

          {/* What is this — simple 3-step */}
          <div className="f4" style={{ background: "white", borderRadius: "20px", padding: "24px 24px 20px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "2px solid #f0f3f8" }}>
            <div style={{ fontSize: "15px", fontWeight: "800", color: "#2c3e50", marginBottom: "18px" }}>
              ❓ What is this website?
            </div>
            {[
              { icon: "📸", title: "Photo proof of every issue", body: "Every broken road, crack, and pothole has been photographed and placed on a map with its exact location on our street." },
              { icon: "📋", title: "A legal RTI was filed & ignored", body: "On Nov 20, 2025, an RTI was filed asking Nagar Nigam Roorkee for details about the road work. They have not replied in " + daysSince + " days — which is against the law." },
              { icon: "⚖️", title: "This is public evidence", body: "This site is being used to escalate the matter to the Uttarakhand State Information Commission in Dehradun." },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: i < 2 ? "16px" : 0, paddingBottom: i < 2 ? "16px" : 0, borderBottom: i < 2 ? "1px solid #f0f3f8" : "none" }}>
                <div style={{ fontSize: "24px", flexShrink: 0, marginTop: "1px" }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: "700", color: "#2c3e50", marginBottom: "4px" }}>{item.title}</div>
                  <div style={{ fontSize: "13px", color: "#5a6c88", lineHeight: "1.65" }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── ACCOUNTABILITY TRACKER ── */}
          <div className="f4" style={{ background: "white", borderRadius: "20px", border: "2px solid #f0f3f8", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>

            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", padding: "18px 20px" }}>
              <div style={{ fontSize: "15px", fontWeight: "900", color: "white" }}>🏛️ Government Response Tracker</div>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", marginTop: "3px" }}>We asked. They didn't answer. Here's the full story.</div>
            </div>

            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* 3 horizontal step cards */}
              {(() => {
                const rtiDays  = Math.floor((new Date() - new Date("2025-11-20")) / 86400000);
                const app1Days = Math.floor((new Date() - new Date("2026-01-22")) / 86400000);
                const app2Days = Math.floor((new Date() - new Date("2026-02-25")) / 86400000);

                const steps = [
                  {
                    num: "1",
                    emoji: "📝",
                    label: "RTI Filed",
                    date: "Nov 20, 2025",
                    days: rtiDays,
                    deadline: 30,
                    note: "Legal reply deadline: 30 days",
                    status: "NO REPLY",
                    statusBg: "#ffcdd2", statusColor: "#c62828",
                    ring: "#ef4444", ringBg: "#fff5f5",
                    border: "#ffcdd2",
                  },
                  {
                    num: "2",
                    emoji: "📢",
                    label: "1st Appeal",
                    date: "Jan 22, 2026",
                    days: app1Days,
                    deadline: 30,
                    note: "Legal reply deadline: 30 days",
                    status: "NO REPLY",
                    statusBg: "#ffcdd2", statusColor: "#c62828",
                    ring: "#ef4444", ringBg: "#fff5f5",
                    border: "#ffcdd2",
                  },
                  {
                    num: "3",
                    emoji: "⚖️",
                    label: "2nd Appeal",
                    date: "Feb 25, 2026",
                    days: app2Days,
                    deadline: 90,
                    note: "Portal says: No Record Found ⚠️",
                    status: "1 DAY OLD",
                    statusBg: "#e1bee7", statusColor: "#7b1fa2",
                    ring: "#9c27b0", ringBg: "#f3e5f5",
                    border: "#ce93d8",
                  },
                ];

                return (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                    {steps.map((s, i) => {
                      // SVG circular progress
                      const r = 26;
                      const circ = 2 * Math.PI * r;
                      const pct = Math.min(s.days / s.deadline, 1);
                      const dash = pct * circ;

                      return (
                        <div key={i} style={{
                          background: s.ringBg, border: `2px solid ${s.border}`,
                          borderRadius: "16px", padding: "14px 10px",
                          display: "flex", flexDirection: "column", alignItems: "center",
                          gap: "8px", textAlign: "center",
                        }}>
                          {/* Step number */}
                          <div style={{ fontSize: "10px", fontWeight: "800", color: s.statusColor, background: s.statusBg, padding: "2px 8px", borderRadius: "20px", letterSpacing: "0.5px" }}>
                            STEP {s.num}
                          </div>

                          {/* Circular progress ring */}
                          <div style={{ position: "relative", width: "68px", height: "68px" }}>
                            <svg width="68" height="68" style={{ transform: "rotate(-90deg)" }}>
                              {/* Track */}
                              <circle cx="34" cy="34" r={r} fill="none" stroke="#e8ebf3" strokeWidth="5" />
                              {/* Progress */}
                              <circle
                                cx="34" cy="34" r={r} fill="none"
                                stroke={s.ring} strokeWidth="5"
                                strokeDasharray={`${dash} ${circ}`}
                                strokeLinecap="round"
                              />
                            </svg>
                            {/* Emoji in center */}
                            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>
                              {s.emoji}
                            </div>
                          </div>

                          {/* Label */}
                          <div style={{ fontSize: "13px", fontWeight: "800", color: "#2c3e50" }}>{s.label}</div>

                          {/* Date */}
                          <div style={{ fontSize: "11px", color: "#8894ac", fontWeight: "500" }}>{s.date}</div>

                          {/* Days counter — big */}
                          <div style={{ background: "white", borderRadius: "10px", padding: "6px 10px", width: "100%", border: `1px solid ${s.border}` }}>
                            <div style={{ fontSize: "22px", fontWeight: "900", color: s.statusColor, lineHeight: 1 }}>{s.days}</div>
                            <div style={{ fontSize: "10px", color: "#8894ac", fontWeight: "600", marginTop: "2px" }}>DAYS WAITING</div>
                          </div>

                          {/* Status pill */}
                          <div style={{ fontSize: "10px", fontWeight: "800", color: s.statusColor, background: s.statusBg, padding: "3px 10px", borderRadius: "20px" }}>
                            {s.status}
                          </div>

                          {/* Note */}
                          <div style={{ fontSize: "10px", color: "#8894ac", lineHeight: "1.4", fontWeight: "500" }}>{s.note}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}

              {/* Progress bar — overall journey */}
              <div style={{ background: "#f8f9fc", borderRadius: "14px", padding: "14px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "#2c3e50" }}>📍 Where we are now</span>
                  <span style={{ fontSize: "11px", color: "#8894ac" }}>Step 3 of 3 escalations done</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  {["RTI Filed ✅", "1st Appeal ✅", "2nd Appeal ✅", "Waiting for CIC..."].map((label, i) => (
                    <div key={i} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{
                        height: "8px", borderRadius: "4px",
                        background: i < 3 ? "linear-gradient(135deg, #667eea, #764ba2)" : "#e8ebf3",
                        marginBottom: "6px",
                      }} />
                      <div style={{ fontSize: "9px", color: i < 3 ? "#667eea" : "#aaa", fontWeight: i < 3 ? "700" : "500", lineHeight: "1.3" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Govt vs Citizens */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ background: "#fff5f5", border: "2px solid #ffcdd2", borderRadius: "14px", padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", marginBottom: "6px" }}>🏛️</div>
                  <div style={{ fontSize: "12px", fontWeight: "800", color: "#c62828", marginBottom: "10px" }}>GOVERNMENT</div>
                  <div style={{ fontSize: "28px", fontWeight: "900", color: "#c62828" }}>{Math.floor((new Date() - new Date("2025-11-20")) / 86400000)}</div>
                  <div style={{ fontSize: "10px", color: "#e57373", fontWeight: "600" }}>DAYS, ZERO REPLY</div>
                  <div style={{ marginTop: "8px", fontSize: "11px", color: "#e57373" }}>0 documents shared 🔴</div>
                </div>
                <div style={{ background: "#e8f5e9", border: "2px solid #a5d6a7", borderRadius: "14px", padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: "24px", marginBottom: "6px" }}>🙋</div>
                  <div style={{ fontSize: "12px", fontWeight: "800", color: "#2e7d32", marginBottom: "10px" }}>CITIZENS</div>
                  <div style={{ fontSize: "28px", fontWeight: "900", color: "#2e7d32" }}>14</div>
                  <div style={{ fontSize: "10px", color: "#66bb6a", fontWeight: "600" }}>DAYS, 67 ISSUES MAPPED</div>
                  <div style={{ marginTop: "8px", fontSize: "11px", color: "#66bb6a" }}>100% transparent ✅</div>
                </div>
              </div>

              {/* Empty official response box */}
              <div style={{ border: "2px dashed #e8ebf3", borderRadius: "14px", padding: "28px 16px", textAlign: "center" }}>
                <div style={{ fontSize: "36px", opacity: 0.3, marginBottom: "8px" }}>📭</div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#c5d0e8" }}>Official Responses Received</div>
                <div style={{ fontSize: "28px", fontWeight: "900", color: "#d0d8e8", margin: "6px 0" }}>0</div>
                <div style={{ fontSize: "12px", color: "#c5d0e8" }}>Waiting since Nov 20, 2025. When they reply, it will appear here.</div>
              </div>

            </div>
          </div>

          {/* WhatsApp share */}
          <div className="f4" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "#8894ac", marginBottom: "12px", fontWeight: "500" }}>
              Share this with your neighbours 👇
            </p>
            <a
              href={`https://wa.me/?text=${encodeURIComponent("Our street in Yoganand Vihar, Roorkee has " + STATS.total + " documented road problems — potholes, cracks, broken road. Nagar Nigam has ignored the RTI for " + daysSince + " days. See the proof: " + (typeof window !== "undefined" ? window.location.origin + "/mystreet" : "https://mystreet.vercel.app/mystreet"))}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 28px", background: "#25D366", color: "white",
                borderRadius: "12px", fontSize: "14px", fontWeight: "700",
                textDecoration: "none", boxShadow: "0 4px 16px rgba(37,211,102,0.3)",
              }}
            >
              📲 Share on WhatsApp
            </a>
          </div>

        </div>

        {/* ─── FOOTER ─── */}
        <div style={{
          borderTop: "2px solid #f0f3f8", background: "white",
          padding: "14px 24px", textAlign: "center",
          fontSize: "12px", color: "#8894ac", fontWeight: "500",
        }}>
          Last verified: {TRACKING_INFO.lastVerified} · RTI Act, 2005 · Ward No. 5, Roorkee
        </div>

      </div>
    </>
  );
}