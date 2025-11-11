import Navbar from "./components/Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "./lib/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";
import Footer from "./components/Footer";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();  
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  const isChatPage = location.pathname.startsWith("/chat");
  const isFeedPage = location.pathname.startsWith("/feed");
  const isLoginSignUp = location.pathname.startsWith("/login") || location.pathname.startsWith("/signup");


  return (
    <div>
      {!isChatPage && !isFeedPage && !isLoginSignUp && <Navbar />}
      <Outlet />
      <ThemeSwitcher />
      {!isChatPage && !isFeedPage && !isLoginSignUp && <Footer />}
    </div>
  );
}

export default App;
