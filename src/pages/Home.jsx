import React from "react";
import {
  Code2,
  GitFork,
  MessageSquareHeart,
  Users,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";
import ParallaxBg from "../components/ParallexBg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((store) => store.user);

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
    <div className="relative">
      {/* Hero */}
      <section id="home" className="relative isolate overflow-hidden">
        <ParallaxBg />

        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-20 md:pt-28 pb-16 md:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs bg-card/90 text-foreground/80 ">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]" />
                DevMatch - Social for developers
              </span>

              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                Meet your next{" "}
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
                  collaborator
                </span>
              </h1>

              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-prose">
                Swipe to discover talented developers, collaborate on projects,
                and build meaningful professional relationships in the tech
                world.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-3" id="cta">
                <Link
                  to={user ? "/feed" : "/login"}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-md font-medium h-11 px-9 text-white bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] hover:opacity-90 shadow-sm"
                >
                  Start Networking
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/meet-dev"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-5 border border-border bg-card hover:bg-[hsl(var(--secondary))] text-foreground"
                >
                  Meet the Developer
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-10 grid grid-cols-3 gap-6 text-sm">
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
                  <div key={label} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl grid place-items-center border border-border bg-gradient-to-tr from-[hsl(var(--brand-start)/.18)] to-[hsl(var(--brand-end)/.18)]">
                      <span className="text-foreground/80">{icon}</span>
                    </div>
                    <div>
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
            </div>

            <div className="relative border">
              
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(35rem_35rem_at_20%_0%,hsl(var(--brand-start)/.18),transparent)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Networking Made{" "}
              <span className=" bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
                Simple
              </span>
            </h2>
            <p className="mt-3 text-md text-muted-foreground">
              Swipe, match and collaborate with a profile built for developers.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border bg-card transition"
                style={{
                  background:
                    "linear-gradient(#ffffff,#ffffff) padding-box, linear-gradient(90deg,hsl(var(--brand-start)),hsl(var(--brand-end))) border-box",
                  border: "1px solid transparent",
                }}
              >
                <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] p-6 h-full">
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-tr from-[hsl(var(--brand-start)/.18)] to-[hsl(var(--brand-end)/.18)] flex items-center justify-center mb-4 text-[hsl(var(--brand-start))]">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-xl text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-md text-muted-foreground">{f.desc}</p>
                  {/* hover underline stays gradient */}
                  <div className="mt-4 h-[2px] w-0 bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] transition-all duration-300 group-hover:w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(35rem_35rem_at_20%_0%,hsl(var(--brand-start)/.18),transparent)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
                DevMatch
              </span>{" "}
              Works
            </h2>
            <p className="mt-3 text-md text-muted-foreground">
              Three easy steps to find your next dev match.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.num}
                className="rounded-2xl border-gray-500 border bg-card text-foreground p-8"
              >
                <div className="text-center gap-3">
                  <div className="h-12 w-12 mx-auto mb-5 rounded-full bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-white grid place-items-center text-2xl font-semibold">
                    {s.num}
                  </div>
                  <h3 className=" text-xl font-bold">{s.title}</h3>
                </div>
                <p className="mt-3 text-center text-md text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Find Your Next{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
              Coding Partner?
            </span>
          </h2>
          <p className="text-xl text-gray-500">
            Join thousands of developers who are already networking and building
            together on DevMatch.
          </p>
          <div className="flex flex-col mt-10 sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <button className="flex bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] hover:opacity-95 transition shadow-sm font-semibold text-lg text-white px-10 py-3 rounded-lg items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Join DevMatch Free</span>
              </button>
            </Link>
            <Link to="/memberships">
              <button className="flex items-center shadow-sm font-semibold text-lg border-gray-300 border px-10 py-3 rounded-lg space-x-2">
                <Zap className="w-5 h-5" />
                <span>View Premium Features</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
