import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, UserPlus } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validate = () => {
    const e = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!firstName.trim()) e.firstName = "First name is required";
    if (!lastName.trim()) e.lastName = "Last name is required";
    if (!validateEmail(emailId)) e.emailId = "Please enter a valid email address";
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

  return (
    <div
      className="min-h-screen grid place-items-center pt-28 pb-10 px-4"
      style={{
        background:
          "radial-gradient(60rem 60rem at 10% -10%, hsl(var(--brand-start)/.15), transparent), radial-gradient(60rem 60rem at 90% 110%, hsl(var(--brand-end)/.15), transparent)",
      }}
    >
      <div className="w-full -mt-16 max-w-md">
        {/* Card with gradient border */}
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
                Create your account
              </h1>
              <p className="mt-1 text-[hsl(232_10%_45%)]">
                Join DevMatch to find collaborators
              </p>
            </div>

            <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
              {/* First name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">
                  First name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className={`w-full h-11 rounded-md px-10 outline-none transition
                      bg-white text-black placeholder:text-gray-400
                      border ${errors.firstName ? "border-red-500" : "border-gray-300"}
                      focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]`}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              {/* Last name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">
                  Last name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Harley"
                    className={`w-full h-11 rounded-md px-10 outline-none transition
                      bg-white text-black placeholder:text-gray-400
                      border ${errors.lastName ? "border-red-500" : "border-gray-300"}
                      focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]`}
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(234_12%_12%)]">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full h-11 rounded-md px-10 outline-none transition
                      bg-white text-black placeholder:text-gray-400
                      border ${errors.emailId ? "border-red-500" : "border-gray-300"}
                      focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]`}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.emailId && (
                  <p className="text-red-500 text-xs mt-1">{errors.emailId}</p>
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full h-11 rounded-md px-10 pr-10 outline-none transition
                      bg-white text-black placeholder:text-gray-400
                      border ${errors.password ? "border-red-500" : "border-gray-300"}
                      focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-end))]`}
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                className="mt-2 inline-flex w-full items-center justify-center gap-2
                  rounded-md h-11 text-white font-medium
                  bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]
                  hover:opacity-95"
              >
                <UserPlus className="h-4 w-4" />
                Create account
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[hsl(232_10%_45%)]">
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
    </div>
  );
};

export default Signup;
