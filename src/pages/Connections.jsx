import React, { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { Users, Search, Check, X, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserCard from "../components/UserCard";
import LiquidEther from "../components/LiquidEther";
import BackButton from "../components/BackButton";

const HoverPreview = ({ user, children, side = "right" }) => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(null);

  const openWithDelay = () => {
    timerRef.current = setTimeout(() => setOpen(true), 120);
  };
  const closeNow = () => {
    clearTimeout(timerRef.current);
    setOpen(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={openWithDelay}
      onMouseLeave={closeNow}
      onFocus={openWithDelay}
      onBlur={closeNow}
    >
      {children}
      {open && (
        <div
          className={`absolute z-50 top-1/2 -translate-y-1/2 ${
            side === "right" ? "left-full ml-3" : "right-full mr-3"
          }`}
        >
          <div className="pointer-events-none w-72 max-w-[18rem]">
            <UserCard user={user} />
          </div>
        </div>
      )}
    </div>
  );
};

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const requests = useSelector((store) => store.requests);

  const [tab, setTab] = useState("connections");
  const [q, setQ] = useState("");

  const etherRef = useRef(null);

  // Fetch data
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data || []));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data || []));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
    fetchRequests();
  }, []);

  // Liquid Ether setup
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

  // Filter helpers
  const filterByQuery = (name, description, gender, text) => {
    const t = text.trim().toLowerCase();
    if (!t) return true;
    return (
      name.toLowerCase().includes(t) ||
      (description || "").toLowerCase().includes(t) ||
      (gender || "").toLowerCase().includes(t)
    );
  };

  const filteredConnections = useMemo(() => {
    const list = Array.isArray(connections) ? connections : [];
    return list.filter((c) => {
      const name = `${c.firstName || ""} ${c.lastName || ""}`.trim();
      return filterByQuery(name, c.description, c.gender, q);
    });
  }, [connections, q]);

  const filteredRequests = useMemo(() => {
    const list = Array.isArray(requests) ? requests : [];
    return list.filter((r) => {
      const u = r?.fromUserId || {};
      const name = `${u.firstName || ""} ${u.lastName || ""}`.trim();
      return filterByQuery(name, u.description, u.gender, q);
    });
  }, [requests, q]);

  // Accept / Reject actions
  const reviewRequest = async (status, name, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));

      if (status === "accepted") {
        toast.success(`You accepted ${name}'s request`, {
          autoClose: 3000,
          position: "bottom-right",
        });
        fetchConnections();
      } else {
        toast.error(`You rejected ${name}'s request`, {
          autoClose: 3000,
          position: "bottom-right",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", {
        autoClose: 3000,
        position: "bottom-right",
      });
    }
  };

  const connectionsCount = Array.isArray(connections) ? connections.length : 0;
  const requestsCount = Array.isArray(requests) ? requests.length : 0;

  const emptyText =
    tab === "connections"
      ? q
        ? "No connections found"
        : "You have no connections yet"
      : q
      ? "No requests found"
      : "No new requests";

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
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

      {/* Main Content */}
      <div className="relative z-20 mx-auto max-w-5xl px-4 pb-20 pt-10">
        <div className="absolute top-24  z-50">
          <BackButton />
        </div>

        {/* Header */}
        <div className="mb-8 pt-16 text-center">
          <p className="mt-4 text-3xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] font-bold tracking-tight">
            Your Network
          </p>
          <p className="mt-1 text-gray-400">Manage your developer connections</p>

          <div className="mt-5 inline-flex rounded-full p-1 border border-gray-700 bg-[#0d0d0d]/70 backdrop-blur-xl shadow-sm">
            <button
              onClick={() => setTab("connections")}
              className={`relative cursor-pointer inline-flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium transition ${
                tab === "connections"
                  ? "bg-[hsl(var(--brand-start))]/20 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Connections
              <span className="ml-1 inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full text-xs border border-gray-700 bg-[#111]/70 text-gray-300">
                {connectionsCount}
              </span>
            </button>

            <button
              onClick={() => setTab("requests")}
              className={`relative cursor-pointer inline-flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium transition ${
                tab === "requests"
                  ? "bg-[hsl(var(--brand-start))]/20 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Requests
              <span className="ml-1 inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full text-xs border border-gray-700 bg-[#111]/70 text-gray-300">
                {requestsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Inner Box */}
        <div className="rounded-2xl bg-[#0b0b0b]/70 backdrop-blur-xl border border-gray-800 p-6 shadow-lg">
          {/* Search */}
          <div className="relative w-full sm:w-80 mb-6">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Search ${tab}...`}
              className="w-full h-11 rounded-md border border-gray-700 bg-[#111]/70 text-gray-200 pl-10 pr-3 outline-none placeholder:text-gray-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {tab === "connections" ? (
            filteredConnections.length > 0 ? (
              <ul className="grid gap-4 md:grid-cols-2">
                {filteredConnections.map((c) => {
                  const { firstName, lastName, age, gender, description, photoURL } = c;
                  const name = `${firstName || ""} ${lastName || ""}`.trim();
                  return (
                    <li key={c._id}>
                      <div className="border border-gray-800 bg-[#111]/70 rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition">
                        <div className="flex items-start gap-3">
                          <HoverPreview user={c}>
                            <div className="h-14 w-14 rounded-full bg-[#1a1a1a]/70 border border-gray-700 overflow-hidden shrink-0">
                              {photoURL ? (
                                <img
                                  src={photoURL}
                                  alt={name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full grid place-items-center text-gray-500">
                                  <Users className="h-5 w-5" />
                                </div>
                              )}
                            </div>
                          </HoverPreview>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-100 truncate">{name}</h3>
                            <p className="text-sm text-gray-400">
                              {age ? `${age} yrs` : "—"} {gender}
                            </p>
                            <p className="text-sm text-gray-400 mt-2 line-clamp-2">{description}</p>
                          </div>
                        </div>

                        <Link to={`/chat/${c._id}`}>
                          <button className="bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-white px-4 py-1 rounded-md flex items-center gap-2">
                            <MessageCircle className="h-4" /> Chat
                          </button>
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <EmptyBox text={emptyText} />
            )
          ) : filteredRequests.length > 0 ? (
            <ul className="grid gap-4 md:grid-cols-2">
              {filteredRequests.map((r) => {
                const u = r.fromUserId || {};
                const { firstName, lastName, age, gender, description, photoURL } = u;
                const name = `${firstName || ""} ${lastName || ""}`.trim();
                return (
                  <li key={r._id}>
                    <div className="border border-gray-800 bg-[#111]/70 rounded-xl p-4 hover:shadow-lg transition">
                      <div className="flex items-start gap-3">
                        <HoverPreview user={u}>
                          <div className="h-14 w-14 rounded-full bg-[#1a1a1a]/70 border border-gray-700 overflow-hidden shrink-0">
                            {photoURL ? (
                              <img src={photoURL} alt={name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full grid place-items-center text-gray-500">
                                <Users className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                        </HoverPreview>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-100 truncate">{name}</h3>
                          <p className="text-sm text-gray-400">
                            {age ? `${age} yrs` : "—"} {gender}
                          </p>
                          <p className="text-sm text-gray-400 mt-2 line-clamp-2">{description}</p>

                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => reviewRequest("accepted", firstName, r._id)}
                              className="bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-white px-3 py-1 rounded-md flex items-center gap-1"
                            >
                              <Check className="h-4" /> Accept
                            </button>
                            <button
                              onClick={() => reviewRequest("rejected", firstName, r._id)}
                              className="border border-gray-700 px-3 py-1 rounded-md text-gray-400 flex items-center gap-1 hover:bg-[#1a1a1a]/70"
                            >
                              <X className="h-4" /> Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyBox text={emptyText} />
          )}
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

const EmptyBox = ({ text }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="h-14 w-14 rounded-2xl grid place-items-center border border-gray-700 bg-[#1a1a1a]/70 mb-4">
      <Users className="h-6 w-6 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-100">{text}</h3>
    <p className="text-sm text-gray-500 mt-2">
      Try refreshing the page or check back later for updates.
    </p>
  </div>
);

export default Connections;
