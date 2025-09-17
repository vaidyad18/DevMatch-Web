import axios from "axios";
import { BASE_URL } from "../lib/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import UserCard from "../components/UserCard";
import { Heart, Users, X } from "lucide-react";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRequest = async (status, id) => {
    try{
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + id, {}, {withCredentials:true});
      dispatch(removeUserFromFeed(id));
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchFeed();
  }, []); 

  if(!feed) return;
  
   if (feed.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(60rem_60rem_at_10%_-10%,hsl(20_95%_60%/.15),transparent)] px-4">
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-[hsl(20_95%_60%/.35)] to-[hsl(330_85%_65%/.35)] shadow-xl w-full max-w-md">
          <div className="rounded-[calc(theme(borderRadius.2xl)-1px)] bg-white border border-[hsl(220_13%_91%)] p-8 text-center">
            <Users className="h-12 w-12 mx-auto text-[hsl(232_10%_45%)]" />
            <h2 className="mt-4 text-xl font-bold text-[hsl(234_12%_12%)]">
              No more users
            </h2>
            <p className="mt-2 text-[hsl(232_10%_45%)] text-sm">
              You’ve reached the end of your feed. Check back later for new
              developers to connect with!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[radial-gradient(60rem_60rem_at_10%_-10%,hsl(20_95%_60%/.15),transparent)] min-h-screen flex -mt-16 items-center justify-center w-full">
      {feed && (
        <div className="flex flex-col items-center gap-6">
          <UserCard user={feed[0]} />

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => handleRequest("ignored",feed[0]._id)}
              className="h-14 cursor-pointer w-14 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 transition shadow-md"
            >
              <X className="h-7 w-7 text-red-500" />
            </button>
            <button
              type="button"
              onClick={() => handleRequest("interested",feed[0]._id)}
              className="h-14 cursor-pointer w-14 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 transition shadow-md"
            >
              <Heart className="h-7 w-7 text-green-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
