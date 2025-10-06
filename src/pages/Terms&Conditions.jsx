import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsConditions = () => {
  return (
    <div className="relative">
      <section
        id="terms-conditions"
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
            className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[hsl(var(--brand-end))] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          {/* Page Heading */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-transparent bg-clip-text">
              Terms & Conditions
            </h1>
            <p className="mt-3 text-muted-foreground">Last updated: September 09, 2025</p>
          </div>

          {/* Content */}
          <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed text-sm md:text-base">

            <section>
              <p>
                For the purpose of these Terms and Conditions, the terms{" "}
                <span className="font-semibold text-foreground">"we", "us", "our"</span>{" "}
                shall mean <span className="font-semibold">VAIDYA DANDRIYAL</span>, operator of
                DevMatch. The terms{" "}
                <span className="font-semibold">"you", "your", "user", "visitor"</span> refer to
                any natural or legal person using the DevMatch platform.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">General Usage</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>By accessing DevMatch, you agree to use the platform for lawful purposes only.</li>
                <li>The content and features of DevMatch may change from time to time without notice.</li>
                <li>We do not guarantee uninterrupted service or absolute accuracy of information shared on user profiles.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Intellectual Property</h2>
              <p className="mt-2">
                All rights to the design, branding, layout, and original content on DevMatch are owned or licensed by us. Reproduction or redistribution without prior consent is prohibited.
              </p>
              <p className="mt-2">
                User-generated content (profiles, projects, posts) remains the property of the user, but by posting on DevMatch you grant us a limited license to display and share it within the platform.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Restrictions</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Misuse of the platform, including harassment, spam, or fraudulent activity, is strictly prohibited.</li>
                <li>Unauthorized use of DevMatch’s codebase, branding, or assets may give rise to legal claims.</li>
                <li>You may not create a link to DevMatch for malicious or misleading purposes.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Third-Party Links</h2>
              <p className="mt-2">
                DevMatch may contain links to external websites (such as GitHub or LinkedIn). We are not responsible for the practices, policies, or content of those websites.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Governing Law</h2>
              <p className="mt-2">
                These Terms shall be governed by the laws of India. Any disputes shall fall under the jurisdiction of the courts in Delhi, India.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
