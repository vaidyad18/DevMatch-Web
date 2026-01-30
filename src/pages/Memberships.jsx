import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, Star, Crown, Info } from "lucide-react";
import { motion } from "framer-motion";
import LiquidEther from "../components/LiquidEther";
import { BASE_URL } from "../lib/constants";

const plans = [
  {
    name: "Current Plan",
    tagline: "Base membership plan",
    price: "Free",
    features: [
      "DevMatch feed",
      "Live chat",
      "Unlimited messaging",
      "Unlimited swipes",
      "Meet the developer of DevMatch",
    ],
    type: "basic",
    highlightLevel: 1,
  },
  {
    name: "Silver Membership",
    tagline: "Same features as all other plans",
    price: "₹149/month",
    features: [
      "DevMatch feed",
      "Live chat",
      "Unlimited messaging",
      "Unlimited swipes",
      "Meet the developer of DevMatch",
    ],
    type: "silver",
    highlightLevel: 2,
  },
  {
    name: "Elite Membership",
    tagline: "Same features as all other plans",
    price: "₹249/month",
    features: [
      "DevMatch feed",
      "Live chat",
      "Unlimited messaging",
      "Unlimited swipes",
      "Meet the developer of DevMatch",
    ],
    type: "gold",
    highlightLevel: 3,
    popular: true,
  },
];

const Memberships = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const etherRef = useRef(null);

  useEffect(() => {
    verifyUserPremium();
  }, []);

  const verifyUserPremium = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuy = async (type) => {
    try {
      if (!user) return navigate("/login");

      const orderRes = await axios.post(
        `${BASE_URL}/payment/create`,
        { type },
        { withCredentials: true }
      );

      const { orderId, notes, keyId } = orderRes.data;

      const options = {
        key: keyId,
        amount: orderRes.data.amount,
        currency: orderRes.data.currency,
        name: "DevMatch",
        description: "Membership Purchase",
        order_id: orderId,
        prefill: {
          name: `${notes?.firstName || ""} ${notes?.lastName || ""}`.trim(),
          email: notes?.emailId || "",
        },
        theme: { color: "#7C3AED" },
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${BASE_URL}/payment/verify`,
              response,
              { withCredentials: true }
            );

            if (verifyRes.data?.success && verifyRes.data?.isPremium)
              await verifyUserPremium();
            else alert("Payment verification failed");
          } catch (err) {
            console.error(err);
            alert("Verification error");
          }
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      alert("Could not start payment");
    }
  };

  if (isUserPremium) {
  return (
    <div className="min-h-screen grid place-items-center pt-20 bg-black text-white px-6">
      <div className="max-w-md text-center">
        <Crown className="mx-auto h-14 w-14 text-yellow-300 mb-4" />

        <h2 className="text-4xl font-semibold">Welcome, Premium Member</h2>

        <p className="text-gray-400 mt-3 leading-relaxed">
          You’ve unlocked all premium features. Enjoy everything DevMatch offers.
        </p>

        <div className="mt-8 space-y-3 text-left bg-zinc-900/50 p-5 rounded-xl border border-zinc-800">
          <h3 className="text-lg font-medium text-yellow-300">Your Plan Benefits</h3>

          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• DevMatch feed</li>
            <li>• Live chat</li>
            <li>• Unlimited messaging</li>
            <li>• Unlimited swipes</li>
            <li>• Meet the developer of DevMatch</li>
          </ul>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          Thanks for testing the Razorpay integration ✨
        </p>

        <button
          onClick={() => navigate("/feed")}
          className="mt-3 mb-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl transition-all"
        >
          Start Swiping
        </button>
      </div>
    </div>
  );
}


  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex items-start pt-28 pb-20">
      {/* Background */}
      <div ref={etherRef} className="absolute inset-0 z-0 pointer-events-none">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          cursorSize={120}
          mouseForce={20}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
        />
      </div>

      <div className="relative mt-5 z-20 w-full flex flex-col items-center px-6">
        {/* Hero */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-center"
        >
          Choose Your Membership
        </motion.h1>

        <div className="mt-6 flex items-center gap-3 text-center bg-white/5 px-5 py-3 rounded-xl border border-white/10 backdrop-blur-md">
          <Info className="h-5 w-5 text-blue-400" />
          <p className="text-gray-300 text-sm">
            All membership plans currently offer the same features. This setup
            is only for testing Razorpay integration in development mode.
          </p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-gray-300 max-w-2xl text-center"
        >
          Pick any plan to test the payment flow.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl w-full mt-14">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 bg-[#0d0d0d] border border-white/10 
                hover:scale-[1.03] hover:border-white/20 transition-all duration-300 flex flex-col
                ${
                  plan.highlightLevel === 3
                    ? "shadow-[0_0_45px_rgba(255,215,100,0.3)]"
                    : plan.highlightLevel === 2
                    ? "shadow-[0_0_25px_rgba(160,160,255,0.15)]"
                    : "shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl">
                  MOST POPULAR
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                {plan.highlightLevel === 3 ? (
                  <Crown className="h-7 w-7 text-yellow-400" />
                ) : plan.highlightLevel === 2 ? (
                  <Star className="h-7 w-7 text-blue-300" />
                ) : (
                  <Star className="h-7 w-7 text-gray-400" />
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
              </div>

              <p className="text-gray-400">{plan.tagline}</p>

              <p className="text-4xl font-extrabold mt-6">{plan.price}</p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span className="text-gray-300 text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleBuy(plan.type)}
                className={`mt-5 w-full py-3.5 rounded-xl font-semibold text-white transition
                  ${
                    plan.highlightLevel === 3
                      ? "bg-gradient-to-r from-yellow-600 to-yellow-500"
                      : plan.highlightLevel === 2
                      ? "bg-gradient-to-r from-blue-600 to-blue-700"
                      : "bg-gradient-to-r from-gray-700 to-gray-800"
                  }`}
              >
                Get {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Memberships;
