import { Github, Linkedin, Mail, Rocket, Globe } from "lucide-react";
import Backbutton from "../components/BackButton";
import LiquidEther from "../components/LiquidEther";
import { useRef, useEffect } from "react";

const MeetDev = () => {
  const etherRef = useRef(null);

  // Sync LiquidEther mouse movement
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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-white overflow-hidden bg-black">
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
      <div id="ether-overlay" className="absolute inset-0 z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 px-4 py-16 flex flex-col items-center w-full">
        {/* Back Button */}
        <div className="absolute top-28 left-56 z-50">
          <Backbutton />
        </div>

        {/* Heading */}
        <div className="max-w-3xl text-center mt-16 mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(120,60,255,0.3)]">
            Meet the Developer
          </h1>
          <p className="mt-3 text-gray-300 text-lg sm:text-xl">
            Behind every swipe, match, and connection, meet the mind powering{" "}
            <span className="text-[hsl(var(--brand-end))] font-medium">
              DevMatch
            </span>.
          </p>
        </div>

        {/* Info Card */}
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center rounded-2xl shadow-[0_0_25px_rgba(140,60,255,0.15)] p-8 backdrop-blur-2xl border border-[hsl(var(--brand-start)/.4)] bg-[rgba(15,15,15,0.6)]">
          {/* Left Section */}
          <div>
            <h2 className="text-3xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
              Vaidya Dandriyal
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              I'm a full-stack developer and the creator of{" "}
              <strong className="text-[hsl(var(--brand-end))]">DevMatch</strong>{" "}
              - a Tinder-style platform for developers to connect and
              collaborate. From real-time Socket.io chat to Razorpay premium
              memberships, I built this product to empower devs to find
              meaningful collabs.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-gray-400">
              <li>
                🚀 Final-year BTech student with strong DSA skills (C++, 450+
                problems)
              </li>
              <li>🧠 Built CareerPilot - AI-Powered Career Advancement Platform</li>
              <li>⚙️ C++, JavaScript, TypeScript, MERN Stack, TailwindCSS, AWS EC2</li>
              <li>🎯 Passionate about startups, dev tools, and clean UI</li>
            </ul>

            {/* Buttons */}
            <div className="mt-6 flex gap-4 flex-wrap">
              <a
                href="https://github.com/vaidyad18"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[#181717] text-white rounded-md hover:bg-[#262626] transition shadow-[0_0_10px_rgba(0,0,0,0.3)]"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/vaidyadandriyal/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-md hover:bg-[#0c7de0] transition shadow-[0_0_10px_rgba(10,102,194,0.4)]"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>

              <a
                href="mailto:vaidyadandriyal04@gmail.com"
                className="flex items-center gap-2 px-4 py-2 border border-[hsl(var(--brand-end)/.4)] rounded-md text-gray-300 hover:bg-[hsl(var(--brand-end)/.1)] hover:text-white transition"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </div>

          {/* Right Section - Profile */}
          <div className="flex justify-center">
            <img
              src="https://vaidya-d-portfolio.vercel.app/assets/pfp-KCnjZ4mm.jpg"
              alt="Vaidya Dandriyal"
              className="rounded-xl shadow-[0_0_25px_rgba(120,60,255,0.3)] w-64 h-64 object-cover border border-[hsl(var(--brand-start)/.4)]"
            />
          </div>
        </div>

        {/* Collaboration Section */}
        <div className="mt-20 text-center z-10">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-transparent bg-clip-text mb-2">
            Want to collaborate or hire me?
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            Open to SDE internships, full-stack collaborations, and building
            innovative dev tools.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:vaidyadandriyal04@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-full shadow-[0_0_15px_rgba(120,60,255,0.4)] bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] hover:opacity-90 transition-all"
            >
              <Rocket className="w-5 h-5" />
              Let’s Build Together
            </a>

            <a
              href="https://vaidya-d-portfolio.vercel.app"
              target="_blank"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[hsl(var(--brand-end)/.4)] text-gray-300 hover:bg-[hsl(var(--brand-end)/.1)] transition-all"
            >
              <Globe className="w-5 h-5" />
              View My Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetDev;
