import React, { useState, useRef, useEffect } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../lib/constants";
import LiquidEther from "../components/LiquidEther";
import { GoogleLogin } from "@react-oauth/google"; // 👇

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const etherRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailId(value);
    setEmailError(
      validateEmail(value) ? "" : "Please enter a valid email address"
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailError || !validateEmail(emailId)) {
      setEmailError("Please enter a valid email address before logging in");
      return;
    }
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(
        err?.response?.data || "Something went wrong. Please try again."
      );
    }
  };

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
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
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
      <div
        id="ether-overlay"
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Main Login Card */}
      <div className="relative z-20 w-[90%] md:w-[1100px] min-h-[600px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col md:flex-row">
        {/* Left: Form Section */}
        <div className="flex-1 flex flex-col justify-center bg-white text-black px-8 sm:px-12 py-10">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Welcome back
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Sign in to continue your journey
          </p>

          <form className="space-y-4" onSubmit={handleLogin} noValidate>
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-800">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={emailId}
                  onChange={handleEmailChange}
                  placeholder="you@example.com"
                  aria-invalid={!!emailError}
                  className={`w-full h-11 rounded-md px-10 outline-none transition
                    bg-white text-black placeholder:text-gray-400
                    border ${emailError ? "border-red-500" : "border-gray-300"}
                    focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]`}
                />
              </div>
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-800">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 rounded-md px-10 pr-10 outline-none transition
                             bg-white text-black placeholder:text-gray-400
                             border border-gray-300 focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {!!error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Submit */}
            <button
              type="submit"
              disabled={!!emailError}
              className="mt-4 inline-flex w-full items-center justify-center gap-2
                         rounded-md h-11 text-white font-medium
                         bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]
                         hover:opacity-95 disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center w-full">
            {/* Divider with 'or' */}
            <div className="flex items-center w-full">
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              <p className="text-gray-500 text-sm mx-3">or</p>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* Google Button */}
            <button
              onClick={() =>
                (window.location.href = "http://localhost:7777/api/auth/google")
              }
              className="mt-5 inline-flex items-center justify-center gap-3 w-full h-11
               bg-white border border-gray-300 text-gray-700 font-medium rounded-md
               shadow-sm hover:bg-gray-100 transition-all duration-150 ease-in-out"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              Continue with Google
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            New here?{" "}
            <Link
              to="/signup"
              className="font-medium text-[hsl(var(--brand-end))] hover:opacity-90"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Right Side: Illustration */}
        <div className="bg-gradient-to-br from-black via-[hsl(var(--brand-start)/0.4)] to-[hsl(var(--brand-end)/0.4)] md:w-7/12 w-full flex flex-col justify-center items-center text-center p-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Welcome to DevMatch
          </h1>
          <p className="text-gray-300 max-w-sm text-md">
            Connect, collaborate, and build with developers who share your
            vision.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
