import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RefundPolicy = () => {
  return (
    <div className="relative">
      <section
        id="refund-policy"
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

          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-transparent bg-clip-text">
              Cancellation & Refund Policy
            </h1>
            <p className="mt-3 text-muted-foreground">Last updated: September 09, 2025</p>
          </div>

          {/* Content */}
          <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed text-sm md:text-base">

            <section>
              <p>
                DevMatch is a social platform for developers to discover and connect. We do not sell
                physical goods and currently do not offer paid subscriptions or in-app purchases.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Account Cancellation</h2>
              <p className="mt-2">
                You can cancel your DevMatch account at any time by visiting your account settings
                and choosing to delete your account. Deleting your account will log you out and
                schedule your profile and matches for removal in accordance with our data retention
                practices.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Refunds</h2>
              <p className="mt-2">
                <span className="font-medium">Refunds are not applicable.</span> DevMatch currently
                does not charge users and does not process payments. If paid features are introduced
                in the future, this page will be updated with the applicable refund terms.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Data Deletion</h2>
              <p className="mt-2">
                If you delete your account, we will remove or anonymize your personal data in line
                with our Privacy Policy and applicable laws. Certain minimal records may be retained
                for security, compliance, or fraud-prevention purposes.
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-foreground">Questions</h2>
              <p className="mt-2">
                Need help with account cancellation or data deletion? Contact us at{" "}
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

export default RefundPolicy;
