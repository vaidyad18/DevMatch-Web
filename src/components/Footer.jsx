import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300">
      <div className="mx-auto max-w-6xl px-6 py-12 grid gap-8 md:grid-cols-3">
        {/* Column 1: Logo / Brand */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-white">DevMatch</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            <span className="block font-semibold text-gray-200">
              Meet your next collaborator
            </span>
            DevMatch is a social platform where developers discover each other,
            send requests, and connect to build great software together.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="grid grid-cols-2 gap-6 pl-5">
          <div>
            <h3 className="text-sm font-semibold text-white">Navigate</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/user/feed" className="hover:text-white transition-colors">
                  Explore Feed
                </Link>
              </li>
              <li>
                <Link to="/#meet-dev" className="hover:text-white transition-colors">
                  Meet Dev
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-white transition-colors">
                  Profile
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  to="/terms-&-conditions"
                  className="hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation-&-refund-policy"
                  className="hover:text-white transition-colors"
                >
                  Cancellation & Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3: Contact Info */}
        <div className="pl-10">
          <h3 className="text-sm font-semibold text-white">Contact Us</h3>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>
              <span className="text-gray-300">Merchant Legal Entity:</span>{" "}
              VAIDYA DANDRIYAL
            </li>
            <li>
              <span className="text-gray-300">Registered Address:</span> Rani
              Bagh, Pitampura North West Delhi, Delhi 110034
            </li>
            <li>
              <span className="text-gray-300">Operational Address:</span> Rani
              Bagh, Pitampura North West Delhi, Delhi 110034
            </li>
            <li>
              <span className="text-gray-300">Phone:</span>{" "}
              <a
                href="tel:+917703908277"
                className="hover:text-white transition-colors"
              >
                7703908277
              </a>
            </li>
            <li>
              <span className="text-gray-300">Email:</span>{" "}
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
      <div className="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} DevMatch. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
