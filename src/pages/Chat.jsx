import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const loggedInUser = useSelector((store) => store.user);
  const userId = loggedInUser?._id;
  const { targetUserId } = useParams();

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: loggedInUser.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageRecieved", ({firstName, text}) => {
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, loggedInUser]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: loggedInUser.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-[radial-gradient(60rem_60rem_at_10%_-10%,hsl(20_95%_60%/.15),transparent)]">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground/70 bg-background/60">
            <Users className="h-3.5 w-3.5" />
            Chat
          </div>
          <Link
            to="/connections"
            className="inline-flex items-center gap-2 text-[hsl(232_10%_45%)] hover:text-[hsl(234_12%_12%)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[hsl(20_95%_60%/.35)] to-[hsl(330_85%_65%/.35)] shadow-2xl">
          <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white border border-[hsl(220_13%_91%)] overflow-hidden">
            <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-[hsl(220_13%_91%)] bg-[hsl(220_13%_98%)]">
              <div className="h-10 w-10 rounded-full overflow-hidden bg-[hsl(220_13%_96%)] border border-[hsl(220_13%_91%)]">
                {/* <img
                  src=""
                  alt="avatar"
                  className="h-full w-full object-cover hidden"
                /> */}
                <div className="h-full w-full grid place-items-center text-[hsl(232_10%_45%)]">
                  <Users className="h-4 w-4" />
                </div>
              </div>
              <div className="min-w-0">
                <h2 className="text-sm sm:text-base font-semibold text-[hsl(234_12%_12%)] truncate">
                  Developer Name
                </h2>
                <p className="text-xs text-[hsl(232_10%_45%)]">Online</p>
              </div>
            </div>
            <div className="h-80 px-10 pt-4 overflow-y-scroll">
              {messages.map((msg, index) => {
                return (
                  <div key={index} className="chat chat-start">
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS chat bubble component"
                          src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                        />
                      </div>
                    </div>
                    <div className="chat-header">
                      {msg.firstName}
                      <time className="text-xs opacity-50">12:45</time>
                    </div>
                    <div className="chat-bubble">{msg.text}</div>
                    <div className="chat-footer opacity-50">Delivered</div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-[hsl(220_13%_91%)] bg-[hsl(220_13%_98%)] px-3 sm:px-6 py-3">
              <form className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full h-11 rounded-xl border border-[hsl(220_13%_86%)] bg-white pl-4 pr-12 outline-none placeholder:text-[hsl(232_10%_65%)] text-[hsl(234_12%_12%)]"
                  />
                </div>

                <button
                  type="button"
                  onClick={sendMessage}
                  className="hidden sm:inline-flex items-center gap-2 bg-blue-700 text-white font-semibold px-4 h-11 rounded-xl shadow hover:opacity-95 transition"
                >
                  <Send className="h-4 w-4" />
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
