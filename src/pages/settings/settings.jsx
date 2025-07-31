import React from "react";
import api from "../../api/api";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../../components/LoadingComponent';
const ComingSoonPage = () => {
const navigate = useNavigate()

 const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch {
        toast.error("Session expired. Please login again.", { theme: "dark" });
        setTimeout(() => navigate('/login'), 3000);
      }
    };
    checkAuth();
  }, [navigate]);











  return loading?<LoadingSpinner/>: (
    <div className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Animated blob background */}
      <motion.div
        className="absolute w-[400px] h-[400px] bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-spin-slow"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-spin-slow"
        animate={{ scale: [1, 0.9, 1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      {/* Glassmorphism card */}
      <motion.div
        className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg p-10 max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-center mb-4 text-pink-400">
          <Sparkles size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-2">More Features Coming Soon!</h1>
        <p className="text-sm text-white/80">
          We're working hard to bring you more functionality in the next version. Stay tuned for updates and exciting new features!
        </p>
        <p className="mt-6 text-xs text-white/60">v1.0 – Dating @ JConnect</p>
      </motion.div>
    </div>
  );
};

export default ComingSoonPage;
