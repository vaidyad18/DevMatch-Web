import React, { useState } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../lib/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("vishu@gmail.com");
  const [password, setPassword] = useState("Vihaan@123");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailId(value);
    setEmailError(validateEmail(value) ? "" : "Please enter a valid email address");
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
      setError(err?.response?.data || "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen grid place-items-center px-4"
      style={{
        background:
          "radial-gradient(60rem 60rem at 10% -10%, hsl(var(--brand-start)/.15), transparent), radial-gradient(60rem 60rem at 90% 110%, hsl(var(--brand-end)/.15), transparent)",
      }}
    >
      <div className="w-full -mt-16 max-w-md">
        {/* Card with even gradient border */}
        <div
          className="rounded-2xl shadow-2xl"
          style={{
            background:
              "linear-gradient(#ffffff,#ffffff) padding-box, linear-gradient(90deg,hsl(var(--brand-start)),hsl(var(--brand-end))) border-box",
            border: "1px solid transparent",
          }}
        >
          <div className="rounded-2xl bg-white p-6 sm:p-8">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(234_12%_12%)]">
                Welcome back
              </h1>
              <p className="mt-1 text-[hsl(232_10%_45%)]">Sign in to continue</p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleLogin} noValidate>
              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">
                  Email
                </label>
                <div className="relative">
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
                      focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]
                    `}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">
                  Password
                </label>
                <div className="relative">
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
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Server error */}
              {!!error && <div className="text-red-500 text-sm">{error}</div>}

              {/* Submit */}
              <button
                type="submit"
                disabled={!!emailError}
                className="mt-2 inline-flex w-full items-center justify-center gap-2
                           rounded-md h-11 text-white font-medium
                           bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]
                           hover:opacity-95 disabled:opacity-60"
              >
                <LogIn className="h-4 w-4" />
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[hsl(232_10%_45%)]">
              New here?{" "}
              <Link
                to="/signup"
                className="font-medium text-[hsl(var(--brand-end))] hover:opacity-90"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
