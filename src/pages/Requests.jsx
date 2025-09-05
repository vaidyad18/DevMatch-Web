import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { BASE_URL } from "../lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { Users, Search, Check, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [q, setQ] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  const reviewRequest = async (status, name, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeRequest(id));

      if (status === "accepted") {
        toast.success(
          <div className="flex items-center gap-2">
            <span>You accepted {name}'s request</span>
          </div>,
          {
            autoClose: 3000,
            position: "bottom-right",
            progressStyle: { background: "green" },
          }
        );
      } else {
        toast.error(
          <div className="flex items-center gap-2">
            <span>You rejected {name}'s request</span>
          </div>,
          {
            autoClose: 3000,
            position: "bottom-right",
            progressStyle: { background: "red" },
          }
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", {
        autoClose: 3000,
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    if (!requests) fetchRequests();
  }, []);

  const filtered = useMemo(() => {
    const list = Array.isArray(requests) ? requests : [];
    const text = q.trim().toLowerCase();
    if (!text) return list;
    return list.filter((r) => {
      const name = `${r.firstName || ""} ${r.lastName || ""}`.toLowerCase();
      return (
        name.includes(text) ||
        (r.description || "").toLowerCase().includes(text) ||
        (r.gender || "").toLowerCase().includes(text)
      );
    });
  }, [requests, q]);

  return (
    <div className="min-h-screen px-4 py-8 bg-[radial-gradient(60rem_60rem_at_10%_-10%,hsl(20_95%_60%/.15),transparent)]">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-foreground/70 bg-background/60">
            <Users className="h-3.5 w-3.5" />
            Pending Requests
          </div>
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-[hsl(234_12%_12%)]">
            Requests
          </h1>
          <p className="mt-1 text-[hsl(232_10%_45%)]">
            Accept or reject connection requests you’ve received.
          </p>
        </div>

        {/* Frame */}
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[hsl(20_95%_60%/.35)] to-[hsl(330_85%_65%/.35)] shadow-2xl">
          <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white border border-[hsl(220_13%_91%)] p-5 sm:p-6">
            {/* Search */}
            <div className="relative w-full sm:w-72 mb-5">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search requests..."
                className="w-full h-11 rounded-md text-black border border-gray-300 pl-10 pr-3 outline-none placeholder:text-[hsl(232_10%_65%)]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(232_10%_45%)]" />
            </div>

            {/* Content */}
            <div>
              {filtered.length === 0 && (
                <div className="py-10 text-center">
                  <Users className="h-8 w-8 mx-auto text-[hsl(232_10%_45%)]" />
                  <h3 className="mt-2 text-lg font-semibold text-[hsl(234_12%_12%)]">
                    No pending requests
                  </h3>
                  <p className="mt-1 text-[hsl(232_10%_45%)]">
                    You don’t have any requests right now.
                  </p>
                </div>
              )}

              {filtered.length > 0 && (
                <ul className="grid gap-4 md:grid-cols-2">
                  {filtered.map((r) => {
                    const {
                      _id,
                      firstName,
                      lastName,
                      age,
                      gender,
                      description,
                      photoURL,
                    } = r.fromUserId;
                    const name = `${firstName} ${lastName}`.trim();
                    return (
                      <li key={_id}>
                        <div className="border border-[hsl(220_13%_91%)] rounded-xl p-4 hover:shadow-lg transition">
                          <div className="flex items-start gap-3">
                            <div className="h-14 w-14 rounded-full overflow-hidden bg-[hsl(220_13%_96%)] border border-[hsl(220_13%_91%)] shrink-0">
                              <img
                                src={photoURL}
                                alt={name || "avatar"}
                                className="h-full w-full object-cover"
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <h3 className="font-semibold text-[hsl(234_12%_12%)] leading-tight truncate">
                                {name}
                              </h3>
                              <p className="text-sm text-[hsl(232_10%_45%)] mt-0.5">
                                {r.age ? `${age} yrs` : "—"}{" "}
                                {r.gender ? `• ${gender}` : ""}
                              </p>
                              <p className="text-sm text-[hsl(232_10%_35%)] mt-2 line-clamp-2">
                                {description}
                              </p>

                              <div className="mt-3 flex gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    reviewRequest("accepted", firstName, r._id)
                                  }
                                  className="inline-flex items-center gap-2 cursor-pointer rounded-md h-9 px-3 text-white text-sm font-medium bg-gradient-to-r from-[hsl(20_95%_60%)] to-[hsl(330_85%_65%)] hover:opacity-95"
                                >
                                  <Check className="h-4 w-4" />
                                  Accept
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    reviewRequest("rejected", firstName, r._id)
                                  }
                                  className="inline-flex text-gray-500 cursor-pointer items-center gap-2 rounded-md h-9 px-3 border text-sm font-medium border-[hsl(220_13%_91%)] bg-white hover:bg-[hsl(220_13%_96%)]"
                                >
                                  <X className="h-4 w-4" />
                                  Reject
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
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </div>
  );
};

export default Requests;
