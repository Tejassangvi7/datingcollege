"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lock, Mail, Sparkles } from "lucide-react";


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);



  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://datingwebsite-backend-tv10.onrender.com/api/v1/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const UserID = response.data.user.id
        console.log(token);
        
        localStorage.setItem("token", token);
        localStorage.setItem("UserID", UserID);
        console.log(UserID);
        
        toast.success("🎉 Login successful!", { autoClose: 1500 });

      
        setTimeout(() => {
          navigate("/home-page");
        }, 1500);

      } else {
        toast.error("Invalid credentials. Try again.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        toast.error("Invalid email or password.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-pink-500 scrollbar-track-gray-800">
      <ToastContainer />
      {/* Background Gradient and Animated Blobs */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex justify-center items-center p-4 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-2 text-pink-400 text-3xl font-bold">
              <Sparkles className="animate-bounce" />
              Welcome Back
            </div>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Sign in to continue exploring.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="flex items-center gap-1 text-gray-200 mb-1">
                <Mail size={18} /> Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@mail.jiit.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-pink-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="flex items-center gap-1 text-gray-200 mb-1">
                <Lock size={18} /> Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:ring-2 focus:ring-pink-400 transition"
              />
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className={`w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {loading ? "Signing In..." : "Login"}
            </motion.button>
          </form>

          <p className="text-center text-gray-300 mt-4">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/Signup")}
              className="text-pink-400 hover:underline"
            >
              Register
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
