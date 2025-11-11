import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../lib/constants";

export default function AuthSuccess() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
  axios
    .get(`${BASE_URL}/profile/view`, { withCredentials: true })
    .then((res) => {
      dispatch(addUser(res.data));
      navigate("/profile");
    })
    .catch((err) => {
      console.error("Profile fetch failed:", err);
      navigate("/login");
    });
}, []);


  return (
    <div className="flex h-screen items-center justify-center text-white">
      Logging you in...
    </div>
  );
}
