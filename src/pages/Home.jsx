import React from "react";
import {
  Code2,
  GitFork,
  MessageSquareHeart,
  Users,
  ArrowRight,
} from "lucide-react";
import ParallaxBg from "../components/ParallexBg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const user = useSelector((store) => store.user);

  const features = [
    {
      icon: <MessageSquareHeart className="h-5 w-5" />,
      title: "Smart matches",
      desc: "We match by skills, interests and availability so you meet the right devs.",
    },
    {
      icon: <Code2 className="h-5 w-5" />,
      title: "Show your stack",
      desc: "Highlight repos, tech and interests with a clean, developer-first profile.",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Your dev graph",
      desc: "Grow trusted connections and discover opportunities across the network.",
    },
  ];

  const steps = [
    {
      num: 1,
      title: "Create profile",
      desc: "Share your skills, GitHub and what you want to build.",
    },
    {
      num: 2,
      title: "Swipe and match",
      desc: "Like developers you vibe with. Mutual likes open a chat.",
    },
    {
      num: 3,
      title: "Start building",
      desc: "Share repos, plan sprints and ship something awesome.",
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
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs bg-card/70 text-foreground/80">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]" />
                DevMatch • Social for developers
              </span>

              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                Meet your next{" "}
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
                  collaborator
                </span>
              </h1>

              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-prose">
                DevMatch is a social platform where developers discover each
                other, send requests, and connect to build great software
                together.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-3" id="cta">
                <Link
                  to={user ? "/feed" : "/login"}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-5 text-white bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] hover:opacity-90 shadow-sm"
                >
                  Start swiping
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-5 border border-border bg-card hover:bg-[hsl(var(--secondary))] text-foreground"
                >
                  See features
                </a>
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

            {/* Preview Card */}
            <div className="relative">
              <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-[hsl(var(--brand-start)/.35)] to-[hsl(var(--brand-end)/.35)] shadow-xl">
                <div className="rounded-[calc(theme(borderRadius.3xl)-1px)] bg-card border border-border h-[320px] md:h-[380px] lg:h-[420px] overflow-hidden">
                  <div className="h-full w-full grid place-items-center text-muted-foreground">
                    <div className="text-center px-8">
                      <div className="text-sm uppercase tracking-wide">
                        Preview
                      </div>
                      <div className="mt-2 text-2xl font-semibold text-foreground">
                        Profiles, Matches & Requests
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        A clean developer-first UI with gradient DNA.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 inset-0 blur-3xl bg-[radial-gradient(35rem_35rem_at_80%_0%,hsl(var(--brand-end)/.18),transparent)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative overflow-hidden">
        {/* keep background gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(35rem_35rem_at_20%_0%,hsl(var(--brand-start)/.18),transparent)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Everything you need to connect and build
            </h2>
            <p className="mt-3 text-muted-foreground">
              Swipe, match and collaborate with a profile built for developers.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border bg-card transition"
              >
                <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] p-6 h-full">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-[hsl(var(--brand-start)/.18)] to-[hsl(var(--brand-end)/.18)] flex items-center justify-center mb-4 text-[hsl(var(--brand-start))]">
                    {f.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
                  {/* hover underline stays gradient */}
                  <div className="mt-4 h-[2px] w-0 bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] transition-all duration-300 group-hover:w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(35rem_35rem_at_20%_0%,hsl(var(--brand-start)/.18),transparent)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              How it works
            </h2>
            <p className="mt-3 text-muted-foreground">
              Three easy steps to find your next dev match.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <div
                key={s.num}
                className="rounded-2xl border border-border bg-card text-foreground p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-white grid place-items-center text-sm font-semibold">
                    {s.num}
                  </div>
                  <h3 className="font-semibold">{s.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet devs */}
      <section
        id="meet-dev"
        className="mx-auto max-w-7xl px-6 lg:px-10 py-14 md:py-20"
      >
        <div className="relative rounded-3xl border border-border bg-card text-foreground p-8 md:p-12 overflow-hidden">
          <div className="absolute -inset-1 rounded-[1.6rem] bg-gradient-to-r from-[hsl(var(--brand-start)/.18)] to-[hsl(var(--brand-end)/.18)] -z-10" />
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">
                Meet devs who want to build
              </h3>
              <p className="mt-3 text-muted-foreground">
                Create your profile and start matching in minutes.
              </p>
            </div>
            <div className="flex md:justify-end">
              <Link
                to={user ? "/feed" : "/login"}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-11 px-5 text-white bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] hover:opacity-90 shadow-sm"
              >
                Join DevMatch
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
