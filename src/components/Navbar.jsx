import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../lib/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";
import { Menu, X, LogOut, UserRound, Users as UsersIcon, Key } from "lucide-react";

const navItems = [
  { to: "/#home", label: "Home" },
  { to: "/feed", label: "Start Swiping" },
  { to: "/meet-dev", label: "Meet Developer" },

  { to: "/memberships", label: "Join Premium" },
];

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-card/80 shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-[hsl(var(--brand-start)/.45)] to-[hsl(var(--brand-end)/.45)]">
              <div className="rounded-[calc(theme(borderRadius.xl)-1px)] bg-card">
                <img
                  className="w-12 h-12 object-cover"
                  src="https://dndesigns.co.in/wp-content/uploads/2024/09/5.png"
                  alt="DevMatch logo"
                />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              DevMatch
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="group relative text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                {item.label}
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 rounded-full bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/signup">
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md border border-border hover:bg-gray-100 transition">
                    Signup
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] hover:opacity-95 transition shadow-sm">
                    Join DevMatch
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-5">
                {/* Chat button (desktop) */}
                <Link
                  to="/chat"
                  className="hidden lg:inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm font-medium text-muted-foreground hover:bg-[hsl(var(--secondary))] transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                      strokeWidth="1.5"
                    />
                  </svg>
                  Chat
                </Link>

                <span className="hidden xl:inline text-sm text-muted-foreground">
                  Welcome,{" "}
                  <span className="font-semibold text-foreground">
                    {user.firstName}
                  </span>
                </span>

                {/* Avatar dropdown */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full ring-1 ring-border">
                      <img
                        className="border rounded-full object-cover"
                        alt={user.firstName}
                        src={
                          user.photoURL ||
                          "https://dummyimage.com/100x100/eee/aaa&text=👤"
                        }
                        onError={(e) =>
                          (e.currentTarget.src =
                            "https://dummyimage.com/100x100/eee/aaa&text=👤")
                        }
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-md dropdown-content bg-card text-muted-foreground rounded-xl z-10 mt-3 w-56 p-2 border border-border shadow-xl"
                  >
                    <li className="px-2 pt-2 pb-1 text-xs">
                      Signed in as{" "}
                      <span className="font-medium text-foreground">
                        {user.firstName}
                      </span>
                    </li>
                    <li>
                      <Link to="/profile" className="flex items-center gap-2">
                        <UserRound className="h-4 w-4" />{" "}
                        <span className="text-foreground">Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/connections"
                        className="flex items-center gap-2"
                      >
                        <UsersIcon className="h-4 w-4" />{" "}
                        <span className="text-foreground">Connections</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="flex items-center gap-2"
                      >
                        <Key className="h-4 w-4" />{" "}
                        <span className="text-foreground">Change password</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-[hsl(var(--destructive))] hover:opacity-90"
                      >
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden h-10 w-10 grid place-items-center rounded-md border border-border hover:bg-[hsl(var(--secondary))] transition"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="lg:hidden bg-card/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="text-foreground/90 hover:text-foreground font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {!user && (
              <div className="flex items-center gap-3 pt-2">
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md border border-border hover:bg-gray-100 transition">
                    Signup
                  </button>
                </Link>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <button className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] hover:opacity-95 transition shadow-sm">
                    Join DevMatch
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
