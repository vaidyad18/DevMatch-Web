import React, { useState, useRef, useEffect } from "react";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import LiquidEther from "../components/LiquidEther";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const etherRef = useRef(null);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validate = () => {
    const e = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!firstName.trim()) e.firstName = "First name is required";
    if (!lastName.trim()) e.lastName = "Last name is required";
    if (!validateEmail(emailId))
      e.emailId = "Please enter a valid email address";
    if (!passwordRegex.test(password))
      e.password =
        "Password must be at least 8 characters and include uppercase, lowercase, number, and symbol";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      navigate("/profile");
    } catch (err) {
      console.error(err);
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
      {/* Background animation */}
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

      <div className="relative z-20 w-[90%] md:w-[1100px] min-h-[600px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col md:flex-row">
        {/* Left side illustration */}
        <div className="bg-gradient-to-br from-black via-[hsl(var(--brand-start)/0.4)] to-[hsl(var(--brand-end)/0.4)] md:w-7/12 w-full flex flex-col justify-center items-center text-center p-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Join DevMatch
          </h1>
          <p className="text-gray-300 max-w-sm text-md">
            Collaborate, connect, and grow with developers worldwide.
          </p>
        </div>

        {/* Right side form */}
        <div className="flex-1 flex flex-col justify-center bg-white text-black px-8 sm:px-12 py-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Create your account
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Sign up and start building together
          </p>

          <form className="space-y-4" onSubmit={onSubmit} noValidate>
            {/* First name */}
            <div className="flex gap-4 justify-center items-center">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-800">
                  First name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className={`w-full h-11 rounded-md px-10 outline-none transition
                    bg-white text-black placeholder:text-gray-400
                    border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }
                    focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]`}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              {/* Last name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-800">
                  Last name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className={`w-full h-11 rounded-md px-10 outline-none transition
                    bg-white text-black placeholder:text-gray-400
                    border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }
                    focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]`}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-800">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full h-11 rounded-md px-10 outline-none transition
                    bg-white text-black placeholder:text-gray-400
                    border ${
                      errors.emailId ? "border-red-500" : "border-gray-300"
                    }
                    focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]`}
                />
              </div>
              {errors.emailId && (
                <p className="text-red-500 text-xs mt-1">{errors.emailId}</p>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full h-11 rounded-md px-10 pr-10 outline-none transition
                    bg-white text-black placeholder:text-gray-400
                    border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }
                    focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
              <p className="text-[11px] text-gray-500 mt-1">
                Use 8+ characters. Mix letters, numbers & symbols.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center gap-2
                rounded-md h-11 text-white font-medium
                bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]
                hover:opacity-95"
            >
              <UserPlus className="h-4 w-4" />
              Create account
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center w-full">
            <div className="flex items-center w-full">
              <div className="flex-1 h-[1px] bg-gray-300"></div>
              <p className="text-gray-500 text-sm mx-3">or</p>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-[hsl(var(--brand-end))] hover:opacity-90"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
