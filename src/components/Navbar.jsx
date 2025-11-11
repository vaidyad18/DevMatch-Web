import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../lib/constants";
import { removeUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  LogOut,
  UserRound,
  Users as UsersIcon,
  Key,
  LayoutGrid,
  MessageSquare,
} from "lucide-react";
import LOGO from "../assets/logo.png";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setHidden(true); 
      } else if (currentScrollY < lastScrollY) {
        setHidden(false); 
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDropdownClick = (callback) => {
    setDropdownOpen(false);
    if (callback) callback();
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[70%] max-w-6xl 
        border border-white/15 bg-[#0b0b0b]/70 backdrop-blur-2xl 
        rounded-full shadow-[0_0_15px_rgba(0,0,0,0.4)]
        transform transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${hidden ? "-translate-y-40 opacity-0" : "translate-y-0 opacity-100"}`}
    >
      <div className="px-5 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            
            <span className="text-[32px] honk font-semibold text-white tracking-tight">
              DevMatch
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {!user ? (
              <Link to="/login">
                <button
                  className="px-5 py-2 text-sm font-medium text-white 
                    rounded-sm transition 
                    bg-gradient-to-r from-[hsl(var(--brand-start))] to-[hsl(var(--brand-end))] 
                    hover:opacity-90 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
                >
                  Get Started
                </button>
              </Link>
            ) : (
              <div className="flex items-center gap-5">
                <Link
                  to="/feed"
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 bg-transparent text-gray-300 hover:bg-white/10 transition"
                >
                  <LayoutGrid className="h-4 w-4 text-gray-400" />
                  Feed
                </Link>

                <Link
                  to="/chat"
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-white/20 bg-transparent text-gray-300 hover:bg-white/10 transition"
                >
                  <MessageSquare className="h-4 w-4 text-gray-400" />
                  Chat
                </Link>

                {/* Avatar Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="w-10 h-10 rounded-full border border-white/20 overflow-hidden hover:ring-2 hover:ring-[hsl(var(--brand-end))] transition"
                  >
                    <img
                      alt={user.firstName}
                      src={
                        user.photoURL ||
                        "https://dummyimage.com/100x100/333/aaa&text=👤"
                      }
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://dummyimage.com/100x100/333/aaa&text=👤")
                      }
                    />
                  </button>

                  {dropdownOpen && (
                    <ul className="absolute right-0 mt-3 w-56 bg-[#111]/95 text-gray-300 rounded-xl border border-white/10 shadow-lg backdrop-blur-xl z-50">
                      <div className="px-3 pt-3 pb-2 text-xs text-gray-400">
                        Signed in as{" "}
                        <span className="font-semibold text-[13px] text-white">
                          {user.firstName}
                        </span>
                      </div>
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => handleDropdownClick()}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-md"
                        >
                          <UserRound className="h-4 w-4 text-gray-400" />{" "}
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/connections"
                          onClick={() => handleDropdownClick()}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-md"
                        >
                          <UsersIcon className="h-4 w-4 text-gray-400" />{" "}
                          Connections
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/change-password"
                          onClick={() => handleDropdownClick()}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 rounded-md"
                        >
                          <Key className="h-4 w-4 text-gray-400" /> Change
                          password
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() =>
                            handleDropdownClick(() => handleLogout())
                          }
                          className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-md"
                        >
                          <LogOut className="h-4 w-4" /> Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden h-10 w-10 grid place-items-center rounded-md border border-white/20 hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            {open ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <Menu className="h-5 w-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-[#0b0b0b]/90 backdrop-blur-xl border-t border-white/10 rounded-b-3xl">
          <div className="px-5 py-5 flex flex-col gap-4 text-center">
            {!user ? (
              <>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  <button className="w-full px-4 py-2 text-sm font-medium text-gray-300 rounded-md border border-white/20 hover:bg-white/10 transition">
                    Signup
                  </button>
                </Link>
                <Link to="/login" onClick={() => setOpen(false)}>
                  <button className="w-full px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/20 rounded-md hover:bg-white/15 transition">
                    Join DevMatch
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/feed"
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white transition"
                >
                  Feed
                </Link>
                <Link
                  to="/chat"
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white transition"
                >
                  Chat
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="text-gray-300 hover:text-white transition"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="text-red-500 hover:text-red-400 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
