import React, { useState, useRef, useEffect } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff, Loader2 } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../lib/constants";
import LiquidEther from "../components/LiquidEther";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
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
      <div className="relative z-20 w-[95%] sm:w-[90%] md:w-[1100px] my-10 min-h-[600px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col-reverse md:flex-row">
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer transition-all duration-200 hover:text-[hsl(var(--brand-end))]"
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
              disabled={!!emailError || loading}
              className="mt-4 inline-flex w-full items-center justify-center gap-2
                         rounded-md h-11 text-white font-medium
                         bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]
                         hover:opacity-95 disabled:opacity-60 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center w-full">
            {/* Divider with 'or' */}
            <div className="flex items-center w-full">
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              <p className="text-gray-500 text-sm mx-3">or</p>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            <button
              onClick={() => {
                window.location.href = `${BASE_URL}/auth/google`;
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white h-11 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                  fill="#EA4335"
                />
              </svg>
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
