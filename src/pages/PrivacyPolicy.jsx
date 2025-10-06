import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="relative bg-background text-foreground min-h-screen">
      <section
        id="privacy-policy"
        className="relative isolate overflow-hidden"
        style={{
          background:
            "radial-gradient(35rem 35rem at 20% 0%, hsl(var(--brand-start)/.15), transparent)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-10 pt-16 md:pt-24 pb-16 md:pb-24 relative">
          {/* Back Button */}
          <Link
            to="/"
            className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-[hsl(var(--brand-start))] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          {/* Page Heading */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-transparent bg-clip-text">
  Privacy Policy
</h1>


            <p className="mt-3 text-muted-foreground">Last updated: September 09, 2025</p>
          </div>

          {/* Content */}
          <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed text-sm md:text-base">
            <section>
              <p>
                This Privacy Policy explains how{" "}
                <span className="font-semibold text-foreground">DevMatch</span>{" "}
                (operated by VAIDYA DANDRIYAL) collects, uses, and protects your information when
                you use our website or services.
              </p>
              <p className="mt-3">
                By using DevMatch, you agree to the practices described in this policy. We may
                update this page from time to time, so please review it periodically.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Information We Collect</h2>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Name and contact details (e.g., email)</li>
                <li>Profile information you choose to share (skills, GitHub, interests)</li>
                <li>Usage data (logins, interactions, matches)</li>
                <li>Technical information (IP address, browser type)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">How We Use Your Information</h2>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>To create and maintain your developer profile</li>
                <li>To enable matching, messaging, and collaboration features</li>
                <li>To improve platform performance and user experience</li>
                <li>To communicate important updates or policy changes</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Security</h2>
              <p className="mt-2">
                We are committed to protecting your personal data. We implement reasonable
                technical and organizational measures, but no method of transmission over the
                internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Cookies</h2>
              <p className="mt-2">
                DevMatch uses cookies to enhance your experience, such as keeping you signed in
                and analyzing site traffic. You can control cookies through your browser settings,
                but disabling them may limit functionality.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Your Rights & Control</h2>
              <p className="mt-2">
                You may update or delete your account information anytime through account
                settings. For data removal requests or privacy concerns, contact us directly.
              </p>
              <p className="mt-3">
                We will never sell or lease your personal information to third parties. Data is
                only shared when legally required or with trusted service providers essential for
                running the platform.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Contact Us</h2>
              <p className="mt-2">
                If you have questions about this Privacy Policy, reach us at:{" "}
                <a
                  href="mailto:vaidyadandriyal04@gmail.com"
                  className="underline decoration-[hsl(var(--brand-start))] underline-offset-2"
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
