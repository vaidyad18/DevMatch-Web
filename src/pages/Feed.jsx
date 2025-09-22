import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { useEffect, useState, useCallback } from "react";
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

const SWIPE_THRESHOLD = 140;

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed) || [];
  const [exitingId, setExitingId] = useState(null);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{
          background:
            "radial-gradient(60rem 60rem at 10% -10%, hsl(var(--brand-start)/.15), transparent), radial-gradient(60rem 60rem at 90% 110%, hsl(var(--brand-end)/.15), transparent)",
        }}
      >
        <div className="fixed top-10 left-4 z-50">
          <BackButton />
        </div>
        <div
          className="relative rounded-2xl p-[1px] w-full max-w-md"
          style={{
            background:
              "radial-gradient(60rem 60rem at 10% -10%, hsl(var(--brand-start)/.15), transparent), radial-gradient(60rem 60rem at 90% 110%, hsl(var(--brand-end)/.15), transparent)",
          }}
        >
          <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white border border-[hsl(220_13%_91%)] p-8 text-center">
            <Users className="h-12 w-12 mx-auto text-[hsl(232_10%_45%)]" />
            <h2 className="mt-4 text-xl font-bold text-[hsl(234_12%_12%)]">
              No more users
            </h2>
            <p className="mt-2 text-[hsl(232_10%_45%)] text-sm">
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
    <div
      className="min-h-screen flex -mt-16 items-center justify-center w-full"
      style={{
        background:
          "radial-gradient(60rem 60rem at 10% -10%, hsl(var(--brand-start)/.15), transparent), radial-gradient(60rem 60rem at 90% 110%, hsl(var(--brand-end)/.15), transparent)",
      }}
    >
      <div className="flex flex-col lg:flex-row gap-10 pt-28 pb-10 items-center w-full max-w-6xl px-4">
        <div className="fixed top-10 left-4 z-50">
          <BackButton />
        </div>

        <div className="flex flex-col items-center gap-6 flex-1">
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

          <div className="flex items-center mt-4 gap-6">
            <TriggerButton
              direction="left"
              onTrigger={() => dispatchSwipe("left")}
            >
              <X className="h-7 w-7 text-red-500" />
            </TriggerButton>

            <TriggerButton
              direction="right"
              onTrigger={() => dispatchSwipe("right")}
            >
              <Heart className="h-7 w-7 text-green-500" />
            </TriggerButton>
          </div>
        </div>

        <aside className="hidden absolute right-32 top-40 lg:block w-[320px]">
          <div className="rounded-2xl border border-[hsl(220_13%_91%)] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-[hsl(232_10%_45%)]">
              <Keyboard className="h-4 w-4" />
              <span className="text-sm font-semibold">Shortcuts</span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-md border border-[hsl(220_13%_91%)] bg-[hsl(220_13%_98%)]">
                  A
                </span>
                <span className="text-[hsl(232_10%_45%)]">Left swipe</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-md border border-[hsl(220_13%_91%)] bg-[hsl(220_13%_98%)]">
                  D
                </span>
                <span className="text-[hsl(232_10%_45%)]">Right swipe</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-md border border-[hsl(220_13%_91%)] bg-[hsl(220_13%_98%)]">
                  ←
                </span>
                <span className="text-[hsl(232_10%_45%)]">Left swipe</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded-md border border-[hsl(220_13%_91%)] bg-[hsl(220_13%_98%)]">
                  →
                </span>
                <span className="text-[hsl(232_10%_45%)]">Right swipe</span>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-[hsl(232_10%_45%)]">
              <MousePointer2 className="h-4 w-4" />
              <span className="text-sm font-semibold">Mouse</span>
            </div>
            <ul className="mt-3 space-y-2 text-sm text-[hsl(232_10%_45%)]">
              <li>Drag card left or right to preview</li>
              <li>Release past threshold to like/dislike</li>
              <li>Use buttons below for quick actions</li>
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
    className={`h-14 w-14 flex items-center justify-center rounded-full transition shadow-md cursor-pointer
      ${
        direction === "left"
          ? "bg-red-100 hover:bg-red-200"
          : "bg-green-100 hover:bg-green-200"
      }
    `}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animateExit = async (direction = 1) => {
    // Nudge first
    await controls.start({
      x: direction * 80,
      rotate: direction * 5,
      opacity: 1,
      transition: { duration: 0.18, ease: "easeOut" },
    });

    // Then fade out
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
          className="pointer-events-none absolute inset-0 rounded-3xl bg-green-500/70 mix-blend-multiply z-10"
        />
        <motion.div
          style={{ opacity: redOverlay }}
          className="pointer-events-none absolute inset-0 rounded-3xl bg-red-500/70 mix-blend-multiply z-10"
        />
        {/* Labels */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="px-6 py-3 rounded-2xl text-4xl font-extrabold tracking-wide text-white shadow-lg bg-green-600/80">
            LIKE
          </div>
        </motion.div>
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        >
          <div className="px-6 py-3 rounded-2xl text-4xl font-extrabold tracking-wide text-white shadow-lg bg-red-600/80">
            NOPE
          </div>
        </motion.div>
        {/* Card */}
        <UserCard user={user} />
      </motion.div>
    </AnimatePresence>
  );
};
