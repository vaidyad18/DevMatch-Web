import React, { useRef, useEffect } from "react";
import Backbutton from "../components/BackButton";
import LiquidEther from "../components/LiquidEther";

const RefundPolicy = () => {
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
        id="refund-policy"
        className="relative z-20 isolate overflow-hidden w-full"
      >
        <div className="relative mx-auto max-w-4xl px-6 lg:px-10 pt-24 md:pt-32 pb-20 md:pb-28">
          <div className="absolute top-30 left-0">
            <Backbutton />
          </div>

          {/* Heading */}
          <div className="text-center pt-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-transparent bg-clip-text">
              Cancellation & Refund Policy
            </h1>
            <p className="mt-3 text-gray-400">
              Last updated: September 09, 2025
            </p>
          </div>

          {/* Content */}
          <div className="mt-10 space-y-8 text-gray-300 leading-relaxed text-sm md:text-base">
            <section>
              <p>
                DevMatch is a social platform for developers to discover and
                connect. We do not sell physical goods and currently do not
                offer paid subscriptions or in-app purchases.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-white">Account Cancellation</h2>
              <p className="mt-2">
                You can cancel your DevMatch account at any time by visiting
                your account settings and choosing to delete your account.
                Deleting your account will log you out and schedule your profile
                and matches for removal in accordance with our data retention
                practices.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-white">Refunds</h2>
              <p className="mt-2">
                <span className="font-medium">Refunds are not applicable.</span>{" "}
                DevMatch currently does not charge users and does not process
                payments. If paid features are introduced in the future, this
                page will be updated with the applicable refund terms.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-white">Data Deletion</h2>
              <p className="mt-2">
                If you delete your account, we will remove or anonymize your
                personal data in line with our Privacy Policy and applicable
                laws. Certain minimal records may be retained for security,
                compliance, or fraud-prevention purposes.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-white">Questions</h2>
              <p className="mt-2">
                Need help with account cancellation or data deletion? Contact us
                at{" "}
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

export default RefundPolicy;
