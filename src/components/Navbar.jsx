import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../lib/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";
import { Menu, X, LogOut, Settings, UserRound, Users as UsersIcon } from "lucide-react";

const navItems = [
  { to: "/#home", label: "Home" },
  { to: "/#features", label: "Features" },
  { to: "/#how-it-works", label: "How it Works" },
  // Meet Dev is a separate page (NOT a hash link)
  { to: "/meet-dev", label: "Meet Dev" },
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
    <nav className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-[hsl(220_13%_91%)] shadow-[0_2px_20px_rgba(0,0,0,0.04)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative rounded-xl p-[1px] bg-gradient-to-r from-[hsl(20_95%_60%/.45)] to-[hsl(330_85%_65%/.45)]">
              <div className="rounded-[calc(theme(borderRadius.xl)-1px)] bg-white">
                <img
                  className="w-12 h-12 object-cover"
                  src="https://dndesigns.co.in/wp-content/uploads/2024/09/5.png"
                  alt="DevMatch logo"
                />
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-[hsl(234_12%_12%)]">DevMatch</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="group relative text-sm font-medium text-[hsl(232_10%_45%)] hover:text-[hsl(234_12%_12%)] transition"
              >
                {item.label}
                <span className="pointer-events-none absolute left-0 -bottom-1 h-[2px] w-0 rounded-full bg-gradient-to-r from-[hsl(20_95%_60%)] to-[hsl(330_85%_65%)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/signup">
                  <button className="px-4 py-2 text-sm font-medium text-gray-500 rounded-md border border-[hsl(220_13%_91%)] hover:bg-[hsl(220_13%_96%)] transition">
                    Signup
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-[hsl(20_95%_60%)] to-[hsl(330_85%_65%)] hover:opacity-95 transition shadow-sm">
                    Join DevMatch
                  </button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-5">
                <span className="hidden xl:inline text-sm text-[hsl(232_10%_45%)]">
                  Welcome, <span className="font-semibold text-[hsl(234_12%_12%)]">{user.firstName}</span>
                </span>

                {/* Avatar dropdown (daisyUI-compatible) */}
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full ring-1 ring-[hsl(220_13%_91%)]">
                      <img
                        className="border rounded-full object-cover"
                        alt={user.firstName}
                        src={user.photoURL || "https://dummyimage.com/100x100/eee/aaa&text=👤"}
                        onError={(e) => (e.currentTarget.src = "https://dummyimage.com/100x100/eee/aaa&text=👤")}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-md text-gray-600 dropdown-content bg-white rounded-xl z-10 mt-3 w-56 p-2 border border-[hsl(220_13%_91%)] shadow-xl"
                  >
                    <li className="px-2 pt-2 pb-1 text-xs text-[hsl(232_10%_45%)]">
                      Signed in as <span className="font-medium text-[hsl(234_12%_12%)]">{user.firstName}</span>
                    </li>
                    <li>
                      <Link to="/profile" className="flex items-center gap-2">
                        <UserRound className="h-4 w-4" /> Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/connections" className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4" /> Connections
                      </Link>
                    </li>
                    <li>
                      <Link to="/requests" className="flex items-center gap-2">
                        <UsersIcon className="h-4 w-4" /> Pending Requests
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" /> Settings
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700">
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
            className="lg:hidden h-10 w-10 grid place-items-center rounded-md border border-[hsl(220_13%_91%)] hover:bg-[hsl(220_13%_96%)] transition"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="lg:hidden border-t border-[hsl(220_13%_91%)] bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-4">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}             // works for both '/#hash' and '/meet-dev'
                  onClick={() => setOpen(false)}
                  className="text-[hsl(234_12%_12%)] hover:text-[hsl(330_85%_45%)] font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            {/* You can add auth buttons / profile quick links here for mobile if needed */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
