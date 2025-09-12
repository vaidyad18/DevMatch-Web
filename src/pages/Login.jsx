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

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmailId(value);

    if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
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
      setError(err?.response?.data);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4 bg-[radial-gradient(60rem_60rem_at_10%_-10%,hsl(20_95%_60%/.15),transparent)]">
      <div className="w-full -mt-16 max-w-md">
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[hsl(20_95%_60%/.35)] to-[hsl(330_85%_65%/.35)] shadow-2xl">
          <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white border border-[hsl(220_13%_91%)] p-6 sm:p-8">
            <div className="text-center">
              <h1 className=" text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(234_12%_12%)]">
                Welcome back
              </h1>
              <p className="mt-1 text-[hsl(232_10%_45%)]">
                Sign in to continue
              </p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleLogin}>
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
                    className={`w-full h-11 rounded-md text-black border px-10 outline-none transition
                      ${emailError ? "border-red-500" : "border-gray-300"}
                    `}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                </div>
                {emailError && (
                  <p className="text-red-500 text-xs mt-1">{emailError}</p>
                )}
              </div>

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
                    className="w-full h-11 text-black rounded-md border px-10 pr-10 outline-none transition"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(232_10%_45%)]"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="text-red-500 text-sm">{error}</div>

              <button
                type="submit"
                disabled={!!emailError}
                className="mt-2 cursor-pointer inline-flex w-full items-center justify-center gap-2 rounded-md h-11 text-white font-medium bg-gradient-to-r from-[hsl(20_95%_60%)] to-[hsl(330_85%_65%)] hover:opacity-95 disabled:opacity-60"
              >
                <LogIn className="h-4 w-4" />
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[hsl(232_10%_45%)]">
              New here?{" "}
              <Link
                to="/signup"
                className="font-medium text-[hsl(330_85%_45%)] hover:underline"
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
