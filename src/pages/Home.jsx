import {
  Code2,
  GitFork,
  MessageSquareHeart,
  Users,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LiquidEther from "../components/LiquidEther";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import GradientText from "../components/GradientText";

export default function Home() {
  const user = useSelector((store) => store.user);
  const etherRef = useRef(null);

  useEffect(() => {
    const proxy = document.getElementById("mouse-overlay");
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

  const features = [
    {
      icon: <MessageSquareHeart className="h-6 w-6" />,
      title: "Smart Matching",
      desc: "Our algorithm matches you with developers based on skills, interests, and collaboration goals.",
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Professional Focus",
      desc: "Connect with developers for collaboration, mentorship, or building the next big thing together.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Instant Connections",
      desc: "Swipe right to connect, start chatting immediately, and turn connections into collaborations.",
    },
  ];

  const steps = [
    {
      num: 1,
      title: "Create Your Profile",
      desc: "Showcase your skills, projects, and what you're looking for in a collaboration partner.",
    },
    {
      num: 2,
      title: "Swipe & Connect",
      desc: "Browse developer profiles and swipe right on those you'd like to connect with.",
    },
    {
      num: 3,
      title: "Start Collaborating",
      desc: "Once you match, chat, share ideas, and start building amazing projects together.",
    },
  ];

  return (
    <div className="w-full min-h-screen relative flex justify-center items-center bg-black overflow-hidden">
      <div
        ref={etherRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "auto",
        }}
      >

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

      <div
        id="mouse-overlay"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />

      <div
        className="relative z-10 flex flex-col justify-center items-center w-full text-white"
        style={{ pointerEvents: "auto" }}
      >
        <section
          id="home"
          className="w-full pb-24 md:pb-32 pt-44 px-6 lg:px-10 text-center"
        >
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1 text-xs bg-white/10 text-white/80 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]" />
                DevMatch - Connect. Code. Collaborate.
              </span>

              <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
                Meet your next
                <GradientText
                  colors={[
                    "hsl(var(--brand-start))",
                    "hsl(var(--brand-end))",
                    "hsl(var(--brand-start))",
                    "hsl(var(--brand-end))",
                    "hsl(var(--brand-start))",
                  ]}
                  animationSpeed={3}
                  showBorder={false}
                  className="custom-class"
                >
                  <span className="font-bold">collaborator</span>
                </GradientText>
              </h1>

              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                Swipe to discover talented developers, collaborate on projects,
                and build meaningful professional relationships in the tech
                world.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <Link
                  to={user ? "/feed" : "/login"}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-5  text-white bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] hover:opacity-90 backdrop-blur-sm transition"
                >
                  Start Networking
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/meet-dev"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-5 border border-white/30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition"
                >
                  Meet the Developer
                </Link>
              </div>
              <div className="mt-10 flex items-center justify-center gap-20 text-sm">
                {[
                  {
                    icon: <Users className="h-4 w-4" />,
                    label: "Solo builder",
                    value: "1",
                  },
                  {
                    icon: <GitFork className="h-4 w-4" />,
                    label: "Demo matches",
                    value: "3",
                  },
                  {
                    icon: <Code2 className="h-4 w-4" />,
                    label: "Version",
                    value: "v0.1",
                  },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="flex justify-center items-center gap-3"
                  >
                    <div className="h-10 w-10 rounded-xl grid place-items-center border border-border bg-gradient-to-tr from-[hsl(var(--brand-start)/.18)] to-[hsl(var(--brand-end)/.18)]">
                      <span className="text-foreground/80">{icon}</span>
                    </div>
                    <div className="text-left">
                      <div className="font-semibold leading-none text-foreground">
                        {value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        <section id="features" className="w-full py-24 md:py-32 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Networking Made{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
                Simple
              </span>
            </h2>
            <p className="text-gray-300 mb-10">
              Swipe, match and collaborate with a profile built for developers.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-6 transition hover:bg-white/20"
                >
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-tr from-[hsl(var(--brand-start)/.25)] to-[hsl(var(--brand-end)/.25)] flex items-center justify-center mx-auto mb-4 text-[hsl(var(--brand-start))]">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-xl">{f.title}</h3>
                  <p className="mt-2 text-md text-gray-300">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="how-it-works"
          className="w-full py-24 md:py-32 px-6 lg:px-10"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
                DevMatch{" "}
              </span>
              Works
            </h2>
            <p className="text-gray-300 mb-12">
              Three easy steps to find your next dev match.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className="rounded-2xl border border-white/20 bg-white/10 text-white p-8 backdrop-blur-md"
                >
                  <div className="h-12 w-12 mx-auto mb-5 rounded-full bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] grid place-items-center text-2xl font-semibold">
                    {s.num}
                  </div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-md text-gray-300">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full pb-48 pt-24 md:pt-32 text-center px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Find Your Next{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
                Coding Partner?
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Join thousands of developers already networking and building
              together.
            </p>
            <div className="flex flex-col mt-10 sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <button className="flex bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] hover:opacity-95 transition shadow-sm font-semibold text-lg text-white px-10 py-3 rounded-lg items-center space-x-2">
                  <Star className="w-5 h-5" /> <span>Join DevMatch Free</span>
                </button>
              </Link>
              <Link to="/memberships">
                <button className="flex items-center shadow-sm font-semibold text-lg border border-white/20 bg-white/10 hover:bg-white/20 px-10 py-3 rounded-lg space-x-2 text-white">
                  <Zap className="w-5 h-5" /> <span>View Premium Features</span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
