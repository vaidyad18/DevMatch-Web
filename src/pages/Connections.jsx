import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Users, Search } from "lucide-react";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [q, setQ] = useState("");

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

  useEffect(() => {
    if (!connections) fetchConnections();
  }, []); // eslint-disable-line

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

  return (
    <div className="min-h-screen px-4 py-8 bg-[radial-gradient(60rem_60rem_at_10%_-10%,hsl(20_95%_60%/.15),transparent)]">
      <div className="mx-auto max-w-5xl">
        
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground/70 bg-background/60">
            <Users className="h-3.5 w-3.5" />
            Your network
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(234_12%_12%)]">
            Connections
          </h1>
          <p className="mt-1 text-[hsl(232_10%_45%)]">
            Manage and view your developer connections.
          </p>
        </div>

        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[hsl(20_95%_60%/.35)] to-[hsl(330_85%_65%/.35)] shadow-2xl">
          <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white border border-[hsl(220_13%_91%)] p-5 sm:p-6">
            
            <div className="relative w-full sm:w-72 mb-5">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search connections..."
                className="w-full h-11 rounded-md text-black border border-gray-300 pl-10 pr-3 outline-none placeholder:text-[hsl(232_10%_65%)]"
              />
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
            </div>

            <div>
              {filtered.length === 0 && (
                <div className="py-10 text-center">
                  <Users className="h-8 w-8 mx-auto text-[hsl(232_10%_45%)]" />
                  <h3 className="mt-2 text-lg font-semibold text-[hsl(234_12%_12%)]">
                    No connections found
                  </h3>
                  <p className="mt-1 text-[hsl(232_10%_45%)]">
                    Try searching for someone you know.
                  </p>
                </div>
              )}

              {filtered.length > 0 && (
                <ul className="grid gap-4 md:grid-cols-2">
                  {filtered.map((c) => {
                    const {firstName, lastName, age, gender, description, photoURL} =c;
                    const name = `${firstName} ${lastName}`.trim();
                    return (
                      <li key={c._id || c.id}>
                        <div className="border border-[hsl(220_13%_91%)] rounded-xl p-4 hover:shadow-lg transition">
                          <div className="flex items-start gap-3">
                            
                            <div className="h-14 w-14 rounded-full overflow-hidden bg-[hsl(220_13%_96%)] border border-[hsl(220_13%_91%)] shrink-0">
                              {photoURL ? (
                                <img
                                  src={photoURL}
                                  alt={name || "avatar"}
                                  className="h-full w-full object-cover"
                                  onError={(e) => (e.currentTarget.style.display = "none")}
                                />
                              ) : (
                                <div className="h-full w-full grid place-items-center text-[hsl(232_10%_45%)]">
                                  <Users className="h-5 w-5" />
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h3 className="font-semibold text-[hsl(234_12%_12%)] leading-tight truncate">
                                    {name || "Unknown User"}
                                  </h3>
                                  <p className="text-sm text-[hsl(232_10%_45%)] mt-0.5">
                                    {age ? `${age} yrs` : "—"} {gender ? `• ${gender}` : ""}
                                  </p>
                                </div>
                              </div>

                              <p className="text-sm text-[hsl(232_10%_35%)] mt-2 line-clamp-2">
                                {description}
                              </p>
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
      </div>
    </div>
  );
};

export default Connections;
