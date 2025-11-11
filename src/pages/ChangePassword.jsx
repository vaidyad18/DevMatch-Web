import React, { useState, useRef, useEffect } from "react";
import { Lock, Eye, EyeOff, KeyRound } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../lib/constants";
import LiquidEther from "../components/LiquidEther";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const etherRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword) {
      toast.error("Both old and new passwords are required", {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark",
      });
      return;
    }

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/password`,
        { oldPassword, newPassword },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Password updated successfully!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
        onClose: () => navigate("/"), 
      });

      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      const msg =
        err.response?.data || err.message || "Something went wrong";
      toast.error(msg, {
        position: "bottom-right",
        autoClose: 2500,
        theme: "dark",
      });
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
    <div className="relative h-screen w-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Toast container */}
      <ToastContainer />

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
      <div id="ether-overlay" className="absolute inset-0 z-10 pointer-events-none" />

      {/* Main card */}
      <div className="relative z-20 w-[90%] max-w-[500px] bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.4)] p-8 text-white">
        <h1 className="text-3xl font-bold text-center mb-2">Change Password</h1>
        <p className="text-center text-gray-400 text-sm mb-6">
          Secure your account with a new password
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Old password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Old Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type={showOld ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password"
                className="w-full h-11 rounded-md px-10 pr-10 bg-white/10 text-white placeholder:text-gray-400 border border-gray-600 focus:ring-2 focus:ring-[hsl(var(--brand-end))] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowOld((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showOld ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* New password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              New Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full h-11 rounded-md px-10 pr-10 bg-white/10 text-white placeholder:text-gray-400 border border-gray-600 focus:ring-2 focus:ring-[hsl(var(--brand-end))] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowNew((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Must include uppercase, lowercase, number & symbol.
            </p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full mt-3 inline-flex items-center justify-center gap-2
            h-11 rounded-md font-medium text-white
            bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]
            hover:opacity-95 transition-all"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
