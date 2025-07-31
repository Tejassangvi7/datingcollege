import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../api/api";
import "react-toastify/dist/ReactToastify.css";

export default function ConfessionForm({ postAnonymous }) {
  const [confession, setConfession] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    if (!confession.trim()) {
      toast.error("Please write something before submitting 💌");
      return;
    }
    setLoading(true);
    try {
      // Replace with your API endpoint
      const response = await api.post("/api/v1/confessions/createConfession", {
        confession,
        anonymous: postAnonymous,
      });

      
      
      if (response.status === 201 || response.status === 200) {
        toast.success("🎉 Confession submitted successfully!",{
          autoClose:3000
        });
        setConfession(""); // Clear textarea
      setTimeout(()=>{
        window.location.reload();
      },1000)

      } else {
        toast.error("Something went wrong 😢 Try again later");
      }
    } catch (error) {
      console.log(error);
      toast.error("🚨 Failed to submit confession. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* ❤️ Background Glow Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-96 h-96 bg-pink-400/30 rounded-full blur-3xl top-[-50px] left-[-50px] animate-pulse" />
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-2xl bottom-[-40px] right-[-40px] animate-pulse delay-200" />
        <div className="absolute w-80 h-80 bg-rose-300/40 rounded-full blur-2xl top-1/3 right-1/4 animate-pulse delay-500" />
      </div>

      {/* 💌 Confession Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative space-y-6 bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20"
      >
        {/* 📝 Textarea */}
        <motion.textarea
          value={confession}
          onChange={(e) => setConfession(e.target.value)}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          placeholder="💌 Write your confession here..."
          className="w-full p-4 rounded-xl bg-white/70 backdrop-blur-md shadow-md border border-gray-300 focus:border-pink-400 focus:ring-4 focus:ring-pink-200 text-gray-800 placeholder-gray-500 transition-all duration-300 ease-in-out"
          rows="4"
        ></motion.textarea>

        {/* 🚀 Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300 }}
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold tracking-wide shadow-lg transition-all duration-300 ease-in-out ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "❤️ Submit Confession"}
        </motion.button>
      </motion.form>
    </div>
  );
}
