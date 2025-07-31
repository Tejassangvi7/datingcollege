import React, { useState ,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
const UserID = localStorage.getItem("UserID")

import LoadingSpinner from '../../components/LoadingComponent';
const RandomMatchPage = () => {
const navigate =useNavigate();
 const [loadingcheck, setLoadingcheck] = useState(true);
useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("You are not logged in. Please login first.", { theme: "dark" });
        setTimeout(() => navigate('/login'), 3000);
        return;
      }
      try {
        const response = await api.post("/api/v1/auth/check");
        if (response.status !== 200) {
          throw new Error("Invalid session");
        }
        setLoadingcheck(false);
      } catch {
        toast.error("Session expired. Please login again.", { theme: "dark" });
        setTimeout(() => navigate('/login'), 3000);
      }
    };
    checkAuth();
  }, [navigate]);











  const [match, setMatch] = useState(null);
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const getRandomMatch = async () => {
    try {
      setLoading(true);
      setMatch(null);
      console.log("🔄 Requesting random match...");
      const response = await api.get("/api/v1/matches/randomMatch");
      console.log("✅ Response:", response.data);

      const person = response.data;
      setTimeout(() => {
        setMatch(person);
        setLoading(false);
        setCheck(true);
      }, 1500);
    } catch (error) {
      console.error("❌ Error fetching random match:", error);
      setLoading(false);
    }
  };

  const handleMessage = async () => {
    const newMessage = {
      senderId: UserID,
      receiverId: match._id,
      text: "It's a match",
      createdAt: new Date().toISOString(),
    };
  
    try {
      const res = await api.post("/api/v1/message/create", newMessage);
      
      if (res.status === 201) {
        console.log("check");
        
        navigate("/messages"); // Adjust route if needed
        
      } else {
        console.error("Failed to save message to server:", res.data);
      }
  
    } catch (error) {
      console.error("Error while sending message:", error);
    }
  };

  const LoadingCard = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-xl max-w-sm w-full mx-auto flex flex-col items-center text-center space-y-4"
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500 border-opacity-50"></div>
      <h2 className="text-xl font-semibold text-white animate-pulse">
        Finding best match for you...
      </h2>
      <p className="text-gray-300 text-sm">
        Hold tight! We're scanning the cosmos 💫
      </p>
    </motion.div>
  );

  return loadingcheck? <LoadingSpinner/>: (
    <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-800">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex justify-center items-center p-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-white text-center"
        >
          <div className="flex justify-center items-center gap-2 text-pink-400 text-3xl font-bold mb-4">
            <Sparkles className="animate-bounce" />
            Talk to a Random Stranger Of JIIT
          </div>
          <p className="text-gray-300 mb-6">Get connected instantly 💬</p>

          {loading ? (
            <LoadingCard />
          ) : !match ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={getRandomMatch}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-xl transition-all duration-300"
            >
              🎲 Find Random Match
            </motion.button>
          ) : (
<AnimatePresence>
  <motion.div
    key={match.id}
    initial={{ opacity: 0, y: 50, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -30, scale: 0.9 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 px-8 py-10 rounded-3xl shadow-[0_15px_45px_rgba(0,0,0,0.25)] max-w-sm w-full mx-auto flex flex-col items-center text-center space-y-6 hover:shadow-[0_20px_60px_rgba(255,255,255,0.15)] transition-shadow duration-500"
  >
    <motion.img
      src={match.profile || '/fallback.jpg'}
      alt={match.name || 'User profile'}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
      className="w-28 h-28 rounded-full object-cover border-4 border-white/30 shadow-lg hover:shadow-pink-400/40 transition-shadow duration-500"
    />

    <div className="space-y-3">
      <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight leading-snug">
        {match.name},
        <span className="text-pink-400 font-semibold ml-1">{match.age}</span>
        <span className="ml-2 text-[13px] text-gray-300 font-medium italic tracking-wider bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
          {match.year}
        </span>
      </h2>

      <p className="text-base text-gray-300 leading-relaxed italic px-4">
        “{match.bio}”
      </p>
    </div>

    <div className="flex flex-col sm:flex-row justify-center w-full mt-6 gap-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={getRandomMatch}
        className="w-full sm:w-1/2 bg-gradient-to-br from-zinc-100 to-zinc-200 text-gray-800 py-2.5 rounded-xl hover:from-zinc-200 hover:to-white transition font-semibold shadow-inner border border-white/30 backdrop-blur-sm"
      >
        🔁 Search
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleMessage}
        className="w-full sm:w-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2.5 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all font-semibold shadow-md"
      >
        💬 Message
      </motion.button>
    </div>
  </motion.div>
</AnimatePresence>




          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RandomMatchPage;
