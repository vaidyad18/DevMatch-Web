import React from "react";

function ParallaxBg() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60rem_40rem_at_20%_-10%,hsl(var(--brand-start)/0.10),transparent),radial-gradient(50rem_30rem_at_100%_20%,hsl(var(--brand-end)/0.10),transparent)] dark:bg-[radial-gradient(60rem_40rem_at_20%_-10%,hsl(var(--brand-end)/0.20),transparent),radial-gradient(50rem_30rem_at_100%_20%,hsl(var(--brand-start)/0.20),transparent)]" />
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-70 will-change-transform"
        style={{
          width: "28rem",
          height: "28rem",
          left: "15%",
          top: "-5%",
          background:
            "radial-gradient(circle at 40% 40%, hsl(var(--brand-start)) 0%, hsl(var(--brand-start)/0.55) 45%, transparent 70%)",
          animation: "float1 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-70 will-change-transform"
        style={{
          width: "24rem",
          height: "24rem",
          left: "85%",
          top: "20%",
          background:
            "radial-gradient(circle at 40% 40%, hsl(var(--brand-end)) 0%, hsl(var(--brand-end)/0.55) 45%, transparent 70%)",
          animation: "float2 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-70 will-change-transform"
        style={{
          width: "20rem",
          height: "20rem",
          left: "50%",
          top: "80%",
          background:
            "radial-gradient(circle at 40% 40%, hsl(var(--brand-start)) 0%, hsl(var(--brand-start)/0.55) 45%, transparent 70%)",
          animation: "float3 16s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes float1 { 0%,100% { transform: translate(-50%, -50%) } 50% { transform: translate(-45%, -52%) } }
        @keyframes float2 { 0%,100% { transform: translate(-50%, -50%) } 50% { transform: translate(-55%, -48%) } }
        @keyframes float3 { 0%,100% { transform: translate(-50%, -50%) } 50% { transform: translate(-52%, -55%) } }
      `}</style>
    </div>
  );
}

export default ParallaxBg;
