import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated Glowing Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Spinner */}
      <motion.div
        className="relative z-10 w-14 h-14 border-[3px] border-t-[3px] border-pink-400 rounded-full"
        style={{ borderTopColor: "transparent" }}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 0.8,
        }}
      />

      {/* Subtle Loading Text */}
      <motion.p
        className="relative z-10 mt-3 text-sm text-gray-300 tracking-wide"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Loading JIIT CONNECTS...
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
