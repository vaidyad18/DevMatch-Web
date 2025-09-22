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
          className={[
            "absolute z-50 top-1/2 -translate-y-1/2",
            side === "right" ? "left-full ml-3" : "right-full mr-3",
          ].join(" ")}
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  return (
    <div
      className="min-h-screen px-4 py-8"
      style={{
        background:
          "radial-gradient(60rem 60rem at 10% -10%, hsl(var(--brand-start)/.15), transparent), radial-gradient(60rem 60rem at 90% 110%, hsl(var(--brand-end)/.15), transparent)",
      }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Top Header + Toggle */}
        <div className="mb-6 text-center">
          <p className="mt-4 text-2xl sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] font-bold tracking-tight">
            Your Network
          </p>
          <p className="mt-1 text-lg text-[hsl(232_10%_45%)]">
            Manage your developer connections
          </p>

          <div className="mt-5 inline-flex rounded-full p-1 border border-[hsl(220_13%_91%)] bg-white shadow-sm">
            <button
              onClick={() => setTab("connections")}
              className={`relative inline-flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium ${
                tab === "connections"
                  ? "bg-[hsl(220_13%_96%)] text-[hsl(234_12%_12%)]"
                  : "text-[hsl(232_10%_45%)]"
              }`}
            >
              Connections
              <span className="ml-1 inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full text-xs border bg-white">
                {connectionsCount}
              </span>
            </button>

            <button
              onClick={() => setTab("requests")}
              className={`relative inline-flex items-center gap-2 px-4 h-10 rounded-full text-sm font-medium ${
                tab === "requests"
                  ? "bg-[hsl(220_13%_96%)] text-[hsl(234_12%_12%)]"
                  : "text-[hsl(232_10%_45%)]"
              }`}
            >
              Requests
              <span className="ml-1 inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full text-xs border bg-white">
                {requestsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Frame */}
        <div
          className="relative rounded-2xl "
          style={{
            background:
              "linear-gradient(#ffffff,#ffffff) padding-box, linear-gradient(90deg,hsl(var(--brand-start)),hsl(var(--brand-end))) border-box",
            border: "1px solid transparent",
          }}
        >
          <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white border border-[hsl(220_13%_91%)] p-5 sm:p-6">
            {/* Search */}
            <div className="relative w-full sm:w-80 mb-5">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={`Search ${tab}...`}
                className="w-full h-11 rounded-md text-black border border-gray-300 pl-10 pr-3 outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
            </div>

            {tab === "connections" ? (
              <ul className="grid gap-4 md:grid-cols-2">
                {filteredConnections.map((c) => {
                  const {
                    firstName,
                    lastName,
                    age,
                    gender,
                    description,
                    photoURL,
                  } = c;
                  const name = `${firstName || ""} ${lastName || ""}`.trim();
                  return (
                    <li key={c._id}>
                      <div className="border border-[hsl(220_13%_91%)] flex items-center justify-between rounded-xl p-4 hover:shadow-lg transition">
                        <div className="flex items-start gap-3">
                          <HoverPreview user={c}>
                            <div className="h-14 w-14 rounded-full bg-[hsl(220_13%_96%)] border border-[hsl(220_13%_91%)] overflow-hidden shrink-0">
                              {photoURL ? (
                                <img
                                  src={photoURL}
                                  alt={name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full grid place-items-center text-[hsl(232_10%_45%)]">
                                  <Users className="h-5 w-5" />
                                </div>
                              )}
                            </div>
                          </HoverPreview>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-[hsl(234_12%_12%)] truncate">
                              {name}
                            </h3>
                            <p className="text-sm text-[hsl(232_10%_45%)]">
                              {age ? `${age} yrs` : "—"} {gender}
                            </p>
                            <p className="text-sm text-[hsl(232_10%_35%)] mt-2 line-clamp-2">
                              {description}
                            </p>
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
              <ul className="grid gap-4 md:grid-cols-2">
                {filteredRequests.map((r) => {
                  const u = r.fromUserId || {};
                  const {
                    firstName,
                    lastName,
                    age,
                    gender,
                    description,
                    photoURL,
                  } = u;
                  const name = `${firstName || ""} ${lastName || ""}`.trim();
                  return (
                    <li key={r._id}>
                      <div className="border border-[hsl(220_13%_91%)] rounded-xl p-4 hover:shadow-lg transition">
                        <div className="flex items-start gap-3">
                          <HoverPreview user={u}>
                            <div className="h-14 w-14 rounded-full bg-[hsl(220_13%_96%)] border border-[hsl(220_13%_91%)] overflow-hidden shrink-0">
                              {photoURL ? (
                                <img
                                  src={photoURL}
                                  alt={name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full grid place-items-center text-[hsl(232_10%_45%)]">
                                  <Users className="h-5 w-5" />
                                </div>
                              )}
                            </div>
                          </HoverPreview>

                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-[hsl(234_12%_12%)] truncate">
                              {name}
                            </h3>
                            <p className="text-sm text-[hsl(232_10%_45%)]">
                              {age ? `${age} yrs` : "—"} {gender}
                            </p>
                            <p className="text-sm text-[hsl(232_10%_35%)] mt-2 line-clamp-2">
                              {description}
                            </p>

                            <div className="mt-3 flex gap-2">
                              <button
                                onClick={() =>
                                  reviewRequest("accepted", firstName, r._id)
                                }
                                className="bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] text-white px-3 py-1 rounded-md flex items-center gap-1"
                              >
                                <Check className="h-4" /> Accept
                              </button>
                              <button
                                onClick={() =>
                                  reviewRequest("rejected", firstName, r._id)
                                }
                                className="border border-[hsl(220_13%_91%)] px-3 py-1 rounded-md text-gray-600 flex items-center gap-1"
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
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Connections;
