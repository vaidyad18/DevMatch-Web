import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative text-sm"
      style={{
        background:
          "radial-gradient(60rem 60rem at 10% -20%, hsl(var(--brand-start)/.10), transparent), radial-gradient(70rem 70rem at 110% 120%, hsl(var(--brand-end)/.10), transparent), #0a0a0a",
      }}
    >
      <div
        className="h-[1px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(var(--brand-start)/.7), hsl(var(--brand-end)/.7), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        {/* CTA Banner */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
          <div
            className="absolute -inset-px rounded-2xl -z-10"
            style={{
              background:
                "linear-gradient(#111,#111) padding-box, linear-gradient(90deg,hsl(var(--brand-start)),hsl(var(--brand-end))) border-box",
              border: "1px solid transparent",
            }}
          />
          <div className="px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/60">
                DevMatch
              </p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
                Meet your next{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
                  collaborator
                </span>
              </h3>
              <p className="mt-2 text-white/70 max-w-prose">
                Discover developers, exchange ideas, and turn connections into
                real projects.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/feed"
                onClick={handleScrollToTop}
                className="inline-flex items-center justify-center h-11 px-5 rounded-lg text-white font-medium shadow-sm hover:opacity-95 transition"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--brand-start)), hsl(var(--brand-end)))",
                }}
              >
                Explore Feed
              </Link>
              <Link
                to="/profile"
                onClick={handleScrollToTop}
                className="inline-flex items-center justify-center h-11 px-5 rounded-lg border border-white/10 bg-white/5 text-white/90 hover:bg-white/10 transition"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Columns */}
        <div className="mt-12 grid gap-10 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
              <span className="text-2xl honk font-semibold text-white">
                DevMatch
              </span>
            <p className="text-white/70 mt-2 leading-relaxed">
              A platform where developers connect to collaborate and build
              software together.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.linkedin.com/in/vaidyadandriyal/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="h-9 w-9 grid place-items-center rounded-lg border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://github.com/vaidyad18"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="h-9 w-9 grid place-items-center rounded-lg border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-white/90 font-semibold">Navigate</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/"
                  onClick={handleScrollToTop}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/feed"
                  onClick={handleScrollToTop}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Explore Feed
                </Link>
              </li>
              <li>
                <Link
                  to="/meet-dev"
                  onClick={handleScrollToTop}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Meet Dev
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  onClick={handleScrollToTop}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white/90 font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  to="/terms-&-conditions"
                  onClick={handleScrollToTop}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  onClick={handleScrollToTop}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation-&-refund-policy"
                  onClick={handleScrollToTop}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Cancellation & Refund
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/90 font-semibold">Contact</h4>
            <ul className="mt-4 space-y-3 text-white/75">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-white/60" />
                <span>
                  Rani Bagh, Pitampura, North West Delhi, Delhi 110034
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-white/60" />
                <a
                  href="mailto:vaidyadandriyal04@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  vaidyadandriyal04@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-5">
          <p className="text-xs text-white/60">
            © {year} DevMatch. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/privacy-policy"
              onClick={handleScrollToTop}
              className="text-white/60 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <span className="text-white/20">•</span>
            <Link
              to="/terms-&-conditions"
              onClick={handleScrollToTop}
              className="text-white/60 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <span className="text-white/20">•</span>
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToTop();
              }}
              className="text-white/60 hover:text-white transition-colors"
            >
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
