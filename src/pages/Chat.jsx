import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send, Users, Search, MessageSquare } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../lib/constants";
import BackButton from "../components/BackButton";
import LiquidEther from "../components/LiquidEther";

const Chat = () => {
  const [connections, setConnections] = useState([]);
  const [q, setQ] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [peer, setPeer] = useState(null);

  const loggedInUser = useSelector((store) => store.user);
  const userId = loggedInUser?._id;
  const { targetUserId } = useParams();

  const chatScrollRef = useRef(null);
  const etherRef = useRef(null);

  // Fetch connections
  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/connections`, {
          withCredentials: true,
        });
        setConnections(res?.data?.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    run();
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

  const filtered = useMemo(() => {
    const list = Array.isArray(connections) ? connections : [];
    const text = q.trim().toLowerCase();
    if (!text) return list;
    return list.filter((c) => {
      const name = `${c.firstName || ""} ${c.lastName || ""}`.toLowerCase();
      return (
        name.includes(text) ||
        (c.description || "").toLowerCase().includes(text) ||
        (c.gender || "").toLowerCase().includes(text)
      );
    });
  }, [connections, q]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      photoURL: loggedInUser.photoURL,
      userId,
      targetUserId,
    });

    const onRecv = ({
      senderId,
      firstName,
      lastName,
      photoURL,
      text,
      createdAt,
    }) => {
      setMessages((prev) => [
        ...prev,
        { senderId, firstName, lastName, photoURL, text, createdAt },
      ]);
    };

    socket.on("messageRecieved", onRecv);
    return () => {
      socket.off("messageRecieved", onRecv);
      socket.disconnect();
    };
  }, [userId, targetUserId, loggedInUser]);

  useEffect(() => {
    if (!targetUserId || !userId) return;

    const fetchChat = async () => {
      try {
        const chat = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
          withCredentials: true,
        });

        const participants = chat?.data?.chat?.participants || [];
        const me = String(userId);
        const other = participants.find((p) => String(p._id) !== me) || null;
        setPeer(other);

        const chatMessages =
          chat?.data?.chat?.messages.map((msg) => {
            const s = msg.senderId;
            const isObj = typeof s === "object" && s !== null;
            return {
              senderId: isObj ? s._id : s,
              firstName: isObj ? s.firstName : msg.firstName,
              lastName: isObj ? s.lastName : msg.lastName,
              photoURL: isObj ? s.photoURL : msg.photoURL,
              text: msg.text,
              createdAt: msg.createdAt,
            };
          }) || [];
        setMessages(chatMessages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchChat();
  }, [targetUserId, userId]);

  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "auto" });
  }, [messages, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim() || !targetUserId) return;
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      senderId: userId,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName,
      photoURL: loggedInUser.photoURL,
      userId,
      targetUserId,
      text: newMessage.trim(),
    });
    setNewMessage("");
  };

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

      {/* Chat Layout */}
      <div className="relative z-20 mx-auto max-w-6xl px-4 py-10">
        <div className="fixed top-10 left-4 z-50">
          <BackButton />
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-800 bg-[#0b0b0b]/70 backdrop-blur-2xl grid grid-cols-1 md:grid-cols-[20rem_1fr] h-[calc(93vh-2rem)]">
          {/* Sidebar */}
          <aside
            className={`border-b md:border-b-0 md:border-r border-gray-800 bg-[#111]/70 backdrop-blur-xl ${
              targetUserId ? "hidden md:block" : "block"
            }`}
          >
            <div className="p-4 border-b border-gray-800 flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search"
                  className="w-full h-10 rounded-lg border border-gray-700 bg-[#0d0d0d]/70 text-gray-300 pl-9 pr-3 outline-none placeholder:text-gray-500"
                />
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <ul className="divide-y divide-gray-800 h-[calc(100%-64px)] overflow-y-auto">
              {filtered.map((c) => {
                const name = `${c.firstName ?? ""} ${c.lastName ?? ""}`.trim() || "Developer";
                const active = String(c._id) === String(targetUserId || "");
                return (
                  <li key={c._id} className={active ? "bg-[#1a1a1a]" : ""}>
                    <Link
                      to={`/chat/${c._id}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a1a]/70 transition"
                    >
                      <div className="h-11 w-11 rounded-full overflow-hidden bg-[#222]/70 border border-gray-700 shrink-0">
                        {c.photoURL ? (
                          <img src={c.photoURL} alt={name} className="h-full w-full object-cover" />
                        ) : (
                          <div className="grid place-items-center h-full w-full text-gray-500">
                            <Users className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-100 truncate">{name}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {c.description || "Tap to chat"}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Chat window */}
          <section className="flex min-h-0 flex-col bg-[#0d0d0d]/80 backdrop-blur-xl">
            {/* Header */}
            <div className="shrink-0 flex items-center gap-3 px-4 sm:px-6 h-16 border-b border-gray-800 bg-[#111]/70 backdrop-blur-xl">
              {targetUserId ? (
                <>
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-[#222]/70 border border-gray-700">
                    {peer?.photoURL ? (
                      <img src={peer.photoURL} alt="avatar" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-gray-500">
                        <Users className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-sm sm:text-base font-semibold text-gray-100 truncate">
                      {peer ? `${peer.firstName ?? ""} ${peer.lastName ?? ""}`.trim() : "Developer"}
                    </h2>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 text-gray-500">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">Select a chat from the left</span>
                </div>
              )}
            </div>

            {/* Messages area */}
            <div className="flex-1 min-h-0">
              {targetUserId ? (
                <div ref={chatScrollRef} className="h-full py-4 overflow-y-auto px-4">
                  <div className="min-h-full flex flex-col justify-end gap-2">
                    {messages.map((msg, index) => {
                      const mine =
                        String(msg.senderId || "") === String(userId || "") ||
                        msg.firstName === loggedInUser.firstName;
                      return (
                        <div key={index} className={`chat px-6 ${mine ? "chat-end" : "chat-start"}`}>
                          <div className="chat-image avatar">
                            <div className="w-10 rounded-full overflow-hidden bg-[#222]/70 border border-gray-700">
                              {msg.photoURL ? (
                                <img src={msg.photoURL} alt="" />
                              ) : (
                                <div className="w-10 h-10 grid place-items-center">
                                  <Users className="h-4 w-4 text-gray-500" />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="chat-header text-gray-400">
                            {(msg.firstName ?? "Developer") + " " + (msg.lastName ?? "")}
                          </div>
                          <div className="chat-bubble bg-[#1a1a1a]/90 text-gray-200 border border-gray-700">
                            {msg.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="h-full grid place-items-center">
                  <div className="relative w-full max-w-md">
                    <div className="absolute inset-0 blur-2xl" />
                    <div className="relative bg-[#111]/80 backdrop-blur-xl rounded-3xl border border-gray-700 p-8 text-center shadow-xl">
                      <div className="mx-auto h-14 w-14 rounded-2xl grid place-items-center border border-gray-700 bg-[#1a1a1a]/70">
                        <MessageSquare className="h-6 w-6 text-gray-400" />
                      </div>
                      <h3 className="mt-4 text-xl font-bold text-gray-100">
                        Start a conversation
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Pick a connection from the left to begin chatting. Your
                        messages will appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Composer */}
            {targetUserId ? (
              <div className="shrink-0 border-t border-gray-800 bg-[#111]/70 backdrop-blur-xl px-3 sm:px-6 py-3">
                <form
                  className="flex items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                >
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full h-11 rounded-xl border border-gray-700 bg-[#0d0d0d]/70 text-gray-200 pl-4 pr-12 outline-none placeholder:text-gray-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] hover:opacity-95 transition shadow-sm text-white font-semibold px-4 h-11 rounded-lg"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </button>
                </form>
              </div>
            ) : (
              <div className="shrink-0 h-[56px] sm:h-[56px] border-t border-transparent pointer-events-none select-none" />
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Chat;
