import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react"; // Optional icon

const Confession = ({ confession, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.04,
        border: "1px solid rgba(255, 255, 255, 0.4)",
        boxShadow: "0 16px 50px rgba(255, 255, 255, 0.1)",
      }}
      className="w-full min-h-80 p-6 rounded-3xl border border-white/20 shadow-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl text-white flex flex-col justify-between m-3 transition-all duration-300"
    >
      {/* 🔥 Glowing Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={20} className="text-purple-300 animate-pulse" />
        <h2 className="text-white text-xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300">
          Anonymous Confession
        </h2>
      </div>

      {/* 💬 Confession Text */}
      <p className="text-gray-100 text-base leading-relaxed font-medium mb-6">
        {confession.content}
      </p>

      {/* 📅 Timestamp */}
      <p className="text-gray-400 text-sm mt-auto italic tracking-wide">
        Posted on{" "}
        {new Date(confession.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </motion.div>
  );
};

export default Confession;
