import { Github, Linkedin, Mail, Rocket, Globe } from "lucide-react";
import Backbutton from "../components/BackButton";

const MeetDev = () => {
  return (
    <div
      className="min-h-screen w-full px-4 py-16 flex flex-col items-center"
      style={{
        background:
          "radial-gradient(60rem 60rem at 10% -10%, hsl(var(--brand-start)/.15), transparent), radial-gradient(60rem 60rem at 90% 110%, hsl(var(--brand-end)/.15), transparent)",
      }}
    >
      <div className="fixed top-20 left-4 z-50">
          <Backbutton />
        </div>
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-transparent bg-clip-text">
          Meet the Developer
        </h1>
        <p className="mt-3 text-[hsl(232_10%_45%)] text-lg sm:text-xl">
          Behind every swipe, match, and connection — meet the mind powering DevMatch.
        </p>
      </div>

      <div
        className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white border rounded-2xl shadow-xl p-8"
        style={{
          background:
            "linear-gradient(#ffffff,#ffffff) padding-box, linear-gradient(90deg,hsl(var(--brand-start)),hsl(var(--brand-end))) border-box",
          border: "1px solid transparent",
        }}
      >
        <div>
          <h2 className="text-3xl font-semibold mb-2 text-[hsl(var(--brand-start))]">Vaidya Dandriyal</h2>
          <p className="text-[hsl(232_10%_45%)] text-base">
            I'm a full-stack developer and the creator of <strong>DevMatch</strong> - a Tinder-style platform for developers to connect and collaborate.
            From real-time Socket.io chat to Razorpay premium memberships, I built this product to empower devs to find meaningful collabs.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-[hsl(234_12%_12%)]">
            <li>🚀 Final-year BTech student with strong DSA skills (C++, 150+ problems)</li>
            <li>🧠 Built Nexume — AI Resume Builder (Gemini API + Strapi)</li>
            <li>⚙️ MERN stack, AWS EC2, Vercel, Razorpay, TailwindCSS</li>
            <li>🎯 Passionate about startups, dev tools, and clean UI</li>
          </ul>

          <div className="mt-6 flex gap-4 flex-wrap">
            <a
              href="https://github.com/vaidyad18"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-[#181717] text-white rounded-md hover:opacity-90 transition"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/vaidyadandriyal/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-[#0077B5] text-white rounded-md hover:opacity-90 transition"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>

            <a
              href="mailto:vaidyadandriyal04@gmail.com"
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
            >
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src="https://vaidya-d-portfolio.vercel.app/assets/pfp-KCnjZ4mm.jpg"
            alt="Vaidya Dandriyal"
            className="rounded-xl shadow-md w-64 h-64 object-cover border border-gray-300"
          />
        </div>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--brand-end))] mb-2">
          Want to collaborate or hire me?
        </h2>
        <p className="text-[hsl(232_10%_45%)] max-w-xl mx-auto mb-6">
          Open to SDE internships, full-stack collabs, and building cool dev tools.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="mailto:vaidyadandriyal04@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full shadow-md bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] hover:opacity-90"
          >
            <Rocket className="w-5 h-5" />
            Let’s Build Together
          </a>

          <a
            href="https://vaidya-d-portfolio.vercel.app"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-50 transition"
          >
            <Globe className="w-5 h-5" />
            View My Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default MeetDev;
