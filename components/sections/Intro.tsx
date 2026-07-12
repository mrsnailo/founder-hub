export function Intro() {
  return (
    <section
      className="section-full grid-bg content-layer"
      id="intro"
      aria-label="Introduction"
      style={{
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {/* Gradient overlay to fade grid toward center */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(20,22,26,0.65) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "2rem",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Eyebrow */}
        <p className="eyebrow" style={{ marginBottom: "1.5rem" }}>
          Founder Log
        </p>

        {/* Name */}
        <h1
          className="font-display"
          style={{
            fontSize: "clamp(3rem, 10vw, 6rem)",
            color: "var(--ink)",
            lineHeight: 1.0,
            marginBottom: "1.5rem",
            letterSpacing: "-0.04em",
          }}
        >
          Shahid
          <br />
          <span style={{ color: "var(--accent)" }}>Parvez</span>
        </h1>

        {/* Subhead */}
        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: "var(--ink-dim)",
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            lineHeight: 1.7,
            maxWidth: "480px",
            margin: "0 auto 2.5rem",
          }}
        >
          Building practical software tools,{" "}
          <br className="hidden-mobile" />
          one product at a time.
        </p>

        {/* Scroll hint */}
        <div
          aria-label="Scroll to explore"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            color: "var(--ink-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: "1rem",
          }}
        >
          <span>Scroll to explore</span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            style={{ animation: "scrollBounce 2s ease-in-out infinite" }}
            aria-hidden="true"
          >
            <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="8" cy="7" r="2" fill="currentColor" style={{ animation: "scrollDot 2s ease-in-out infinite" }} />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes scrollBounce { from {} to {} }
          @keyframes scrollDot { from {} to {} }
        }
      `}</style>
    </section>
  );
}
