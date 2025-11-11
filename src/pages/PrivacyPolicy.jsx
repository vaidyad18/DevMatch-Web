import React, { useRef, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import LiquidEther from "../components/LiquidEther";
import Backbutton from "../components/Backbutton";

const PrivacyPolicy = () => {
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

      {/* Overlay to capture cursor movement */}
      <div
        id="ether-overlay"
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Main Content */}
      <section
        id="privacy-policy"
        className="relative z-20 isolate overflow-hidden w-full"
      >
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 pt-24 md:pt-32 pb-20 md:pb-28">
          <div className="absolute top-30 left-0">
            <Backbutton />
          </div>

          {/* Page Heading */}
          <div className="text-center pt-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-transparent bg-clip-text">
              Privacy Policy
            </h1>
            <p className="mt-3 text-gray-400">
              Last updated: September 09, 2025
            </p>
          </div>

          {/* Content */}
          <div className="mt-10 space-y-8 text-gray-300 leading-relaxed text-sm md:text-base">
            <section>
              <p>
                This Privacy Policy explains how{" "}
                <span className="font-semibold text-white">DevMatch</span>{" "}
                (operated by VAIDYA DANDRIYAL) collects, uses, and protects your
                information when you use our website or services.
              </p>
              <p className="mt-3">
                By using DevMatch, you agree to the practices described in this
                policy. We may update this page from time to time, so please
                review it periodically.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-white">
                Information We Collect
              </h2>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Name and contact details (e.g., email)</li>
                <li>
                  Profile information you choose to share (skills, GitHub,
                  interests)
                </li>
                <li>Usage data (logins, interactions, matches)</li>
                <li>Technical information (IP address, browser type)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-white">
                How We Use Your Information
              </h2>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>To create and maintain your developer profile</li>
                <li>
                  To enable matching, messaging, and collaboration features
                </li>
                <li>To improve platform performance and user experience</li>
                <li>To communicate important updates or policy changes</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-white">Security</h2>
              <p className="mt-2">
                We are committed to protecting your personal data. We implement
                reasonable technical and organizational measures, but no method
                of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-white">Cookies</h2>
              <p className="mt-2">
                DevMatch uses cookies to enhance your experience, such as
                keeping you signed in and analyzing site traffic. You can
                control cookies through your browser settings, but disabling
                them may limit functionality.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-white">
                Your Rights & Control
              </h2>
              <p className="mt-2">
                You may update or delete your account information anytime
                through account settings. For data removal requests or privacy
                concerns, contact us directly.
              </p>
              <p className="mt-3">
                We will never sell or lease your personal information to third
                parties. Data is only shared when legally required or with
                trusted service providers essential for running the platform.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-white">Contact Us</h2>
              <p className="mt-2">
                If you have questions about this Privacy Policy, reach us at:{" "}
                <a
                  href="mailto:vaidyadandriyal04@gmail.com"
                  className="underline decoration-[hsl(var(--brand-start))] underline-offset-2 text-[hsl(var(--brand-end))]"
                >
                  vaidyadandriyal04@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
