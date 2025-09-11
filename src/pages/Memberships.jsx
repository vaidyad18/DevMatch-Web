import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const memberships = [
  {
    title: "Silver Membership",
    price: "₹499/month",
    desc: "Best for beginners exploring our platform.",
    features: [
      "Access to basic features",
      "Community support",
      "Limited project uploads",
      "Email support",
    ],
    color: "from-gray-300 to-gray-400",
    glow: "shadow-[0_0_20px_rgba(156,163,175,0.8)]", // gray glow,
    type: "silver",
  },
  {
    title: "Gold Membership",
    price: "₹999/month",
    desc: "Perfect for professionals who want more.",
    features: [
      "Everything in Silver",
      "Unlimited project uploads",
      "Priority customer support",
      "Exclusive resources & guides",
      "Early access to new features",
    ],
    color: "from-yellow-400 to-yellow-500",
    glow: "shadow-[0_0_25px_rgba(250,204,21,0.9)]", // yellow glow,
    type: "gold",
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
    const res = await axios.get(BASE_URL + "/premium/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };

  const handleBuy = async (type) => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }
      const order = await axios.post(
        `${BASE_URL}/payment/create`,
        { type },
        { withCredentials: true }
      );

      const { amount, currency, orderId, notes } = order.data.savedPayment;

      const options = {
        key: order.data.keyId,
        amount,
        currency,
        name: "DevMatch",
        description: "Meet your next collaborator",
        image: "https://dndesigns.co.in/wp-content/uploads/2024/09/5.png",
        order_id: orderId,
        notes: {
          firstName: notes.firstName,
          lastName: notes.lastName,
          email: notes.emailId,
        },
        theme: {
          color: "#3399cc",
        },
        handler: verifyUserPremium,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err.message);
    }
  };

  return isUserPremium ? (
    <div>Already a premium user</div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--brand-start)/0.15)] to-[hsl(var(--brand-end)/0.15)] py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-foreground mb-14">
        Choose Your Membership
      </h2>
      <div className="grid sm:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {memberships.map((plan, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-border bg-card shadow-xl p-8 flex flex-col hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-2xl font-semibold text-foreground">
              {plan.title}
            </h3>
            <p className="text-3xl font-bold mt-2 text-foreground">
              {plan.price}
            </p>
            <p className="text-muted-foreground mt-1">{plan.desc}</p>

            <ul className="mt-6 space-y-3 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500">✔</span>
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleBuy(plan.type)}
              className={`mt-8 border border-gray-500 cursor-pointer w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${plan.color} hover:scale-[1.02] transition-all duration-300 ${plan.glow}`}
            >
              Get {plan.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Memberships;
