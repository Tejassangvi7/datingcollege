import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EnterNewPassword = ({ email }) => {
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://datingwebsite-backend-tv10.onrender.com/api/v1/auth/updatePassword", {
        email,
        newPassword,
      });
      toast.success("Password changed!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error("Error resetting password.");
    }
  };

  return (
    <motion.div className="bg-gray-800/70 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-md">
      <h2 className="text-2xl text-pink-400 font-bold text-center mb-4">New Password</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <input
          type="password"
          required
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-700/50 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-pink-400"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 px-6 rounded-lg transition"
        >
          Reset Password
        </button>
      </form>
    </motion.div>
  );
};

export default EnterNewPassword;
