import React, { useRef, useEffect } from "react";
import Backbutton from "../components/Backbutton";
import LiquidEther from "../components/LiquidEther";

const TermsConditions = () => {
  const etherRef = useRef(null);

  useEffect(() => {
    const proxy = document.getElementById("ether-overlay");
    if (!proxy || !etherRef.current) return;
    const etherCanvas = etherRef.current.querySelector("canvas");
    if (!etherCanvas) return;

    const handleMove = (e) => {
      const fakeEvent = new MouseEvent("mousemove", {
        clientX: e.clientX,
        clientY: e.clientY,
      });
      etherCanvas.dispatchEvent(fakeEvent);
    };

    proxy.addEventListener("mousemove", handleMove);
    return () => proxy.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Liquid Ether Background */}
      <div ref={etherRef} className="absolute inset-0 z-0 pointer-events-auto">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={false}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Overlay to handle cursor tracking */}
      <div
        id="ether-overlay"
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Content */}
      <section
        id="terms-conditions"
        className="relative z-20 isolate overflow-hidden w-full"
      >
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 pt-24 md:pt-32 pb-20 md:pb-28">
          {/* Back Button */}
          <div className="absolute top-6 left-0">
            <Backbutton />
          </div>

          {/* Page Heading */}
          <div className="text-center pt-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-transparent bg-clip-text">
              Terms & Conditions
            </h1>
            <p className="mt-3 text-gray-400">
              Last updated: September 09, 2025
            </p>
          </div>

          {/* Content */}
          <div className="mt-10 space-y-8 text-gray-300 leading-relaxed text-sm md:text-base">
            <section>
              <p>
                For the purpose of these Terms and Conditions, the terms{" "}
                <span className="font-semibold text-white">
                  "we", "us", "our"
                </span>{" "}
                shall mean{" "}
                <span className="font-semibold">VAIDYA DANDRIYAL</span>,
                operator of DevMatch. The terms{" "}
                <span className="font-semibold">
                  "you", "your", "user", "visitor"
                </span>{" "}
                refer to any natural or legal person using the DevMatch
                platform.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-white">General Usage</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  By accessing DevMatch, you agree to use the platform for
                  lawful purposes only.
                </li>
                <li>
                  The content and features of DevMatch may change from time to
                  time without notice.
                </li>
                <li>
                  We do not guarantee uninterrupted service or absolute accuracy
                  of information shared on user profiles.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-white">
                Intellectual Property
              </h2>
              <p className="mt-2">
                All rights to the design, branding, layout, and original content
                on DevMatch are owned or licensed by us. Reproduction or
                redistribution without prior consent is prohibited.
              </p>
              <p className="mt-2">
                User-generated content (profiles, projects, posts) remains the
                property of the user, but by posting on DevMatch you grant us a
                limited license to display and share it within the platform.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-white">Restrictions</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Misuse of the platform, including harassment, spam, or
                  fraudulent activity, is strictly prohibited.
                </li>
                <li>
                  Unauthorized use of DevMatch’s codebase, branding, or assets
                  may give rise to legal claims.
                </li>
                <li>
                  You may not create a link to DevMatch for malicious or
                  misleading purposes.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-white">Third-Party Links</h2>
              <p className="mt-2">
                DevMatch may contain links to external websites (such as GitHub
                or LinkedIn). We are not responsible for the practices,
                policies, or content of those websites.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-white">Governing Law</h2>
              <p className="mt-2">
                These Terms shall be governed by the laws of India. Any disputes
                shall fall under the jurisdiction of the courts in Delhi, India.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
