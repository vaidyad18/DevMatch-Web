import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, Star, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { BASE_URL } from "../lib/constants";

const plans = [
  {
    name: "Current Plan",
    tagline: "Your active base membership plan",
    price: "Free",
    color: "from-gray-200 via-gray-300 to-gray-400",
    glow: "shadow-[0_0_25px_rgba(156,163,175,0.35)]",
    features: [
      "Access to DevMatch feed",
      "Basic collaboration tools",
      "Community support",
      "3 project uploads/month",
      "Email support",
    ],
    type: "silver",
  },
  {
    name: "Elite Membership",
    tagline: "For professionals aiming to stand out",
    price: "₹999/month",
    color: "from-[#FFF9E6] via-[#FFE9A3] to-[#FFD75E]", // light gold bg
    glow: "shadow-[0_0_35px_rgba(255,223,120,0.5)]",
    features: [
      "Everything in Current Plan",
      "Unlimited project uploads",
      "Priority support (24×7)",
      "Advanced analytics dashboard",
      "Exclusive developer events",
      "Early access to beta features",
      "AI-powered project suggestions",
    ],
    type: "gold",
    highlighted: true,
  },
];

const Memberships = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    verifyUserPremium();
  }, []);

  const verifyUserPremium = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (res.data.isPremium) setIsUserPremium(true);
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

      const { amount, currency, orderId, notes, keyId } = orderRes.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "DevMatch",
        description: "Membership Purchase",
        image: "https://dndesigns.co.in/wp-content/uploads/2024/09/5.png",
        order_id: orderId,
        prefill: {
          name: `${notes?.firstName || ""} ${notes?.lastName || ""}`.trim(),
          email: notes?.emailId || "",
        },
        theme: { color: "#6D28D9" },
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${BASE_URL}/payment/verify`,
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
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

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Could not start payment");
    }
  };

  if (isUserPremium)
    return (
      <div className="min-h-screen grid place-items-center text-center">
        <div>
          <Crown className="mx-auto h-12 w-12 text-yellow-400 mb-3" />
          <h2 className="text-3xl font-bold text-foreground">
            You are already an Elite Member!
          </h2>
          <p className="text-muted-foreground mt-2">
            Enjoy all exclusive features and perks ✨
          </p>
        </div>
      </div>
    );

  return (
    <div
      className="relative min-h-screen py-10 px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(70rem 70rem at 10% -10%, hsl(var(--brand-start)/.15), transparent), radial-gradient(60rem 60rem at 90% 110%, hsl(var(--brand-end)/.15), transparent)",
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
          Upgrade to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
            Elite Membership
          </span>
        </h1>
        <p className="mt-4 text-md text-muted-foreground">
          Unlock advanced tools, analytics, and collaboration opportunities.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="mt-16 mb-10 grid sm:grid-cols-2 gap-10 max-w-6xl mx-auto relative z-10">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            className={`relative rounded-3xl border border-border p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between ${
              plan.highlighted
                ? `bg-gradient-to-br ${plan.color} border-none ${plan.glow}`
                : "bg-white"
            }`}
          >
            {/* Popular Tag */}
            {plan.highlighted && (
              <div className="absolute top-0 right-0 bg-amber-300 text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl">
                MOST POPULAR
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 mb-3">
                {plan.highlighted ? (
                  <Crown className="h-6 w-6 text-yellow-700" />
                ) : (
                  <Star className="h-6 w-6 text-[hsl(var(--brand-start))]" />
                )}
                <h3
                  className={`text-2xl font-bold ${
                    plan.highlighted ? "text-yellow-800" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
              </div>

              <p
                className={`text-sm ${
                  plan.highlighted ? "text-yellow-900/80" : "text-muted-foreground"
                }`}
              >
                {plan.tagline}
              </p>

              <p
                className={`mt-5 text-4xl font-extrabold ${
                  plan.highlighted ? "text-yellow-900" : "text-foreground"
                }`}
              >
                {plan.price}
              </p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((f, idx) => (
                  <li
                    key={idx}
                    className={`flex items-start gap-2 ${
                      plan.highlighted ? "text-yellow-900" : "text-foreground"
                    }`}
                  >
                    <CheckCircle2
                      className={`h-5 w-5 flex-shrink-0 ${
                        plan.highlighted
                          ? "text-yellow-600"
                          : "text-[hsl(var(--brand-end))]"
                      }`}
                    />
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <button
              onClick={() => handleBuy(plan.type)}
              disabled={plan.name === "Current Plan"}
              className={`mt-10 w-full py-3.5 rounded-xl font-semibold text-white transition ${
                plan.highlighted
                  ? "bg-gradient-to-r from-amber-700 via-yellow-700 to-amber-600 hover:opacity-90 shadow-[0_0_25px_rgba(255,190,70,0.5)]"
                  : "bg-gradient-to-r from-gray-400 to-gray-500 hover:opacity-90"
              } ${plan.name === "Current Plan" ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {plan.name === "Current Plan" ? "Activated" : `Get ${plan.name}`}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Memberships;
