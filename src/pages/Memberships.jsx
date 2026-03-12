import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle2, Star, Crown, Info, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import LiquidEther from "../components/LiquidEther";
import { BASE_URL } from "../lib/constants";
import BackButton from "../components/BackButton";

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
    name: "Silver Tier",
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
    name: "Elite Tier",
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
  const user = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [membershipType, setMembershipType] = useState(null);
  const [buyingPlan, setBuyingPlan] = useState(null); // track which plan is being purchased
  const navigate = useNavigate();
  const etherRef = useRef(null);

  useEffect(() => {
    verifyUserPremium();
  }, []);

  const verifyUserPremium = async () => {
    setLoading(true);
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
        setMembershipType(res.data.membershipType);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (type) => {
    try {
      if (!user) return navigate("/login");
      setBuyingPlan(type);

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
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} Membership`,
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
            else console.error("Payment verification failed");
          } catch (err) {
            console.error(err);
          } finally {
            setBuyingPlan(null);
          }
        },
        modal: {
          ondismiss: function () {
            setBuyingPlan(null);
          },
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      setBuyingPlan(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-[hsl(var(--brand-end))] animate-spin" />
      </div>
    );
  }

  if (isUserPremium) {
    const isElite = membershipType === "gold";

    return (
      <div className="relative min-h-screen grid place-items-center bg-black text-white px-6 overflow-hidden">
        {/* Background */}
        <div ref={etherRef} className="absolute inset-0 z-0 pointer-events-none">
          <LiquidEther
            colors={isElite ? ["#FACC15", "#EAB308", "#A16207"] : ["#94A3B8", "#64748B", "#475569"]}
            cursorSize={120}
            mouseForce={20}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
          />
        </div>

        <div className="relative z-20 max-w-md text-center py-28">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15 }}
          >
            {isElite ? (
              <Crown className="mx-auto h-20 w-20 text-yellow-400 mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
            ) : (
              <Star className="mx-auto h-20 w-20 text-blue-300 mb-6 drop-shadow-[0_0_15px_rgba(147,197,253,0.5)]" />
            )}

            <h2 className={`text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${isElite ? "from-yellow-200 to-yellow-500" : "from-blue-100 to-blue-400"}`}>
              {isElite ? "Elite Status" : "Silver Member"}
            </h2>

            <p className="text-gray-400 mt-4 text-lg leading-relaxed">
              {isElite 
                ? "You've reached the summit. Enjoy your exclusive Elite benefits."
                : "You're a Silver member. You've unlocked essential premium features."}
            </p>

            <div className="mt-10 space-y-4 text-left bg-zinc-900/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 className={`h-5 w-5 ${isElite ? "text-yellow-400" : "text-blue-400"}`} />
                Included Benefits
              </h3>

              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${isElite ? "bg-yellow-400" : "bg-blue-400"}`} />
                  <span>Unlimited Networking</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${isElite ? "bg-yellow-400" : "bg-blue-400"}`} />
                  <span>Priority Placement</span>
                </li>
                {isElite && (
                  <li className="flex items-center gap-2 font-semibold text-yellow-200">
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                    <span>2x Profile Boost Access</span>
                  </li>
                )}
              </ul>
            </div>

            <p className="text-gray-500 text-sm mt-6 mb-2">
              Thanks for testing the Razorpay integration ✨
            </p>

            <div className="flex flex-col gap-4 mt-8">
              {!isElite && (
                <button
                  onClick={() => handleBuy("gold")}
                  disabled={buyingPlan !== null}
                  className="w-full px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] text-black font-extrabold rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  {buyingPlan === "gold" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Crown className="h-5 w-5" />}
                  {buyingPlan === "gold" ? "Upgrading..." : "Upgrade to Elite"}
                </button>
              )}
              
              <button
                onClick={() => navigate("/feed")}
                className={`w-full px-8 py-4 ${isElite ? "bg-white text-black" : "bg-white/10 text-white border border-white/20"} font-bold rounded-2xl transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer`}
              >
                Go to Feed
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }


  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center pt-28 pb-20">
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

      {/* Back Button Container */}
      <div className="fixed top-28 left-6 sm:left-10 z-50">
        <BackButton />
      </div>

      <div className="relative z-20 w-full flex flex-col items-center px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Elevate Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))]">
              Experience
            </span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg sm:text-xl">
            Choose a plan that fits your collaboration needs and unlock premium features.
          </p>
        </motion.div>

        <div className="mt-8 flex items-center gap-3 text-center bg-white/5 px-5 py-3 rounded-2xl border border-white/10 backdrop-blur-xl max-w-xl">
          <Info className="h-5 w-5 text-blue-400 shrink-0" />
          <p className="text-gray-300 text-sm">
            All plans currently unlock the same premium features. This is for testing the Razorpay integration.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mt-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-[2.5rem] p-8 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 
                hover:scale-[1.02] hover:border-white/20 transition-all duration-500 flex flex-col
                ${
                  plan.highlightLevel === 3
                    ? "shadow-[0_0_50px_rgba(234,179,8,0.15)] ring-1 ring-yellow-500/20"
                    : plan.highlightLevel === 2
                    ? "shadow-[0_0_50px_rgba(59,130,246,0.1)] ring-1 ring-blue-500/10"
                    : "shadow-2xl"
                }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full uppercase shadow-lg z-30">
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center 
                  ${
                    plan.highlightLevel === 3
                      ? "bg-yellow-500/10 text-yellow-500"
                      : plan.highlightLevel === 2
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-gray-500/10 text-gray-400"
                  }`}
                >
                  {plan.highlightLevel === 3 ? (
                    <Crown className="h-6 w-6" />
                  ) : (
                    <Star className="h-6 w-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{plan.tagline}</p>
                </div>
              </div>

              <div className="mb-8">
                <span className="text-5xl font-black text-white">{plan.price.split('/')[0]}</span>
                {plan.price.includes('/') && (
                  <span className="text-gray-500 text-lg font-medium">/{plan.price.split('/')[1]}</span>
                )}
              </div>

              <div className="flex-1">
                <p className="text-gray-400 text-sm font-semibold mb-4 uppercase tracking-wider">What's included:</p>
                <ul className="space-y-4">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className={`h-5 w-5 shrink-0 
                        ${
                          plan.highlightLevel === 3
                            ? "text-yellow-500"
                            : plan.highlightLevel === 2
                            ? "text-blue-400"
                            : "text-green-500"
                        }`} 
                      />
                      <span className="text-gray-300 text-sm leading-tight">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleBuy(plan.type)}
                disabled={buyingPlan !== null || plan.type === "basic"}
                className={`mt-10 w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-3
                  ${
                    plan.highlightLevel === 3
                      ? "bg-yellow-500 text-black hover:bg-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                      : plan.highlightLevel === 2
                      ? "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
                      : "bg-white/10 text-white hover:bg-white/20"
                  } ${buyingPlan !== null || plan.type === "basic" ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98]"}`}
              >
                {buyingPlan === plan.type ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span>{plan.type === "basic" ? "Default Plan" : "Get Started"}</span>
                )}
                {buyingPlan === plan.type ? "Processing..." : null}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Memberships;
