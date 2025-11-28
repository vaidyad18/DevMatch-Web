import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";
import { Heart, Users, X, Keyboard, MousePointer2 } from "lucide-react";
import BackButton from "../components/BackButton";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence,
  useAnimation,
} from "framer-motion";
import LiquidEther from "../components/LiquidEther";

const SWIPE_THRESHOLD = 140;

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed) || [];
  const [exitingId, setExitingId] = useState(null);
  const etherRef = useRef(null);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data || []));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequest = async (status, id) => {
    if (exitingId) return;
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
      setExitingId(null);
    } catch (err) {
      setExitingId(null);
    }
  };

  useEffect(() => {
    if (!feed || feed.length === 0) fetchFeed();
  }, []);

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

  const dispatchSwipe = useCallback((dir) => {
    document.dispatchEvent(
      new CustomEvent("programmatic-swipe", { detail: { dir } })
    );
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.repeat) return;
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a")
        dispatchSwipe("left");
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d")
        dispatchSwipe("right");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dispatchSwipe]);

  if (!feed) return null;

  if (feed.length === 0) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
        {/* Liquid Ether Background */}
        <div ref={etherRef} className="absolute inset-0 z-0 pointer-events-auto">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            resolution={0.5}
            autoDemo={false}
            autoIntensity={2.2}
          />
        </div>
        <div id="ether-overlay" className="absolute inset-0 z-10 pointer-events-none" />

        <div className="relative z-20 text-center px-6">
          <div className="fixed top-10 left-4 z-50">
            <BackButton />
          </div>

          <div className="max-w-md mx-auto bg-[#0b0b0b]/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-lg">
            <Users className="h-12 w-12 mx-auto text-gray-400" />
            <h2 className="mt-4 text-xl font-bold text-white">No more users</h2>
            <p className="mt-2 text-gray-400 text-sm">
              You’ve reached the end of your feed. Check back later for new
              developers to connect with!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const topUser = feed[0];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Liquid Ether Background */}
      <div ref={etherRef} className="absolute inset-0 z-0 pointer-events-auto">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          resolution={0.5}
          autoDemo={false}
          autoIntensity={2.2}
        />
      </div>
      <div id="ether-overlay" className="absolute inset-0 z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 flex flex-col lg:flex-row gap-10  pb-10 items-center w-full max-w-6xl px-4">
        <div className="fixed top-10 left-4 z-50">
          <BackButton />
        </div>

        {/* Swipe Area */}
        <div className="flex flex-col z-1000 scale-95 items-center gap-6 flex-1">
          <SwipeCard
            key={topUser._id}
            user={topUser}
            onSwipedLeft={() => {
              setExitingId(topUser._id);
              handleRequest("ignored", topUser._id);
            }}
            onSwipedRight={() => {
              setExitingId(topUser._id);
              handleRequest("interested", topUser._id);
            }}
          />

          <div className="flex -mb-12 mt-4 items-center gap-6">
            <TriggerButton
              direction="left"
              onTrigger={() => dispatchSwipe("left")}
            >
              <X className="h-7 w-7 text-red-400" />
            </TriggerButton>

            <TriggerButton
              direction="right"
              onTrigger={() => dispatchSwipe("right")}
            >
              <Heart className="h-7 w-7 text-green-400" />
            </TriggerButton>
          </div>
        </div>

        {/* Sidebar (Shortcuts) */}
        <aside className="hidden absolute -right-10 top-50 lg:block w-[320px]">
          <div className="rounded-2xl border border-gray-800 bg-[#0d0d0d]/70 backdrop-blur-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 text-gray-400">
              <Keyboard className="h-4 w-4" />
              <span className="text-sm font-semibold">Shortcuts</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {[
                ["A", "Left swipe"],
                ["D", "Right swipe"],
                ["←", "Left swipe"],
                ["→", "Right swipe"],
              ].map(([key, label], i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-md border border-gray-700 bg-[#1a1a1a]/70 text-gray-300">
                    {key}
                  </span>
                  <span className="text-gray-400">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-2 text-gray-400">
              <MousePointer2 className="h-4 w-4" />
              <span className="text-sm font-semibold">Mouse</span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-gray-400">
              <li>Drag card left or right to preview</li>
              <li>Release past threshold to like/dislike</li>
              <li>Use buttons above for quick actions</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Feed;

const TriggerButton = ({ children, onTrigger, direction }) => (
  <button
    type="button"
    onClick={onTrigger}
    className={`h-14 w-14 flex items-center justify-center rounded-full transition cursor-pointer shadow-md ${
      direction === "left"
        ? "bg-red-900/20 hover:bg-red-900/40 border border-red-800"
        : "bg-green-900/20 hover:bg-green-900/40 border border-green-800"
    }`}
  >
    {children}
  </button>
);

const SwipeCard = ({ user, onSwipedLeft, onSwipedRight }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const greenOverlay = useTransform(x, [0, 220], [0, 0.7]);
  const redOverlay = useTransform(x, [-220, 0], [0.7, 0]);
  const likeOpacity = useTransform(x, [60, SWIPE_THRESHOLD], [0, 1]);
  const nopeOpacity = useTransform(x, [-SWIPE_THRESHOLD, -60], [1, 0]);
  const controls = useAnimation();

  useEffect(() => {
    const handler = (e) => {
      const dir = e.detail?.dir;
      if (dir === "left") animateExit(-1);
      if (dir === "right") animateExit(1);
    };
    document.addEventListener("programmatic-swipe", handler);
    return () => document.removeEventListener("programmatic-swipe", handler);
  }, []);

  const animateExit = async (direction = 1) => {
    await controls.start({
      x: direction * 80,
      rotate: direction * 5,
      opacity: 1,
      transition: { duration: 0.18, ease: "easeOut" },
    });
    await controls.start({
      x: direction * 120,
      scale: 0.85,
      opacity: 0,
      rotate: direction * 10,
      transition: { duration: 0.25, ease: "easeInOut" },
    });
    if (direction > 0) onSwipedRight?.();
    else onSwipedLeft?.();
  };

  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.div
        key={user._id}
        drag="x"
        style={{ x, rotate, cursor: "grab" }}
        whileTap={{ cursor: "grabbing" }}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={(_, info) => {
          const { offset, velocity } = info;
          const swipe =
            Math.abs(offset.x) > SWIPE_THRESHOLD || Math.abs(velocity.x) > 800;
          if (swipe) {
            const dir = offset.x > 0 ? 1 : -1;
            animateExit(dir);
          } else {
            controls.start({
              x: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              transition: { type: "spring", stiffness: 300, damping: 26 },
            });
          }
        }}
        initial={{ scale: 0.96, opacity: 0, y: 20 }}
        animate={controls}
        exit={{
          opacity: 0,
          scale: 0.85,
          transition: { duration: 0.25, ease: "easeInOut" },
        }}
        className="relative"
      >
        {/* Overlays */}
        <motion.div
          style={{ opacity: greenOverlay }}
          className="pointer-events-none absolute inset-0 rounded-3xl bg-green-500/30 mix-blend-multiply z-10"
        />
        <motion.div
          style={{ opacity: redOverlay }}
          className="pointer-events-none absolute inset-0 rounded-3xl bg-red-500/30 mix-blend-multiply z-10"
        />
        {/* Labels */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="px-6 py-3 rounded-2xl text-4xl font-extrabold tracking-wide text-white bg-green-600/70 backdrop-blur-xl">
            LIKE
          </div>
        </motion.div>
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="px-6 py-3 rounded-2xl text-4xl font-extrabold tracking-wide text-white bg-red-600/70 backdrop-blur-xl">
            NOPE
          </div>
        </motion.div>
        {/* Card */}
        <UserCard user={user} />
      </motion.div>
    </AnimatePresence>
  );
};
