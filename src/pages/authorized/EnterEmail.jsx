import React, { useState } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const EnterEmail = ({ onNext }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post( "https://collegedating-cbii.onrender.com/api/v1/auth/send-otp-1st",
        { email });
      toast.success("OTP sent to your email!");
      onNext(email);
    } catch (err) {
      toast.error("Failed to send OTP. Try again.");
    }
  };

  return (
    <motion.div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl text-pink-400 font-bold text-center mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="text-white flex items-center gap-2">
          <Mail size={18} /> Enter your email
        </label>
        <input
          type="email"
          required
          placeholder="you@mail.jiit.ac.in"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700/50 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 px-6 rounded-lg transition"
        >
          Send OTP
        </button>
      </form>
    </motion.div>
  );
};

export default EnterEmail;
