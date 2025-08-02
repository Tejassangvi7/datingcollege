import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const EnterOTP = ({ email, onNext }) => {
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://datingwebsite-backend-tv10.onrender.com/api/v1/auth/verify-otp-1st", { email, otp });
      toast.success("OTP Verified!");
      onNext();
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  return (
    <motion.div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl text-pink-400 font-bold text-center mb-4">Verify OTP</h2>
      <form onSubmit={handleVerify} className="space-y-4">
        <input
          type="text"
          required
          maxLength={6}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700/50 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 px-6 rounded-lg transition"
        >
          Verify OTP
        </button>
      </form>
    </motion.div>
  );
};

export default EnterOTP;
